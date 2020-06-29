import { GridHelper } from './grid-helper';

describe('GridHelper', () => {

  describe('get', () => {
    it('returns the correct value', () => {
      const grid = new GridHelper([
        [1,2,3],
        [4,5,6]
      ]);
      expect(grid.get(0,0)).toBe(1);
      expect(grid.get(2,1)).toBe(6);
    });
  });

  describe('set', () => {
    it('sets the correct value', () => {
      const grid = new GridHelper([
        [0, 0, 0],
        [0, 0, 0]
      ]);

      grid.set(0, 0, 7);

      expect(grid.get(0, 0)).toBe(7);
    });
  });  
  
});