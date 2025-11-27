from flask import Blueprint, request, jsonify
from ..models.user import User
from ..extensions import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        return jsonify({
            'message': 'Login successful',
            'user': {'id': user.id, 'username': user.username}
        }), 200
    
    return jsonify({'error': 'Invalid credentials'}), 401
