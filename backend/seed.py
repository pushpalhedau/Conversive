from app import create_app
from app.extensions import db
from app.models.product import Product
from app.services.stock_service import StockService

app = create_app()

seed_data = [
    {
        "name": "Wireless Mouse",
        "description": "Ergonomic wireless mouse with 2.4GHz connection",
        "price": 29.99,
        "total_quantity": 100,
        "available_quantity": 85
    },
    {
        "name": "Mechanical Keyboard",
        "description": "RGB mechanical keyboard with Blue switches",
        "price": 89.99,
        "total_quantity": 50,
        "available_quantity": 5
    },
    {
        "name": "USB-C Cable",
        "description": "2-meter braided USB-C charging cable",
        "price": 12.50,
        "total_quantity": 200,
        "available_quantity": 190
    },
    {
        "name": "Monitor Stand",
        "description": "Adjustable aluminum monitor stand",
        "price": 45.00,
        "total_quantity": 30,
        "available_quantity": 2
    },
    {
        "name": "Webcam 1080p",
        "description": "Full HD webcam with noise-canceling microphone",
        "price": 59.99,
        "total_quantity": 75,
        "available_quantity": 40
    },
    {
        "name": "Gaming Headset",
        "description": "Surround sound gaming headset with mic",
        "price": 65.00,
        "total_quantity": 60,
        "available_quantity": 10
    },
    {
        "name": "Laptop Sleeve",
        "description": "Protective sleeve for 15-inch laptops",
        "price": 19.99,
        "total_quantity": 120,
        "available_quantity": 115
    },
    {
        "name": "External SSD 1TB",
        "description": "Portable 1TB SSD USB 3.2",
        "price": 129.99,
        "total_quantity": 40,
        "available_quantity": 35
    }
]

with app.app_context():
    # Clear existing data
    Product.query.delete()
    
    # Add seed data
    for item in seed_data:
        product = Product(
            name=item['name'],
            description=item['description'],
            price=item['price'],
            total_quantity=item['total_quantity'],
            available_quantity=item['available_quantity']
        )
        StockService.update_restock_status(product)
        db.session.add(product)
    
    db.session.commit()
    print(f"✅ Seeded {len(seed_data)} products successfully!")
