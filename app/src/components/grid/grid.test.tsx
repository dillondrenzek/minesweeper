import React from 'react';
import { render, RenderResult, fireEvent } from '@testing-library/react';
import { Grid } from './grid';

describe('Grid', () => {
  let result: RenderResult;

  afterEach(() => {
    result.unmount();
    result = null;
  });

  it('renders the correct amount of Cells', () => {
    result = render(<Grid width={10} height={15} />);

    const rows = result.container.querySelectorAll('.row');
    expect(rows.length).toBe(15);
    rows.forEach((row) => {
      expect(row.childElementCount).toEqual(10);
    });
  });

  it('emits a click event', () => {
    const clickHandler = jest.fn();
    result = render(<Grid width={10} height={15} onClickCell={clickHandler}/>);
    const rows = result.container.querySelectorAll('.row');
    const subjectRow = rows[4];
    const subjectCell = subjectRow.querySelectorAll('.Cell')[6];

    fireEvent.click(subjectCell);

    expect(clickHandler).toBeCalledWith(6, 4);
  });

  it('does not throw if a click handler is not provided', () => {
    result = render(<Grid width={10} height={15} />);
    const rows = result.container.querySelectorAll('.row');
    const subjectRow = rows[4];
    const subjectCell = subjectRow.querySelectorAll('.Cell')[6];

    expect(() => fireEvent.click(subjectCell)).not.toThrow();
  });

  it('emits a shift-click event', () => {
    const shiftClickHandler = jest.fn();
    result = render(<Grid width={10} height={15} onShiftClickCell={shiftClickHandler} />);
    const rows = result.container.querySelectorAll('.row');
    const subjectRow = rows[4];
    const subjectCell = subjectRow.querySelectorAll('.Cell')[6];

    fireEvent.click(subjectCell, { shiftKey: true });

    expect(shiftClickHandler).toBeCalledWith(6, 4);
  });

  it('does not throw if a shift-click handler is not provided', () => {
    result = render(<Grid width={10} height={15} />);
    const rows = result.container.querySelectorAll('.row');
    const subjectRow = rows[4];
    const subjectCell = subjectRow.querySelectorAll('.Cell')[6];

    expect(() => fireEvent.click(subjectCell, { shiftKey: true })).not.toThrow();
  });

});