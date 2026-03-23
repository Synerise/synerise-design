import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import type { BadgeProps } from '@synerise/ds-badge';
import { theme } from '@synerise/ds-core';
import Icon, {
  AddM,
  Calendar2M,
  ClickM,
  ClockM,
  EditM,
  FullScreenM,
  LocationM,
  RemoveM,
  Settings2M,
  StepBackM,
  StepForwardM,
  WarningM,
} from '@synerise/ds-icon';
import Toolbar, {
  ToolbarButton,
  ToolbarDivider,
  ToolbarGroup,
  ToolbarLabel,
  ToolbarProps,
} from '@synerise/ds-toolbar';
import type { TooltipProps } from '@synerise/ds-tooltip';

import { fixedWrapper800 } from '../../utils';

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
            badgeProps={{
              ...BADGE_PROPS,
              count: '2',
              backgroundColor: 'yellow',
              backgroundColorHue: '600',
            }}
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
          <ToolbarButton
            type="ghost"
            mode="icon-label"
            tagProps={{ name: 'ON', color: theme.palette['green-600'] }}
          >
            <Icon component={<Calendar2M />} />
            Scheduler
          </ToolbarButton>
          <ToolbarDivider />
          <ToolbarButton type="ghost" mode="single-icon">
            <Icon component={<EditM />} />
          </ToolbarButton>
        </ToolbarGroup>

        <ToolbarGroup>
          <ToolbarButton
            type="ghost"
            mode="icon-label"
            tagProps={{ name: '10', color: theme.palette['yellow-600'] }}
          >
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
