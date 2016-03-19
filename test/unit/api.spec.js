'use strict';
var expect = require('expect.js');
let request = require("co-request");
let mocha = require('mocha')
let coMocha = require('co-mocha')
coMocha(mocha);// Monkey patching mocha



var access_token;

// Revealing Pattern for Mocha test

// ---------------------------------
// Interface
// ---------------------------------
describe('API', function(){
    it('should authenticate', authentication);
    it('should get user', getUser);
})

// ---------------------------------
// Definition
// ---------------------------------

/**
* Test authentication
*/
function *authentication(){
    var result = yield request({
        method: 'POST',
        url: 'http://localhost:3000/v1/login',
        body: {
            username: 'Alex',
            password: 'Password!'
        },
        json: true
    });

    expect(result.statusCode).to.be(200);
    expect(result.body.token).to.be.a('string');

    access_token = result.body.token;
}

/**
* Test retreving from car
*/
function *getUser(){
    var result = yield request.get('http://localhost:3000/v1/', {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    });
    console.log(result.body)
    expect(result.statusCode).to.be(200)
}
