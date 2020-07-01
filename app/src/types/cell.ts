export type CellValue = number | 'M';
export const MINE: CellValue = 'M';

export enum CellState {
  Uncovered = 'uncovered',
  Covered = 'covered',
  Flagged = 'flagged'
}

export interface ICell {
  state: CellState;
  value: CellValue;
}