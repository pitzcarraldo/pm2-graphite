import { expect } from 'chai';
import Graphite from '../src/Graphite';

describe('Graphite', () => {
  describe('constructor', () => {
    it(`should return new instance.`, () => {
      const graphite = new Graphite();
      expect(graphite).not.to.be.undefined;
    });
  });
});
