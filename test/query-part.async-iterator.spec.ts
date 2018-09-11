import { expect } from 'chai';
import 'mocha';
import { orders, products } from './fixture';
import '..';

import chai = require('chai');
import chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Query part async iterator tests', () => {

    it('should filter the array', async function() {
        let i = 0;
        for await (let order of orders.asQueryable().where(o => o.id > 3)) {
            expect(order.id).to.equal(4 + i);
            expect(order.no).to.equal('Ord' + (4 + i));
    
            i++;
        }
    });
});