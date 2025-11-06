import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import type { CardTabProps, CardTabsProps } from '@synerise/ds-card-tabs';

import { sleep } from '../../utils';
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
      hover: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    await sleep(400);
    const tab = canvas.getAllByTestId('card-tab-container')[0];

    const contextMenuIcon = within(tab).getByTestId('ds-card-tabs-contextmenu');

    await userEvent.click(contextMenuIcon);

    const overlay = await canvas.findByTestId(
      'popover-card-tabs-contextmenu-content',
    );

    await waitFor(() =>
      expect(within(overlay).getAllByRole('menuitem')).toHaveLength(3),
    );
    await waitFor(() => expect(overlay).toBeVisible());
  },
};
