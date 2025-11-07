# Online Auction & Bidding Web App
## Exercise 9: Login and User Registration

A full-stack web application demonstrating secure user authentication with **Node.js**, **Express**, **MongoDB**, **React**, **JWT**, and **bcrypt**.

---

## 🎯 Features

### Backend (Node.js + Express)
- ✅ User registration with validation
- ✅ User login with JWT authentication
- ✅ Password hashing with bcrypt
- ✅ Protected routes using JWT middleware
- ✅ MongoDB database with Mongoose ODM
- ✅ Input validation and error handling
- ✅ RESTful API design

### Frontend (React)
- ✅ Registration page with form validation
- ✅ Login page with error messages
- ✅ Protected dashboard page
- ✅ JWT token storage in localStorage
- ✅ Automatic redirect on authentication
- ✅ Responsive design with modern UI
- ✅ Real-time form validation

---

## 📁 Project Structure

```
WEB_TECH_EXP_9/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   └── authController.js     # Auth logic (register, login, getMe)
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification middleware
│   ├── models/
│   │   └── User.js               # User schema with password hashing
│   ├── routes/
│   │   └── authRoutes.js         # API routes
│   ├── .env                      # Environment variables
│   ├── .env.example              # Example env file
│   ├── package.json              # Backend dependencies
│   └── server.js                 # Express server entry point
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Register.js       # Registration page
│   │   │   ├── Login.js          # Login page
│   │   │   └── Dashboard.js      # Protected dashboard
│   │   ├── services/
│   │   │   └── api.js            # API service functions
│   │   ├── styles/
│   │   │   ├── Auth.css          # Auth pages styling
│   │   │   └── Dashboard.css     # Dashboard styling
│   │   ├── App.js                # Main app with routing
│   │   ├── App.css
│   │   ├── index.js              # React entry point
│   │   └── index.css
│   └── package.json              # Frontend dependencies
│
└── README.md                     # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (Local or Atlas) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn**

### Installation

#### 1️⃣ Install MongoDB (if running locally)

**Option A: Local MongoDB**
- Download and install MongoDB Community Edition
- Start MongoDB service:
  ```bash
  # On Linux
  sudo systemctl start mongod
  
  # On macOS (with Homebrew)
  brew services start mongodb-community
  
  # On Windows
  # MongoDB runs as a service automatically
  ```

**Option B: MongoDB Atlas (Cloud)**
- Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get connection string
- Update `MONGO_URI` in `.env` file

#### 2️⃣ Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (already provided, but you can modify)
# The .env file contains:
# - MONGO_URI (MongoDB connection string)
# - JWT_SECRET (Secret key for JWT)
# - PORT (Server port, default: 5000)

# Start backend server
npm run dev
```

You should see:
```
🚀 Server running in development mode on port 5000
📍 API available at http://localhost:5000
MongoDB Connected: localhost
```

#### 3️⃣ Setup Frontend

Open a **new terminal window**:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start React app
npm start
```

The app will automatically open at `http://localhost:3000`

---

## 🎮 How to Use

### 1. **Register New User**
- Navigate to `http://localhost:3000`
- You'll be redirected to the login page
- Click "Register here" link
- Fill in all fields:
  - Full Name
  - Email
  - Username (min 3 characters)
  - Password (min 6 characters)
  - Confirm Password
- Click "Register"
- On success, you'll be redirected to the dashboard

### 2. **Login**
- Go to login page
- Enter your username or email
- Enter your password
- Click "Login"
- On success, you'll be redirected to the dashboard

### 3. **Dashboard**
- View your profile information
- See welcome message with your name
- Check account statistics
- Click "Logout" to sign out

---

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api`

#### 1. Register User
```http
POST /auth/register
Content-Type: application/json

{
  "full_name": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "...",
    "full_name": "John Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "created_at": "2025-11-06T...",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 2. Login User
```http
POST /auth/login
Content-Type: application/json

{
  "identifier": "johndoe",  // or "john@example.com"
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "...",
    "full_name": "John Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 3. Get Current User (Protected)
```http
GET /auth/me
Authorization: Bearer <your-jwt-token>
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "full_name": "John Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "created_at": "2025-11-06T..."
  }
}
```

---

## 🔒 Security Features

1. **Password Hashing**: Passwords are hashed using bcrypt with salt rounds before storing
2. **JWT Authentication**: Secure token-based authentication with 30-day expiration
3. **Protected Routes**: Middleware verifies JWT tokens before granting access
4. **Input Validation**: All inputs are validated on both client and server
5. **Error Handling**: Proper error messages without exposing sensitive data

---

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT implementation
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling

---

## 📝 Configuration

### Environment Variables (`.env`)

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/auction_app
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=30d
```

**⚠️ Important:** Change `JWT_SECRET` to a strong random string in production!

---

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify `.env` file exists with correct values
- Make sure port 5000 is not in use

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check `API_URL` in `frontend/src/services/api.js`
- Check browser console for CORS errors

### Database connection error
- Verify MongoDB is running
- Check `MONGO_URI` in `.env`
- For Atlas, ensure IP whitelist includes your IP

---

## 📚 Learning Objectives

After completing this exercise, you will understand:

1. ✅ How to build a RESTful API with Node.js and Express
2. ✅ How to use MongoDB with Mongoose for data persistence
3. ✅ How to implement secure password hashing with bcrypt
4. ✅ How to create and verify JWT tokens for authentication
5. ✅ How to build protected routes with middleware
6. ✅ How to create a React application with routing
7. ✅ How to make API calls from React using axios
8. ✅ How to implement client-side form validation
9. ✅ How to manage authentication state in React
10. ✅ How to create a full-stack application architecture

---

## 🚀 Next Steps / Future Enhancements

- [ ] Email verification after registration
- [ ] Password reset functionality
- [ ] Remember me option
- [ ] Profile picture upload
- [ ] Account settings page
- [ ] Two-factor authentication
- [ ] Social media login (Google, Facebook)
- [ ] Role-based access control
- [ ] Auction listing features
- [ ] Bidding functionality

---

## 👨‍💻 Author

**Exercise 9 - Full Stack Web Technology**  
Online Auction and Bidding Web Application

---

## 📄 License

This project is created for educational purposes.

---

## 🙏 Acknowledgments

- MongoDB Documentation
- Express.js Guide
- React Documentation
- JWT.io
- bcrypt Documentation

---

**Happy Coding! 🎉**
