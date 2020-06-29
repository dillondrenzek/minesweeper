import React from 'react';

export type CellValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'M';

export enum CellState {
  Uncovered,
  Covered,
  Flagged
}

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