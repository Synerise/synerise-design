import { Meta, StoryObj } from '@storybook/react';

import { within, userEvent, expect, waitFor, fn } from '@storybook/test';
import type { ContextProps } from '@synerise/ds-context-selector';
import { theme } from '@synerise/ds-core';

import { CONTEXT_GROUPS, CONTEXT_ITEMS, CONTEXT_TEXTS } from './data/context.data';
import ContextSelectorMeta, {
  BusinessContext,
  ClientContext,
  LargeItems,
  FlatListDataStructure,
} from './ContextSelector.stories';

import { sleep } from '../../utils';

const SLEEP_TIME = 200;

export default {
  ...ContextSelectorMeta,
  title: 'Components/Filter/ContextSelector/Tests',
  tags: ['visualtests'],
  parameters: {
    chromatic: { diffThreshold: 0.15 },
  },
} as Meta<ContextProps>;

type Story = StoryObj<ContextProps>;

const TIMEOUT_OPTIONS = { timeout: 800 };

export const SelectItemFromCategory: Story = {
  args: {
    ...BusinessContext.args,
    onSelectItem: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    const subGroupName =
      CONTEXT_GROUPS[1].subGroups && CONTEXT_GROUPS[1].subGroups[0] && CONTEXT_GROUPS[1].subGroups[0].name;
    if (subGroupName) {
      await userEvent.click(canvas.getByText(CONTEXT_TEXTS.buttonLabel));

      await waitFor(() => {
        expect(canvas.queryAllByTestId('tab-container')).toHaveLength(2);
      }, TIMEOUT_OPTIONS);

      await userEvent.click(canvas.getAllByTestId('tab-container')[1]);

      await waitFor(
        () => expect(canvas.getByText(subGroupName)).not.toHaveStyle({ pointerEvents: 'none' }),
        TIMEOUT_OPTIONS
      );
      await sleep(SLEEP_TIME);
      
      await userEvent.click(canvas.getByText(subGroupName));
      
      await sleep(SLEEP_TIME);

      await waitFor(() => {
        expect(canvas.getByTestId('dropdown-back-action-label')).toBeInTheDocument();
      }, TIMEOUT_OPTIONS);

      await userEvent.click(canvas.getAllByRole('menuitem')[3]);

      await waitFor(() => expect(args.onSelectItem).toHaveBeenCalledWith(CONTEXT_ITEMS[9]));

      await waitFor(() => expect(canvas.getByText(CONTEXT_ITEMS[9].name)).toBeInTheDocument());

      await userEvent.click(canvas.getByText(CONTEXT_ITEMS[9].name));

      await waitFor(async () => expect(await canvas.findByText(CONTEXT_GROUPS[0].name)).toBeInTheDocument());
      await waitFor(async () => expect(await canvas.findByText(CONTEXT_GROUPS[0].name)).toHaveStyle({color: theme.palette['blue-600']}));
    }
  },
};

const play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByText(CONTEXT_TEXTS.buttonLabel));
  await waitFor(
    () =>
      expect(canvas.getByPlaceholderText(CONTEXT_TEXTS.searchPlaceholder)).not.toHaveStyle({ pointerEvents: 'none' }),
    TIMEOUT_OPTIONS
  );
};

export const BusinessContextOpen: Story = {
  ...BusinessContext,
  play,
};

export const ClientContextOpen: Story = {
  ...ClientContext,
  play,
};

export const LargeItemsOpen: Story = {
  ...LargeItems,
  play,
};

export const FlatListDataStructureOpen: Story = {
  ...FlatListDataStructure,
  play,
};
