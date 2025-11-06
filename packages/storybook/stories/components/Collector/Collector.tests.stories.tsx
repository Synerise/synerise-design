import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import type { CollectorProps } from '@synerise/ds-collector';

import { TEXTS } from './Collector.const';
import CollectorMeta, { WithCounter } from './Collector.stories';

export default {
  ...CollectorMeta,
  title: 'Components/Collector/Tests',
  tags: ['visualtests'],
  args: {
    ...CollectorMeta.args,
    onCategorySelect: fn(),
    categorySuffix: 'select',
  },
} as Meta<CollectorProps>;

type Story = StoryObj<CollectorProps>;

export const OpenDropdown: Story = {
  ...WithCounter,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    userEvent.click(canvas.getByPlaceholderText(TEXTS.placeholder));
    const dropdown = await canvas.findByTestId('ds-collector-dropdown');
    await waitFor(() => expect(dropdown).toBeVisible());
  },
};

export const SelectWithKeyboard: Story = {
  ...WithCounter,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    userEvent.click(canvas.getByPlaceholderText(TEXTS.placeholder));
    const dropdown = await canvas.findByTestId('ds-collector-dropdown');
    await waitFor(() => expect(dropdown).toBeVisible());
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}', { delay: 200 });
    const items = await canvas.findAllByTestId('ds-input-value-wrapper');
    expect(items).toHaveLength(1);
  },
};
