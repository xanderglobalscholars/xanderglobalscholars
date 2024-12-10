const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const schema = require('./graphql/schema');

const app = express();
app.use(cors());

// Get the port from the environment, default to 5000 if not set
const PORT = process.env.PORT || 5000;

// Mongoose Deprecation Fix
mongoose.set('strictQuery', false);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit process on failure to connect to DB
  });

// GraphQL Endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// Start the server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
});

// Graceful shutdown
const shutdown = () => {
  console.log('🔌 Shutting down server gracefully...');
  server.close(() => {
    console.log('✅ Server has been shut down.');
    mongoose.connection.close(() => {
      console.log('✅ MongoDB connection closed.');
      process.exit(0); // Exit the process cleanly
    });
  });
};

// Listen for termination signals and gracefully shutdown the server
process.on('SIGINT', shutdown); // For Ctrl+C
process.on('SIGTERM', shutdown); // For Heroku or cloud-based environments
