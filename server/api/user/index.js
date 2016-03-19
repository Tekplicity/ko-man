'use strict';


var router = require('koa-router')();

var controller = require('./user.controller.js');
var auth = require('../../auth');

router.get('/v1/', auth.isAuthenticated, controller.index);
router.post('/v1/signup', controller.create);

module.exports = router;
