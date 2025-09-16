import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-core';

import ProgressBar from '../index';

describe('ProgressBar', () => {
  it('should render', () => {
    renderWithProvider(
      <ProgressBar showLabel={false} percent={60} width={'300px'} customColor={'green'} />,
    );
    expect(screen.getByTestId('progress-bar-container')).toBeTruthy();
    expect(screen.queryByTestId('progress-bar-label')).toBeNull();
    expect(screen.queryByTestId('progress-bar-description')).toBeNull();
  });
});

describe('ProgressBar', () => {
  it('should render with label', () => {
    renderWithProvider(
      <ProgressBar label="Label" percent={60} width={'300px'} customColor={'green'} />,
    );
    expect(screen.getByTestId('progress-bar-container')).toBeTruthy();
    expect(screen.getByTestId('progress-bar-label')).toBeTruthy();
    expect(screen.getByTestId('progress-bar-max-percent').textContent).toBe('60%');
    expect(screen.queryByTestId('progress-bar-description')).toBeNull();
  });
});

describe('ProgressBar', () => {
  it('should render with label and description', () => {
    renderWithProvider(
      <ProgressBar
        label="Label"
        percent={60}
        width={'300px'}
        customColor={'green'}
        description="Description"
      />,
    );
    expect(screen.getByTestId('progress-bar-container')).toBeTruthy();
    expect(screen.getByTestId('progress-bar-label')).toBeTruthy();
    expect(screen.getByTestId('progress-bar-max-percent').textContent).toBe('60%');
    expect(screen.queryByTestId('progress-bar-description')).toBeTruthy();
    expect(screen.getByTestId('progress-bar-description').textContent).toBe(
      'Description',
    );
  });
});
