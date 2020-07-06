import { GridHelper } from './grid-helper';
import { ICell, CellState } from '../types/cell';

export type GameHelper = GridHelper<ICell>;

export function uncover(helper: GameHelper, cellX: number, cellY: number) {

}

export function setCellState(helper: GameHelper, cellX: number, cellY: number, state: CellState) {
  
}