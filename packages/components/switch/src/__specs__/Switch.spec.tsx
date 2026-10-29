import React from 'react';
import {
  declarationsFor,
  renderWithProvider,
  rulesFor,
} from '@synerise/ds-core/testing';
import { fireEvent, screen } from '@testing-library/react';
import Switch from '../index';

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
    const onChange = vi.fn();
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

describe('Switch label and description styling', () => {
  it('colours the label with the form label token and never overrides it on hover or disabled', () => {
    const { container } = renderWithProvider(<Switch label="Label" disabled />);

    const label = container.querySelector('.switch-label');
    expect(label).toHaveStyle('color: var(--ds-form-label-text-color)');
    // A state anywhere in the selector counts: `.toggle:disabled + .texts .label` styles the label.
    const stateColours = rulesFor(label, { state: 'any' }).filter(
      ({ selector, declarations }) =>
        /:(hover|disabled)/.test(selector) && /(?:^|;)color:/.test(declarations),
    );
    expect(stateColours).toHaveLength(0);
  });

  it('fades the description when the switch is disabled', () => {
    const { container } = renderWithProvider(<Switch label="Label" description="Help" disabled />);

    expect(declarationsFor(container.querySelector('.switch-description'))).toContain(
      'opacity:var(--ds-opacity-disabled)',
    );
  });

  it('fades the description while loading', () => {
    const { container } = renderWithProvider(<Switch label="Label" description="Help" loading />);

    expect(declarationsFor(container.querySelector('.switch-description'))).toContain(
      'opacity:var(--ds-opacity-disabled)',
    );
  });

  it('keeps the description at full opacity when enabled', () => {
    const { container } = renderWithProvider(<Switch label="Label" description="Help" />);

    expect(declarationsFor(container.querySelector('.switch-description'))).not.toContain('opacity:');
  });
});
