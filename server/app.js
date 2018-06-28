/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = require('./config/environment');

const { app, express } = require('./config/express');

require('./routes')( app, express );

const server = require('http').createServer(app);

// Start server
server.listen(config.port, config.ip,  () => {
	console.log(`Server running at http://${config.ip}:${config.port}/`);
});
module.exports = server