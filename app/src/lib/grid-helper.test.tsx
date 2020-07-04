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

  it('width', () => {
    const grid = new GridHelper([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]);

    expect(grid.width).toEqual(5);
  });

  it('height', () => {
    const grid = new GridHelper([
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ]);

    expect(grid.height).toEqual(3);
  });
  
  describe('merge', () => {
    it('throws an error if the two widths are different', () => {
      const a = GridHelper.build(3, 5, (x, y) => ({ x, y }));
      const b = GridHelper.build(2, 5, (x, y) => ({ a: x, b: y }));
      expect(() => { return GridHelper.merge(a, b); }).toThrow();
    });
    it('throws an error if the two heights are different', () => {
      const a = GridHelper.build(3, 4, (x, y) => ({ x, y }));
      const b = GridHelper.build(3, 5, (x, y) => ({ a: x, b: y }));
      expect(() => { return GridHelper.merge(a, b); }).toThrow();
    });
    it('result is same size', () => {
      const a = GridHelper.build(3, 5, (x, y) => ({ x, y }));
      const b = GridHelper.build(3, 5, (x, y) => ({ a: x, b: y }));
      expect(GridHelper.merge(a, b).width).toEqual(3);
      expect(GridHelper.merge(a, b).height).toEqual(5);
    });
    it('result cells have a merged type', () => {
      const a = GridHelper.build(3, 5, (x, y) => ({ x, y }));
      const b = GridHelper.build(3, 5, (x, y) => ({ a: x, b: y }));
      const result = GridHelper.merge(a, b);
      const subjectCell = result.get(0,0);
      expect(subjectCell.a).toBeDefined();
      expect(subjectCell.b).toBeDefined();
      expect(subjectCell.x).toBeDefined();
      expect(subjectCell.y).toBeDefined();
    });
  });
});