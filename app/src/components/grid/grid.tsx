import React, {useState} from 'react';
import { Cell, useCell } from '../cell/cell';

function buildGrid(width: number, height: number) {
  let grid = [];
  for (let y = 0; y < height; y++) {
    let row = [];
    for (let x = 0; x < width; x++) {
      row.push(useCell());
    }
    grid.push(row);
  }
  return grid;
}

export const useGrid = (width: number, height: number) => {
  return useState(buildGrid(width, height));
}

export interface GridProps {
  width: number;
  height: number;
}

export const Grid: React.FunctionComponent<GridProps> = (props) => {
  const { width, height } = props;

  const [grid] = useGrid(width, height);

  return (
    <div className='Grid'>
      {grid.map((row, i) => (
        <div className='row' key={i}>
          {row.map((cell, j) => (
            <Cell 
              value={cell.value}
              state={cell.state}
              onClick={null}
              onRightClick={cell.toggleFlag}
              key={j}
            />
          ))}
        </div>
      ))}
    </div>
  );
}