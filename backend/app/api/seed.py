from flask import Blueprint, jsonify
from app import db
from app.models.product import Product
from app.models.user import User
import os

seed_bp = Blueprint('seed', __name__)

@seed_bp.route('/migrate-database', methods=['POST'])
def migrate_database():
    """Run database migrations - REMOVE IN PRODUCTION"""
    try:
        # Import all models to ensure they're registered
        from app.models.product import Product
        from app.models.user import User
        
        # Create all tables
        db.create_all()
        
        return jsonify({'message': 'Database migrated successfully!'}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@seed_bp.route('/reset-password', methods=['POST'])
def reset_password():
    """Force reset admin password - REMOVE IN PRODUCTION"""
    try:
        user = User.query.filter_by(username='admin').first()
        if not user:
            return jsonify({'error': 'Admin user not found'}), 404
            
        # Force set password to 'admin123'
        user.set_password('admin123')
        db.session.commit()
        
        return jsonify({'message': 'Password reset to: admin123'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@seed_bp.route('/seed-database', methods=['POST'])
def seed_database():
    """Temporary endpoint to seed database - REMOVE IN PRODUCTION"""
    try:
        # Check if already seeded
        if Product.query.first():
            return jsonify({'message': 'Database already seeded'}), 200
        
        # Create admin user
        admin_username = os.getenv('ADMIN_USERNAME', 'admin')
        admin_password = os.getenv('ADMIN_PASSWORD', 'changeme')
        
        admin = User(username=admin_username)
        admin.set_password(admin_password)
        db.session.add(admin)
        
        # Create sample products
        products = [
            Product(name='Wireless Mouse', description='Ergonomic wireless mouse', price=29.99, total_quantity=100, available_quantity=100),
            Product(name='Mechanical Keyboard', description='RGB mechanical keyboard', price=89.99, total_quantity=50, available_quantity=50),
            Product(name='USB-C Hub', description='7-in-1 USB-C hub', price=49.99, total_quantity=75, available_quantity=75),
            Product(name='Laptop Stand', description='Aluminum laptop stand', price=39.99, total_quantity=60, available_quantity=60),
            Product(name='Webcam HD', description='1080p webcam', price=69.99, total_quantity=40, available_quantity=40),
        ]
        
        for product in products:
            db.session.add(product)
        
        db.session.commit()
        
        return jsonify({'message': 'Database seeded successfully!'}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
