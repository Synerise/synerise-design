import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import ColorPicker from '@synerise/ds-color-picker';

import { centeredPaddedWrapper } from '../../utils';
import ColorPickerMeta from './ColorPicker.stories';

export default {
  ...ColorPickerMeta,
  title: 'Components/Pickers/ColorPicker/Tests',
  tags: ['visualtests'],
  decorators: [centeredPaddedWrapper],
  parameters: {
    layout: 'centered',
    // The dropdown fades in; give the animation time to settle before snapshot.
    chromatic: { diffThreshold: 0.15, delay: 300 },
  },
} as Meta<typeof ColorPicker>;

type Story = StoryObj<typeof ColorPicker>;

/** Opens the picker dropdown by clicking the trigger and waits for the panel. */
const openPicker = async (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement.parentElement!);
  await userEvent.click(canvas.getByTestId('color-picker'));
  await waitFor(() =>
    expect(document.querySelector('.react-colorful')).toBeInTheDocument(),
  );
};

// Open overlay with the swatch section empty — creator button + placeholder slots.
export const OpenEmptySwatches: Story = {
  args: {
    value: '#00ffff',
    maxWidth: 228,
    size: 'S',
    isShownSavedColors: true,
    tooltip: { copy: 'Copy to clipboard', copied: 'Copied' },
  },
  play: async ({ canvasElement }) => {
    await openPicker(canvasElement);
    await waitFor(() =>
      expect(
        document.querySelector('.ds-color-swatch-placeholder'),
      ).toBeInTheDocument(),
    );
  },
};

// Open overlay with saved colours — filled swatches followed by placeholder slots.
export const OpenWithSavedColors: Story = {
  args: {
    value: '#00ffff',
    maxWidth: 228,
    size: 'S',
    isShownSavedColors: true,
    colors: ['#00ffff', '#76dc25', '#ff6c4d'],
    maxSavedColors: 9,
    tooltip: { copy: 'Copy to clipboard', copied: 'Copied' },
  },
  play: async ({ canvasElement }) => {
    await openPicker(canvasElement);
    await waitFor(() =>
      expect(document.querySelectorAll('.ds-color-swatch').length).toBe(3),
    );
  },
};

// Open overlay with a swatch selected — the Filled Selected state (centred white dot).
export const OpenWithSelectedSwatch: Story = {
  args: {
    ...OpenWithSavedColors.args,
  },
  play: async ({ canvasElement }) => {
    await openPicker(canvasElement);
    const swatch = document.querySelector('.ds-color-swatch');
    await userEvent.click(swatch as Element);
    await waitFor(() =>
      expect(
        document.querySelector('.ds-color-swatch[aria-pressed="true"]'),
      ).toBeInTheDocument(),
    );
  },
};

// Open overlay without the swatch section — just the spectrum, hue bar and hex input.
export const OpenWithoutSwatches: Story = {
  args: {
    value: '#00ffff',
    maxWidth: 228,
    size: 'S',
    tooltip: { copy: 'Copy to clipboard', copied: 'Copied' },
  },
  play: async ({ canvasElement }) => {
    await openPicker(canvasElement);
  },
};
