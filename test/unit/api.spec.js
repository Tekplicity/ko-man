'use strict';
var config = require('../../server/config/environment')

var expect = require('expect.js');
var request = require("co-request");
var mocha = require('mocha')
var coMocha = require('co-mocha')
coMocha(mocha);// Monkey patching mocha

var access_token;

// Revealing Pattern for Mocha test

// ---------------------------------
// Test Interface
// ---------------------------------
describe('API', function(){
    it('should signup user', signup);
    it('should get user', getUser);
    it('should fail if signing up using the same user', badSignup);
})

// ---------------------------------
// Test Definition
// ---------------------------------

/**
* Test authentication
*/
function *signup(){
    let result = yield request({
        method: 'POST',
        url: 'http://localhost:'+config.port+'/api/user/signup',
        body: {
            name: 'Alex',
            password: 'Password!',
            email: 'test@alexgian.com'
        },
        json: true
    });

    expect(result.statusCode).to.be(200);
    expect(result.body.token).to.be.a('string');

    access_token = result.body.token;
}

/**
* Test authentication
*/
function *badSignup(){
    let result = yield request({
        method: 'POST',
        url: 'http://localhost:'+config.port+'/api/user/signup',
        body: {
            name: 'Alex',
            password: 'Password!',
            email: 'test@alexgian.com',
            some:'thing'
        },
        json: true
    });

    expect(result.statusCode).to.be(422);
    expect(result.body.token).to.be(undefined);

    access_token = result.body.token;
}

/**
* Test retreving from car
*/
function *getUser(){
    let result = yield request.get('http://localhost:'+config.port+'/api/user/', {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    });
    console.log(result.body)
    expect(result.statusCode).to.be(200)
}
