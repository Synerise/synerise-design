import React from 'react';

import Button from '@synerise/ds-button';
import Icon, { Add3M } from '@synerise/ds-icon';
import { renderWithProvider } from '@synerise/ds-core';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { EmojiPicker } from '../EmojiPicker';

describe('EmojiPicker', () => {
  const BUTTON_LABEL = 'button label';
  const TRIGGER = (
    <Button type="primary" mode="icon-label">
      <Icon component={<Add3M />} />
      {BUTTON_LABEL}
    </Button>
  );
  it('should render', async () => {
    renderWithProvider(<EmojiPicker>{TRIGGER}</EmojiPicker>);

    userEvent.click(screen.getByText(BUTTON_LABEL));

    await waitFor(() => expect(screen.getByText('😀')).toBeInTheDocument());
  });

  it('should trigger onSelect', async () => {
    const onSelect = jest.fn();

    renderWithProvider(
      <EmojiPicker onSelect={onSelect}>{TRIGGER}</EmojiPicker>,
    );

    userEvent.click(screen.getByText(BUTTON_LABEL));

    await waitFor(() => expect(screen.getByText('😀')).toBeInTheDocument());

    userEvent.click(screen.getByText('😀'));

    await waitFor(() => expect(onSelect).toHaveBeenCalled());
  }, 8000);

  it('should filter by searchQuery', async () => {
    const SEARCH_PLACEHOLDER = 'SEARCH_PLACEHOLDER';
    renderWithProvider(
      <EmojiPicker texts={{ placeholder: SEARCH_PLACEHOLDER }}>
        {TRIGGER}
      </EmojiPicker>,
    );

    userEvent.click(screen.getByText(BUTTON_LABEL));

    await waitFor(() =>
      expect(
        screen.getByPlaceholderText(SEARCH_PLACEHOLDER),
      ).toBeInTheDocument(),
    );

    userEvent.type(screen.getByPlaceholderText(SEARCH_PLACEHOLDER), 'grin');

    await waitFor(() =>
      expect(screen.getAllByTestId('ds-emoji-item')).toHaveLength(9),
    );
  });
});
