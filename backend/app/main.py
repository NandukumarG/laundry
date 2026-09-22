from datetime import date
from io import BytesIO
from uuid import uuid4

from fastapi import FastAPI, HTTPException, UploadFile
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from PIL import Image, UnidentifiedImageError
from sqlalchemy import or_, select, text
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.config import settings
from app.models import Contact, Pickup, User
from app.pricing import calculate_price
from app.schemas import (ContactRequest, DeliveryUpdate, Login, PickupRequest,
                         PickupResponse, Profile, ProfileUpdate, Register, validate_delivery)
from app.security import CurrentUser, Db, create_token, dummy_hash, password_hash

app = FastAPI(title="Laundry API", docs_url="/docs" if settings.app_env != "deployment" else None,
              redoc_url=None)
app.add_middleware(CORSMiddleware, allow_origins=settings.cors_origins,
                   allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
                   allow_headers=["Authorization", "Content-Type"])
settings.upload_dir.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=settings.upload_dir), name="uploads")


@app.exception_handler(StarletteHTTPException)
async def http_error(request, exc):
    return JSONResponse(status_code=exc.status_code, content={"message": str(exc.detail)}, headers=exc.headers)


@app.exception_handler(RequestValidationError)
async def validation_error(request, exc):
    # Avoid echoing request data (including passwords) in validation errors.
    return JSONResponse(status_code=422, content={"message": "; ".join(error["msg"] for error in exc.errors())})


def commit(db):
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(409, "A record with these details already exists")


@app.get("/api/health")
def health(db: Db):
    try:
        db.execute(text("SELECT 1"))
        revision = db.execute(text("SELECT version_num FROM alembic_version")).scalar_one()
    except SQLAlchemyError:
        raise HTTPException(503, "Database unavailable or migrations not applied")
    return {"status": "ok", "database": "postgresql", "migration": revision}


@app.post("/api/users/register")
def register(data: Register, db: Db):
    email = str(data.email).lower()
    if db.scalar(select(User).where(or_(User.email == email, User.username == data.username))):
        raise HTTPException(409, "Username or email is already registered")
    user = User(**data.model_dump(exclude={"password", "email"}), email=email,
                password=password_hash.hash(data.password))
    db.add(user)
    commit(db)
    return {"message": "User registered successfully!"}


@app.post("/api/users/login")
def login(data: Login, db: Db):
    user = db.scalar(select(User).where(User.email == str(data.email).lower()))
    try:
        valid = password_hash.verify(data.password, user.password if user else dummy_hash)
    except ValueError:
        valid = False
    if not user or not valid:
        raise HTTPException(401, "Invalid email or password")
    return {"token": create_token(user.id), "user": Profile.model_validate(user).model_dump(by_alias=True)}


@app.get("/api/users/profile", response_model=Profile)
@app.get("/api/profile/details", response_model=Profile, include_in_schema=False)
def profile(user: CurrentUser):
    return user


@app.put("/api/users/profile", response_model=Profile)
@app.patch("/api/users/profile", response_model=Profile)
@app.patch("/api/profile/update", response_model=Profile, include_in_schema=False)
def update_profile(data: ProfileUpdate, user: CurrentUser, db: Db):
    for name, value in data.model_dump(exclude_unset=True, exclude_none=True).items():
        setattr(user, name, str(value).lower() if name == "email" else value)
    commit(db)
    return user


@app.post("/api/users/upload-avatar")
def upload_avatar(avatar: UploadFile, user: CurrentUser, db: Db):
    data = avatar.file.read(settings.max_upload_bytes + 1)
    if len(data) > settings.max_upload_bytes:
        raise HTTPException(413, "File size exceeds 10MB limit")
    try:
        with Image.open(BytesIO(data)) as uploaded:
            if uploaded.format not in {"JPEG", "PNG"} or uploaded.width * uploaded.height > 25_000_000:
                raise ValueError("Unsupported image")
            uploaded.load()
            uploaded.thumbnail((1024, 1024))
            filename = f"{user.id}_{uuid4().hex}.jpg"
            uploaded.convert("RGB").save(settings.upload_dir / filename, "JPEG", quality=90)
    except (UnidentifiedImageError, OSError, ValueError, Image.DecompressionBombError):
        raise HTTPException(400, "Upload a valid JPG or PNG image")
    user.avatar_url = f"/uploads/{filename}"
    commit(db)
    return {"avatarUrl": user.avatar_url}


@app.post("/api/contact/submit", status_code=201)
def contact(data: ContactRequest, db: Db):
    db.add(Contact(**data.model_dump()))
    commit(db)
    return {"message": "Contact form submitted successfully!"}


def owned_order(order_id: str, user: User, db):
    order = db.scalar(select(Pickup).where(Pickup.order_id == order_id, Pickup.user_id == user.id))
    if order is None:
        raise HTTPException(404, "Order not found")
    return order


@app.post("/api/pickups/schedule", status_code=201)
def schedule(data: PickupRequest, user: CurrentUser, db: Db):
    if data.pickup_date < date.today():
        raise HTTPException(422, "Pickup date cannot be in the past")
    try:
        total = calculate_price(data.clothing_items, data.service_type)
    except ValueError as exc:
        raise HTTPException(422, str(exc))
    order = Pickup(**data.model_dump(exclude={"total_price"}), total_price=total,
                   user_id=user.id, order_id=f"LAUN-{date.today():%Y%m}-{uuid4().hex[:12].upper()}")
    db.add(order)
    commit(db)
    return {"orderId": order.order_id, "message": "Pickup scheduled successfully", "totalPrice": float(total)}


@app.get("/api/pickups/history", response_model=list[PickupResponse])
def history(user: CurrentUser, db: Db):
    return db.scalars(select(Pickup).where(Pickup.user_id == user.id).order_by(Pickup.id.desc())).all()


@app.get("/api/pickups/service/{service_type}", response_model=list[PickupResponse])
def by_service(service_type: str, user: CurrentUser, db: Db):
    return db.scalars(select(Pickup).where(Pickup.user_id == user.id, Pickup.service_type == service_type)).all()


@app.get("/api/pickups/date/after", response_model=list[PickupResponse])
def after_date(date: date, user: CurrentUser, db: Db):
    return db.scalars(select(Pickup).where(Pickup.user_id == user.id, Pickup.pickup_date > date)).all()


@app.get("/api/pickups/date/between", response_model=list[PickupResponse])
def between_dates(startDate: date, endDate: date, user: CurrentUser, db: Db):
    if endDate < startDate:
        raise HTTPException(422, "End date must be on or after start date")
    return db.scalars(select(Pickup).where(Pickup.user_id == user.id, Pickup.pickup_date.between(startDate, endDate))).all()


@app.get("/api/pickups/{order_id}", response_model=PickupResponse)
def get_order(order_id: str, user: CurrentUser, db: Db):
    return owned_order(order_id, user, db)


@app.patch("/api/pickups/{order_id}", response_model=PickupResponse)
def update_delivery(order_id: str, data: DeliveryUpdate, user: CurrentUser, db: Db):
    order = owned_order(order_id, user, db)
    if order.status in {"cancelled", "delivered"}:
        raise HTTPException(409, "This order can no longer be updated")
    for name, value in data.model_dump(exclude_unset=True, exclude_none=True).items():
        setattr(order, name, value)
    try:
        validate_delivery(order.pickup_date, order.pickup_time, order.delivery_date, order.delivery_time)
        if order.delivery_date < date.today():
            raise ValueError("Delivery date cannot be in the past")
    except ValueError as exc:
        raise HTTPException(422, str(exc))
    commit(db)
    return order


@app.delete("/api/pickups/{order_id}/cancel")
def cancel(order_id: str, user: CurrentUser, db: Db):
    order = owned_order(order_id, user, db)
    if order.status == "delivered":
        raise HTTPException(409, "Delivered orders cannot be cancelled")
    order.status = "cancelled"
    commit(db)
    return {"message": "Pickup cancelled successfully"}
