
import { ICell, CellValue } from '../components/cell/cell';
import { GridHelper } from './grid-helper';

export const buildCellValues = (width: number, height: number, mines: number[][]): GridHelper<CellValue> => {

  let values: GridHelper<CellValue> = GridHelper.build(width, height, () => 0);

  mines.forEach((mineCoords) => {
    const mineX = mineCoords[0];
    const mineY = mineCoords[1];
    values.set(mineX, mineY, 'M');

    for (let deltaX = -1; deltaX <= 1; deltaX++) {
      for (let deltaY = -1; deltaY <= 1; deltaY++) {
        if (deltaX !== 0 || deltaY !== 0) {
          const x = mineX + deltaX;
          const y = mineY + deltaY;
          const value = values.get(x, y);
          if (typeof value === 'number') {
            values.set(x, y, value + 1);
          }
        }
      }
    }
  });

  return values;
}

export const buildGame = (width: number, height: number, mines: number[][]) => {


}