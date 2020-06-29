import React, { useState } from 'react';

export type CellValue = number;

export enum CellState {
  Uncovered,
  Covered,
  Flagged
}

export const useCell = () => {
  const [cellState, setCellState] = useState<CellState>(CellState.Uncovered);
  const [cellValue, setCellValue] = useState<CellValue>(0);

  return {
    state: cellState,
    value: cellValue,
    incrementValue: () => {
      
    }
  }
};


export interface CellProps {
  onClick: () => void;
  onRightClick: () => void;
  state: CellState;
  value: CellValue;
}

export const Cell: React.FunctionComponent<CellProps> = (props) => {
  const { onClick, onRightClick, state, value } = props;

  const handleClick = () => {
    if (typeof onClick === 'function') {
      onClick();
    }
  };
  const handleRightClick = () => {
    if (typeof onRightClick === 'function') {
      onRightClick();
    }
  };

  return (
    <div onClick={handleClick} onContextMenu={handleRightClick}>
      {state === CellState.Uncovered ? (
        <div>{value}</div>
      ) : null}
    </div>
  );
}