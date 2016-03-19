'use strict';
// Other Libraries
var path = require('path');

// Koa Libraries
var bodyParser = require('koa-bodyparser');

var koa = require('koa');
var app = koa();

var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

app.use(bodyParser());

var userRoutes = require('./api/user')

app.use(userRoutes.routes())
app.use(userRoutes.allowedMethods())





const ROOT_DIR = path.resolve(__dirname, '..');
console.log(ROOT_DIR)


var port = process.env.PORT || 3000;
app.listen(port);
