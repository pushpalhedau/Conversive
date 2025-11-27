from app import create_app
from app.extensions import db
from app.models.product import Product
from app.models.user import User
from app.services.stock_service import StockService
import os

app = create_app()

with app.app_context():
    print("Seeding database...")
    db.create_all()

    # Seed Admin Users from environment variables
    admin_username = os.getenv('ADMIN_USERNAME', 'admin')
    admin_password = os.getenv('ADMIN_PASSWORD', 'changeme')
    
    if not User.query.filter_by(username=admin_username).first():
        admin = User(username=admin_username)
        admin.set_password(admin_password)
        db.session.add(admin)
        print(f"Admin user '{admin_username}' created.")
    
    # Optional: Second admin user
    admin_username_2 = os.getenv('ADMIN_USERNAME_2')
    admin_password_2 = os.getenv('ADMIN_PASSWORD_2')
    
    if admin_username_2 and admin_password_2:
        if not User.query.filter_by(username=admin_username_2).first():
            admin2 = User(username=admin_username_2)
            admin2.set_password(admin_password_2)
            db.session.add(admin2)
            print(f"Admin user '{admin_username_2}' created.")
    
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
