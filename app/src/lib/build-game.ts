
import { ICell, CellValue } from '../components/cell/cell';
import { GridHelper } from './grid-helper';

export const buildCellValues = (width: number, height: number, mines: number[][]): GridHelper<CellValue> => {

  let values: GridHelper<CellValue> = GridHelper.build(width, height, () => 0);

  mines.forEach((mineCoords) => {
    values.set(mineCoords[0], mineCoords[1], 'M');

    // if X is greater than 0
    if (mineCoords[0] > 0) {
      
    } 
  });


  return values;
}

export const buildGame = (width: number, height: number, mines: number[][]) => {


}