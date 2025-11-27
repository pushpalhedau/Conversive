from ..extensions import db

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    total_quantity = db.Column(db.Integer, nullable=False)
    available_quantity = db.Column(db.Integer, nullable=False)
    need_restock = db.Column(db.Boolean, default=False)
    image_url = db.Column(db.String(500), nullable=True)

    def __repr__(self):
        return f'<Product {self.name}>'
