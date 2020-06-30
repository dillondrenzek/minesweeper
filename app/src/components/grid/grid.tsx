import React, { useState } from 'react';
import { Cell, ICell, CellState } from '../cell/cell';
import { GridHelper } from '../../lib/grid-helper';

import './grid.scss';

export interface GridProps {
  width: number;
  height: number;
  onClickCell?: (cellX: number, cellY: number) => void;
  onShiftClickCell?: (cellX: number, cellY: number) => void;
}

export const Grid: React.FunctionComponent<GridProps> = (props) => {
  const { width, height } = props;

  const [grid, setGrid] = useState<GridHelper<ICell>>(GridHelper.build(width, height, () => ({state: CellState.Covered, value: 0})));

  // const [grid] = useGrid(width, height);

  const clickHandler = (cellX: number, cellY: number) => (ev: React.MouseEvent) => {
    const { onClickCell } = props;
    const currentCell = grid.get(cellX, cellY);
    grid.set(cellX, cellY, {
      ...currentCell,
      state: CellState.Uncovered
    });
    setGrid(new GridHelper(grid.rows));

    if (typeof onClickCell === 'function') {
      onClickCell(cellX, cellY);
    }
  }

  const shiftClickHandler = (cellX: number, cellY: number) => (ev: React.MouseEvent) => {
    const { onShiftClickCell } = props;
    const currentCell = grid.get(cellX, cellY);
    grid.set(cellX, cellY, {
      ...currentCell,
      state: (currentCell.state === CellState.Covered) 
        ? CellState.Flagged 
        : (currentCell.state === CellState.Flagged) 
          ? CellState.Covered 
          : currentCell.state
    });
    setGrid(new GridHelper(grid.rows));

    if (typeof onShiftClickCell === 'function') {
      onShiftClickCell(cellX, cellY);
    }
  }

  return (
    <div className='Grid'>
      {grid.rows.map((row, y) => (
        <div className='row' key={y}>
          {row.map((cell, x) => (
            <Cell 
              value={cell.value}
              state={cell.state}
              onClick={clickHandler(x, y)}
              onShiftClick={shiftClickHandler(x, y)}
              key={x}
            />
          ))}
        </div>
      ))}
    </div>
  );
}