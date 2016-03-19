'use strict';
// Other Libraries
var path = require('path');

// Koa Libraries
var bodyParser = require('koa-bodyparser');

var koa = require('koa');


var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { console.log('seeding...'); require('./config/seed'); }

// The app
var app = koa();

// KOA Configs
app.use(bodyParser());

// Routes
var userRoutes = require('./api/user')

app.use(userRoutes.routes())
app.use(userRoutes.allowedMethods())

//const ROOT_DIR = path.resolve(__dirname, '..');

app.listen(config.port);
