import { suite, test } from '@testdeck/mocha';
import { expect } from 'chai';
import { mapIsEmpty, clone, prefixObjectKeys } from './object.util.js';

@suite
class ObjectUtilSpec {
    @test('should return true if object is empty')
    assert_objectIsEmpty() {
        let test;
        let value: any = 0;

        expect(mapIsEmpty(test)).to.be.true;
        expect(mapIsEmpty(value)).to.be.true;
        value = true;
        expect(mapIsEmpty(value)).to.be.true;
        value = '';
        expect(mapIsEmpty(value)).to.be.true;
        expect(mapIsEmpty({})).to.be.true;
        expect(mapIsEmpty({ a: null })).to.be.false;
        expect(mapIsEmpty({ a: {} })).to.be.false;
        expect(mapIsEmpty({ a: 'some' })).to.be.false;
        expect(mapIsEmpty({ a: 0 })).to.be.false;
        expect(mapIsEmpty({ a: 1 })).to.be.false;
    }

    @test('should clone data')
    assert_clone() {
        const data = { a: 1, b: 'test', c: { d: 2 } };
        const cloned = clone(data);
        expect(cloned).to.be.eql(data);
        expect(cloned).to.not.be.equal(data);
        expect(cloned.c).to.be.eql(data.c);
        expect(cloned.c).to.not.be.equal(data.c);

        // check if deep clone works
        let deepCloned = clone(data, 2);
        expect(deepCloned).to.be.eql(data);
        expect(deepCloned).to.not.be.equal(data);
        expect(deepCloned.c).to.be.eql(data.c);
        expect(deepCloned.c).to.not.be.equal(data.c);
        expect(deepCloned.c.d).to.be.equal(data.c.d);

        deepCloned = clone(data, 0);
        expect(deepCloned).to.be.eql(data);
        expect(deepCloned).to.not.be.equal(data);
        expect(deepCloned.c).to.be.equal(data.c);

        deepCloned = clone(data, 1);
        expect(deepCloned).to.be.eql(data);
        expect(deepCloned).to.not.be.equal(data);
        expect(deepCloned.c).not.to.be.equal(data.c);
    }

    @test('should prefix object keys')
    assert_prefixObjectKeys() {
        const data = { a: 1, b: 'test', c: { d: 2 } };
        const prefixed = prefixObjectKeys(data, '_');
        expect(prefixed).to.be.eql({ _a: 1, _b: 'test', _c: { d: 2 } });
    }
}
