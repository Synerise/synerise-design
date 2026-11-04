import { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import type { ArrayFactorProps, ArrayItemType } from '@synerise/ds-factors';

import { centeredPaddedWrapper } from '../../../utils';
import { NO_SNAPSHOT } from '../../../utils/chromatic';
import { ARRAY_VALUE } from '../Factors.data';
import ArrayMeta, { CustomTrigger, WithValue } from './Array.stories';

type Story = StoryObj<ArrayFactorProps<ArrayItemType>>;

export default {
  ...ArrayMeta,
  title: 'Components/Filter/Factors/Standalone/Array/Tests',
  tags: ['visualtests'],
  decorators: [centeredPaddedWrapper],
} as Meta<ArrayFactorProps<ArrayItemType>>;

export const ApplyReportsValue: Story = {
  ...WithValue,
  parameters: NO_SNAPSHOT,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.click(canvas.getByTestId('ds-factors-array'));
    await waitFor(() => expect(canvas.getByRole('dialog')).toBeVisible());
    expect(args.onActivate).toHaveBeenCalledOnce();
    await userEvent.click(canvas.getByRole('button', { name: 'Apply' }));
    await waitFor(() =>
      expect(args.onChange).toHaveBeenCalledWith(ARRAY_VALUE),
    );
  },
};

export const CustomTriggerOpen: Story = {
  render: CustomTrigger.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.click(canvas.getByRole('button', { name: /Edit value/ }));
    await waitFor(() => expect(canvas.getByRole('dialog')).toBeInTheDocument());
    expect(canvas.getByText('Edit values')).toBeInTheDocument();
    expect(canvas.getByDisplayValue('item A')).toBeInTheDocument();
  },
};
