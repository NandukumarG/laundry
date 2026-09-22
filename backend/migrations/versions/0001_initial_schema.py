"""Create users, pickups and contacts.

Revision ID: 0001
Revises: None
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("full_name", sa.String(100), nullable=False),
        sa.Column("username", sa.String(100), nullable=False),
        sa.Column("email", sa.String(254), nullable=False),
        sa.Column("password", sa.String(255), nullable=False),
        sa.Column("phone", sa.String(30), nullable=False),
        sa.Column("address", sa.Text(), nullable=True),
        sa.Column("avatar_url", sa.Text(), nullable=True),
        sa.UniqueConstraint("username"),
        sa.UniqueConstraint("email"),
    )
    op.create_table(
        "contacts",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(100), nullable=False),
        sa.Column("phone", sa.String(15), nullable=False),
        sa.Column("email", sa.String(254), nullable=False),
        sa.Column("message", sa.String(500), nullable=False),
    )
    op.create_table(
        "pickups",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("order_id", sa.String(40), nullable=False),
        sa.Column("store", sa.String(150), nullable=False),
        sa.Column("service_type", sa.String(50), nullable=False),
        sa.Column("clothing_items", postgresql.JSONB(), nullable=False),
        sa.Column("pickup_address", sa.Text(), nullable=False),
        sa.Column("pickup_date", sa.Date(), nullable=False),
        sa.Column("pickup_time", sa.String(50), nullable=False),
        sa.Column("delivery_address", sa.Text(), nullable=False),
        sa.Column("delivery_date", sa.Date(), nullable=False),
        sa.Column("delivery_time", sa.String(50), nullable=False),
        sa.Column("total_price", sa.Numeric(12, 2), nullable=False),
        sa.Column("status", sa.String(20), nullable=False),
        sa.UniqueConstraint("order_id"),
        sa.CheckConstraint("total_price >= 0", name="ck_pickups_price"),
        sa.CheckConstraint("delivery_date >= pickup_date", name="ck_pickups_dates"),
        sa.CheckConstraint("status IN ('placed','confirmed','pickup','processing','ready','delivered','cancelled')", name="ck_pickups_status"),
    )
    op.create_index("ix_pickups_user_id", "pickups", ["user_id"])
    op.create_index("ix_pickups_pickup_date", "pickups", ["pickup_date"])


def downgrade():
    op.drop_index("ix_pickups_pickup_date", table_name="pickups")
    op.drop_index("ix_pickups_user_id", table_name="pickups")
    op.drop_table("pickups")
    op.drop_table("contacts")
    op.drop_table("users")
