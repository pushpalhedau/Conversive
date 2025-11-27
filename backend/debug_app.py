import os
from app import create_app
from app.extensions import db
from app.models.product import Product

# Set the environment variable
os.environ['DATABASE_URL'] = "mysql+pymysql://user:password@localhost:3307/stock_db"

app = create_app()

print("🚀 Starting App Debug...")

with app.app_context():
    try:
        print("Querying products...")
        products = Product.query.all()
        print(f"✅ Found {len(products)} products.")
        for p in products:
            print(f" - {p.name}: {p.price}")
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
