# Frontend - Online Auction App

React frontend for the Online Auction and Bidding Web Application.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

3. **Build for production:**
   ```bash
   npm run build
   ```

## Dependencies

- `react` - UI library
- `react-dom` - React DOM renderer
- `react-router-dom` - Client-side routing
- `axios` - HTTP client
- `react-scripts` - React development tools

## Project Structure

```
frontend/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── pages/
│   │   ├── Register.js     # Registration page
│   │   ├── Login.js        # Login page
│   │   └── Dashboard.js    # Dashboard (protected)
│   ├── services/
│   │   └── api.js          # API service functions
│   ├── styles/
│   │   ├── Auth.css        # Auth pages styling
│   │   └── Dashboard.css   # Dashboard styling
│   ├── App.js              # Main app component
│   ├── App.css
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
└── package.json
```

## Pages

### 1. Register (`/register`)
- New user registration
- Form validation
- Fields: Full Name, Email, Username, Password, Confirm Password

### 2. Login (`/login`)
- User authentication
- Can login with username or email
- Form validation

### 3. Dashboard (`/dashboard`)
- Protected route (requires authentication)
- Displays user profile information
- Shows account statistics
- Logout functionality

## API Configuration

Backend API URL is configured in `src/services/api.js`:

```javascript
const API_URL = 'http://localhost:5000/api';
```

Change this if your backend runs on a different port or domain.

## Authentication Flow

1. User registers/logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token sent with protected requests
5. Automatic redirect if not authenticated

## Local Storage

The app stores two items:
- `token` - JWT authentication token
- `user` - Basic user information (name, email, username)

## Form Validation

### Registration
- Full name: Required
- Email: Required, valid format
- Username: Required, min 3 characters
- Password: Required, min 6 characters
- Confirm Password: Must match password

### Login
- Username/Email: Required
- Password: Required

## Styling

- Modern gradient design
- Responsive layout
- Smooth animations
- Mobile-friendly
- Uses pure CSS (no framework)

## Available Scripts

### `npm start`
Runs the app in development mode at `http://localhost:3000`

### `npm run build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner (if tests are added)

## Troubleshooting

**Cannot connect to backend:**
- Ensure backend is running on port 5000
- Check `API_URL` in `src/services/api.js`
- Check browser console for errors

**CORS errors:**
- Backend must have CORS enabled (already configured)
- Check backend is running

**Token expired:**
- Tokens expire after 30 days
- Logout and login again

**Page not found:**
- All unknown routes redirect to login
- Check React Router configuration in `App.js`

## Features

✅ Client-side routing with React Router  
✅ Form validation with error messages  
✅ JWT token management  
✅ Protected routes  
✅ Automatic redirects  
✅ Responsive design  
✅ Loading states  
✅ Error handling  
✅ Clean, modern UI  

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Profile editing
- Password change
- Profile picture upload
- Remember me checkbox
- Better error handling
- Toast notifications
- Loading skeletons
