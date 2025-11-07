#!/bin/bash

# Installation Script for Exercise 9
# Online Auction and Bidding Web App

echo "================================================"
echo "🚀 Exercise 9 - Installation Script"
echo "Online Auction & Bidding Web App"
echo "================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Check if MongoDB is installed
if command -v mongod &> /dev/null
then
    echo "✅ MongoDB is installed"
else
    echo "⚠️  MongoDB is not installed locally"
    echo "You can either:"
    echo "  1. Install MongoDB locally, or"
    echo "  2. Use MongoDB Atlas (cloud)"
fi
echo ""

# Install Backend Dependencies
echo "================================================"
echo "📦 Installing Backend Dependencies..."
echo "================================================"
cd backend
npm install
if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed successfully!"
else
    echo "❌ Backend installation failed!"
    exit 1
fi
echo ""

# Install Frontend Dependencies
echo "================================================"
echo "📦 Installing Frontend Dependencies..."
echo "================================================"
cd ../frontend
npm install
if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed successfully!"
else
    echo "❌ Frontend installation failed!"
    exit 1
fi
echo ""

cd ..

echo "================================================"
echo "✅ Installation Complete!"
echo "================================================"
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Start MongoDB (if using local):"
echo "   sudo systemctl start mongod  # Linux"
echo "   brew services start mongodb-community  # macOS"
echo ""
echo "2. Start Backend (in one terminal):"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "3. Start Frontend (in another terminal):"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "4. Open browser at: http://localhost:3000"
echo ""
echo "📚 Read README.md for detailed documentation"
echo "⚡ Read QUICK_START.md for quick setup guide"
echo ""
echo "Happy Coding! 🎉"
