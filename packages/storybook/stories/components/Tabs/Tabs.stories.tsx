import React, { ReactNode } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { action } from '@storybook/addon-actions';
import { within, expect, waitFor, userEvent, fn } from '@storybook/test';

import { BooleanM, CalendarM, HashM, ListM, SearchM, TextM } from '@synerise/ds-icon';
import Tabs from '@synerise/ds-tabs';
import type { TabsProps, TabsConfiguration } from '@synerise/ds-tabs';

import { theme } from '@synerise/ds-core';
import { fixedWrapper588, BOOLEAN_CONTROL, fixedWrapper300 } from '../../utils';
import Badge from '@synerise/ds-badge';

type Story = StoryObj<TabsProps>;

const labelsAndIcons = [
  {
    icon: <SearchM />,
    label: <span>Tab first</span>,
  },
  {
    icon: <SearchM />,
    label: <span>Tab second</span>,
  },
  {
    icon: <SearchM />,
    label: 'Tab third',
  },
];

const icons = [
  {
    icon: <CalendarM />,
    tooltip: 'Date',
  },
  {
    icon: <TextM />,
    tooltip: 'Text',
  },
  {
    icon: <HashM />,
    tooltip: 'Number',
  },
  {
    icon: <BooleanM />,
    tooltip: 'Boolean',
  },
  {
    icon: <ListM />,
    tooltip: 'Array',
  },
];

const defaultLabels = ['Tab first', 'Tab second', 'Tab third', 'Tab fourth'];
const tabsConfiguration: TabsConfiguration = {
  label: 'Manage tabs',
  action: action('configuration action'),
  disabled: false,
};
const counterBadge = (
  <Badge
    count={1}
    overflowCount={99}
    style={{
      backgroundColor: 'transparent',
      color: theme.palette['grey-500'],
      alignItems: 'center',
      marginRight: String(1).length > 1 ? '-1px' : '-3px',
    }}
  />
);

const getTabsFromLabels = (labels: string[], icon?: ReactNode, disabled?: boolean, suffixel?: ReactNode) => {
  return labels.map(label => ({
    label,
    icon,
    disabled,
    suffixel,
  }));
};

export default {
  component: Tabs,
  title: 'Components/Tabs',
  tags: ['autodocs'],
  decorators: [fixedWrapper588],
  render: args => {
    const [{ activeTab }, updateArgs] = useArgs();
    const handleTabClick = (tabIndex: number) => {
      updateArgs({
        activeTab: tabIndex,
      });
      args.handleTabClick?.(tabIndex);
    };

    return <Tabs {...args} activeTab={activeTab} handleTabClick={handleTabClick} />;
  },
  args: {
    tabs: getTabsFromLabels(defaultLabels),
    activeTab: 0,
    handleTabClick: fn(),
  },
  argTypes: {
    handleTabClick: {
      action: 'handleTabClick',
    },
    underscore: BOOLEAN_CONTROL,
    block: BOOLEAN_CONTROL,
  },
} as Meta<TabsProps>;

export const Simple: Story = {};

export const WithoutUnderscore: Story = {
  args: {
    underscore: false,
  },
};

export const BlockLayout: Story = {
  args: {
    block: true,
  },
};
export const NoActiveTab: Story = {
  args: {
    activeTab: undefined,
  },
};

export const DisabledTabs: Story = {
  args: {
    tabs: getTabsFromLabels(defaultLabels, undefined, true, counterBadge),
  },
};

export const WithCounterSuffix: Story = {
  args: {
    tabs: getTabsFromLabels(defaultLabels, undefined, false, counterBadge),
  },
};

export const WithHiddenTabs: Story = {
  decorators: [fixedWrapper300],
  args: {
    tabs: getTabsFromLabels(defaultLabels, undefined, false, counterBadge),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(async () => expect(await canvas.findAllByRole('button')).toHaveLength(3));
  },
};

export const WithIcons: Story = {
  args: {
    tabs: icons,
    block: true,
  },
};

export const WithIconsAndTooltip: Story = {
  args: {
    tabs: icons,
    block: true,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await waitFor(async () => expect(await canvas.findAllByTestId('ds-tabs-tab-icon')).toHaveLength(args.tabs.length));
    const buttons = await canvas.findAllByTestId('ds-tabs-tab-icon');
    userEvent.hover(buttons[0]);
    await waitFor(async () => expect(await canvas.findByText(args.tabs[0].tooltip)).toBeVisible());
  },
};
export const WithIconsAndLabels: Story = {
  args: {
    tabs: labelsAndIcons,
    block: true,
  },
};

export const EmptyTabsWithConfiguration: Story = {
  args: {
    tabs: [],
    configuration: tabsConfiguration,
  },
};

export const TabsWithConfiguration: Story = {
  args: {
    tabs: getTabsFromLabels(defaultLabels, undefined, false, counterBadge),
    configuration: tabsConfiguration,
  },
};

export const TabsWithConfigurationDisabled: Story = {
  args: {
    tabs: getTabsFromLabels(defaultLabels, undefined, false, counterBadge),
    configuration: {
      ...tabsConfiguration,
      disabled: true,
    },
  },
};
