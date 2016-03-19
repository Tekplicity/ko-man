'use strict';
var auth = require('../../auth');
var User = require('./user.model');
var controller = {};

var validationError = function(res, err) {
    return res.json(422, err);
};

// controller.login = function *(next){
//     console.log('Request', this.request.body)
//     this.body ='Bearer ' + auth.signToken(123)
// }

/**
 * Get list of users
 * restriction: 'admin'
 */
// exports.index = function *(next) {
//   User.find({}, '-salt -hashedPassword', function (err, users) {
//     if(err) return this.request.send(500, err);
//     this.body = users;
//   });
// };

/**
* Creates a new user
*/
controller.create = function *(next) {
    console.log('Request', this.request.body)
    var newUser = new User(this.request.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    try {
        var user =  yield newUser.save();
        console.log('newUser', user);
        var token = auth.signToken(user._id);
        this.body = { token: token };
    } catch (err) {
        this.throw(422, err);
    }
};


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
