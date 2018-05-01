// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');

const app = express();

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Catch all routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '8080';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`Angular Demo for Decision Manager running in port:${port}`));