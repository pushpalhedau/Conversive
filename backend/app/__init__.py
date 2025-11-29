from flask import Flask
from .config import Config
from .extensions import db, migrate, ma
from flask_cors import CORS

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)
    # Enable CORS for all routes
    CORS(app, resources={r"/*": {"origins": "*"}})

    # Register Blueprints
    from .api.products import products_bp
    from .api.auth import auth_bp
    from .api.seed import seed_bp
    app.register_blueprint(products_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(seed_bp, url_prefix='/api')


    @app.route('/health')
    def health_check():
        return {'status': 'ok'}

    return app
