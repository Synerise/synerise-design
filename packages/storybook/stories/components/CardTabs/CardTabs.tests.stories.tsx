import { Meta, StoryObj } from '@storybook/react-webpack5';
import { waitFor, within, expect, fireEvent } from 'storybook/test';

import type { CardTabProps, CardTabsProps } from '@synerise/ds-card-tabs';
import CardTabsMeta, { Default } from './CardTabs.stories';

export default {
  ...CardTabsMeta,
  title: 'Components/CardTabs/Tests',
  tags: ['visualtests'],
} as Meta<CardTabsProps>;

export const OpenContextMenu: StoryObj<CardTabProps & CardTabProps> = {
  ...Default,
  parameters: {
    pseudo: {
      hover: true
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    const tab = canvas.getAllByTestId('card-tab-container')[0];

    const contextMenuIcon = within(tab).getByTestId('ds-card-tabs-contextmenu');

    await fireEvent.click(contextMenuIcon);
    await fireEvent.mouseDown(contextMenuIcon);

    const overlay = await canvas.findByTestId('card-tabs-dropdown');

    await waitFor(() => expect(within(overlay).getAllByRole('menuitem')).toHaveLength(3))
    await waitFor(() => expect(overlay).toBeVisible());

  },
};
