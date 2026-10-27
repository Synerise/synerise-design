import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import type { ButtonProps } from '@synerise/ds-button';
import Button from '@synerise/ds-button';
import ButtonGroup from '@synerise/ds-button-group';
import { theme } from '@synerise/ds-core';
import Icon, { AngleDownS } from '@synerise/ds-icon';

import { NO_SNAPSHOT } from '../../utils/chromatic';
import {
  BUTTON_CUSTOM_COLORS,
  BUTTON_TYPES,
  SINGLE_ICON_SIZES,
} from './Button.constants';
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
    ...NO_SNAPSHOT,
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

const CUSTOM_COLOR_TYPES = new Set(['custom-color', 'custom-color-ghost']);
const DARK_BG_TYPES = new Set(['tertiary-white', 'ghost-white']);

type SplitRow = { type: string; color?: string };

/**
 * Every button type side by side in the two split looks: a real ButtonGroup
 * `splitMode` pair (label button + single-icon button) and a single Button with
 * `mode="split"`. The custom-color types get one row per custom colour.
 * The `-white` types sit on a dark strip so they are visible.
 */
export const SplitAllTypesAndColors: StoryObj<ButtonProps> = {
  name: 'Split button: all types and custom colours',
  parameters: { layout: 'padded' },
  render: () => {
    const rows = BUTTON_TYPES.flatMap((type): SplitRow[] =>
      CUSTOM_COLOR_TYPES.has(type)
        ? BUTTON_CUSTOM_COLORS.map((color) => ({ type, color }))
        : [{ type }],
    );

    const cell = (type: string, node: React.ReactNode) => (
      <div
        style={{
          padding: 8,
          borderRadius: 4,
          background: DARK_BG_TYPES.has(type)
            ? theme.palette['grey-800']
            : undefined,
        }}
      >
        {node}
      </div>
    );

    const headerStyle = { fontSize: 12, fontWeight: 600 } as const;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '200px repeat(2, max-content)',
          gap: 8,
          alignItems: 'center',
        }}
      >
        <div />
        <div style={headerStyle}>ButtonGroup splitMode</div>
        <div style={headerStyle}>Button mode="split"</div>
        {rows.map(({ type, color }) => (
          <React.Fragment key={`${type}-${color ?? ''}`}>
            <div style={{ fontSize: 12 }}>
              {color ? `${type} / ${color}` : type}
            </div>
            {cell(
              type,
              <ButtonGroup splitMode buttonsPosition="left">
                <Button type={type} color={color}>
                  Label
                </Button>
                <Button type={type} color={color} mode="single-icon">
                  <Icon component={<AngleDownS />} />
                </Button>
              </ButtonGroup>,
            )}
            {cell(
              type,
              <Button type={type} color={color} mode="split">
                Label <Icon component={<AngleDownS />} />
              </Button>,
            )}
          </React.Fragment>
        ))}
      </div>
    );
  },
};
