// THIS MUST BE THE VERY FIRST LINE
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const aiRoutes = require('./routes/aiRoutes');

// Import routes
const authRoutes = require('./routes/authRoutes');
const siteRoutes = require('./routes/siteRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Import middleware
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

// Rate limiting ONLY for auth routes (prevent brute force)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // 50 requests per 15 minutes
  message: {
    success: false,
    error: 'Too many authentication attempts, please try again later.'
  },
  skipSuccessfulRequests: true,
});

// Apply auth rate limiter only to auth routes
app.use('/api/auth', authLimiter);

// NO RATE LIMITING FOR MAP/SITES ENDPOINTS!
// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Cultural Heritage API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use(errorHandler);

// Check if MONGODB_URI is defined
if (!process.env.MONGODB_URI) {
  console.error('ERROR: MONGODB_URI is not defined in .env file');
  console.log('Using default: mongodb://localhost:27017/cultural-heritage');
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cultural-heritage';

// Database connection
const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB at:', MONGODB_URI);
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});