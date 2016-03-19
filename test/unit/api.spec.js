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
    it('should authenticate', authentication);
    it('should get user', getUser);
})

// ---------------------------------
// Test Definition
// ---------------------------------

/**
* Test authentication
*/
function *authentication(){
    let result = yield request({
        method: 'POST',
        url: 'http://localhost:'+config.port+'/v1/signup',
        body: {
            name: 'Alex',
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
    let result = yield request.get('http://localhost:'+config.port+'/v1/', {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    });
    console.log(result.body)
    expect(result.statusCode).to.be(200)
}