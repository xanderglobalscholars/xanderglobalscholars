const functions = require('firebase-functions');
const app = require('./server'); // Import your server logic from server.js

// Export the Express app as a Firebase function
exports.api = functions.https.onRequest(app);
