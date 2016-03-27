'use strict';
// Other Libraries
var path = require('path');
var koa = require('koa');


var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { console.log('seeding...'); require('./config/seed'); }

// The app
var app = koa();

require('./config/server')(app);
require('./routes')(app);

app.listen(config.port);
