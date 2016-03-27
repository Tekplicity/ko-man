'use strict';
var auth = require('../../auth');
var User = require('./user.model');

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
exports.index = function *(next){
    try {
        let users = yield User.find({}, '-salt -hashedPassword');
        this.body = users;
    } catch (err) {
            console.log('create index:', err)
        this.throw(500, err);
    }
    yield next;
}

/**
* Creates a new user
*/
exports.create = function *(next){
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
        console.log('create error', err)
        this.throw(422, err);
    }
};




function delay(time){
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });
}
