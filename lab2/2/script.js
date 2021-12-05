"use strict";

var global_sum = 0;
var expect = chai.expect;
var input;

while(input = window.prompt("Input data:")) {
    alert("\t"+cyfry(input)+"\t"+litery(input)+"\t"+suma(input));
}

function sum(x,y){
    return x + y;
}

describe("The sum() function",function(){
    it("Returns 4 for 2+2",function(){
        expect(sum(2,2)).to.equal(4)
    });
    it("Returns 0 for -2+2",function(){
        expect(sum(-2,2)).to.equal(0)
    });
});

function suma(napis) {
    var parsed = parseInt(napis, 10);
    if(!isNaN(parsed)) {
        global_sum += parseInt(napis, 10);
    }
    return global_sum;
}

function cyfry(napis) {
    var sum = 0;
    var digit;
    for(var i = 0; i < napis.length; i++) {
        digit = parseInt(napis.charAt(i))
        if(!isNaN(digit)) {
            sum += digit;
        }
    }
    return sum;
}

function litery(napis) {
    napis = napis.replace(/[^a-zA-Z]+/g, '');
    return napis.length;
}

describe("The cyfry() function", function() {
    it('Returns 15 for "12345"', function() {
        expect(cyfry("12345")).to.equal(15)
    });
    it('Returns 0 for "asdf"', function() {
        expect(cyfry("asdf")).to.equal(0)
    });
    it('Returns 15 for "asdf12345"', function() {
        expect(cyfry("asdf12345")).to.equal(15)
    });
    it('Returns 15 for "12345asdf"', function() {
        expect(cyfry("12345asdf")).to.equal(15)
    });
    it('Returns 0 for ""', function() {
        expect(cyfry("")).to.equal(0)
    });
});

describe("The litery() function", function() {
    it('Returns 0 for "12345"', function() {
        expect(litery("12345")).to.equal(0)
    });
    it('Returns 4 for "asdf"', function() {
        expect(litery("asdf")).to.equal(4)
    });
    it('Returns 4 for "asdf12345"', function() {
        expect(litery("asdf12345")).to.equal(4)
    });
    it('Returns 4 for "1234asdf"', function() {
        expect(litery("12345asdf")).to.equal(4)
    });
    it('Returns 0 for ""', function() {
        expect(litery("")).to.equal(0)
    });
});

describe("The suma() function", function() {
    it('Returns 12345 + global_sum calculated to this point for "12345"',function(){
        var t=12345+global_sum;
        expect(suma("12345")).to.equal(t)
    });
    it('Returns global_sum calculated to this point for "asdf"', function() {
        var t=global_sum;
        expect(suma("asdf")).to.equal(t)
    });
    it('Returns global_sum calculated to this point for "asdf12345"', function() {
        var t=global_sum;
        expect(suma("asdf12345")).to.equal(t)
    });
    it('Returns 12345 + global_sum calculated to this point for "12345asdf"', function() {
        var t=global_sum+12345;
        expect(suma("12345asdf")).to.equal(t)
    });
    it('Returns global_sum calculated to this point for ""', function() {
        var t=global_sum;
        expect(suma("")).to.equal(t)
    });
});