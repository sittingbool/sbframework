import { suite, test } from '@testdeck/mocha';
import { envVariable, sleep } from './index.js';
import { expect } from 'chai';

@suite
class IndexTests {
    @test('should halt an sync process for a given time')
    async assert_sleep() {
        const before = Date.now();
        await sleep(100);
        const after = Date.now();
        expect(after - before).to.be.greaterThan(99);
        expect(after - before).to.be.lessThan(103);
    }

    @test('should parse environment variable into correct type and value')
    assert_envVariable() {
        Object.assign(process.env, { TEST: 'true', NUM_TEST: '42', FLOAT_TEST: '3.14', SOME_STRING: 'test' });
        expect(envVariable('TEST', false, 'boolean')).to.be.true;
        expect(envVariable('NUM_TEST', 0, 'int')).to.be.equal(42);
        expect(envVariable('FLOAT_TEST', 0, 'float')).to.be.equal(3.14);
        expect(envVariable('SOME_STRING', 'default')).to.be.equal('test');
        expect(envVariable('NON_EXISTING', 'default')).to.be.equal('default');
    }
}
