import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { render, RenderResult } from '@testing-library/react';
import { Cell, CellState } from './cell';

describe('Cell', () => {
  // let container: HTMLDivElement;
  let result: RenderResult;
  // beforeEach(() => {
  //   // setup a DOM element as a render target
  //   container = document.createElement("div");
  //   document.body.appendChild(container);
  // });

  // afterEach(() => {
  //   // cleanup on exiting
  //   unmountComponentAtNode(container);
  //   container.remove();
  //   container = null;
  // });

  it('doesn\'t show the cell value when Covered', () => {
    act(() => {
      result = render(<Cell state={CellState.Covered} value={3} />);
    });
    expect(result.baseElement.textContent).not.toContain('3');
  });

  it('does show the cell value when Uncovered', () => {
    act(() => {
      render(<Cell state={CellState.Uncovered} value={3} />);
    });
    expect(result.baseElement.textContent).toContain('3');
  });

});