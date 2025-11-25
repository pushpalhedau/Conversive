from flask import Flask
from .config import Config
from .extensions import db, migrate, ma, cors

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": "*"}})

    # Register Blueprints
    from .api.products import products_bp
    app.register_blueprint(products_bp, url_prefix='/api')

    @app.route('/health')
    def health_check():
        return {'status': 'ok'}

    return app
