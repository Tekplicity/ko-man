'use strict';
// Other Libraries
var path = require('path');

// Koa Libraries
var bodyParser = require('koa-bodyparser');

var koa = require('koa');
var app = koa();

app.use(bodyParser());

var cartApi = require('./api/cart')

app.use(cartApi.routes())
app.use(cartApi.allowedMethods())





const ROOT_DIR = path.resolve(__dirname, '..');
console.log(ROOT_DIR)


var port = process.env.PORT || 3000;
app.listen(port);
