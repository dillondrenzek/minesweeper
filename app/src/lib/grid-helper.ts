// A base class for building and interacting with a two-dimensional array
export class GridHelper<T> {

  constructor(private matrix: T[][]) {
    // if (!matrix) throw new Error('Cannot construct Grid with undefined constructor property.');
    // if (!matrix.length) throw new Error('Cannot construct Grid with no rows');
    // if (!Array.isArray(matrix[0])) throw new Error('Cannot construct Grid without two-dimensional array');
  }

  public get width() {
    return this.matrix[0].length;
  }

  public get height() {
    return this.matrix.length;
  }

  public get rows() {
    return this.matrix;
  }

  // @param { number } x
  // @param { number } y
  // @return { T }
  public get(x: number, y: number): T {
    if (x < 0 || y < 0 || this.matrix[y] == null || this.matrix[y][x] == null) {
      return null;
    }
    return this.matrix[y][x];
  }

  // @param { number } x
  // @param { number } y
  // @param { T } val
  public set(x: number, y: number, val: T) {
    if (x < 0 || y < 0 || !this.matrix[y]) {
      return;
    }
    this.matrix[y][x] = val;
  }

  public static build<T>(width: number, height: number, valueForCell: (x: number, y: number) => T) {
    let grid = [];
    for (let y = 0; y < height; y++) {
      let row = [];
      for (let x = 0; x < width; x++) {
        row.push(valueForCell(x, y));
      }
      grid.push(row);
    }
    return new GridHelper<T>(grid)
  }
}
