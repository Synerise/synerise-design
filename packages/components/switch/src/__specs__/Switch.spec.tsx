import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent, screen } from '@testing-library/react';
import Switch from '../index';

describe('Switch', () => {
  const LABEL_TEXT = 'label text';
  const BUTTON_TESTID = 'button-test-id';

  it('should render', () => {
    // ARRANGE
    renderWithProvider(<Switch label={LABEL_TEXT} data-testid={BUTTON_TESTID} />);

    // ASSERT
    expect(screen.getByTestId(BUTTON_TESTID)).toBeInTheDocument();
  });

  it('should render label', () => {
    // ARRANGE
    renderWithProvider(<Switch label={LABEL_TEXT} />);

    // ASSERT
    expect(screen.getByText(LABEL_TEXT)).toBeInTheDocument();
  });

  it('should render description', () => {
    // ARRANGE
    const DESCRIPTION_TEXT = 'Description text';
    renderWithProvider(<Switch label={LABEL_TEXT} description={DESCRIPTION_TEXT} />);

    // ASSERT
    expect(screen.getByText(DESCRIPTION_TEXT)).toBeInTheDocument();
  });

  it('should handle error', () => {
    // ARRANGE
    const ERROR_TEXT = 'Error text';
    const { container } = renderWithProvider(<Switch label={LABEL_TEXT} errorText={ERROR_TEXT} />);

    // ASSERT
    expect(screen.getByText(ERROR_TEXT)).toBeInTheDocument();
    expect(container.querySelector('button.error')).toBeInTheDocument();
  });

  it('should handle disable', () => {
    // ARRANGE
    const { container } = renderWithProvider(<Switch label={LABEL_TEXT} disabled />);

    // ASSERT
    expect(container.getElementsByTagName('button')[0]).toHaveAttribute('disabled');
  });

  it('should handle state change', () => {
    // ARRANGE
    const onChange = jest.fn();
    renderWithProvider(
      <Switch label={LABEL_TEXT} onChange={e => onChange(e)} data-testid={BUTTON_TESTID} />
    );

    // ACT
    fireEvent.click(screen.getByTestId(BUTTON_TESTID));

    // ASSERT
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('should display tooltip icon when tooltip is provided', () => {
    // ARRANGE
    const TOOLTIP_TEXT = 'Tooltip text';
    const { container } = renderWithProvider(
      <Switch label="Test Label" tooltip={TOOLTIP_TEXT} data-testid="switch-test-id" />
    );

    // ASSERT
    const tooltipIcon = container.querySelector('.switch-label svg');
    expect(tooltipIcon).toBeInTheDocument();
  });

  it('should not display tooltip icon when tooltip is null', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <Switch label="Test Label" tooltip={null} data-testid="switch-test-id" />
    );

    // ASSERT
    const tooltipIcon = container.querySelector('.switch-label svg');
    expect(tooltipIcon).not.toBeInTheDocument();
  });
});
