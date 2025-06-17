import { Meta, StoryObj } from '@storybook/react-webpack5';
import { within, waitFor, expect, fn, userEvent } from 'storybook/test';

import type { CollectorProps } from '@synerise/ds-collector';

import CollectorMeta, { WithCounter } from './Collector.stories';
import { TEXTS } from './Collector.const';


export default {
  ...CollectorMeta,
  title: 'Components/Collector/Tests',
  tags: ['visualtests'],
  args: {
    ...CollectorMeta.args,
    onCategorySelect: fn(),
    categorySuffix: 'select'
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
  }
}

export const SelectWithKeyboard: Story = {
  ...WithCounter,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    userEvent.click(canvas.getByPlaceholderText(TEXTS.placeholder));
    const dropdown = await canvas.findByTestId('ds-collector-dropdown');
    await waitFor(() => expect(dropdown).toBeVisible());
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}', { delay: 200 });
    const items = await canvas.findAllByTestId('ds-input-value-wrapper')
    expect(items).toHaveLength(1);
  }
}

