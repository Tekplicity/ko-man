'use strict';


var router = require('koa-router')();

var controller = require('./user.controller.js');
var auth = require('../../auth');

router.get('/', auth.isAuthenticated, controller.index);
router.post('/signup', controller.create);

module.exports = router;
