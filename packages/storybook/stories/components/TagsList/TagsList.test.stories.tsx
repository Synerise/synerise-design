import { Meta, StoryObj } from '@storybook/react';

import { within, userEvent, expect, configure, waitFor } from '@storybook/test';
import type { TagsListProps } from '@synerise/ds-tagslist';
import { sleep } from '../../utils';
import { ADD_TAGS, FOLDERS, TEXTS } from './TagsList.constants';

import TagsListMeta, { ControlledInSidebar } from './TagsList.stories';

configure({ asyncUtilTimeout: 5000 });

export default {
  ...TagsListMeta,
  title: 'Components/TagsList/Tests',
  tags: ['visualtests'],
} as Meta<TagsListProps>;

type Story = StoryObj<TagsListProps>;

export const HoveredItem: Story = {
  ...ControlledInSidebar,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByText(FOLDERS[1].name));
    await waitFor(() => {
      expect(canvas.getByRole('checkbox')).toBeInTheDocument();
      expect(canvas.getByRole('checkbox')).not.toBeChecked();
    });
  },
};

export const SelectedItem: Story = {
  ...ControlledInSidebar,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText(FOLDERS[1].name));
    await waitFor(() => {
      expect(canvas.getByRole('checkbox')).toBeInTheDocument();
      expect(canvas.getByRole('checkbox')).toBeChecked();
    });
  },
};

export const OpenContextMenu: Story = {
  ...ControlledInSidebar,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByText(FOLDERS[1].name));
    const item = within(canvas.getByText(FOLDERS[1].name).closest('[role="menuitem"')!);

    await waitFor(() => {
      expect(item.getByTestId('ds-tagslist-actionsmenu-trigger')).toBeInTheDocument();
    });
    await userEvent.click(item.getByTestId('ds-tagslist-actionsmenu-trigger'));
    await waitFor(() => expect(canvas.getByTestId('ds-tagslist-actionsmenu')).toBeInTheDocument());
  },
};

const runRename = async (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  await userEvent.hover(canvas.getByText(FOLDERS[1].name));
  const item = within(canvas.getByText(FOLDERS[1].name).closest('[role="menuitem"')!);

  await waitFor(() => {
    expect(item.getByTestId('ds-tagslist-actionsmenu-trigger')).toBeInTheDocument();
  });
  await userEvent.click(item.getByTestId('ds-tagslist-actionsmenu-trigger'));
  await waitFor(() => expect(canvas.getByTestId('ds-tagslist-actionsmenu')).toBeInTheDocument());
  const actionsMenu = within(canvas.getByTestId('ds-tagslist-actionsmenu'));
  await waitFor(() => expect(actionsMenu.getByText(TEXTS.edit as string)).not.toHaveStyle({ pointerEvents: 'none' }));
  await userEvent.click(actionsMenu.getByText(TEXTS.edit as string));

  await waitFor(() => {
    expect(item.getByDisplayValue(FOLDERS[1].name)).toBeInTheDocument();
  });
  return {
    item,
    actionsMenu,
    input: item.getByDisplayValue(FOLDERS[1].name),
  };
};

export const Rename: Story = {
  ...ControlledInSidebar,
  play: async ({ canvasElement }) => {
    runRename(canvasElement);
  },
};

export const RenameAndSave: Story = {
  ...ControlledInSidebar,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { input } = await runRename(canvasElement);
    await userEvent.type(input, ' new{Enter}');
    await waitFor(() => expect(canvas.getByText(`${FOLDERS[1].name} new`)).toBeInTheDocument());
  },
};

export const AddTag: Story = {
  ...ControlledInSidebar,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText(TEXTS.addItemLabel as string));
    await waitFor(() => {
      expect(canvas.getByTestId('ds-tagslist-add-dropdown')).toBeInTheDocument();
    });
    const dropdown = within(canvas.getByTestId('ds-tagslist-add-dropdown'));
    await waitFor(() => {
      expect(dropdown.getAllByRole('menuitem')).toHaveLength(ADD_TAGS.length);
    });
  },
};

export const AddTagSelectedItem: Story = {
  ...ControlledInSidebar,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText(TEXTS.addItemLabel as string));
    await waitFor(() => {
      expect(canvas.getByTestId('ds-tagslist-add-dropdown')).toBeInTheDocument();
    });
    const dropdown = within(canvas.getByTestId('ds-tagslist-add-dropdown'));
    await waitFor(() => {
      expect(dropdown.getAllByRole('menuitem')).toHaveLength(ADD_TAGS.length);
    });
    await userEvent.click(dropdown.getAllByRole('menuitem')[2]);
  },
};

export const ShowMore: Story = {
  ...ControlledInSidebar,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tagsListWrapper = within(canvas.getByTestId('ds-tagslist-wrapper'));
    const count = tagsListWrapper.getAllByRole('menuitem').length;
    await userEvent.click(tagsListWrapper.getByTestId('ds-tagslist-show-more'));
    await sleep(500);
    await waitFor(() => {
      expect(tagsListWrapper.getAllByRole('menuitem').length).toBe(count + 2);
    });
  },
};

export const ShowLess: Story = {
  ...ControlledInSidebar,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tagsListWrapper = within(canvas.getByTestId('ds-tagslist-wrapper'));

    const count = tagsListWrapper.getAllByRole('menuitem').length;
    await userEvent.click(tagsListWrapper.getByTestId('ds-tagslist-show-more'));
    await sleep(500);
    await waitFor(() => {
      expect(tagsListWrapper.getAllByRole('menuitem').length).toBe(count + 2);
    });
    expect(tagsListWrapper.getByTestId('ds-tagslist-show-less')).toBeInTheDocument();
    await userEvent.click(tagsListWrapper.getByTestId('ds-tagslist-show-less'));
    await sleep(500);
    await waitFor(() => {
      expect(tagsListWrapper.getAllByRole('menuitem').length).toBe(count);
    });
    expect(tagsListWrapper.queryByTestId('ds-tagslist-show-less')).not.toBeInTheDocument();
  },
};

const runOpenSearch = async (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  const searchWrapper = within(canvas.getByTestId('ds-tagslist-search-wrapper'));
  const input = searchWrapper.getByRole('textbox');
  expect(input).not.toBeVisible();
  await userEvent.click(searchWrapper.getByRole('button'));
  await waitFor(() => {
    expect(input).toBeVisible();
  });
  return { input, searchWrapper };
};

export const OpenSearch: Story = {
  ...ControlledInSidebar,
  play: async ({ canvasElement }) => {
    await runOpenSearch(canvasElement);
  },
};

export const SearchResults: Story = {
  ...ControlledInSidebar,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tagsListWrapper = within(canvas.getByTestId('ds-tagslist-wrapper'));
    const { input } = await runOpenSearch(canvasElement);
    await userEvent.type(input, 'cam');
    await waitFor(() => expect(tagsListWrapper.getAllByRole('menuitem')).toHaveLength(2));
  },
};
