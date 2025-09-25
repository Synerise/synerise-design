import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import type { TagsProps } from '@synerise/ds-tags';

import { centeredPaddedWrapper } from '../../utils';
import { ALL_TAGS, TAG_TEXTS } from './Tags.constants';
import StoriesMeta, { WithAddButton } from './Tags.stories';

export default {
  ...StoriesMeta,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [centeredPaddedWrapper],
  title: 'Components/Tags/Tags/Tests',
  tags: ['visualtests'],
} as Meta<TagsProps>;

type Story = StoryObj<TagsProps>;

const openDropdown = async (canvas) => {
  await userEvent.click(canvas.getByText(TAG_TEXTS.addButtonLabel));
  const dropdown = canvas.getByTestId('ds-tags-dropdown-overlay');
  await waitFor(() => expect(dropdown).toBeInTheDocument());
  await waitFor(() =>
    expect(
      canvas.getByPlaceholderText(TAG_TEXTS.searchPlaceholder),
    ).not.toHaveStyle({ pointerEvents: 'none' }),
  );
  await waitFor(
    async () =>
      await userEvent.click(
        canvas.getByPlaceholderText(TAG_TEXTS.searchPlaceholder),
      ),
  );
  return {
    dropdown,
    input: canvas.getByPlaceholderText(TAG_TEXTS.searchPlaceholder),
  };
};

export const ShowDropdown: Story = {
  ...WithAddButton,
  args: {
    ...WithAddButton.args,
    maxHeight: 200,
    texts: TAG_TEXTS,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    await openDropdown(canvas);
  },
};

export const SearchTag: Story = {
  ...WithAddButton,
  args: {
    ...WithAddButton.args,
    maxHeight: 200,
    texts: TAG_TEXTS,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    const { input, dropdown } = await openDropdown(canvas);
    const dropdownWrapper = within(dropdown);

    userEvent.click(input);
    await userEvent.type(input, 'Sear');

    await waitFor(() =>
      expect(
        dropdownWrapper.getByTestId('ds-tags-create-button'),
      ).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(
        dropdownWrapper.getByTestId('ds-tags-available-tags').children,
      ).toHaveLength(2),
    );
  },
};

export const AddTag: Story = {
  ...WithAddButton,
  args: {
    ...WithAddButton.args,
    maxHeight: 200,
    texts: TAG_TEXTS,
    maxVisibleTags: undefined,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.parentElement!);
    await openDropdown(canvas);

    await userEvent.click(canvas.getByText(ALL_TAGS[8].name));
    const tagsWrapper = within(canvas.getByTestId('tags'));
    await waitFor(() =>
      expect(
        tagsWrapper.queryByTestId(`tag-${ALL_TAGS[8].id}`),
      ).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(canvas.getByTestId('ds-tags-dropdown-overlay')).not.toBeVisible(),
    );
  },
};

export const LimitedTags: Story = {
  ...WithAddButton,
  args: {
    ...WithAddButton.args,
    maxHeight: 200,
    texts: TAG_TEXTS,
    maxVisibleTags: 3,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.parentElement!);

    const tagsWrapper = within(canvas.getByTestId('tags'));
    await userEvent.hover(tagsWrapper.getByTestId('tag-limited-tags'));

    const limitedTagsDropdown = await canvas.findByTestId(
      'ds-tags-dropdown-overlay',
    );

    await waitFor(() => expect(limitedTagsDropdown).toBeInTheDocument());

    await waitFor(() =>
      expect(
        within(limitedTagsDropdown).getByTestId(`tag-${ALL_TAGS[3].id}`),
      ).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(
        within(limitedTagsDropdown).getByTestId(`tag-${ALL_TAGS[4].id}`),
      ).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(
        within(limitedTagsDropdown).getByTestId(`tag-${ALL_TAGS[5].id}`),
      ).toBeInTheDocument(),
    );
  },
};
