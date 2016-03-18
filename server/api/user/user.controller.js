'use strict';
var auth = require('../../auth')
var controller = {};

controller.login = function *(next){
    console.log('Request', this.request.body)
    this.body ='Bearer ' + auth.signToken(123)
}

controller.list = function *(next){

    console.log('list()')
    yield delay(1000);
    this.body = 'delayed: ' + new Date();
    yield next;
}

function delay(time){
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });
}

module.exports = controller;
