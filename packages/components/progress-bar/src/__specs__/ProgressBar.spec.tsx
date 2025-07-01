import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';

import ProgressBar from '../index';

describe('ProgressBar', () => {
  it('should render', () => {
    const { getByTestId, queryByTestId } = renderWithProvider(
      <ProgressBar showLabel={false} percent={60} amount={60} />,
    );
    expect(getByTestId('progress-bar-container')).toBeTruthy();
    expect(queryByTestId('progress-bar-label')).toBeNull();
    expect(queryByTestId('progress-bar-description')).toBeNull();
  });
});

describe('ProgressBar', () => {
  it('should render with label', () => {
    const { getByTestId, queryByTestId } = renderWithProvider(
      <ProgressBar showLabel={true} percent={60} amount={60} />,
    );
    expect(getByTestId('progress-bar-container')).toBeTruthy();
    expect(getByTestId('progress-bar-label')).toBeTruthy();
    expect(getByTestId('progress-bar-max-value').textContent).toBe('60');
    expect(getByTestId('progress-bar-max-percent').textContent).toBe(' (60%)');
    expect(queryByTestId('progress-bar-description')).toBeNull();
  });
});

describe('ProgressBar', () => {
  it('should render with label and description', () => {
    const { getByTestId } = renderWithProvider(
      <ProgressBar
        showLabel={true}
        percent={60}
        amount={60}
        description="Description"
      />,
    );
    expect(getByTestId('progress-bar-container')).toBeTruthy();
    expect(getByTestId('progress-bar-label')).toBeTruthy();
    expect(getByTestId('progress-bar-max-value').textContent).toBe('60');
    expect(getByTestId('progress-bar-max-percent').textContent).toBe(' (60%)');
    expect(getByTestId('progress-bar-description')).toBeTruthy();
    expect(getByTestId('progress-bar-description').textContent).toBe(
      'Description',
    );
  });
});
