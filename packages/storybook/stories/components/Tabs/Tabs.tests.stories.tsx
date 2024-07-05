import { Meta, StoryObj } from '@storybook/react';

import { within, userEvent, expect, fn, waitFor } from '@storybook/test';
import type { TabsProps } from '@synerise/ds-tabs';
import { fixedWrapper300 } from '../../utils';

import ListItemMeta, { TabsWithConfiguration, TabsWithConfigurationDisabled } from './Tabs.stories';

const WAIT_FOR_OPTIONS = {
  timeout: 2000,
};

export default {
  ...ListItemMeta,
  title: 'Components/Tabs/Tests',
  tags: ['visualtests'],
} as Meta<TabsProps>;

type Story = StoryObj<TabsProps>;

export const EmptyTabs: Story = {
  args: {
    tabs: [],
  },
};

export const EmptyTabsWithConfigurationOpen: Story = {
  args: {
    ...TabsWithConfiguration.args,
    configuration: {
      label: 'Manage tabs',
      action: fn(),
      disabled: false,
    },
    tabs: [],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
    await waitFor(() => expect(canvas.getByTestId('tabs-dropdown-container')).toBeInTheDocument(), WAIT_FOR_OPTIONS);
    await waitFor(() => expect(canvas.getByTestId('tabs-dropdown-container')).toBeVisible(), WAIT_FOR_OPTIONS);

    const dropdown = within(canvas.getByTestId('tabs-dropdown-container'));
    const label = args.configuration?.label || 'Manage tabs';
    await waitFor(() => expect(dropdown.getByText(label)).not.toHaveStyle({ pointerEvents: 'none' }), WAIT_FOR_OPTIONS);
  },
};

export const TabsWithConfigurationOpen: Story = {
  ...TabsWithConfiguration,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('tabs-dropdown-trigger'));
    await waitFor(() => expect(canvas.getByTestId('tabs-dropdown-container')).toBeInTheDocument(), WAIT_FOR_OPTIONS);
    await waitFor(() => expect(canvas.getByTestId('tabs-dropdown-container')).toBeVisible(), WAIT_FOR_OPTIONS);

    const dropdown = within(canvas.getByTestId('tabs-dropdown-container'));
    const label = args.configuration?.label || 'Manage tabs';
    await waitFor(() => expect(dropdown.getByText(label)).toHaveStyle({ pointerEvents: 'none' }), WAIT_FOR_OPTIONS);
  },
};

export const TabsWithConfigurationDisabledAndHiddenTabsOpen: Story = {
  ...TabsWithConfigurationDisabled,
  decorators: [fixedWrapper300],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('tabs-dropdown-trigger'));
    await waitFor(() => expect(canvas.getByTestId('tabs-dropdown-container')).toBeInTheDocument(), WAIT_FOR_OPTIONS);
    await waitFor(() => expect(canvas.getByTestId('tabs-dropdown-container')).toBeVisible(), WAIT_FOR_OPTIONS);

    const dropdown = within(canvas.getByTestId('tabs-dropdown-container'));
    const label = args.configuration?.label || 'Manage tabs';
    await waitFor(() => expect(dropdown.getByText(label)).not.toHaveStyle({ pointerEvents: 'none' }), WAIT_FOR_OPTIONS);
  },
};

export const TabsWithConfigurationAndHiddenTabsOpen: Story = {
  ...TabsWithConfigurationDisabled,
  decorators: [fixedWrapper300],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('tabs-dropdown-trigger'));
    await waitFor(() => expect(canvas.getByTestId('tabs-dropdown-container')).toBeInTheDocument(), WAIT_FOR_OPTIONS);
    await waitFor(() => expect(canvas.getByTestId('tabs-dropdown-container')).toBeVisible(), WAIT_FOR_OPTIONS);
    const dropdown = within(canvas.getByTestId('tabs-dropdown-container'));
    const label = args.configuration?.label || 'Manage tabs';
    await waitFor(() => expect(dropdown.getByText(label)).not.toHaveStyle({ pointerEvents: 'none' }), WAIT_FOR_OPTIONS);
  },
};

export const TabsDropdownHideAfterConfigurationClick: Story = {
  args: {
    configuration: {
      label: 'Manage tabs',
      action: fn(),
      disabled: false,
    },
  },
  decorators: [fixedWrapper300],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('tabs-dropdown-trigger'));
    await waitFor(() => expect(canvas.getByTestId('tabs-dropdown-container')).toBeInTheDocument(), WAIT_FOR_OPTIONS);
    await waitFor(() => expect(canvas.getByTestId('tabs-dropdown-container')).toBeVisible(), WAIT_FOR_OPTIONS);

    const dropdown = within(canvas.getByTestId('tabs-dropdown-container'));
    const label = args.configuration?.label || 'Manage tabs';
    await waitFor(() => expect(dropdown.getByText(label)).not.toHaveStyle({ pointerEvents: 'none' }));
    await userEvent.click(dropdown.getByText(label));
    expect(args.handleTabClick).not.toHaveBeenCalled();
    expect(args.configuration?.action).toHaveBeenCalled();
    await waitFor(
      async () => expect(await canvas.queryByTestId('tabs-dropdown-container')).not.toBeVisible(),
      WAIT_FOR_OPTIONS
    );
  },
};

export const TabsDropdownHideAfterHiddenTabClick: Story = {
  ...TabsWithConfiguration,
  decorators: [fixedWrapper300],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('tabs-dropdown-trigger'));

    await waitFor(() => expect(canvas.getByTestId('tabs-dropdown-container')).toBeInTheDocument(), WAIT_FOR_OPTIONS);
    await waitFor(() => expect(canvas.getByTestId('tabs-dropdown-container')).toBeVisible(), WAIT_FOR_OPTIONS);

    const dropdown = within(canvas.getByTestId('tabs-dropdown-container'));

    await waitFor(
      () => expect(dropdown.getAllByRole('menuitem')[0]).not.toHaveStyle({ pointerEvents: 'none' }),
      WAIT_FOR_OPTIONS
    );
    await userEvent.click(dropdown.getAllByRole('menuitem')[0]);
    expect(args.handleTabClick).toHaveBeenCalled();
    await waitFor(
      async () => expect(await canvas.queryByTestId('tabs-dropdown-container')).not.toBeVisible(),
      WAIT_FOR_OPTIONS
    );
  },
};
