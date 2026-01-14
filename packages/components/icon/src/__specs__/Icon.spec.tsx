import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';

import { VarTypeStringM } from '../icons/M';
import Icon from '../index';

describe('Icon', () => {
  it('should render', () => {
    const TEST_TEXT = 'angle-left-m';
    renderWithProvider(<Icon title={TEST_TEXT} name={TEST_TEXT} />);

    expect(screen.getByTitle(TEST_TEXT)).toBeTruthy();
  });

  it('Should render with className', () => {
    const { container } = renderWithProvider(
      <Icon component={<VarTypeStringM />} />,
    );

    expect(container.querySelector('.var-type-string-m')).toBeTruthy();
  });

  it('Should render with testid', () => {
    renderWithProvider(<Icon component={<VarTypeStringM />} />);

    expect(screen.getByTestId('ds-icon-var-type-string-m')).toBeTruthy();
  });
});
