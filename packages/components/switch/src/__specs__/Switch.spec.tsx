import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent, screen } from '@testing-library/react';
import Switch from '../index';
import { theme } from '@synerise/ds-core';

describe('Switch', () => {
  const LABEL_TEXT = 'label text';
  const BUTTON_TESTID = 'button-test-id';

  it('should render', () => {
    renderWithProvider(<Switch label={LABEL_TEXT} data-testid={BUTTON_TESTID} />);

    expect(screen.getByTestId(BUTTON_TESTID)).toBeInTheDocument();
  });

  it('should render label', () => {
    renderWithProvider(<Switch label={LABEL_TEXT} />);

    expect(screen.getByText(LABEL_TEXT)).toBeInTheDocument();
  });

  it('should render description', () => {
    const DESCRIPTION_TEXT = 'Description text';
    renderWithProvider(<Switch label={LABEL_TEXT} description={DESCRIPTION_TEXT} />);

    expect(screen.getByText(DESCRIPTION_TEXT)).toBeInTheDocument();
  });

  it('should handle error', () => {
    const ERROR_TEXT = 'Error text';
    renderWithProvider(<Switch label={LABEL_TEXT} errorText={ERROR_TEXT} />);

    expect(screen.getByText(ERROR_TEXT)).toBeInTheDocument();
    expect(screen.getByRole('switch')).toHaveClass('error');
  });

  it('should handle disable', () => {
    renderWithProvider(<Switch label={LABEL_TEXT} disabled />);

    expect(screen.getByRole('switch')).toHaveAttribute('disabled');
  });

  it('should handle state change', () => {
    const onChange = jest.fn();
    renderWithProvider(
      <Switch label={LABEL_TEXT} onChange={e => onChange(e)} data-testid={BUTTON_TESTID} />
    );

    fireEvent.click(screen.getByTestId(BUTTON_TESTID));

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('should display tooltip icon when tooltip is provided', () => {
    const TOOLTIP_TEXT = 'Tooltip text';
    renderWithProvider(
      <Switch label="Test Label" tooltip={TOOLTIP_TEXT} data-testid="switch-test-id" />
    );
    expect(screen.queryByTestId('label-tooltip-trigger')).toBeInTheDocument();
  });

  it('should not display tooltip icon when tooltip is null', () => {
    renderWithProvider(
      <Switch label="Test Label" tooltip={null} data-testid="switch-test-id" />
    );

    expect(screen.queryByTestId('label-tooltip-trigger')).not.toBeInTheDocument();
  });
});
