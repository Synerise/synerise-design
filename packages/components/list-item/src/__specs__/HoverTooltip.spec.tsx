import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';

import ListItem from '../ListItem';

const CARD = 'The row card';

const renderRows = () =>
  renderWithProvider(
    <>
      <ListItem renderHoverTooltip={() => <div>{CARD}</div>}>First</ListItem>
      <ListItem>Second</ListItem>
    </>,
  );

const focusRow = (label: string) => {
  const row = screen.getByText(label).closest<HTMLElement>('[tabindex="0"]');
  if (!row) {
    throw new Error(`No focusable row for "${label}"`);
  }
  act(() => row.focus());
};

describe('ListItem hover card', () => {
  it('opens on hover', async () => {
    renderRows();
    fireEvent.mouseEnter(screen.getByText('First'));
    fireEvent.mouseMove(screen.getByText('First'));

    expect(await screen.findByText(CARD)).toBeInTheDocument();
  });

  it('opens when the row gets keyboard focus', async () => {
    renderRows();
    focusRow('First');

    expect(await screen.findByText(CARD)).toBeInTheDocument();
  });

  it('closes when the focus moves to the next row', async () => {
    renderRows();
    focusRow('First');
    await screen.findByText(CARD);

    focusRow('Second');
    await waitFor(() =>
      expect(screen.queryByText(CARD)).not.toBeInTheDocument(),
    );
  });
});
