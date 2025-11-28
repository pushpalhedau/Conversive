# Stock Management System

A production-ready Stock Management System built with Flask (Python) backend and React (TypeScript) frontend, designed for e-commerce inventory management with automated restock alerts.

## 🚀 Features

- **Product Management**: Full CRUD operations for products
- **Automated Restock Logic**: Automatic alerts when stock falls below 20% of total quantity
- **Manual Override**: Ability to manually set restock status
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- **Type-Safe**: Full TypeScript implementation on frontend
- **RESTful API**: Clean, well-documented API endpoints
- **Database Migrations**: Alembic-powered schema management

## 📋 Tech Stack

### Backend
- **Framework**: Flask 3.0
- **Database**: SQLite (dev) / MySQL (production)
- **ORM**: SQLAlchemy
- **Migrations**: Flask-Migrate (Alembic)
- **Validation**: Marshmallow
- **WSGI Server**: Gunicorn (production)

### Frontend
- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **State Management**: Redux Toolkit + RTK Query
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 🛠️ Local Development Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create and activate virtual environment:
```bash
python -m venv venv
# Windows
./venv/Scripts/activate
# macOS/Linux
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env if needed
```

5. Initialize database:
```bash
flask db upgrade
```

6. Seed database with sample data:
```bash
python seed.py
```

7. Run development server:
```bash
python wsgi.py
```

Backend will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env if needed
```

4. Run development server:
```bash
npm run dev
```

Frontend will be available at `http://localhost:5173`

## 📡 API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all products |
| `GET` | `/api/products/{id}` | Get product by ID |
| `POST` | `/api/products` | Create new product |
| `PUT` | `/api/products/{id}` | Update product |
| `DELETE` | `/api/products/{id}` | Delete product |

### Restock Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/restock/list` | Get products needing restock |
| `PUT` | `/api/restock/update/{id}` | Manually update restock status |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check endpoint |

## 🗄️ Database Schema

### Product Table

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | INTEGER | Primary Key, Auto-increment |
| `name` | VARCHAR(255) | Unique, Not Null |
# Stock Management System

A production-ready Stock Management System built with Flask (Python) backend and React (TypeScript) frontend, designed for e-commerce inventory management with automated restock alerts.

## 🚀 Features

- **Product Management**: Full CRUD operations for products
- **Automated Restock Logic**: Automatic alerts when stock falls below 20% of total quantity
- **Manual Override**: Ability to manually set restock status
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- **Type-Safe**: Full TypeScript implementation on frontend
- **RESTful API**: Clean, well-documented API endpoints
- **Database Migrations**: Alembic-powered schema management

## 📋 Tech Stack

### Backend
- **Framework**: Flask 3.0
- **Database**: SQLite (dev) / MySQL (production)
- **ORM**: SQLAlchemy
- **Migrations**: Flask-Migrate (Alembic)
- **Validation**: Marshmallow
- **WSGI Server**: Gunicorn (production)

### Frontend
- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **State Management**: Redux Toolkit + RTK Query
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 🛠️ Local Development Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create and activate virtual environment:
```bash
python -m venv venv
# Windows
./venv/Scripts/activate
# macOS/Linux
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env if needed
```

5. Initialize database:
```bash
flask db upgrade
```

6. Seed database with sample data:
```bash
python seed.py
```

7. Run development server:
```bash
python wsgi.py
```

Backend will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env if needed
```

4. Run development server:
```bash
npm run dev
```

Frontend will be available at `http://localhost:5173`

## 📡 API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all products |
| `GET` | `/api/products/{id}` | Get product by ID |
| `POST` | `/api/products` | Create new product |
| `PUT` | `/api/products/{id}` | Update product |
| `DELETE` | `/api/products/{id}` | Delete product |

### Restock Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/restock/list` | Get products needing restock |
| `PUT` | `/api/restock/update/{id}` | Manually update restock status |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check endpoint |

## 🗄️ Database Schema

### Product Table

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | INTEGER | Primary Key, Auto-increment |
| `name` | VARCHAR(255) | Unique, Not Null |
| `description` | TEXT | Nullable |
| `price` | DECIMAL(10,2) | Not Null |
| `total_quantity` | INTEGER | Not Null |
| `available_quantity` | INTEGER | Not Null |
| `need_restock` | BOOLEAN | Default False |

## 🚀 Live Demo

The project is deployed and available at:
**[https://conversive.vercel.app/](https://conversive.vercel.app/)**

> **Note:** If the link asks for "Local Network Access", please enable it from your browser settings. This depends on the browser you use and is a standard permission request.

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm run test
```

### Linting
```bash
# Backend
cd backend
flake8 app/
black app/
isort app/

# Frontend
cd frontend
npm run lint
```

## 📝 Environment Variables

### Backend (.env)
```
FLASK_APP=wsgi.py
FLASK_ENV=development
DATABASE_URL=sqlite:///stock.db
SECRET_KEY=your-secret-key
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🔒 Security Best Practices

- ✅ Environment variables for sensitive data
- ✅ Input validation with Marshmallow
- ✅ CORS configuration
- ✅ SQL injection prevention via ORM
- ✅ HTTPS enforced in production
- ✅ Structured error handling

## 📦 Project Structure

```
/
├── backend/
│   ├── app/
│   │   ├── __init__.py          # App factory
│   │   ├── config.py            # Configuration
│   │   ├── extensions.py        # Flask extensions
│   │   ├── models/              # SQLAlchemy models
│   │   ├── schemas/             # Marshmallow schemas
│   │   ├── api/                 # API blueprints
│   │   └── services/            # Business logic
│   ├── migrations/              # Database migrations
│   ├── tests/                   # Tests
│   ├── requirements.txt
│   ├── wsgi.py
│   └── seed.py
├── frontend/
│   ├── src/
│   │   ├── app/                 # Redux store
│   │   ├── features/            # Feature modules
│   │   ├── services/            # RTK Query APIs
│   │   ├── types/               # TypeScript types
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── docker-compose.yml
```
