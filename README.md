# Stock Management System

A production-ready Stock Management System built with Flask (Python) backend and React (TypeScript) frontend, designed for e-commerce inventory management with automated restock alerts.

## ⚡ Quick Overview

This application is designed to be intuitive and powerful. Here's how to get started:

1.  **Admin Login**: The journey begins by clicking the **"Login as Admin"** button.
    *   **Username**: `admin`
    *   **Password**: `admin123` (Pre-configured in the database)
2.  **Dashboard**: Once logged in, you'll see the Admin Dashboard where you can manage your inventory.
3.  **Restock Alerts**: The system automatically flags products that need restocking (when stock < 20%). You can view these in the "Restock Alerts" tab.
4.  **Manual Override**: You can manually toggle the "Need Restock" status for any product if you want to force a restock alert.
5.  **Logout**: Click "Logout" to securely end your session and return to the shop view.
6.  **Shop View**: The default view allows customers to browse products and see real-time availability.

### 🛠️ Database Management Tool (`seed-database.html`)
We've included a handy tool `seed-database.html` in the root directory. This file is crucial for:
*   **Running Migrations**: Creates the necessary database tables in your Neon PostgreSQL database.
*   **Seeding Data**: Populates the database with sample products and the default admin user.
*   **Resetting Password**: If you ever get locked out, use this to reset the admin password to `admin123`.

---

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
- **Database**: PostgreSQL (Neon DB)
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

## 🐳 Local Development Setup (Docker)

We use Docker to ensure a consistent environment that matches production.

### Prerequisites
- Docker Desktop installed and running
- Git

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pushpalhedau/Conversive.git
   cd Conversive
   ```

2. **Configure Environment:**
   Ensure `.env.docker` is present in the root directory with your Neon Database URL.
   ```bash
   # Example .env.docker content
   DATABASE_URL=postgresql://neondb_owner:xxxxx@ep-steep-forest-adrokp4j-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

3. **Start the Application:**
   Run the following command to build and start the frontend and backend containers:
   ```bash
   docker-compose up -d --build
   ```

4. **Access the App:**
   - **Frontend**: `http://localhost:3000`
   - **Backend API**: `http://localhost:5000`

5. **Stop the Application:**
   ```bash
   docker-compose down
   ```

## � Environment Configuration

Since `.env` files are not committed to GitHub for security, you need to create them manually.

### 1. Root Directory (`.env.docker`)
Required for Docker Compose to connect to the database.
**File:** `./.env.docker`
```env
# Backend Configuration
DATABASE_URL=postgresql://neondb_owner:xxxxx@ep-steep-forest-adrokp4j-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
FLASK_ENV=development
SECRET_KEY=your-secret-key-here

# Admin Credentials (for seeding)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=changeme
```

### 2. Backend (`backend/.env`)
Required if running backend locally without Docker.
**File:** `./backend/.env`
```env
FLASK_APP=wsgi.py
FLASK_ENV=development
DATABASE_URL=postgresql://neondb_owner:xxxxx@ep-steep-forest-adrokp4j-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
SECRET_KEY=your-secret-key-here
```

### 3. Frontend (`frontend/.env`)
Required for the frontend to know where the API is.
**File:** `./frontend/.env`
```env
# For Docker/Local development
VITE_API_BASE_URL=http://localhost:5000/api

# For Production (Vercel)
# VITE_API_BASE_URL=https://your-backend.onrender.com/api
```

## �📡 API Endpoints


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

## 📦 Project Structure

```
/
├── backend/                 # Flask Backend
│   ├── app/
│   │   ├── api/             # API Routes (Auth, Products, Seed)
│   │   ├── models/          # Database Models (User, Product)
│   │   ├── services/        # Business Logic
│   │   ├── __init__.py      # App Factory
│   │   └── config.py        # Config Settings
│   ├── migrations/          # Database Migrations
│   ├── Dockerfile           # Backend Dockerfile
│   ├── requirements.txt     # Python Dependencies
│   ├── wsgi.py              # Entry Point
│   └── runtime.txt          # Python Version for Render
├── frontend/                # React Frontend
│   ├── src/
│   │   ├── app/             # Redux Store
│   │   ├── components/      # Reusable Components
│   │   ├── features/        # Feature Components (Admin, Products)
│   │   ├── services/        # API Services
│   │   ├── types/           # TypeScript Interfaces
│   │   ├── App.tsx          # Main App Component
│   │   └── main.tsx         # Entry Point
│   ├── Dockerfile           # Frontend Dockerfile
│   ├── nginx.conf           # Nginx Config for Docker
│   ├── package.json         # Node Dependencies
│   └── vite.config.ts       # Vite Config
├── docker-compose.yml       # Docker Compose Config
├── seed-database.html       # Database Management Tool
└── README.md                # Project Documentation
```

## 🚀 Live Demo

The project is deployed and available at:
**[https://conversive.vercel.app/](https://conversive.vercel.app/)**

> **Note:** If the link asks for "Local Network Access", please enable it from your browser settings. This depends on the browser you use and is a standard permission request.

## 🔒 Security Best Practices

- ✅ Environment variables for sensitive data
- ✅ Input validation with Marshmallow
- ✅ CORS configuration
- ✅ SQL injection prevention via ORM
- ✅ HTTPS enforced in production
- ✅ Structured error handling
