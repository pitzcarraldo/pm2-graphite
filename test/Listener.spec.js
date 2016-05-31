import { expect } from 'chai';
import Listener from '../src/Listener';

describe('Listener', () => {
  describe('constructor', () => {
    it(`should return new instance.`, () => {
      const listener = new Listener();
      expect(listener).not.to.be.undefined;
    });
  });
});
