import { Meta, StoryObj } from '@storybook/react';

import { within, userEvent, expect, fn } from '@storybook/test';
import type { TabsProps } from '@synerise/ds-tabs';
import { fixedWrapper300, waitFor } from '../../utils';

import ListItemMeta, { TabsWithConfiguration, TabsWithConfigurationDisabled } from './Tabs.stories';

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
    await waitFor(() => expect(canvas.getByTestId('tabs-dropdown-container')).toBeInTheDocument());
    await waitFor(() => expect(canvas.getByTestId('tabs-dropdown-container')).toBeVisible());

    const dropdown = within(canvas.getByTestId('tabs-dropdown-container'));
    const label = args.configuration?.label || 'Manage tabs';
    await waitFor(() => expect(dropdown.getByText(label)).not.toHaveStyle({ pointerEvents: 'none' }));
  },
};

export const TabsWithConfigurationOpen: Story = {
  ...TabsWithConfiguration,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('tabs-dropdown-trigger'));
    await waitFor(() => expect(canvas.getByTestId('tabs-dropdown-container')).toBeInTheDocument());
    await waitFor(() => expect(canvas.getByTestId('tabs-dropdown-container')).toBeVisible());

    const dropdown = within(canvas.getByTestId('tabs-dropdown-container'));
    const label = args.configuration?.label || 'Manage tabs';
    await waitFor(() => expect(dropdown.getByText(label)).toHaveStyle({ pointerEvents: 'none' }));
  },
};

export const TabsWithConfigurationDisabledAndHiddenTabsOpen: Story = {
  ...TabsWithConfigurationDisabled,
  decorators: [fixedWrapper300],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('tabs-dropdown-trigger'));
    await waitFor(() => expect(canvas.getByTestId('tabs-dropdown-container')).toBeInTheDocument());
    await waitFor(() => expect(canvas.getByTestId('tabs-dropdown-container')).toBeVisible());

    const dropdown = within(canvas.getByTestId('tabs-dropdown-container'));
    const label = args.configuration?.label || 'Manage tabs';
    await waitFor(() => expect(dropdown.getByText(label)).not.toHaveStyle({ pointerEvents: 'none' }));
  },
};

export const TabsWithConfigurationAndHiddenTabsOpen: Story = {
  ...TabsWithConfigurationDisabled,
  decorators: [fixedWrapper300],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('tabs-dropdown-trigger'));
    await waitFor(() => expect(canvas.getByTestId('tabs-dropdown-container')).toBeInTheDocument());
    await waitFor(() => expect(canvas.getByTestId('tabs-dropdown-container')).toBeVisible());
    const dropdown = within(canvas.getByTestId('tabs-dropdown-container'));
    const label = args.configuration?.label || 'Manage tabs';
    await waitFor(() => expect(dropdown.getByText(label)).not.toHaveStyle({ pointerEvents: 'none' }));
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
    await waitFor(() => expect(canvas.getByTestId('tabs-dropdown-container')).toBeInTheDocument());
    await waitFor(() => expect(canvas.getByTestId('tabs-dropdown-container')).toBeVisible());

    const dropdown = within(canvas.getByTestId('tabs-dropdown-container'));
    const label = args.configuration?.label || 'Manage tabs';
    await waitFor(() => expect(dropdown.getByText(label)).not.toHaveStyle({ pointerEvents: 'none' }));
    await userEvent.click(dropdown.getByText(label));
    expect(args.handleTabClick).not.toHaveBeenCalled();
    expect(args.configuration?.action).toHaveBeenCalled();
    await waitFor(async () => expect(await canvas.queryByTestId('tabs-dropdown-container')).not.toBeVisible());
  },
};

export const TabsDropdownHideAfterHiddenTabClick: Story = {
  ...TabsWithConfiguration,
  decorators: [fixedWrapper300],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('tabs-dropdown-trigger'));

    await waitFor(() => expect(canvas.getByTestId('tabs-dropdown-container')).toBeInTheDocument());
    await waitFor(() => expect(canvas.getByTestId('tabs-dropdown-container')).toBeVisible());
    
    const dropdown = within(canvas.getByTestId('tabs-dropdown-container'));

    await waitFor(() => expect(dropdown.getAllByRole('menuitem')[0]).not.toHaveStyle({ pointerEvents: 'none' }));
    await userEvent.click(dropdown.getAllByRole('menuitem')[0]);
    expect(args.handleTabClick).toHaveBeenCalled();
    await waitFor(async () => expect(await canvas.queryByTestId('tabs-dropdown-container')).not.toBeVisible());
  },
};
