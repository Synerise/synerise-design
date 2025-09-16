import React from 'react';
import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen } from '@testing-library/react';
import ActionArea from '../ActionArea';

const LABEL = 'Label';
const DESCRIPTION = 'Very long description';
const ACTION_LABEL = 'Define';

describe('ActionArea', () => {
  it('Should render without label', () => {
    const action = jest.fn();
    renderWithProvider(
      <ActionArea description={DESCRIPTION} action={action} actionLabel={ACTION_LABEL} />
    );

    expect(screen.getByText(DESCRIPTION)).toBeTruthy();
    expect(screen.getByText(ACTION_LABEL)).toBeTruthy();
  });

  it('Should call action', () => {
    const action = jest.fn();
    renderWithProvider(
      <ActionArea description={DESCRIPTION} action={action} actionLabel={ACTION_LABEL} />
    );

    fireEvent.click(screen.getByText(ACTION_LABEL));
    expect(action).toBeCalled();
  });

  it('Should render with label', () => {
    const action = jest.fn();
    renderWithProvider(
      <ActionArea description={DESCRIPTION} label={LABEL} action={action} actionLabel={ACTION_LABEL} />
    );

    expect(screen.getByText(LABEL)).toBeTruthy();
  });
  it('Should render with secondary button', () => {
    const action = jest.fn();
    renderWithProvider(
      <ActionArea description={DESCRIPTION} label={LABEL} action={action} actionLabel={ACTION_LABEL} buttonProps={{type: 'secondary'}} />
    );

    expect(screen.getByRole('button')).toHaveClass('ant-btn-secondary')
  });

  it('Should render with custom action button', () => {
    const CUSTOM_ACTION = 'Custom action';
    renderWithProvider(
      <ActionArea description={DESCRIPTION} label={LABEL} customAction={<>{CUSTOM_ACTION}</>} />
    );

    expect(screen.getByText(CUSTOM_ACTION)).toBeInTheDocument()
  });
  it('Should render with disabled button', () => {
    const action = jest.fn();
    renderWithProvider(
      <ActionArea description={DESCRIPTION} label={LABEL} action={action} actionLabel={ACTION_LABEL} buttonProps={{disabled: true}} />
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });
  it('Should render validation state', () => {
    const action = jest.fn();
    renderWithProvider(
      <ActionArea description={DESCRIPTION} label={LABEL} action={action} actionLabel={ACTION_LABEL} isError errorText='Field required' />
    );
    
    expect(screen.getByTestId('action-area-content')).toHaveStyle({borderColor:'#f52922'});
    expect(screen.getByText('Field required')).toBeInTheDocument();
  });
});
