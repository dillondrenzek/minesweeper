
import { ICell, CellValue, CellState, MINE } from '../types/cell';
import { GridHelper } from './grid-helper';

export const generateMines = (amount: number, width: number, height: number): number[][] => {
  if (amount > (width * height) - 1) {
    throw new Error('Cannot generate more mines that width times height');
  }

  let minesMap: { [key: number]: number[] } = {};
  let generatedMines = 0;
  
  // Generate Mines
  while (generatedMines < amount) {
    let x = Math.floor(Math.random() * width);
    let y = Math.floor(Math.random() * height);

    if (!Array.isArray(minesMap[x])) {
      minesMap[x] = [];
    }

    if (minesMap[x].indexOf(y) === -1) {
      minesMap[x].push(y);
      generatedMines++;
    }
  }

  // Reduce Maps
  let mines: number[][] = [];

  Object.keys(minesMap).forEach((keyX: string) => {
    const x = parseInt(keyX);
    minesMap[x].forEach((y) => {
      mines.push([x, y]);
    });
  });

  return mines;
}

export const buildCellValues = (width: number, height: number, mines: number[][]): GridHelper<{ value: CellValue }> => {

  let values: GridHelper<{ value: CellValue }> = GridHelper.build(width, height, () => ({ value: 0 }));
  
  mines.forEach((mineCoords) => {
    const mineX = mineCoords[0];
    const mineY = mineCoords[1];
    values.set(mineX, mineY, { value: MINE });
    
    for (let deltaX = -1; deltaX <= 1; deltaX++) {
      for (let deltaY = -1; deltaY <= 1; deltaY++) {
        if (deltaX !== 0 || deltaY !== 0) {
          const x = mineX + deltaX;
          const y = mineY + deltaY;
          const cell = values.get(x, y);
          if (typeof cell?.value === 'number') {
            values.set(x, y, { value: cell.value + 1 });
          }
        }
      }
    }
  });

  return values;
}

export const buildGame = (width: number, height: number, mines: number[][]): GridHelper<ICell> => {
  const cellStates = GridHelper.build(width, height, (x, y) => ({ state: CellState.Covered }));
  const cellValues = buildCellValues(width, height, mines);
  return GridHelper.merge(cellStates, cellValues);
}