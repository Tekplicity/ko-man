'use strict';
var co = require('co');
var User = require('../api/user/user.model')


co(function*(){
    try{
        yield User
        .find({})
        .remove();
        console.log('Removed!')
    } catch(err){
        console.error('Error during seeding:', err);
    }
})
