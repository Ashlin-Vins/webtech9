# Backend - Online Auction App

Backend server for the Online Auction and Bidding Web Application.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   - The `.env` file is already created
   - Modify `MONGO_URI` if using MongoDB Atlas
   - Change `JWT_SECRET` for production

3. **Start server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

## Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `cors` - Enable CORS
- `dotenv` - Environment variables
- `express-validator` - Input validation
- `nodemon` (dev) - Auto-reload server

## API Routes

### Authentication Routes (`/api/auth`)

- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user (protected)

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   └── authController.js  # Authentication logic
├── middleware/
│   └── authMiddleware.js  # JWT verification
├── models/
│   └── User.js            # User schema
├── routes/
│   └── authRoutes.js      # API routes
├── .env                   # Environment variables
└── server.js              # Server entry point
```

## Environment Variables

Create a `.env` file (already provided):

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/auction_app
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=30d
```

## Testing API with curl

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Test User",
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "testuser",
    "password": "password123"
  }'
```

### Get User (replace TOKEN with actual token)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

## Security Notes

- Passwords are hashed using bcrypt (10 salt rounds)
- JWT tokens expire in 30 days
- Protected routes require valid JWT token
- User passwords are never returned in responses
- Change JWT_SECRET in production!

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check MONGO_URI in .env
- For local: `sudo systemctl start mongod` (Linux)
- For Atlas: Check connection string and IP whitelist

**Port Already in Use:**
- Change PORT in .env file
- Or kill process using port 5000:
  ```bash
  # Linux/Mac
  lsof -ti:5000 | xargs kill -9
  
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```
