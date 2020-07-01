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
    it('returns null if the coords are out of bounds', () => {
      const grid = new GridHelper([
        [1, 2, 3],
        [4, 5, 6]
      ]);
      const testCoordsInBounds = (x: number, y: number) => {
        expect(jest.fn(() => grid.get(x, y))).not.toThrow();
        expect(grid.get(x, y)).toEqual(null);
      };
      
      testCoordsInBounds(-1, 0);
      testCoordsInBounds(0, -1);
      testCoordsInBounds(-1, -1);
      testCoordsInBounds(10, 0);
      testCoordsInBounds(0, 10);
      testCoordsInBounds(10, 10);
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
    it('does not throw when setting a value out of bounds', () => {
      const grid = new GridHelper([
        [1, 2, 3],
        [4, 5, 6]
      ]);
      const testCoordsInBounds = (x: number, y: number) => {
        expect(jest.fn(() => grid.set(x, y, 3))).not.toThrow();
      };
      testCoordsInBounds(-1, 0);
      testCoordsInBounds(0, -1);
      testCoordsInBounds(-1, -1);
      testCoordsInBounds(0, 10);
      testCoordsInBounds(10, 0);
      testCoordsInBounds(10, 10);
    });
  });  

  describe('width', () => {
    const grid = new GridHelper([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]);

    expect(grid.width).toEqual(5);
  });

  describe('height', () => {
    const grid = new GridHelper([
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ]);

    expect(grid.height).toEqual(3);
  });
  
});