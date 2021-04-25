import React from 'react';
import { ICell } from '../../types/cell';
import { Cell } from '../cell/cell';

import './grid.scss';

export interface GridProps {
  grid: ICell[][];
  onClickCell?: (cellX: number, cellY: number) => void;
  onShiftClickCell?: (cellX: number, cellY: number) => void;
}

export const Grid: React.FunctionComponent<GridProps> = (props) => {
  const { grid } = props;

  const clickHandler = (cellX: number, cellY: number) => (ev: React.MouseEvent) => {
    const { onClickCell } = props;
    if (typeof onClickCell === 'function') {
      onClickCell(cellX, cellY);
    }
  }

  const shiftClickHandler = (cellX: number, cellY: number) => (ev: React.MouseEvent) => {
    const { onShiftClickCell } = props;
    if (typeof onShiftClickCell === 'function') {
      onShiftClickCell(cellX, cellY);
    }
  }

  return (
    <div className='Grid'>
      {grid.map((row, y) => (
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