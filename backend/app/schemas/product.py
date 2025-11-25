from ..extensions import ma
from ..models.product import Product
from marshmallow import fields, validate

class ProductSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Product
        load_instance = True
        ordered = True

    name = fields.String(required=True, validate=validate.Length(min=1, max=255))
    price = fields.Decimal(required=True, as_string=True)
    total_quantity = fields.Integer(required=True, validate=validate.Range(min=0))
    available_quantity = fields.Integer(required=True, validate=validate.Range(min=0))
    need_restock = fields.Boolean(dump_only=True) # Computed, but can be overridden via specific endpoint
