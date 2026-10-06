import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import type { ButtonProps } from '@synerise/ds-button';
import Button from '@synerise/ds-button';

import { SINGLE_ICON_SIZES } from './Button.constants';
import { DisabledTooltip, SingleIconSizes } from './Button.stories';
import { DisabledButtonsWithTooltip } from './ButtonGroup.stories';

const meta: Meta<ButtonProps> = {
  title: 'Components/Button/Tests',
  tags: ['visualtests'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    return <Button {...args} />;
  },
  component: Button,
};

export default meta;

const BUTTON_LABEL = 'BUTTON_LABEL';
export const RendersDisabledTooltip: StoryObj<ButtonProps> = {
  ...DisabledTooltip,
  args: {
    ...DisabledTooltip.args,
    children: BUTTON_LABEL,
  },
  parameters: {
    pseudo: { hover: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.hover(canvas.getByText(BUTTON_LABEL));
    await waitFor(() =>
      expect(canvas.getByText('This element is disabled')).toBeVisible(),
    );
  },
};

export const RendersDisabledTooltipInButtonGroup: StoryObj<ButtonProps> = {
  ...DisabledButtonsWithTooltip,
  parameters: {
    pseudo: { hover: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.hover(canvas.getByText('Label'));
    await waitFor(() =>
      expect(canvas.getByText('Tooltip 1 title')).toBeVisible(),
    );
  },
};

/**
 * jsdom does not resolve the specificity of the `:not(.ds-expander)` selector that used to swallow
 * the single-icon width overrides, so the unit spec passes even with the bug present for
 * `size="large"`. Measuring in a real browser is the only assertion that actually holds the line.
 */
export const RendersSingleIconSizes: StoryObj<ButtonProps> = {
  ...SingleIconSizes,
  parameters: {
    ...SingleIconSizes.parameters,
    layout: 'centered',
  },
  play: async ({ canvasElement }) => {
    const buttons = within(canvasElement).getAllByRole('button');
    const boxOf = (index: number) => {
      const { width, height } = buttons[index].getBoundingClientRect();
      return `${width}x${height}`;
    };

    // Compared in one go rather than per size, so a regression reports every broken size instead of
    // aborting on the first one.
    const actual = SINGLE_ICON_SIZES.map(({ label }, index) => [
      label,
      boxOf(index),
    ]);
    const expected = SINGLE_ICON_SIZES.map(({ label, width }) => [
      label,
      `${width}x${width}`,
    ]);
    expect(actual).toEqual(expected);

    // The block button is last: full width of its 240px container, default height untouched.
    expect(boxOf(SINGLE_ICON_SIZES.length)).toBe('240x32');
  },
};
