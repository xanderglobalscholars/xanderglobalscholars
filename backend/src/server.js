// Import core modules and dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

// Import route handlers
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const loanRoutes = require('./routes/loanRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const recruiterRoutes = require('./routes/recruiterRoutes');
const postGraduateRoutes = require('./routes/postGraduateRoutes');
const autoRoutes = require('./routes/autoRoutes'); // Ensure case matches the file name exactly

// Load environment variables
dotenv.config();

// Create an Express application
const app = express();

// Middleware for parsing JSON and security enhancements
app.use(express.json());
app.use(morgan('dev')); // Logs HTTP requests
app.use(helmet()); // Secures app by setting HTTP headers
app.use(cors()); // Enables cross-origin resource sharing

// Environment Variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'your-default-mongo-uri-here';

// Suppress mongoose warnings and set strictQuery to true
mongoose.set('strictQuery', true);

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit process if MongoDB connection fails
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
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Export app for testing
module.exports = app;
