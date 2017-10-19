const {Grid, CellState, MINE, seedMatrix} = require('../Grid');
const {Coords} = require('../Coords');


describe('Grid', function() {
  let grid, matrix;

  beforeEach(function() {
    matrix = [[0,0],[0,0],[0,0]];
    grid = new Grid(matrix);
  });

  describe('is constructed with a two-dimensional array of same-length rows', function() {
    it('should have a width equal to the length of a row', function() {
      expect(grid.width).toEqual(matrix[0].length);
    });
    it('should have a height equal to the length of the array of rows', function() {
      expect(grid.height).toEqual(matrix.length);
    });
  });

  describe('can get the value of a cell', function() {
    beforeEach(function() {
      matrix = [
        [1,2],
        [3,4],
        [5,6]
      ];
      grid = new Grid(matrix);
    });
    describe('given an (x, y) within the bounds of the grid', function() {
      it('should return the correct value', function() {
        for(let y = 0; y < matrix.length; y++) {
          for(let x = 0; x < matrix[y].length; x++) {
            expect(grid.get(x, y)).toEqual(matrix[y][x]);
          }
        }
      });
    });
    describe('given an (x, y) outside the bounds of the grid', function() {
      it('should throw an error', function() {
        expect(() => grid.get(x, y)).toThrow();
      });
    });
  });

  describe('can set the value of a cell', function() {
    let inb_x, inb_y;
    let oob_x, oob_y;
    let value;
    beforeEach(function() {
      matrix = [
        [1,2],
        [3,4],
        [5,6]
      ];
      inb_x = 1, inb_y = 2;
      oob_x = 70, oob_y = 70;
      grid = new Grid(matrix);
    });
    describe('given an (x, y) within the bounds of the grid', function() {
      beforeEach(function() {
        // set value
        value = 99;
        grid.set(inb_x, inb_y, value);
      });
      it('should set the value of the cell at (x, y) to the given value', function() {
        expect(grid.get(inb_x, inb_y)).toEqual(value);
      });
    });
    describe('given an (x, y) outside the bounds of the grid', function() {
      it('should throw an error', function() {
        // set value
        value = 99;
        expect(() => grid.set(oob_x, oob_y, value)).toThrow();
      });
    });
  });

  describe('can be output as a string', function() {

    describe('when not provided an item separator or row separator', function() {
      let rowSeparator = '\n';
      let itemSeparator = ' ';
      let result, result_values;

      beforeEach(function() {
        result = grid.toString();
        result_values = result
          .split(rowSeparator)
          .map((row_str) => row_str.split(itemSeparator));
      });

      it('should separate the rows with a new-line character', function() {
        let rows = result_values;
        expect(rows.length).toEqual(grid.height);
      });
      it('should separate the items with a space', function() {
        // for each row of output string
        result_values.forEach((row) => {
          // expect the number of items separated by the `itemSeparator` to equal the width of the grid
          expect(row.length).toEqual(grid.width);
        });
      });
    });

    describe('when provided an item separator and row separator', function() {
      let rowSeparator = '\n';
      let itemSeparator = ' ';
      let result, result_values;

      beforeEach(function() {
        result = grid.toString(rowSeparator, itemSeparator);
        result_values = result.split(rowSeparator).map((row_str) => row_str.split(itemSeparator));
      });

      it('should separate the rows with the row separator', function() {
        let rows = result_values;
        expect(rows.length).toEqual(grid.height);
      });
      it('should separate the items with the item separator', function() {
        // for each row of output string
        result_values.forEach((row) => {
          // expect the number of items separated by the `itemSeparator` to equal the width of the grid
          expect(row.length).toEqual(grid.width);
        });
      });
      it('should output the correct values', function() {
        // for each row of output string
        result_values.forEach((row) => {
          // for each item in the row
          row.forEach((item) => {
            // expect the items value to equal the value at the given grid coordinate
            let expected = grid.get(row.indexOf(item), result_values.indexOf(row));
            expect(item).toEqual(expected.toString());
          });
        });
      });
    });
  });

  xdescribe('can be mapped to another grid', function() {
    describe('given a function', function() {
      xit('should return a new grid', function() {

      });
      xit('should return a grid with the same width', function() {

      });
      xit('should return a grid with the same height', function() {

      });
      xit('should return a grid with the correct values', function() {

      });
    });
  });
});





xdescribe('Grid', () => {

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

  });
});
