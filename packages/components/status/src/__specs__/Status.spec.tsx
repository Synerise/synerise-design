import React from 'react';

import { declarationsFor, renderWithProvider } from '@synerise/ds-core/testing';
import { fireEvent } from '@testing-library/react';

import Status from '../Status';

describe('Status', () => {
  const STATUS_LABEL = 'Status Text';

  it('should render', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Status type="primary" label={STATUS_LABEL} />,
    );

    // ASSERT
    expect(getByText(STATUS_LABEL)).toBeTruthy();
  });

  it('should onClick fire', () => {
    // ARRANGE
    const onClick = vi.fn();
    const { getByText } = renderWithProvider(
      <Status
        type="primary"
        data-testid="testid1"
        label={STATUS_LABEL}
        onClick={onClick}
      />,
    );

    // ACT
    fireEvent.click(getByText(STATUS_LABEL));

    // ASSERT
    expect(onClick).toHaveBeenCalled();
  });
});

describe('Status tokens', () => {
  it('falls back to the neutral tokens for an unknown type', () => {
    const { container } = renderWithProvider(
      // @ts-expect-error an invalid type from untyped consumer data
      <Status type="not-a-status" label="Status" />,
    );

    const status = container.querySelector('.ds-status');
    const declarations = declarationsFor(status);
    expect(declarations).toContain('--ds-status-pill-variant-neutral-text');
    expect(declarations).toContain(
      '--ds-status-pill-variant-neutral-border-solid',
    );
    expect(declarationsFor(status, { state: 'any' })).not.toContain('undefined');
  });

  it('uses the dashed neutral border for an unknown dashed type', () => {
    const { container } = renderWithProvider(
      // @ts-expect-error an invalid type from untyped consumer data
      <Status type="not-a-status" label="Status" dashed />,
    );

    expect(declarationsFor(container.querySelector('.ds-status'))).toContain(
      '--ds-status-pill-variant-neutral-border-dashed',
    );
  });

  it('keeps the mapped tokens for a known type', () => {
    const { container } = renderWithProvider(
      <Status type="danger" label="Status" />,
    );

    expect(declarationsFor(container.querySelector('.ds-status'))).toContain(
      '--ds-status-pill-variant-error-text',
    );
  });
});

