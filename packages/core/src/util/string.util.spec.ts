import { suite, test } from '@testdeck/mocha';
import { expect } from 'chai';
import {
    boolFromString,
    capitalize,
    deCapitalize,
    numberOfMatches,
    pluralize,
    stringIsEmpty,
    stripString,
} from './string.util.js';

@suite
class StringUtilSpec {
    @test('should return true if string is empty or no string')
    assert_stringIsEmpty() {
        let test;
        let value: any = 0;

        expect(stringIsEmpty(test)).to.be.true;
        expect(stringIsEmpty(value)).to.be.true;
        value = true;
        expect(stringIsEmpty(value)).to.be.true;
        expect(stringIsEmpty('')).to.be.true;
        expect(stringIsEmpty(' '.trim())).to.be.true;
        expect(stringIsEmpty(' ')).to.be.false;
        expect(stringIsEmpty('test')).to.be.false;
    }

    @test('should capitalize first letter of string')
    assert_capitalize() {
        expect(capitalize('')).to.be.equal('');
        expect(capitalize(' ')).to.be.equal(' ');
        expect(capitalize('test')).to.be.equal('Test');
        expect(capitalize('Test')).to.be.equal('Test');
        expect(capitalize('TEST')).to.be.equal('TEST');
    }

    @test('should de-capitalize first letter of string')
    assert_deCapitalize() {
        expect(deCapitalize('')).to.be.equal('');
        expect(deCapitalize(' ')).to.be.equal(' ');
        expect(deCapitalize('test')).to.be.equal('test');
        expect(deCapitalize('Test')).to.be.equal('test');
        expect(deCapitalize('TEST')).to.be.equal('tEST');
    }

    @test('should return plural of string')
    assert_pluralize() {
        expect(pluralize('')).to.be.equal('');
        expect(pluralize(' ')).to.be.equal(' ');
        expect(pluralize('test')).to.be.equal('tests');
        expect(pluralize('Test')).to.be.equal('Tests');
        expect(pluralize('TEST')).to.be.equal('TESTs');

        expect(pluralize('test')).to.be.equal('tests');
        expect(pluralize('index')).to.be.equal('indexes');
        expect(pluralize('house')).to.be.equal('houses');
        expect(pluralize('entity')).to.be.equal('entities');
    }

    @test('should strip any not allowed char from a string')
    assert_stripString() {
        // not case-sensitive
        expect(stripString('test', 't')).to.be.equal('tt');
        expect(stripString('test', 'e')).to.be.equal('e');
        expect(stripString('test', ['s', 't'])).to.be.equal('tst');
        // case-sensitive
        expect(stripString('Test', 't', true)).to.be.equal('t');
        expect(stripString('Test', 'E', true)).to.be.equal('');
        expect(stripString('Test', ['s', 't'], true)).to.be.equal('st');
    }

    @test('should return number of matches in a string')
    assert_numberOfMatches() {
        expect(numberOfMatches('test', 't')).to.be.equal(2);
        expect(numberOfMatches('Test', 't', true)).to.be.equal(1);
        expect(numberOfMatches('test', 'e')).to.be.equal(1);
        expect(numberOfMatches('test', 's')).to.be.equal(1);
        expect(numberOfMatches('test', 'z')).to.be.equal(0);

        expect(numberOfMatches('this is my world', /is/g)).to.be.equal(2);
        expect(numberOfMatches('this is my world', /is/gi)).to.be.equal(2);
        expect(numberOfMatches('this is my world', /my/g)).to.be.equal(1);
        expect(numberOfMatches('this is my world', /\s/g)).to.be.equal(3);
        expect(numberOfMatches('this Is my world', /is/g)).to.be.equal(1);

        expect(numberOfMatches('this is my world', 'is', true)).to.be.equal(2);
        expect(numberOfMatches('this is my world', 'is', false)).to.be.equal(2);
        expect(numberOfMatches('this is my world', 'is')).to.be.equal(2);
        expect(numberOfMatches('this is my world', 'my', true)).to.be.equal(1);
        expect(numberOfMatches('this is my world', ' ', true)).to.be.equal(3);
        expect(numberOfMatches('this is my world', ' ', false)).to.be.equal(3);
        expect(numberOfMatches('this Is my world', 'is', true)).to.be.equal(1);
    }

    @test('should return boolean from string')
    assert_boolFromString() {
        expect(boolFromString('true')).to.be.true;
        expect(boolFromString('false')).to.be.false;
        expect(boolFromString('True')).to.be.true;
        expect(boolFromString('False')).to.be.false;
        expect(boolFromString('TRUE')).to.be.true;
        expect(boolFromString('FALSE')).to.be.false;
        expect(boolFromString('yes')).to.be.true;
        expect(boolFromString('Yes')).to.be.true;
        expect(boolFromString('YES')).to.be.true;
        expect(boolFromString('no')).to.be.false;
        expect(boolFromString('No')).to.be.false;
        expect(boolFromString('NO')).to.be.false;
        expect(boolFromString('1')).to.be.true;
        expect(boolFromString('0')).to.be.false;
        expect(boolFromString('')).to.be.undefined;
        expect(boolFromString('test')).to.be.undefined;
    }
}
