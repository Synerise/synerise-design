import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import type { BadgeProps } from '@synerise/ds-badge';
import type { TooltipProps } from '@synerise/ds-tooltip';
import Toolbar, { ToolbarButton, ToolbarDivider, ToolbarLabel, ToolbarGroup, ToolbarProps } from '@synerise/ds-toolbar';
import Icon, {
  StepBackM,
  StepForwardM,
  AddM,
  RemoveM,
  FullScreenM,
  LocationM,
  ClockM,
  WarningM,
  ClickM,
  Settings2M,
  Calendar2M,
  EditM,
} from '@synerise/ds-icon';

import { fixedWrapper800 } from '../../utils';
import { theme } from '@synerise/ds-core';

export default {
  component: Toolbar,
  title: 'Components/Toolbar',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [fixedWrapper800],
  args: {},
  argsTypes: {},
} as Meta<ToolbarProps>;

const BADGE_PROPS: BadgeProps = {
  count: '5',
  title: 'Title',
  showZero: false,
  outlined: true,
  overflowCount: 99,
};
const TOOLTIP_PROPS: TooltipProps = {
  title: 'Tooltip',
};

export const Default: StoryObj<ToolbarProps> = {
  render: () => {
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarButton mode="single-icon">
            <Icon component={<StepBackM />} />
          </ToolbarButton>
          <ToolbarButton mode="single-icon">
            <Icon component={<StepForwardM />} />
          </ToolbarButton>
        </ToolbarGroup>

        <ToolbarGroup isCompact>
          <ToolbarButton mode="single-icon">
            <Icon component={<AddM />} />
          </ToolbarButton>
          <ToolbarLabel>100%</ToolbarLabel>
          <ToolbarButton mode="single-icon">
            <Icon component={<RemoveM />} />
          </ToolbarButton>
        </ToolbarGroup>

        <ToolbarGroup>
          <ToolbarButton mode="single-icon" tooltipProps={TOOLTIP_PROPS}>
            <Icon component={<FullScreenM />} />
          </ToolbarButton>
        </ToolbarGroup>

        <ToolbarGroup>
          <ToolbarButton mode="single-icon" tooltipProps={TOOLTIP_PROPS}>
            <Icon component={<LocationM />} />
          </ToolbarButton>
        </ToolbarGroup>

        <ToolbarGroup>
          <ToolbarButton mode="icon-label" badgeProps={BADGE_PROPS}>
            <Icon component={<WarningM />} />
            Issues
          </ToolbarButton>
        </ToolbarGroup>

        <ToolbarGroup>
          <ToolbarButton
            mode="icon-label"
            badgeProps={{ ...BADGE_PROPS, count: '2', backgroundColor: 'yellow', backgroundColorHue: '600' }}
          >
            <Icon component={<ClickM />} />
            Insights
          </ToolbarButton>
        </ToolbarGroup>

        <ToolbarGroup>
          <ToolbarButton mode="icon-label" tooltipProps={TOOLTIP_PROPS}>
            <Icon component={<Settings2M />} />
            Settings
          </ToolbarButton>
        </ToolbarGroup>
      </Toolbar>
    );
  },
};

export const SchedulerToolbar: StoryObj<ToolbarProps> = {
  render: () => {
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarButton type="ghost" mode="icon-label" tagProps={{ name: 'ON', color: theme.palette['green-600'] }}>
            <Icon component={<Calendar2M />} />
            Scheduler
          </ToolbarButton>
          <ToolbarDivider />
          <ToolbarButton type="ghost" mode="single-icon">
            <Icon component={<EditM />} />
          </ToolbarButton>
        </ToolbarGroup>

        <ToolbarGroup>
          <ToolbarButton type="ghost" mode="icon-label" tagProps={{ name: '10', color: theme.palette['yellow-600'] }}>
            <Icon component={<ClickM />} />
            Insights
          </ToolbarButton>
        </ToolbarGroup>

        <ToolbarGroup>
          <ToolbarButton
            type="ghost"
            mode="icon-label"
            tagProps={{ name: '5/12 HRS', color: theme.palette['grey-400'] }}
          >
            <Icon component={<ClockM />} />
            Capping
          </ToolbarButton>
        </ToolbarGroup>
      </Toolbar>
    );
  },
};
