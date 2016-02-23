import { expect } from 'chai';
import PM2Monyt from '../src/index';

describe('PM2Monyt', () => {
  describe('constructor', () => {
    it(`should return new instance.`, () => {
      const pm2Monyt = new PM2Monyt();
      expect(pm2Monyt).not.to.be.undefined;
    });
  });
});
