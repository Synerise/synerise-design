import * as React from 'react';
import ProgressBar, { COLORS } from '../index';
import { renderWithProvider } from '@synerise/ds-utils';

const SINGLE_BAR_VALUES =[
  {
    amount: 60,
  },
];

const MULTIVALUE_BAR_VALUES =[
  {
    amount: 20,
    color: COLORS.MARS
  },
  {
    amount: 55,
    color: COLORS.GREEN
  },
  {
    amount: 10,
    color: COLORS.MARS
  },
];

describe('ProgressBar', () => {
  it('should render', () => {
    const { getByTestId, queryByTestId } = renderWithProvider(<ProgressBar showLabel={false} values={SINGLE_BAR_VALUES} />);
    expect(getByTestId('progress-bar-container')).toBeTruthy();
    expect(getByTestId('progress-bar')).toBeTruthy();
    expect(queryByTestId('progress-bar-label')).toBeNull();
    expect(queryByTestId('progress-bar-description')).toBeNull();
  });

  it('should render with label', () => {
    const { getByTestId, queryByTestId } = renderWithProvider(<ProgressBar showLabel={true} values={SINGLE_BAR_VALUES} />);
    expect(getByTestId('progress-bar-container')).toBeTruthy();
    expect(getByTestId('progress-bar')).toBeTruthy();
    expect(getByTestId('progress-bar-label')).toBeTruthy();
    expect(getByTestId('progress-bar-max-value').textContent).toBe('60')
    expect(getByTestId('progress-bar-max-percent').textContent).toBe(' (60.00%)');
    expect(queryByTestId('progress-bar-description')).toBeNull();
  });

  it('should render with label and description', () => {
    const { getByTestId } = renderWithProvider(<ProgressBar showLabel={true} values={SINGLE_BAR_VALUES} description="Description" />);
    expect(getByTestId('progress-bar-container')).toBeTruthy();
    expect(getByTestId('progress-bar')).toBeTruthy();
    expect(getByTestId('progress-bar-label')).toBeTruthy();
    expect(getByTestId('progress-bar-max-value').textContent).toBe('60')
    expect(getByTestId('progress-bar-max-percent').textContent).toBe(' (60.00%)');
    expect(getByTestId('progress-bar-description')).toBeTruthy();
    expect(getByTestId('progress-bar-description').textContent).toBe('Description');
  });

  it('should render with custom total amount and label', () => {
    const { getByTestId, queryByTestId } = renderWithProvider(<ProgressBar showLabel={true} values={SINGLE_BAR_VALUES} total={200} />);
    expect(getByTestId('progress-bar-container')).toBeTruthy();
    expect(getByTestId('progress-bar')).toBeTruthy();
    expect(getByTestId('progress-bar-label')).toBeTruthy();
    expect(getByTestId('progress-bar-max-value').textContent).toBe('60')
    expect(getByTestId('progress-bar-max-percent').textContent).toBe(' (30.00%)');
    expect(queryByTestId('progress-bar-description')).toBeNull();
  });

  it('should render with multivalue', () => {
    const { getByTestId, getAllByTestId, queryByTestId } = renderWithProvider(<ProgressBar showLabel={false} values={MULTIVALUE_BAR_VALUES} />);
    expect(getByTestId('progress-bar-container')).toBeTruthy();
    expect(getByTestId('progress-bar')).toBeTruthy();
    expect(getAllByTestId('progress-bar-value').length).toBe(3);
    expect(queryByTestId('progress-bar-label')).toBeNull();
    expect(queryByTestId('progress-bar-description')).toBeNull();
  });

  it('should render as multivalue with label', () => {
    const { getByTestId, getAllByTestId, queryByTestId } = renderWithProvider(<ProgressBar showLabel={true} values={MULTIVALUE_BAR_VALUES} />);
    expect(getByTestId('progress-bar-container')).toBeTruthy();
    expect(getByTestId('progress-bar')).toBeTruthy();
    expect(getAllByTestId('progress-bar-value').length).toBe(3);
    expect(getByTestId('progress-bar-label')).toBeTruthy();
    expect(getByTestId('progress-bar-max-value').textContent).toBe('55')
    expect(getByTestId('progress-bar-max-percent').textContent).toBe(' (55.00%)');
    expect(queryByTestId('progress-bar-description')).toBeNull();
  });

  it('should render as multivalue with label and description', () => {
    const { getByTestId, getAllByTestId, queryByTestId } = renderWithProvider(<ProgressBar showLabel={true} values={MULTIVALUE_BAR_VALUES} description="Description" />);
    expect(getByTestId('progress-bar-container')).toBeTruthy();
    expect(getByTestId('progress-bar')).toBeTruthy();
    expect(getAllByTestId('progress-bar-value').length).toBe(3);
    expect(getByTestId('progress-bar-label')).toBeTruthy();
    expect(getByTestId('progress-bar-max-value').textContent).toBe('55')
    expect(getByTestId('progress-bar-max-percent').textContent).toBe(' (55.00%)');
    expect(getByTestId('progress-bar-description')).toBeTruthy();
    expect(getByTestId('progress-bar-description').textContent).toBe('Description');
  });

  it('should render as multivalue with label, description and custom total amount', () => {
    const { getByTestId, getAllByTestId, queryByTestId } = renderWithProvider(<ProgressBar showLabel={true} values={MULTIVALUE_BAR_VALUES} description="Description" total={200} />);
    expect(getByTestId('progress-bar-container')).toBeTruthy();
    expect(getByTestId('progress-bar')).toBeTruthy();
    expect(getAllByTestId('progress-bar-value').length).toBe(3);
    expect(getByTestId('progress-bar-label')).toBeTruthy();
    expect(getByTestId('progress-bar-max-value').textContent).toBe('55')
    expect(getByTestId('progress-bar-max-percent').textContent).toBe(' (27.50%)');
    expect(getByTestId('progress-bar-description')).toBeTruthy();
    expect(getByTestId('progress-bar-description').textContent).toBe('Description');
  });
});
