const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const server = require("./server");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use the server (assuming you export an Express app from server.js)
app.use("/api", server);

// Export Firebase Function
exports.api = functions.https.onRequest(app);
