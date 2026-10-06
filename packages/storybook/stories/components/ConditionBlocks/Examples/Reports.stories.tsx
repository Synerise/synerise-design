import { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import Button from '@synerise/ds-button';
import {
  ConditionAddButton,
  ConditionEntity,
  ConditionGroup,
  ConditionRow,
  ConditionRows,
  ConditionTextSlot,
} from '@synerise/ds-condition-blocks';
import Icon, {
  Add2M,
  AngleDownS,
  NotificationsM,
  VarTypeNumberM,
  VarTypeStringM,
} from '@synerise/ds-icon';

import { fixedWrapper1200 } from '../../../utils';

/**
 * Recreation of the Reports "aggregate exception" builder from Figma, composed from
 * ds-condition-blocks. `ConditionTextSlot` supplies the inline connective copy ("Except for",
 * "use") between the interactive controls.
 */
const pill = (label: React.ReactNode) => (
  <Button type="secondary" mode="label-icon">
    {label}
    <Icon component={<AngleDownS />} />
  </Button>
);

const meta: Meta = {
  decorators: [fixedWrapper1200],
  title: 'Components/Filter/ConditionBlocks/Examples',
  parameters: { layout: 'centered' },
  tags: ['visualtests'],
};

export default meta;

const aggregateChip = (
  <Button type="custom-color" color="green" mode="two-icons">
    <Icon component={<VarTypeStringM />} />
    Example aggregate
    <Icon component={<AngleDownS />} />
  </Button>
);

const metricPill = (label: string) => (
  <Button type="secondary" mode="icon-label">
    <Icon component={<VarTypeNumberM />} />
    {label}
  </Button>
);

const eventPill = (label: string) => (
  <Button type="secondary" mode="icon-label">
    <Icon component={<NotificationsM />} />
    {label}
  </Button>
);

const REGROUP_ROWS = [
  { metric: 'Metric B', event: 'Page visit' },
  { metric: 'Metric AB', event: 'Screen view' },
];

export const Reports: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionGroup>
  <ConditionEntity>
    <Button type="custom-color" color="green" mode="two-icons">
      <Icon component={<VarTypeStringM />} />
      Example aggregate
      <Icon component={<AngleDownS />} />
    </Button>
    <ConditionTextSlot muted>Except for</ConditionTextSlot>
  </ConditionEntity>
  <ConditionRows>
    {REGROUP_ROWS.map((row, index) => (
      <ConditionRow
        key={row.metric}
        gap={8}
        connector={{ first: index === 0, last: false }}
      >
        <Button type="secondary" mode="icon-label">
          <Icon component={<VarTypeNumberM />} />
          {row.metric}
        </Button>
        <Button type="secondary" mode="icon-label">
          <Icon component={<NotificationsM />} />
          {row.event}
        </Button>
        <ConditionTextSlot muted>use</ConditionTextSlot>
        <Button type="secondary" mode="label-icon">
          Choose dimension
          <Icon component={<AngleDownS />} />
        </Button>
      </ConditionRow>
    ))}
    <ConditionAddButton withConnector>
      <Button type="ghost" mode="icon-label">
        <Icon component={<Add2M />} />
        Add exception
      </Button>
    </ConditionAddButton>
  </ConditionRows>
</ConditionGroup>`,
      },
    },
  },
  render: () => (
    <ConditionGroup>
      <ConditionEntity>
        {aggregateChip}
        <ConditionTextSlot muted>Except for</ConditionTextSlot>
      </ConditionEntity>
      <ConditionRows>
        {REGROUP_ROWS.map((row, index, all) => (
          <ConditionRow
            key={row.metric}
            gap={8}
            connector={{ first: index === 0, last: false }}
          >
            {metricPill(row.metric)}
            {eventPill(row.event)}
            <ConditionTextSlot muted>use</ConditionTextSlot>
            {pill('Choose dimension')}
          </ConditionRow>
        ))}
        <ConditionAddButton withConnector>
          <Button type="ghost" mode="icon-label">
            <Icon component={<Add2M />} />
            Add exception
          </Button>
        </ConditionAddButton>
      </ConditionRows>
    </ConditionGroup>
  ),
};
