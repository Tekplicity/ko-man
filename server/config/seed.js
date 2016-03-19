'use strict';

var User = require('../api/user/user.model')

User
.find({})
.remove(function(){
    console.log('Removed...')
});
