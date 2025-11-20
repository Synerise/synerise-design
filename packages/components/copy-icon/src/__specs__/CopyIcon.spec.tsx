import React from 'react';
import { renderWithProvider } from '@synerise/ds-core';
import { screen, fireEvent, waitFor} from '@testing-library/react';
import CopyIcon from '../CopyIcon';
import * as copy from 'copy-to-clipboard';

jest.mock('copy-to-clipboard', () => jest.fn());

jest.mock('@synerise/ds-tooltip', () => {
  return ({ children, title }) => (
    <div>
      {children}
      <span data-testid="tooltip">{title}</span>
    </div>
  );
});

describe('CopyIcon', () => {
  beforeEach(() => {
    (copy as jest.Mock).mockReturnValue(true); 
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
