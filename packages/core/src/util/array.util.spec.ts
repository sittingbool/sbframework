import { suite, test } from '@testdeck/mocha';
import { expect } from 'chai';
import { arrayIsEmpty, ArrayItemSame, compareArrays, filterAsync, findClosestValueTo } from './array.util.js';

@suite
class ArrayUtilTests {
    @test('should find empty array or not an array')
    assert_arrayIsEmpty() {
        let test;
        let value: any = 0;

        expect(arrayIsEmpty(test)).to.be.true;
        expect(arrayIsEmpty(value)).to.be.true;
        value = true;
        expect(arrayIsEmpty(value)).to.be.true;
        value = {};
        expect(arrayIsEmpty(value)).to.be.true;
        expect(arrayIsEmpty([])).to.be.true;
        expect(arrayIsEmpty([null])).to.be.false;
        expect(arrayIsEmpty([{}])).to.be.false;
    }

    @test('should correctly compare two arrays, all changes, default comparison')
    assert_compareArrays() {
        const result = compareArrays(
            [{ a: 1 }, { b: 2 }, 2, 3, 'test1', 'test2', 'test3'],
            [{ a: 3 }, { b: 2 }, 2, 3, 4, 'test1', 'test2'],
        );
        expect(JSON.stringify(result.same)).to.be.eql(JSON.stringify([{ b: 2 }, 2, 3, 'test1', 'test2']));
        expect(result.changed.length).to.be.equal(0);
        expect(result.onlyInLeft.length).to.be.equal(2);
        expect(JSON.stringify(result.onlyInLeft)).to.be.eql(JSON.stringify([{ a: 1 }, 'test3']));
        expect(result.onlyInRight.length).to.be.equal(2);
        expect(JSON.stringify(result.onlyInRight)).to.be.eql(JSON.stringify([{ a: 3 }, 4]));
    }

    @test('should correctly compare two arrays, all changes, custom comparison')
    assert_compareArraysByComparator() {
        const comparator: ArrayItemSame = (left, right) => {
            switch (typeof left) {
                case 'object':
                    if (!left || !right) {
                        return left === right;
                    }
                    const key = Object.keys(left)[0];
                    return left[key] !== undefined && right[key] !== undefined;
                default:
                    return left === right;
            }
        };
        const result = compareArrays(
            [{ a: 1 }, { b: 2 }, 2, 3, 'test1', 'test2', 'test3'],
            [{ a: 3 }, { b: 2 }, 2, 3, 4, 'test1', 'test2'],
            comparator,
        );
        expect(JSON.stringify(result.same)).to.be.eql(JSON.stringify([{ b: 2 }, 2, 3, 'test1', 'test2']));
        expect(result.changed.length).to.be.equal(1);
        expect(JSON.stringify(result.changed)).to.be.eql(JSON.stringify([{ a: 1 }]));
        expect(result.onlyInLeft.length).to.be.equal(1);
        expect(JSON.stringify(result.onlyInLeft)).to.be.eql(JSON.stringify(['test3']));
        expect(result.onlyInRight.length).to.be.equal(1);
        expect(JSON.stringify(result.onlyInRight)).to.be.eql(JSON.stringify([4]));
    }

    @test('should correctly filter an array with an async method')
    async assert_filterAsync() {
        const isNotFive = (val: number): Promise<boolean> => {
            return Promise.resolve(val !== 5);
        };

        let array = [1, 2, 3, 4, 5];
        let result = await filterAsync(array, (i) => isNotFive(i));
        expect(JSON.stringify(result)).to.be.eql(JSON.stringify([1, 2, 3, 4]));

        array = [5, 10, 15, 20, 25, 30, 35];
        result = await filterAsync(array, (i) => isNotFive(i));
        expect(JSON.stringify(result)).to.be.eql(JSON.stringify([10, 15, 20, 25, 30, 35]));
    }

    @test('should find closest value to given number')
    assert_findClosestValueTo() {
        expect(findClosestValueTo(5, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).to.be.equal(5);
        expect(findClosestValueTo(5, [1, 2, 3, 4, 6, 7, 8, 9, 10])).to.be.equal(4);
        expect(findClosestValueTo(5, [1, 2, 3, 6, 7, 8, 9, 10])).to.be.equal(6);

        expect(findClosestValueTo(4, [6, 4.4, 5, 100, 20])).to.be.equal(4.4);
    }
}
