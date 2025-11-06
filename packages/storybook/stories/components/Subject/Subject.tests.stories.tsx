import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import type { SubjectProps } from '@synerise/ds-subject';

import SubjectMeta from './Subject.stories';
import { SUBJECT_ITEMS, SUBJECT_TEXTS } from './data/index.data';

export default {
  ...SubjectMeta,
  title: 'Components/Filter/Subject/Tests',
  tags: ['visualtests'],
  parameters: {
    chromatic: { diffThreshold: 0.15 },
  },
} as Meta<SubjectProps>;

type Story = StoryObj<SubjectProps>;

export const SelectSubject: Story = {
  args: {
    placeholder: 'Select',
    onSelectItem: fn(),
    onActivate: fn(),
    onDeactivate: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText(args.placeholder));

    await canvas.findByPlaceholderText(SUBJECT_TEXTS.searchPlaceholder);

    await waitFor(() =>
      expect(canvas.getAllByRole('menuitem')[3]).not.toHaveStyle({
        pointerEvents: 'none',
      }),
    );

    await userEvent.click(canvas.getAllByRole('menuitem')[3]);

    expect(args.onSelectItem).toHaveBeenCalledWith(SUBJECT_ITEMS[3]);
  },
};

export const Opened: Story = {
  args: {
    opened: true,
  },
  play: async ({ canvasElement }) => {
    // wait to capture screenshot after dropdown renders open
    const canvas = within(canvasElement);
    await waitFor(() => canvas.findByPlaceholderText('Search'));
  },
};

export const Deactivate: Story = {
  args: {
    placeholder: 'Select',
    onSelectItem: fn(),
    onActivate: fn(),
    onDeactivate: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText(args.placeholder));
    await waitFor(() => expect(args.onActivate).toHaveBeenCalled());
    await userEvent.click(document.body);
    await waitFor(() => expect(args.onDeactivate).toHaveBeenCalled());
  },
};
