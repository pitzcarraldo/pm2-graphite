import { expect } from 'chai';
import Metrics from '../src/Metrics';

describe('Metrics', () => {
  describe('constructor', () => {
    it(`should return new instance.`, () => {
      const metrics = new Metrics();
      expect(metrics).not.to.be.undefined;
    });
  });
});
