import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen, within } from '@testing-library/react';

import { InformationCardFooter } from './InformationCardFooter';

describe('InformationCardFooter', () => {
  it('renders the footer wrapper with text', () => {
    renderWithProvider(<InformationCardFooter text="status info" />);

    expect(screen.getByTestId('information-card-footer')).toBeInTheDocument();
    expect(screen.getByText('status info')).toBeInTheDocument();
  });

  it('renders the action button when actionButton is true and invokes the callback', () => {
    const onClick = vi.fn();
    renderWithProvider(
      <InformationCardFooter
        text=""
        actionButton
        actionButtonCallback={onClick}
        actionButtonTooltipText="open"
      />,
    );

    const footer = screen.getByTestId('information-card-footer');
    const button = within(footer).getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders the quick-actions menu button and invokes onClick', () => {
    const onClick = vi.fn();
    renderWithProvider(
      <InformationCardFooter
        text=""
        actionsMenuButtonLabel="Quick links"
        actionsMenuButtonOnClick={onClick}
      />,
    );

    const button = screen.getByRole('button', { name: /quick links/i });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders a custom actionButton render prop', () => {
    renderWithProvider(
      <InformationCardFooter
        text=""
        actionButton={() => <span data-testid="custom-action">custom</span>}
      />,
    );

    expect(screen.getByTestId('custom-action')).toBeInTheDocument();
  });
});
