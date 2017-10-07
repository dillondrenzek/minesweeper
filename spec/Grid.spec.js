const {Grid, CellState, MINE, calculateCellValues, seedMatrix} = require('../Grid');
const {Coords} = require('../Coords');


describe('Grid', () => {

  let width, height, mines, grid;

  beforeEach(() => {
    width = 3;
    height = 3;
    mines = [new Coords(0,0), new Coords(0,1), new Coords(2,2)];
    grid = new Grid(width, height, mines);
  });

  describe('initialized with a width, height, and array of coordinate locations for mines', () => {

    describe('should have a size equal to (m x n)', () => {
      let wd, ht;

      beforeEach(() => {
        wd = grid.size.width;
        ht = grid.size.height;
      });
      it('with the correct width', () => {
        expect(wd).toEqual(width);
      });
      it('with the correct height', () => {
        expect(ht).toEqual(height);
      });
    });

    it('should have the correct number of mines', () => {
      expect(grid.mines.length).toEqual(mines.length);
    });

    it('should place mines properly', () => {
      mines.forEach((mine_coords) => {
        expect(grid.isCellMine(mine_coords)).toBe(true);
      });
    });

    it('should initialize state of all cells to covered', () => {
      for(let i = 0; i < width; i++) {
        for(let j = 0; j < height; j++) {
          expect(grid.getCellState({x: i, y: j})).toBeDefined();
        }
      }
    });

    it('should calculate a CellValue for each cell', () => {
      for(let i = 0; i < width; i++) {
        for(let j = 0; j < height; j++) {
          expect(grid.getCellValue({x: i, y: j})).toBeDefined();
        }
      }
    });

  });


  describe('toString()', () => {
    let rowSeparator = '\n';
    let itemSeparator = ' ';
    let result, result_values;
    beforeEach(() => {
      result = grid.toString();
      result_values = result.split(rowSeparator).map((row_str) => row_str.split(itemSeparator));
    });

    it('should output each row separated by a new-line character', () => {
      // expect length array returned when split result string by '\n' to equal height of grid
      expect(result_values.length).toEqual(grid.size.height);
    });

    it('should output each item in a row separated by a space', () => {
      // for each row of output string
      result_values.forEach((row) => {
        // expect the number of items separated by the `itemSeparator` to equal the width of the grid
        expect(row.length).toEqual(grid.size.width);
      });
    });

    it('should output the correct items in their respective coordinates', () => {
      // for each row of output string
      result_values.forEach((row) => {
        // for each item in the row
        row.forEach((item) => {
          let c = new Coords(row.indexOf(item), result_values.indexOf(row));
          // expect the items value to equal the value at the given grid coordinate
          let expected = grid.getCellValue(c);
          expect(item).toEqual(expected.toString());
        });
      });
    });
  });
});



describe('calculateCellValues()', () => {

  let values;
  let grid;

  describe('should not throw when updating edge cells', () => {
    let size = {width: 3, height: 3};

    it('x less than 0', () => {
      expect(() => calculateCellValues(size, [new Coords(0,1)])).not.toThrow();
    });
    it('x greather than width of grid', () => {
      expect(() => calculateCellValues(size, [new Coords(size.width-1, 1)])).not.toThrow();
    });
    it('y less than 0', () => {
      expect(() => calculateCellValues(size, [new Coords(1,0)])).not.toThrow();
    });
    it('y greather than height of grid', () => {
      expect(() => calculateCellValues(size, [new Coords(1, size.height-1)])).not.toThrow();
    });
  });



  describe('should increment the cells adjacent to mine', () => {
    let size = {width: 3, height: 3};
    let expected, result;

    beforeEach(() => {
      expected = [
        [MINE, 2, 0],
        [MINE, 3, 1],
        [1, 2, MINE]
      ];
      result = calculateCellValues(size, [
        new Coords(0,0), new Coords(0,1), new Coords(2,2)]);
    });

    it('by 1', () => {
      for (let i = 0; i < expected.length; i++) {
        let row = expected[i];
        for (let j = 0; i < row.length; i++) {
          expect(result[i][j]).toEqual(expected[i][j]);
        }
      }
    });
  });

});
