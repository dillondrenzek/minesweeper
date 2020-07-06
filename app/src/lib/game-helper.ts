import { GridHelper } from './grid-helper';
import { ICell, CellState } from '../types/cell';
import { Cell } from '../components/cell/cell';

export type GameHelper = GridHelper<ICell>;

export function uncover(helper: GameHelper, cellX: number, cellY: number) {

  
  const targetCell = helper.get(cellX, cellY);
  
  if (!targetCell) {
    return;
  }
  
  // set target cell uncovered
  helper.set(cellX, cellY, { ...targetCell, state: CellState.Uncovered });

  if (targetCell.value || targetCell.state === CellState.Uncovered) {
    return;
  }

  // 
  uncover(helper, cellX - 1, cellY - 1);
  uncover(helper, cellX, cellY - 1);
  uncover(helper, cellX + 1, cellY - 1);
  uncover(helper, cellX - 1, cellY + 1);
  uncover(helper, cellX, cellY + 1);
  uncover(helper, cellX + 1, cellY + 1);
  uncover(helper, cellX - 1, cellY);
  uncover(helper, cellX + 1, cellY);

}