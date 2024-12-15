// Import core modules and dependencies
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const admin = require("firebase-admin");

// Import route handlers
const authRoutes = require("./routes/authRoutes");
const autoRoutes = require("./routes/autoRoutes");
const loanRoutes = require("./routes/loanRoutes");
const postgradServiceRoutes = require("./routes/postgradServiceRoutes");
const recruiterRoutes = require("./routes/recruiterRoutes");
const scholarshipRoutes = require("./routes/scholarshipRoutes");
const studentRoutes = require("./routes/studentRoutes");
const universityRoutes = require("./routes/universityRoutes");
const userRoutes = require("./routes/userRoutes");

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ["PORT", "MONGO_URI", "FIREBASE_ADMIN_SDK"];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`❌ Missing environment variable: ${varName}`);
    process.exit(1);
  }
});

// Initialize Firebase Admin SDK
const serviceAccount = require(process.env.FIREBASE_ADMIN_SDK);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Create an Express application
const app = express();

// Middleware for JSON parsing and security
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Middleware to decode Firebase tokens
const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing or invalid" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized access" });
  }
};

// Database Connection
mongoose.set("strictQuery", true);
const connectWithRetry = () => {
  mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB connected"))
    .catch(() => setTimeout(connectWithRetry, 5000));
};
connectWithRetry();

// Default route for server status
app.get("/", (req, res) => {
  res.json({ message: "🚀 Server is running!" });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/auto", autoRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/postgraduate-services", authenticateUser, postgradServiceRoutes);
app.use("/api/recruiters", recruiterRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/students", authenticateUser, studentRoutes);
app.use("/api/universities", universityRoutes);
app.use("/api/users", userRoutes);

// GraphQL endpoint
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

// 404 error handling
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Centralized error handling
app.use((err, req, res) => {
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});

// Export app for testing
module.exports = app;
