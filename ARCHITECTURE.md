# Stock Management System Architecture

## Executive Summary
This document outlines the architecture for a production-ready Stock Management System designed for e-commerce. The system utilizes a **Flask (Python)** backend with **MySQL** for robust data management and a **React (TypeScript)** frontend for a responsive user interface. Deployment is targeted for **Render** (backend) and **Vercel** (frontend), ensuring scalable and cost-effective hosting. The architecture emphasizes clean separation of concerns, type safety, and automated CI/CD pipelines to maintain high code quality and reliability.

## 1. System Overview

The system follows a standard **Client-Server** architecture:

*   **Frontend**: Single Page Application (SPA) built with React, communicating with the backend via REST APIs.
*   **Backend**: RESTful API built with Flask, managing business logic and database interactions.
*   **Database**: MySQL relational database for persistent storage.
*   **Infrastructure**: Dockerized services for local development; PaaS deployment for production.

```mermaid
graph TD
    User[User] -->|HTTPS| CDN[Vercel CDN]
    CDN -->|Serve Static Assets| FE[React Frontend]
    FE -->|REST API / JSON| LB[Render Load Balancer]
    LB -->|HTTP| BE[Flask Backend (Gunicorn)]
    BE -->|SQL| DB[(MySQL Database)]
    
    subgraph "Local Development"
        Docker[Docker Compose]
        Docker --> LocalBE[Flask App]
        Docker --> LocalDB[MySQL]
        Docker --> PMA[phpMyAdmin]
    end
```

## 2. Component Breakdown

### 2.1 Backend (`/backend`)
*   **Framework**: Flask (Python 3.11+)
*   **WSGI Server**: Gunicorn
*   **Database ORM**: SQLAlchemy
*   **Migrations**: Flask-Migrate (Alembic)
*   **Validation**: Marshmallow
*   **Driver**: PyMySQL
*   **Responsibilities**:
    *   REST API endpoints for Product management.
    *   Business logic for stock calculation (`need_restock`).
    *   Data validation and serialization.
    *   Database connection management.

### 2.2 Frontend (`/frontend`)
*   **Framework**: React (Vite)
*   **Language**: TypeScript
*   **State Management**: Redux Toolkit + RTK Query
*   **Styling**: Tailwind CSS
*   **Routing**: React Router
*   **Responsibilities**:
    *   User Interface for listing and managing products.
    *   Client-side state management and caching.
    *   API integration.

### 2.3 Infrastructure & CI/CD
*   **Local Dev**: `docker-compose.yml` orchestrating Backend, MySQL, and phpMyAdmin.
*   **Production**:
    *   **Backend**: Render Web Service (Python/Docker environment).
    *   **Frontend**: Vercel (Static Site Generation / SPA).
    *   **Database**: Managed MySQL (e.g., on Render or external provider).
*   **CI/CD**: GitHub Actions.
    *   `backend-ci.yml`: Lint (flake8, black, isort, mypy) & Test (pytest).
    *   `frontend-ci.yml`: Lint (eslint, prettier) & Test (vitest).

## 3. Directory Structure

```text
/
├── backend/
│   ├── app/
│   │   ├── __init__.py          # App factory
│   │   ├── extensions.py        # DB, Migrate, Marshmallow init
│   │   ├── models/              # SQLAlchemy models
│   │   │   └── product.py
│   │   ├── schemas/             # Marshmallow schemas
│   │   │   └── product.py
│   │   ├── api/                 # Blueprints/Routes
│   │   │   └── products.py
│   │   └── services/            # Business logic
│   │       └── stock_service.py
│   ├── tests/                   # Pytest tests
│   ├── migrations/              # Alembic migrations
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── wsgi.py                  # Entry point
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   └── store.ts         # Redux store
│   │   ├── features/
│   │   │   └── products/        # Product slices & components
│   │   ├── components/          # Shared UI components
│   │   ├── services/            # RTK Query API definitions
│   │   ├── types/               # TypeScript interfaces
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── vite.config.ts
├── docker-compose.yml
├── README.md
└── .github/
    └── workflows/
        ├── backend.yml
        └── frontend.yml
```

## 4. Database Schema

### Product Table
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | INT | PK, Auto-increment | Unique identifier |
| `name` | VARCHAR(255) | Unique, Not Null | Product name |
| `description` | TEXT | Nullable | Product description |
| `price` | DECIMAL(10, 2) | Not Null | Unit price |
| `total_quantity` | INT | Not Null | Total stock count |
| `available_quantity` | INT | Not Null | Currently available stock |
| `need_restock` | BOOLEAN | Default False | Flag for restock alert |

**DDL:**
```sql
CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    total_quantity INT NOT NULL,
    available_quantity INT NOT NULL,
    need_restock BOOLEAN DEFAULT FALSE
);
```

## 5. API Specification

Base URL: `/api`

| Method | Endpoint | Description | Request Body | Response |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/products` | Create a product | `ProductSchema` | `ProductSchema` |
| `GET` | `/products` | List all products | - | `List[ProductSchema]` |
| `GET` | `/products/{id}` | Get product details | - | `ProductSchema` |
| `PUT` | `/products/{id}` | Update product | `ProductSchema` | `ProductSchema` |
| `DELETE` | `/products/{id}` | Delete product | - | `204 No Content` |
| `GET` | `/restock/list` | List items needing restock | - | `List[ProductSchema]` |
| `PUT` | `/restock/update/{id}` | Manual override restock | `{"need_restock": bool}` | `ProductSchema` |
| `GET` | `/health` | Health check | - | `{"status": "ok"}` |

## 6. Deployment & Configuration

### Environment Variables
**Backend (`.env`):**
*   `FLASK_APP=wsgi.py`
*   `FLASK_ENV=production`
*   `DATABASE_URL=mysql+pymysql://user:pass@host:3306/dbname`
*   `SECRET_KEY=your-secret-key`

**Frontend (`.env`):**
*   `VITE_API_BASE_URL=https://your-backend-app.onrender.com/api`

### Deployment Steps
1.  **Backend (Render)**:
    *   Connect GitHub repo.
    *   Select `backend` directory.
    *   Runtime: Python 3.
    *   Build Command: `pip install -r requirements.txt`.
    *   Start Command: `gunicorn wsgi:app`.
    *   Add Environment Variables.
2.  **Frontend (Vercel)**:
    *   Connect GitHub repo.
    *   Select `frontend` directory.
    *   Framework Preset: Vite.
    *   Build Command: `npm run build`.
    *   Output Directory: `dist`.
    *   Add `VITE_API_BASE_URL`.

## 7. Security & Best Practices
1.  **Secrets Management**: Never commit `.env` files. Use environment variables.
2.  **Input Validation**: Strict validation using Marshmallow schemas on all write operations.
3.  **CORS**: Configure Flask-CORS to allow requests only from the Vercel domain.
4.  **SQL Injection**: Use SQLAlchemy ORM to prevent raw SQL injection.
5.  **Error Handling**: Global error handlers to return consistent JSON error responses.
6.  **Logging**: Structured JSON logging for production observability.
7.  **HTTPS**: Enforced by Render and Vercel automatically.
8.  **Dependencies**: Pin versions in `requirements.txt` and `package.json`.
