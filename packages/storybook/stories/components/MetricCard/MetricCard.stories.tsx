import React from 'react';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@synerise/ds-button';
import { FormattedNumber } from '@synerise/ds-core';
import Icon, { ArrowRightCircleM, OptionHorizontalM } from '@synerise/ds-icon';
import MetricCard, { MetricCardProps } from '@synerise/ds-metric-card';

import {
  BOOLEAN_CONTROL,
  REACT_NODE_AS_STRING,
  STRING_CONTROL,
  fixedWrapper300,
} from '../../utils';
import { COMPACT_NUMBER_OPTIONS } from './MetricCard.data';

export default {
  component: MetricCard,
  title: 'Components/MetricCard',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [fixedWrapper300],
  argTypes: {
    title: REACT_NODE_AS_STRING,
    headerRightSide: REACT_NODE_AS_STRING,
    displayValue: REACT_NODE_AS_STRING,
    hoverValue: REACT_NODE_AS_STRING,
    tooltip: REACT_NODE_AS_STRING,
    tooltipConfig: { control: false },
    greyBackground: BOOLEAN_CONTROL,
    isLoading: BOOLEAN_CONTROL,
    texts: {
      copyTooltip: REACT_NODE_AS_STRING,
      copiedTooltip: REACT_NODE_AS_STRING,
    },
    copyValue: STRING_CONTROL,
  },
} as Meta<MetricCardProps>;

export const Default: StoryObj<MetricCardProps> = {
  args: {
    title: 'Name',
    headerRightSide: (
      <Button type="ghost" mode="single-icon">
        <Icon size={24} component={<OptionHorizontalM />} />
      </Button>
    ),
    displayValue: (
      <FormattedNumber options={COMPACT_NUMBER_OPTIONS} value={12345} />
    ),
    hoverValue: <FormattedNumber value={12345} />,
    texts: {
      copyTooltip: 'Copy',
      copiedTooltip: 'Copied!',
    },
    copyValue: '12345',
  },
};

export const withTooltipIcon: StoryObj<MetricCardProps> = {
  ...Default,
  args: {
    ...Default.args,
    tooltip: 'Copy',
  },
};

export const withButton: StoryObj<MetricCardProps> = {
  args: {
    title: 'Name',
    tooltip: 'Copy',
    headerRightSide: (
      <Button type="ghost" mode="label-icon">
        More
        <Icon size={24} component={<ArrowRightCircleM />} />
      </Button>
    ),
    displayValue: '4,34%',
    hoverValue: '4,34%',
    texts: {
      copyTooltip: 'Copy',
      copiedTooltip: 'Copied!',
    },
    copyValue: '4,34%',
  },
};

export const withText: StoryObj<MetricCardProps> = {
  ...withButton,
  args: {
    ...withButton.args,
    displayValue: 'medium',
    hoverValue: 'medium',
    copyValue: 'medium',
  },
};

export const withEllipsisText: StoryObj<MetricCardProps> = {
  ...withButton,
  args: {
    ...withButton.args,
    title: 'Namenamenamenamenamenamenamenamenamenamenamename',
    headerRightSide: (
      <Button type="ghost" mode="single-icon">
        <Icon size={24} component={<OptionHorizontalM />} />
      </Button>
    ),
    displayValue: (
      <FormattedNumber
        options={COMPACT_NUMBER_OPTIONS}
        value={123459099099909}
      />
    ),
    hoverValue: <FormattedNumber value={1234590090909090} />,
    copyValue: '1234590090909090',
  },
};

export const withSkeleton: StoryObj<MetricCardProps> = {
  args: {
    title: 'Name',
    tooltip: 'Name',
    isLoading: true,
  },
};

export const withInlineAlert: StoryObj<MetricCardProps> = {
  args: {
    title: 'Name',
    tooltip: 'Name',
    errorMessage: 'This is simple text',
  },
};
