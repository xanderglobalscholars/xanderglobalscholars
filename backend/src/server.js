// Import core modules and dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Import route handlers
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const loanRoutes = require('./routes/loanRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const recruiterRoutes = require('./routes/recruiterRoutes');
const postGraduateRoutes = require('./routes/postGraduateRoutes');
const autoRoutes = require('./routes/autoroutes'); // Ensure case matches the file name exactly

// Load environment variables
dotenv.config();

// Validate required environment variables
if (!process.env.PORT || !process.env.MONGO_URI) {
  console.error('❌ Missing required environment variables');
  process.exit(1);
}

// Create an Express application
const app = express();

// Middleware for parsing JSON and security enhancements
app.use(express.json());
app.use(morgan('dev')); // Logs HTTP requests
app.use(helmet()); // Secures app by setting HTTP headers
app.use(cors()); // Enables cross-origin resource sharing

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

// Environment Variables
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Suppress mongoose warnings and set strictQuery to true
mongoose.set('strictQuery', true);

// Function to connect to MongoDB with retries
const connectWithRetry = () => {
  console.log('🕒 Attempting MongoDB connection...');
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
      console.error('❌ MongoDB connection failed. Retrying in 5 seconds...', err);
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    });
};
connectWithRetry();

// MongoDB connection event handlers
mongoose.connection.on('disconnected', () => {
  console.error('❌ MongoDB disconnected!');
});
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB reconnected');
});

// Default Route
app.get('/', (req, res) => {
  res.send('🚀 Xander Global Scholars Server is running!');
});

// API Routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/students', studentRoutes); // Student routes
app.use('/api/loans', loanRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/recruiters', recruiterRoutes);
app.use('/api/postgraduate', postGraduateRoutes);
app.use('/api/auto', autoRoutes); // Auto routes

// 404 Error Handling
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(`❌ [${new Date().toISOString()}] Error:`, err.message);
  console.error(err.stack); // Log stack trace for debugging
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Graceful Shutdown
process.on('SIGINT', () => {
  console.log('🔄 Gracefully shutting down...');
  mongoose.connection.close(() => {
    console.log('🛑 MongoDB connection closed.');
    process.exit(0);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Export app for testing
module.exports = app;
