import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import Icon, { ClockS, AbTestXl, CalendarXl, LaunchXl, AdOnDemandL } from '@synerise/ds-icon';
import CardSelect from '@synerise/ds-card-select';
import type { CardSelectProps } from '@synerise/ds-card-select';

import { theme } from '@synerise/ds-core';
import {
  cardSelectWrapper,
  reactNodeAsSelect,
  NUMBER_CONTROL,
  BOOLEAN_CONTROL,
  REACT_NODE_AS_STRING,
  controlFromOptionsArray,
  CLASSNAME_ARG_CONTROL,
} from '../../utils';

type CardSelectStoryProps = CardSelectProps & { showTag?: boolean; showTagTooltip?: boolean };

type Story = StoryObj<CardSelectStoryProps>;

const tagProps = {
  name: 'Coming soon',
  color: theme.palette['yellow-600'],
  prefixel: <Icon size={20} className="icon1" color={theme.palette.white} component={<ClockS />} />,
};

const tagTooltipProps = { title: 'Coming in Q3' };

const infoTooltipProps = { title: 'Displayed only by calling a dedicated SDK method' };

export default {
  component: CardSelect,
  title: 'Components/CardSelect',
  tags: ['autodocs'],
  decorators: [cardSelectWrapper],
  render: args => {
    const [{ value }, updateArgs] = useArgs();
    const handleChange = (newValue: boolean) => {
      updateArgs({
        value: newValue,
      });
      args.onChange?.(newValue);
    };
    const { showTag, showTagTooltip, ...rest } = args;
    return (
      <CardSelect
        tagProps={showTag ? tagProps : undefined}
        tagTooltipProps={showTagTooltip ? tagTooltipProps : undefined}
        infoTooltipProps={showTagTooltip ? infoTooltipProps : undefined}
        {...rest}
        value={value}
        onChange={handleChange}
      />
    );
  },
  args: {
    title: 'A/B Tests',
    tickVisible: false,
  },
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    title: REACT_NODE_AS_STRING,
    description: REACT_NODE_AS_STRING,
    tickVisible: BOOLEAN_CONTROL,
    value: BOOLEAN_CONTROL,
    disabled: BOOLEAN_CONTROL,
    error: BOOLEAN_CONTROL,
    showTag: BOOLEAN_CONTROL,
    showTagTooltip: BOOLEAN_CONTROL,
    raised: BOOLEAN_CONTROL,
    icon: reactNodeAsSelect(['AbTestXl', 'LaunchXl', 'CalendarXl'], {
      AbTestXl: <AbTestXl />,
      LaunchXl: <LaunchXl />,
      CalendarXl: <CalendarXl />,
    }),
    iconSize: NUMBER_CONTROL,
    tickSize: NUMBER_CONTROL,
    elementsPosition: controlFromOptionsArray('select', ['left', 'center', 'right']),
  },
} as Meta<CardSelectStoryProps>;

export const Simple: Story = {};
export const WithIcon: Story = {
  args: {
    tickVisible: false,
    icon: <AbTestXl />,
  },
};

export const WithTick: Story = {
  args: {
    tickVisible: true,
    icon: <AbTestXl />,
  },
};

export const WithInformationalTooltip: Story = {
  args: {
    tickVisible: true,
    icon: <AdOnDemandL />,
    infoTooltipProps,
    title: 'On demand',
  },
};

export const WithTag: Story = {
  parameters: {
    controls: {
      exclude: ['showTag', 'showTagTooltip'],
    },
  },
  args: {
    title: 'Semantic search',
    description: 'Method interprets user queries contextually for more meaningful results',
    tagProps,
  },
};

export const WithTooltipOnTag: Story = {
  parameters: {
    controls: {
      exclude: ['showTag', 'showTagTooltip'],
    },
  },
  args: {
    title: 'Semantic search',
    description: 'Method interprets user queries contextually for more meaningful results',
    tagProps,
    tagTooltipProps,
  },
};

export const WithShadow: Story = {
  parameters: {
    controls: {
      exclude: ['showTag', 'showTagTooltip'],
    },
  },
  args: {
    title: 'Semantic search',
    description: 'Method interprets user queries contextually for more meaningful results',
    tagProps,
    icon: <AbTestXl />,
    raised: true,
  },
};

export const SmallSize: Story = {
  args: {
    size: 'small',
    icon: <AbTestXl />,
  },
};

export const SmallSizeWithTick: Story = {
  args: {
    tickVisible: true,
    size: 'small',
    icon: <AbTestXl />,
  },
};

export const SmallSizeWithTag: Story = {
  parameters: {
    controls: {
      exclude: ['showTag', 'showTagTooltip'],
    },
  },
  args: {
    tickVisible: true,
    size: 'small',
    icon: <AbTestXl />,
    tagProps,
  },
};

export const Disabled: Story = {
  args: {
    icon: <AbTestXl />,
    disabled: true,
    title: 'Semantic search',
    description: 'Method interprets user queries contextually for more meaningful results',
    tagProps,
    tagTooltipProps,
  },
};

export const SmallSizeDisabled: Story = {
  args: {
    size: 'small',
    icon: <AbTestXl />,
    disabled: true,
    title: 'Semantic search',
    description: 'Method interprets user queries contextually for more meaningful results',
    tagProps,
    tagTooltipProps,
  },
};
