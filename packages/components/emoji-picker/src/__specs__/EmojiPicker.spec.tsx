import React from 'react';

import Button from '@synerise/ds-button';
import Icon, { Add3M } from '@synerise/ds-icon';
import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('unicode-emoji-utils', () => ({
  getEmojisByGroup: () =>
    new Map([
      [
        'smileys-emotion',
        [
          { emoji: '😀', description: 'grinning face', group: 'smileys-emotion', keywords: ['grin', 'happy'], version: '1.0' },
          { emoji: '😁', description: 'beaming face', group: 'smileys-emotion', keywords: ['grin', 'smile'], version: '1.0' },
          { emoji: '😂', description: 'face with tears of joy', group: 'smileys-emotion', keywords: ['laugh', 'joy'], version: '1.0' },
        ],
      ],
    ]),
}));

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
    const onSelect = vi.fn();

    renderWithProvider(
      <EmojiPicker onSelect={onSelect}>{TRIGGER}</EmojiPicker>,
    );

    fireEvent.click(screen.getByText(BUTTON_LABEL));

    await waitFor(() => expect(screen.getByText('😀')).toBeInTheDocument());

    fireEvent.click(screen.getByText('😀'));

    await waitFor(() => expect(onSelect).toHaveBeenCalled());
  }, 8000);

  it('should filter by searchQuery', async () => {
    const SEARCH_PLACEHOLDER = 'SEARCH_PLACEHOLDER';
    const SEARCH_QUERY = 'grin';
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

    userEvent.type(screen.getByPlaceholderText(SEARCH_PLACEHOLDER), SEARCH_QUERY);

    screen.getAllByTestId('ds-emoji-item').forEach(element => {
      expect(element.dataset.keywords?.split(',').some(keyword => keyword.match(SEARCH_QUERY))).toBeTruthy();
    });
  })
});
