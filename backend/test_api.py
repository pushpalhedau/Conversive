from app import create_app
from app.extensions import db
from app.models.product import Product
from app.schemas.product import ProductSchema

app = create_app()

with app.app_context():
    try:
        print("Testing product query...")
        products = Product.query.all()
        print(f"Found {len(products)} products")
        
        print("\nTesting schema serialization...")
        schema = ProductSchema(many=True)
        result = schema.dump(products)
        print(f"Serialized successfully: {result}")
        
    except Exception as e:
        print(f"ERROR: {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
