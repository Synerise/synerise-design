import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';

import Grid from '../Grid';

describe('Grid component', () => {
  it('Should render', () => {
    const { container } = renderWithProvider(<Grid />);

    expect(container.querySelectorAll('.ds-grid').length).toBe(1);
  });
  it('Should render with 3 items', () => {
    const { container } = renderWithProvider(
      <Grid>
        <Grid.Item xxl={12} xl={8} lg={6} md={4} sm={4} xs={3}></Grid.Item>
        <Grid.Item xxl={12} xl={8} lg={6} md={4} sm={4} xs={3}></Grid.Item>
        <Grid.Item xxl={12} xl={8} lg={6} md={4} sm={4} xs={3}></Grid.Item>
      </Grid>,
    );
    const gridItems = container.querySelectorAll('.ds-grid-item');

    expect(gridItems.length).toBe(3);
  });
});
