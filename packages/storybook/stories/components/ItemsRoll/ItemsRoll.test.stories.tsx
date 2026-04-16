import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { StoryObj } from '@storybook/react-vite';

import meta from './ItemsRoll.stories';

export default {
  ...meta,
  title: 'Components/ItemsRoll/Tests',
  tags: ['visualtests'],
};

type Story = StoryObj<typeof meta>;

export const SearchFiltering: Story = {
  args: {
    onSearch: fn(),
    onSearchClear: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rollContainer = within(canvas.getByTestId('ds-items-roll'));

    // Open the search input by clicking the search button
    const searchButton = rollContainer.getByTestId('ds-icon-search-m');
    await userEvent.click(searchButton);

    // Find the search input and type a filter value
    const searchInput = await rollContainer.findByPlaceholderText('Search...');
    await userEvent.click(searchInput);
    await userEvent.type(searchInput, 'Example item-11', { delay: 200 });

    // Verify filtered items are visible (items matching "Example item-1" pattern: 1, 10-19)
    await waitFor(() => {
      expect(rollContainer.getByText('Example item-11')).toBeInTheDocument();
      expect(
        rollContainer.queryByText('Example item-0'),
      ).not.toBeInTheDocument();
    });

    // Clear search by clicking the clear button
    const clearButton = rollContainer.getByTestId('clear');
    await userEvent.click(clearButton);

    // Verify items are restored
    await waitFor(() => {
      expect(rollContainer.getByText('Example item-0')).toBeInTheDocument();
      expect(rollContainer.getByText('Example item-1')).toBeInTheDocument();
    });
  },
} satisfies Story;

export const ShowMoreLess: Story = {
  args: {
    maxToShowItems: 5,
    showMoreStep: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rollContainer = within(canvas.getByTestId('ds-items-roll'));

    // Initially only 5 items should be visible
    await waitFor(() => {
      expect(rollContainer.getByText('Example item-0')).toBeInTheDocument();
      expect(rollContainer.getByText('Example item-4')).toBeInTheDocument();
      expect(
        rollContainer.queryByText('Example item-5'),
      ).not.toBeInTheDocument();
    });

    // Click "Show more" button
    const showMoreButton = rollContainer.getByTestId('ds-items-roll-show-more');
    await userEvent.click(showMoreButton);

    // Verify more items appear
    await waitFor(() => {
      expect(rollContainer.getByText('Example item-5')).toBeInTheDocument();
      expect(rollContainer.getByText('Example item-9')).toBeInTheDocument();
    });

    // Click "Show less" button
    const showLessButton = rollContainer.getByTestId('ds-items-roll-show-less');
    await userEvent.click(showLessButton);

    // Verify items collapse back to original count
    await waitFor(() => {
      expect(rollContainer.getByText('Example item-4')).toBeInTheDocument();
      expect(
        rollContainer.queryByText('Example item-5'),
      ).not.toBeInTheDocument();
    });
  },
} satisfies Story;

export const ClearAll: Story = {
  args: {
    onClearAll: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.parentElement!);
    const rollContainer = within(canvas.getByTestId('ds-items-roll'));

    // Verify items are present initially
    await waitFor(() => {
      expect(rollContainer.getByText('Example item-0')).toBeInTheDocument();
    });

    // Click "Clear all" button to trigger the popconfirm
    const clearAllButton = rollContainer.getByText('Clear all');
    await userEvent.click(clearAllButton);

    // Confirm in the popconfirm dialog by clicking "Yes"
    const confirmButton = await canvas.findByText('Yes');
    await userEvent.click(confirmButton);

    // Verify all items are cleared
    await waitFor(() => {
      expect(
        rollContainer.queryByText('Example item-0'),
      ).not.toBeInTheDocument();
      expect(args.onClearAll).toHaveBeenCalled();
    });
  },
} satisfies Story;

export const ChangeSelection: Story = {
  args: {
    onChangeSelection: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const rollContainer = within(canvas.getByTestId('ds-items-roll'));

    // Click the "Change selection" button
    const changeSelectionButton = rollContainer.getByText('Change selection');
    await userEvent.click(changeSelectionButton);

    // Verify the callback was fired
    await waitFor(() => {
      expect(args.onChangeSelection).toHaveBeenCalled();
    });
  },
} satisfies Story;
