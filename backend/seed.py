from app import create_app
from app.extensions import db
from app.models.product import Product
from app.models.user import User
from app.services.stock_service import StockService

app = create_app()

with app.app_context():
    print("Seeding database...")
    db.create_all()

    # Seed Admin User
    # Seed Admin User
    if not User.query.filter_by(username='Pushpal').first():
        admin = User(username='Pushpal')
        admin.set_password('Password')
        db.session.add(admin)
        print("Admin user 'Pushpal' created.")

    if not User.query.filter_by(username='rentfate').first():
        admin2 = User(username='rentfate')
        admin2.set_password('Pass@123')
        db.session.add(admin2)
        print("Admin user 'rentfate' created.")
    
    db.session.commit()

    # Seed Products
    if Product.query.count() == 0:
        products = [
            {
                'name': 'Laptop Stand',
                'description': 'Adjustable aluminum laptop stand',
                'price': 49.99,
                'total_quantity': 50,
                'available_quantity': 45,
                'image_url': 'https://images.unsplash.com/photo-1616353071855-2c045c4458ae?w=500&auto=format&fit=crop&q=60'
            },
            {
                'name': 'Wireless Mouse',
                'description': 'Ergonomic wireless mouse',
                'price': 29.99,
                'total_quantity': 100,
                'available_quantity': 12,
                'image_url': 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60'
            },
            {
                'name': 'Mechanical Keyboard',
                'description': 'RGB mechanical keyboard with blue switches',
                'price': 89.99,
                'total_quantity': 30,
                'available_quantity': 5,
                'image_url': 'https://images.unsplash.com/photo-1587829741301-dc798b91add1?w=500&auto=format&fit=crop&q=60'
            },
            {
                'name': 'USB-C Hub',
                'description': '7-in-1 USB-C hub with HDMI',
                'price': 39.99,
                'total_quantity': 75,
                'available_quantity': 70,
                'image_url': 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&auto=format&fit=crop&q=60'
            }
        ]

        for p_data in products:
            product = Product(**p_data)
            StockService.update_restock_status(product)
            db.session.add(product)
        
        db.session.commit()
        print("Products seeded.")
    else:
        print("Products already exist.")

    print("Database seeded successfully!")
