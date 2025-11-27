import os
from sqlalchemy import create_engine, inspect, text

DATABASE_URL = "mysql+pymysql://user:password@localhost:3307/stock_db"

print(f"Connecting to: {DATABASE_URL}")

try:
    engine = create_engine(DATABASE_URL)
    inspector = inspect(engine)
    
    columns = inspector.get_columns('product')
    print("Columns in 'product' table:")
    for col in columns:
        print(f" - {col['name']} ({col['type']})")
        
    # Check alembic version
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT * FROM alembic_version"))
            for row in result:
                print(f"Alembic Version: {row}")
    except Exception as e:
        print(f"Could not read alembic_version: {e}")

except Exception as e:
    print(f"❌ Error: {e}")
