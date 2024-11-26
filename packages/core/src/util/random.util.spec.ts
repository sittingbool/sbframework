import { suite, test } from '@testdeck/mocha';
import { expect } from 'chai';
import { randomFromArray, randomNumberForRange, randomString } from './random.util.js';

const RANDOMIZE_CHARSET_DEFAULT = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

@suite
class RandomUtilSpec {
    @test('should generate random string')
    assert_randomString() {
        let allChars = RANDOMIZE_CHARSET_DEFAULT.split('');
        let random = randomString(10);
        expect(random).to.be.a('string');
        expect(random.length).to.be.equal(10);
        expect(random.split('').filter((char) => allChars.indexOf(char) < 0).length).to.be.lessThan(1);

        random = randomString(23);
        expect(random).to.be.a('string');
        expect(random.length).to.be.equal(23);
        expect(random.split('').filter((char) => allChars.indexOf(char) < 0).length).to.be.lessThan(1);

        let allCharsAllowed = 'lkjhdfas!98';
        allChars = allCharsAllowed.split('');
        random = randomString(50, allCharsAllowed);
        expect(random).to.be.a('string');
        expect(random.length).to.be.equal(50);
        expect(random.split('').filter((char) => allChars.indexOf(char) < 0).length).to.be.lessThan(1);
    }

    @test('should generate random number for range')
    assert_randomNumberForRange() {
        let random = randomNumberForRange(1, 1);
        expect(random).to.be.equal(1);

        random = randomNumberForRange(1, 2);
        expect(random).to.be.lessThan(3);
        expect(random).to.be.greaterThan(0);

        random = randomNumberForRange(1, 10);
        expect(random).to.be.lessThan(11);
        expect(random).to.be.greaterThan(0);

        random = randomNumberForRange(10, 100);
        expect(random).to.be.lessThan(101);
        expect(random).to.be.greaterThan(9);
    }

    @test('should get random element from a given array')
    assert_randomFromArray() {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const random = randomFromArray(array);
        expect(array.indexOf(random)).to.be.greaterThan(-1);
    }
}
