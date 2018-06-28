/**
 * Express configuration
 */

'use strict';

const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const config = require('./environment');
const morgan = require('morgan');
const errorHandler = require('errorhandler');
const path = require('path');
const express = require('express');
const app = express();
const env = process.env.NODE_ENV;

if ('production' === env) {
	app.use(express.static(path.join(config.root, 'client')));
	app.set('appPath', path.join(config.root, 'client'));
	app.use(morgan('dev'));
}

if ('development' === env || 'test' === env) {
	app.use(express.static(path.join(config.root, '.tmp')));
	app.use(express.static(path.join(config.root, 'client')));
	app.set('appPath', path.join(config.root, 'client'));
	app.use(morgan('dev'));
	app.use(errorHandler()); // Error handler - has to be last
}
app.set('views', config.root + '/server/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Expose app & express
module.exports =  {app,express}
