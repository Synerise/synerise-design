import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';

import Divider from '../Divider';

describe('Divider', () => {
  it('should render', () => {
    const TEST_ID = 'test-id';
    renderWithProvider(<Divider data-testid={TEST_ID} />);

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });

  it('should render children', () => {
    const TEST_TEXT = 'test text';
    renderWithProvider(<Divider>{TEST_TEXT}</Divider>);

    expect(screen.getByText(TEST_TEXT)).toBeInTheDocument();
  });

  it('should render labels', () => {
    const LABEL_ABOVE = 'top';
    const LABEL_BELOW = 'bottom';
    renderWithProvider(
      <Divider labelAbove={LABEL_ABOVE} labelBelow={LABEL_BELOW}></Divider>,
    );

    expect(screen.getByText(LABEL_ABOVE)).toBeInTheDocument();
    expect(screen.getByText(LABEL_BELOW)).toBeInTheDocument();
  });

  it('should use margin props', () => {
    const { container } = renderWithProvider(
      <Divider marginBottom={5} marginTop={10} />,
    );

    expect(
      container.getElementsByClassName('ant-divider-horizontal')[0],
    ).toHaveStyle('margin-bottom: 5px');
    expect(
      container.getElementsByClassName('ant-divider-horizontal')[0],
    ).toHaveStyle('margin-top: 10px');
  });
});
