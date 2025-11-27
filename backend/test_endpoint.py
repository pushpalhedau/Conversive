import sys
import traceback
from app import create_app
from app.extensions import db
from app.models.product import Product
from app.schemas.product import ProductSchema
from flask import jsonify

app = create_app()
products_schema = ProductSchema(many=True)

with app.app_context():
    try:
        print("Testing the get_products endpoint logic...")
        all_products = Product.query.all()
        print(f"✓ Query successful - Found {len(all_products)} products")
        
        result = products_schema.dump(all_products)
        print(f"✓ Schema dump successful")
        print(f"  Result type: {type(result)}")
        print(f"  Result: {result}")
        
        # This would be called in the endpoint
        response = jsonify(result)
        print(f"✓ Jsonify successful")
        print(f"  Response: {response}")
        print(f"  Response data: {response.get_data(as_text=True)}")
        
    except Exception as e:
        print(f"\n❌ ERROR: {type(e).__name__}: {str(e)}")
        print("\nFull traceback:")
        traceback.print_exc()
        sys.exit(1)

print("\n✓ All tests passed!")
