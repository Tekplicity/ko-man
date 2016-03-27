// Koa Server Setup

// Koa Libraries
var bodyParser = require('koa-bodyparser');
var serve = require('koa-static');
var config = require('./environment');

// KOA Configs
module.exports = function(app){
    app.use(bodyParser());
    app.use(serve(config.root+'/client'));
}
