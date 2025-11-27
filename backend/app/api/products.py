from flask import Blueprint, request, jsonify
from ..extensions import db
from ..models.product import Product
from ..schemas.product import ProductSchema
from ..services.stock_service import StockService

products_bp = Blueprint('products', __name__)
product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

@products_bp.route('/products', methods=['POST'])
def create_product():
    data = request.get_json()
    errors = product_schema.validate(data)
    if errors:
        return jsonify(errors), 400
    
    new_product = Product(
        name=data['name'],
        description=data.get('description'),
        price=data['price'],
        total_quantity=data['total_quantity'],
        available_quantity=data['available_quantity'],
        image_url=data.get('image_url')
    )
    
    # Calculate initial restock status
    StockService.update_restock_status(new_product)
    
    db.session.add(new_product)
    db.session.commit()
    
    return product_schema.jsonify(new_product), 201

@products_bp.route('/products', methods=['GET'])
def get_products():
    all_products = Product.query.all()
    result = products_schema.dump(all_products)
    return jsonify(result)

@products_bp.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return product_schema.jsonify(product)

@products_bp.route('/products/<int:id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get_or_404(id)
    data = request.get_json()
    
    errors = product_schema.validate(data, partial=True)
    if errors:
        return jsonify(errors), 400
    
    if 'name' in data: product.name = data['name']
    if 'description' in data: product.description = data['description']
    if 'price' in data: product.price = data['price']
    if 'total_quantity' in data: product.total_quantity = data['total_quantity']
    if 'available_quantity' in data: product.available_quantity = data['available_quantity']
    if 'image_url' in data: product.image_url = data['image_url']
    
    # Recalculate restock status if quantities changed
    if 'total_quantity' in data or 'available_quantity' in data:
        StockService.update_restock_status(product)
        
    db.session.commit()
    return product_schema.jsonify(product)

@products_bp.route('/products/<int:id>/buy', methods=['POST'])
def buy_product(id):
    product = Product.query.get_or_404(id)
    
    if product.available_quantity < 1:
        return jsonify({'error': 'Product out of stock'}), 400
        
    product.available_quantity -= 1
    StockService.update_restock_status(product)
    db.session.commit()
    
    return product_schema.jsonify(product)

@products_bp.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return '', 204

@products_bp.route('/restock/list', methods=['GET'])
def get_restock_list():
    products = Product.query.filter_by(need_restock=True).all()
    return products_schema.jsonify(products)

@products_bp.route('/restock/update/<int:id>', methods=['PUT'])
def update_restock_manual(id):
    product = Product.query.get_or_404(id)
    data = request.get_json()
    
    if 'need_restock' not in data:
        return jsonify({'error': 'need_restock field is required'}), 400
        
    product.need_restock = data['need_restock']
    db.session.commit()
    
    return product_schema.jsonify(product)
