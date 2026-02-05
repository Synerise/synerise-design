import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import type { CompletedWithinProps } from '@synerise/ds-completed-within';

// import { sleep } from '../../utils';
import CompletedWithinMeta from './CompletedWithin.stories';

export default {
  ...CompletedWithinMeta,
  title: 'Components/Filter/CompletedWithin/Tests',
  tags: ['visualtests'],
} as Meta<CompletedWithinProps>;

type Story = StoryObj<CompletedWithinProps>;

const PLACEHOLDER = 'Button placeholder';

export const PopupOpen: Story = {
  args: {
    placeholder: PLACEHOLDER,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    await canvas.findByText(PLACEHOLDER);

    await userEvent.click(canvas.getByRole('button'));

    await waitFor(() => expect(canvas.getByRole('spinbutton')).toBeVisible());

    await waitFor(() =>
      expect(canvas.getByRole('spinbutton')).not.toHaveStyle({
        pointerEvents: 'none',
      }),
    );
    await userEvent.unhover(canvas.getByText(PLACEHOLDER));
  },
};
export const SelectNumber: Story = {
  args: {
    placeholder: PLACEHOLDER,
    onSetValue: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.parentElement!);
    await canvas.findByText(PLACEHOLDER);

    await userEvent.click(canvas.getByRole('button'));
    await waitFor(() => expect(canvas.getByRole('spinbutton')).toBeVisible());
    await waitFor(() =>
      expect(canvas.getByRole('spinbutton')).not.toHaveStyle({
        pointerEvents: 'none',
      }),
    );
    await userEvent.type(canvas.getByRole('spinbutton'), '4');
    await userEvent.click(canvas.getByRole('combobox'));
    await waitFor(() =>
      expect(canvas.getByText('Days')).not.toHaveStyle({
        pointerEvents: 'none',
      }),
    );
    await userEvent.click(canvas.getByText('Days'));
    await userEvent.click(canvasElement.parentElement!);
    await waitFor(() => expect(args.onSetValue).toHaveBeenCalled());
  },
};
