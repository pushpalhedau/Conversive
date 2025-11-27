# Admin Credentials Setup

## Setting Up Admin Users

Admin credentials are now managed through environment variables for better security.

### Backend Setup

1. **Copy the example environment file:**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Edit the `.env` file and set your admin credentials:**
   ```bash
   # Primary admin user
   ADMIN_USERNAME=your_username
   ADMIN_PASSWORD=your_secure_password

   # Optional: Additional admin user
   ADMIN_USERNAME_2=second_admin
   ADMIN_PASSWORD_2=another_secure_password
   ```

3. **Run the seed script to create admin users:**
   ```bash
   python seed.py
   ```

### Important Security Notes

⚠️ **Never commit your `.env` file to version control!**
- The `.env` file is already in `.gitignore`
- Only commit `.env.example` with placeholder values

✅ **Password Security:**
- Passwords are hashed using secure algorithms before storage
- Never store plain text passwords in the database
- Use strong passwords with a mix of uppercase, lowercase, numbers, and symbols

### Default Credentials (Development Only)

If you don't set environment variables, the system will use these defaults:
- Username: `admin`
- Password: `changeme`

**⚠️ IMPORTANT:** Change these immediately in production!

### Production Deployment

For production environments:

1. Set environment variables through your hosting platform (Render, Heroku, etc.)
2. Use strong, unique passwords
3. Consider implementing:
   - Password change functionality
   - Two-factor authentication
   - Account lockout after failed attempts
   - Password expiration policies

### Troubleshooting

**Issue:** Can't log in after changing credentials
- Make sure you've run `python seed.py` after updating `.env`
- Check that your `.env` file is in the `backend` directory
- Verify there are no typos in your environment variable names

**Issue:** Credentials not loading
- Ensure the `.env` file is properly formatted (no quotes needed)
- Restart your Flask application after changing `.env`
- Check that `python-dotenv` is installed: `pip install python-dotenv`
