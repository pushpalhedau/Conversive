from flask import Blueprint, request, jsonify
from ..models.user import User
from ..extensions import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/auth/debug-users', methods=['GET'])
def debug_users():
    """Debug endpoint to see all users - REMOVE IN PRODUCTION"""
    users = User.query.all()
    return jsonify({
        'count': len(users),
        'users': [{'id': u.id, 'username': u.username, 'has_password': bool(u.password_hash)} for u in users]
    }), 200

@auth_bp.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({'error': 'User not found'}), 401
    
    if user.check_password(password):
        return jsonify({
            'message': 'Login successful',
            'user': {'id': user.id, 'username': user.username}
        }), 200
    
    return jsonify({'error': 'Invalid password'}), 401
