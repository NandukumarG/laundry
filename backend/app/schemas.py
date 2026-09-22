from datetime import date
from decimal import Decimal
from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field, StringConstraints, model_validator
from pydantic.alias_generators import to_camel

NonBlank = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1)]
TimeSlot = Literal["9 AM - 12 PM", "12 PM - 3 PM", "3 PM - 6 PM", "6 PM - 9 PM"]
TIME_SLOTS = ["9 AM - 12 PM", "12 PM - 3 PM", "3 PM - 6 PM", "6 PM - 9 PM"]


class Schema(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)


class Register(Schema):
    full_name: NonBlank = Field(max_length=100)
    username: NonBlank = Field(max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    phone: str = Field(default="", max_length=30)


class Login(Schema):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


class ProfileUpdate(Schema):
    full_name: NonBlank | None = Field(default=None, max_length=100)
    email: EmailStr | None = None
    phone: str | None = Field(default=None, max_length=30)
    address: str | None = Field(default=None, max_length=2000)


class Profile(Schema):
    id: int
    full_name: str
    username: str
    email: str
    phone: str
    address: str | None
    avatar_url: str | None


def validate_delivery(pickup_date, pickup_time, delivery_date, delivery_time):
    if delivery_date < pickup_date or (
        delivery_date == pickup_date and TIME_SLOTS.index(delivery_time) <= TIME_SLOTS.index(pickup_time)
    ):
        raise ValueError("Delivery must be after pickup")


class PickupRequest(Schema):
    store: NonBlank = Field(max_length=150)
    service_type: Literal["Wash & Fold", "Wash & Iron", "Steam Iron", "Dry Cleaning"]
    clothing_items: dict[str, dict[str, Annotated[int, Field(strict=True, ge=0, le=1000)]]]
    pickup_address: NonBlank = Field(max_length=2000)
    pickup_date: date
    pickup_time: TimeSlot
    delivery_address: NonBlank = Field(max_length=2000)
    delivery_date: date
    delivery_time: TimeSlot
    total_price: Decimal = Field(default=0, ge=0, max_digits=12, decimal_places=2)

    @model_validator(mode="after")
    def validate_pickup(self):
        validate_delivery(self.pickup_date, self.pickup_time, self.delivery_date, self.delivery_time)
        if not any(count > 0 for section in self.clothing_items.values() for count in section.values()):
            raise ValueError("Select at least one clothing item")
        return self


class PickupResponse(PickupRequest):
    id: int
    order_id: str
    status: str
    total_price: float


class DeliveryUpdate(Schema):
    delivery_address: NonBlank | None = Field(default=None, max_length=2000)
    delivery_date: date | None = None
    delivery_time: TimeSlot | None = None


class ContactRequest(Schema):
    name: NonBlank = Field(max_length=100)
    phone: NonBlank = Field(max_length=15)
    email: EmailStr
    message: NonBlank = Field(max_length=500)
