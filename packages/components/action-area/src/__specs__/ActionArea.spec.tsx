import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent, screen } from '@testing-library/react';
import * as React from 'react';
import ActionArea from '../ActionArea';

const LABEL = 'Label';
const DESCRIPTION = 'Very long description';
const ACTION_LABEL = 'Define';

describe('ActionArea', () => {
  it('Should render without label', () => {
    // ARRANGE
    const action = jest.fn();
    renderWithProvider(
      <ActionArea description={DESCRIPTION} action={action} actionLabel={ACTION_LABEL} />
    );

    // ASSERT
    expect(screen.getByText(DESCRIPTION)).toBeTruthy();
    expect(screen.getByText(ACTION_LABEL)).toBeTruthy();
  });

  it('Should call action', () => {
    // ARRANGE
    const action = jest.fn();
    renderWithProvider(
      <ActionArea description={DESCRIPTION} action={action} actionLabel={ACTION_LABEL} />
    );

    // ASSERT
    fireEvent.click(screen.getByText(ACTION_LABEL));
    expect(action).toBeCalled();
  });

  it('Should render with label', () => {
    // ARRANGE
    const action = jest.fn();
    renderWithProvider(
      <ActionArea description={DESCRIPTION} label={LABEL} action={action} actionLabel={ACTION_LABEL} />
    );

    // ASSERT
    expect(screen.getByText(LABEL)).toBeTruthy();
  });
  it('Should render with secondary button', () => {
    const action = jest.fn();
    renderWithProvider(
      <ActionArea description={DESCRIPTION} label={LABEL} action={action} actionLabel={ACTION_LABEL} buttonProps={{type: 'secondary'}} />
    );

    expect(screen.getByRole('button')).toHaveClass('ant-btn-secondary')
  });
  it('Should render with disabled button', () => {
    const action = jest.fn();
    renderWithProvider(
      <ActionArea description={DESCRIPTION} label={LABEL} action={action} actionLabel={ACTION_LABEL} buttonProps={{disabled: true}} />
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });
});
