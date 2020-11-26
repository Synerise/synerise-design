import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent } from '@testing-library/react';
import * as React from 'react';
import ActionArea from '../ActionArea';

const LABEL = 'Label';
const DESCRIPTION = 'Very long description';
const ACTION_LABEL = 'Define';

describe('ActionArea', () => {
  it('Should render without label', () => {
    // ARRANGE
    const action = jest.fn();
    const { getByText } = renderWithProvider(
      <ActionArea description={DESCRIPTION} action={action} actionLabel={ACTION_LABEL} />
    );

    // ASSERT
    expect(getByText(DESCRIPTION)).toBeTruthy();
    expect(getByText(ACTION_LABEL)).toBeTruthy();
  });

  it('Should call action', () => {
    // ARRANGE
    const action = jest.fn();
    const { getByText } = renderWithProvider(
      <ActionArea description={DESCRIPTION} action={action} actionLabel={ACTION_LABEL} />
    );

    // ASSERT
    fireEvent.click(getByText(ACTION_LABEL));
    expect(action).toBeCalled();
  });

  it('Should render with label', () => {
    // ARRANGE
    const action = jest.fn();
    const { getByText } = renderWithProvider(
      <ActionArea description={DESCRIPTION} label={LABEL} action={action} actionLabel={ACTION_LABEL} />
    );

    // ACT
    fireEvent.click(getByText(ACTION_LABEL));

    // ASSERT
    expect(action).toBeCalled();
  });
});
