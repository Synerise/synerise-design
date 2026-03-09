import React from 'react';
import { renderWithProvider } from '@synerise/ds-core';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import CopyIcon from '../CopyIcon';
import copy from 'copy-to-clipboard';

vi.mock('copy-to-clipboard', () => ({
  default: vi.fn(),
}));

vi.mock('@synerise/ds-tooltip', () => ({
  default: ({ children, title }: any) => (
    <div>
      {children}
      <span data-testid="tooltip">{title}</span>
    </div>
  ),
}));

describe('CopyIcon', () => {
  beforeEach(() => {
    vi.mocked(copy).mockReturnValue(true);
  });

  it('should render', () => {
    renderWithProvider(
      <CopyIcon copyValue={'New text'} texts={{ copyTooltip: 'Copy value', copiedTooltip: 'Copied!' }} />
    );

    expect(screen.getByTestId('ds-copy-icon')).toBeTruthy();
  });

  it('should change tooltip text after click', async () => {
    renderWithProvider(
      <CopyIcon
        copyValue="New text"
        texts={{ copyTooltip: 'Copy value', copiedTooltip: 'Copied!' }}
      />
    );

    const icon = screen.getByTestId('ds-copy-icon');

    fireEvent.mouseOver(icon);
    expect(screen.getByTestId('tooltip')).toHaveTextContent('Copy value');

    fireEvent.click(icon);

    await waitFor(() => {
      expect(screen.getByTestId('tooltip')).toHaveTextContent('Copied!');
    });
  });
});
