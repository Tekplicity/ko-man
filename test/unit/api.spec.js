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
    it('should get user', user);
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

    var re = new RegExp('Bearer');
    var results = re.exec(result.body)
    expect(result.statusCode).to.be(200);
    expect(results).to.be.an(Array);

    access_token = result.body;
}

/**
* Test retreving from car
*/
function *getCart(){
    var result = yield request.get('http://localhost:3000/v1/', {
        headers: {
            'Authorization': access_token
        }
    });
    console.log(result.body)
    expect(result.statusCode).to.be(200)
}
