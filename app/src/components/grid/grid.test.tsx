import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Grid } from './grid';

describe('Grid', () => {
  let result: RenderResult;

  afterEach(() => {
    result.unmount();
    result = null;
  });

  it('renders the correct amount of Cells', () => {
    result = render(<Grid width={10} height={15} />);
    expect(result.container.childElementCount).toBe(10 * 15);
  });

});