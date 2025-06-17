import { Meta, StoryObj } from '@storybook/react-webpack5';

import { within, userEvent, expect, fn, waitFor } from 'storybook/test';

import type { TagsProps } from '@synerise/ds-tags';

import StoriesMeta, { TagGroup } from './Tags.stories';
import { centeredPaddedWrapper, sleep } from '../../utils';
import { ALL_TAGS, TAG_TEXTS } from './Tags.constants';

export default {
  ...StoriesMeta,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [centeredPaddedWrapper],
  title: 'Components/Tags/Tests',
  tags: ['visualtests'],
} as Meta<TagsProps>;

type Story = StoryObj<TagsProps>;

const openDropdown = async (canvas) => {
  await userEvent.click(canvas.getByText(TAG_TEXTS.addButtonLabel));
  const dropdown = canvas.getByTestId('dropdown');
  await waitFor(() => expect(dropdown).toBeInTheDocument());
  await waitFor(() => expect(canvas.getByPlaceholderText(TAG_TEXTS.searchPlaceholder)).not.toHaveStyle({ pointerEvents: 'none' }));
  await waitFor(async () => await userEvent.click(canvas.getByPlaceholderText(TAG_TEXTS.searchPlaceholder)));
  return {
    dropdown,
    input: canvas.getByPlaceholderText(TAG_TEXTS.searchPlaceholder)
  }
}

export const ShowDropdown: Story = {
  ...TagGroup,
  args: {
    ...TagGroup.args,
    maxHeight: 200,
    texts: TAG_TEXTS,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    await openDropdown(canvas)
  },
};


export const SearchTag: Story = {
  ...TagGroup,
  args: {
    ...TagGroup.args,
    maxHeight: 200,
    texts: TAG_TEXTS,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    const { input, dropdown } = await openDropdown(canvas);
    const dropdownWrapper = within(dropdown);

    userEvent.click(input);
    await userEvent.type(input, 'Sear');

    await waitFor(() => expect(dropdownWrapper.getByTestId('ds-tags-create-button')).toBeInTheDocument());
    await waitFor(() => expect(dropdownWrapper.getByTestId('ds-tags-available-tags').children).toHaveLength(2))
  },
};

export const AddTag: Story = {
  ...TagGroup,
  args: {
    ...TagGroup.args,
    maxHeight: 200,
    texts: TAG_TEXTS,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.parentElement!);
    await openDropdown(canvas);

    await userEvent.click(canvas.getByText(ALL_TAGS[8].name));
    const tagsWrapper = within(canvas.getByTestId('tags'));
    await waitFor(() => expect(tagsWrapper.queryByTestId(`tag-${ALL_TAGS[8].id}`)).toBeInTheDocument());
    await waitFor(() => expect(canvas.getByTestId('dropdown')).not.toBeVisible());

  },
};
