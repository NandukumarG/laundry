from datetime import date
from decimal import Decimal

from sqlalchemy import CheckConstraint, Date, ForeignKey, Numeric, String, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    full_name: Mapped[str] = mapped_column(String(100))
    username: Mapped[str] = mapped_column(String(100), unique=True)
    email: Mapped[str] = mapped_column(String(254), unique=True)
    password: Mapped[str] = mapped_column(String(255))
    phone: Mapped[str] = mapped_column(String(30), default="")
    address: Mapped[str | None] = mapped_column(Text)
    avatar_url: Mapped[str | None] = mapped_column(Text)


class Pickup(Base):
    __tablename__ = "pickups"
    __table_args__ = (
        CheckConstraint("total_price >= 0", name="ck_pickups_price"),
        CheckConstraint("delivery_date >= pickup_date", name="ck_pickups_dates"),
        CheckConstraint("status IN ('placed','confirmed','pickup','processing','ready','delivered','cancelled')", name="ck_pickups_status"),
    )
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    order_id: Mapped[str] = mapped_column(String(40), unique=True)
    store: Mapped[str] = mapped_column(String(150))
    service_type: Mapped[str] = mapped_column(String(50))
    clothing_items: Mapped[dict] = mapped_column(JSONB)
    pickup_address: Mapped[str] = mapped_column(Text)
    pickup_date: Mapped[date] = mapped_column(Date, index=True)
    pickup_time: Mapped[str] = mapped_column(String(50))
    delivery_address: Mapped[str] = mapped_column(Text)
    delivery_date: Mapped[date] = mapped_column(Date)
    delivery_time: Mapped[str] = mapped_column(String(50))
    total_price: Mapped[Decimal] = mapped_column(Numeric(12, 2))
    status: Mapped[str] = mapped_column(String(20), default="placed")


class Contact(Base):
    __tablename__ = "contacts"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    phone: Mapped[str] = mapped_column(String(15))
    email: Mapped[str] = mapped_column(String(254))
    message: Mapped[str] = mapped_column(String(500))
