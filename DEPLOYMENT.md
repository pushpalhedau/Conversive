# Deployment Guide

## Backend Deployment to Render

### Step 1: Prepare Your Repository
1. Push your code to GitHub
2. Ensure `backend/requirements.txt` is up to date
3. Ensure `backend/wsgi.py` exists

### Step 2: Create Render Web Service
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `stock-management-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn wsgi:app`

### Step 3: Set Environment Variables
Add the following environment variables in Render:

```
FLASK_ENV=production
SECRET_KEY=<generate-a-secure-random-key>
DATABASE_URL=<your-mysql-connection-string>
```

**To generate a secure SECRET_KEY:**
```python
import secrets
print(secrets.token_hex(32))
```

### Step 4: Database Setup (MySQL)
1. Create a MySQL database on Render or use an external provider
2. Copy the connection string
3. Update `DATABASE_URL` environment variable
4. The format should be: `mysql+pymysql://user:password@host:port/database`

### Step 5: Run Migrations
After deployment, run migrations via Render Shell:
```bash
flask db upgrade
python seed.py  # Optional: seed initial data
```

### Step 6: Verify Deployment
- Visit your Render URL: `https://your-app.onrender.com/health`
- Should return: `{"status": "ok"}`

---

## Frontend Deployment to Vercel

### Step 1: Prepare Your Repository
1. Ensure `frontend/.env.example` exists
2. Ensure `frontend/vite.config.ts` is properly configured

### Step 2: Import to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Set Environment Variables
Add the following environment variable:

```
VITE_API_BASE_URL=https://your-backend.onrender.com/api
```

Replace `your-backend.onrender.com` with your actual Render backend URL.

### Step 4: Deploy
1. Click **Deploy**
2. Wait for the build to complete
3. Vercel will provide you with a deployment URL

### Step 5: Verify Deployment
- Visit your Vercel URL
- The app should load and connect to your backend
- Test CRUD operations

---

## Post-Deployment Checklist

### Backend
- [ ] Health check endpoint working
- [ ] Database migrations applied
- [ ] CORS configured for frontend domain
- [ ] Environment variables set correctly
- [ ] SSL/HTTPS enabled (automatic on Render)

### Frontend
- [ ] App loads without errors
- [ ] API calls working
- [ ] Environment variables set
- [ ] Build optimized for production
- [ ] SSL/HTTPS enabled (automatic on Vercel)

### Testing
- [ ] Create a product
- [ ] Update a product
- [ ] Delete a product
- [ ] View restock alerts
- [ ] Manual restock override

---

## Troubleshooting

### Backend Issues

**Problem**: Database connection fails
- **Solution**: Verify `DATABASE_URL` format and credentials
- Check if database server is accessible from Render

**Problem**: Migrations fail
- **Solution**: Run `flask db upgrade` manually via Render Shell
- Check migration files for errors

**Problem**: CORS errors
- **Solution**: Update CORS configuration in `backend/app/__init__.py`
```python
cors.init_app(app, origins=['https://your-frontend.vercel.app'])
```

### Frontend Issues

**Problem**: API calls fail
- **Solution**: Verify `VITE_API_BASE_URL` is set correctly
- Check browser console for CORS errors
- Ensure backend is running

**Problem**: Build fails
- **Solution**: Check for TypeScript errors
- Run `npm run build` locally to debug
- Verify all dependencies are in `package.json`

---

## Continuous Deployment

Both Render and Vercel support automatic deployments:

- **Render**: Automatically deploys when you push to `main` branch
- **Vercel**: Automatically deploys on every push (production for `main`, preview for other branches)

To disable auto-deploy, configure in respective platform settings.

---

## Monitoring & Logs

### Render
- View logs: Dashboard → Your Service → Logs
- Monitor metrics: Dashboard → Your Service → Metrics

### Vercel
- View logs: Dashboard → Your Project → Deployments → View Function Logs
- Monitor analytics: Dashboard → Your Project → Analytics

---

## Scaling

### Backend (Render)
- Upgrade to paid plan for:
  - More instances
  - Better performance
  - Custom domains
  - Background workers

### Frontend (Vercel)
- Free tier is generous for most use cases
- Upgrade for:
  - More bandwidth
  - Analytics
  - Team collaboration

---

## Security Recommendations

1. **Never commit `.env` files** - Use `.env.example` as template
2. **Rotate secrets regularly** - Update `SECRET_KEY` periodically
3. **Use strong database passwords**
4. **Enable 2FA** on Render and Vercel accounts
5. **Monitor access logs** for suspicious activity
6. **Keep dependencies updated** - Run `pip list --outdated` and `npm outdated`

---

## Support

For issues:
- Backend: Check Render logs
- Frontend: Check Vercel deployment logs
- Database: Check database provider logs

For questions, refer to:
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
