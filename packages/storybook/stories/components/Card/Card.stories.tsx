import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Card, { CardBadge, CardSummary, CardGroup } from '@synerise/ds-card';

import { CheckS } from '@synerise/ds-icon';
import type { CardProps } from '@synerise/ds-card';
import {
  CardWithState,
  CARD_CONTENT,
  CARD_HEADER_VARIANTS,
  CARD_SUMMARY_ITEMS,
  CUSTOM_BADGES,
  defaultRender,
} from './card.data';
import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  controlFromOptionsArray,
  REACT_NODE_AS_STRING,
  STYLE_ARG_CONTROL,
} from '../../utils';

type Story = StoryObj<CardProps>;

const CardMeta = {
  component: Card,
  title: 'Components/Card',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  render: defaultRender,
  args: {
    title: 'Title',
    description: 'Description',
    children: CARD_CONTENT,
    showSideChildrenWhenHeaderHidden: true,
    hideContent: true,
    withHeader: true,
  },
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    style: STYLE_ARG_CONTROL,
    headerBorderBottom: BOOLEAN_CONTROL,
    compactHeader: BOOLEAN_CONTROL,
    defaultHeaderBackgroundColor: BOOLEAN_CONTROL,
    disabled: BOOLEAN_CONTROL,
    headerSideChildren: REACT_NODE_AS_STRING,
    hideContent: BOOLEAN_CONTROL,
    onHeaderClick: {
      action: 'onHeaderClick',
    },
    raised: BOOLEAN_CONTROL,
    showSideChildrenWhenHeaderHidden: BOOLEAN_CONTROL,
    withHeader: BOOLEAN_CONTROL,
    withoutPadding: BOOLEAN_CONTROL,
  },
} as Meta<CardProps>;
export default CardMeta;

export const Default: Story = {
  args: {
    icon: <CardBadge icon={<CheckS />} />,
  },
};

export const WithStaticSummary: Story = {
  args: {
    icon: <CardBadge icon={<CheckS />} />,
    staticContent: <CardSummary title="Summary" items={CARD_SUMMARY_ITEMS} data-tesid="card-summary-example" />,
  },
};

export const HeaderVariants: Story = {
  render: args => (
    <CardGroup columns={1}>
      {CARD_HEADER_VARIANTS.map((variantArgs: Partial<CardProps>) => (
        <CardWithState {...args} {...variantArgs} />
      ))}
    </CardGroup>
  ),
  args: {
    title: 'Card header',
    description: 'Description',
    raised: false,
    disabled: false,
    lively: true,
    withHeader: true,
    hideContent: true,
    iconColor: '#54cb0b',
    compactHeader: false,
    headerBorderBottom: false,
    children: 'Example of card content',
    background: 'white-shadow',
    showSideChildrenWhenHeaderHidden: false,
  },
};

export const CustomBadge: StoryObj<CardProps & { customBadgeType: string }> = {
  render: args => {
    const renderBadge = () => {
      return CUSTOM_BADGES[args.customBadgeType];
    };
    return defaultRender({ ...args, renderBadge });
  },
  parameters: {
    controls: {
      include: ['customBadgeType'],
    },
  },
  argTypes: {
    customBadgeType: {
      ...controlFromOptionsArray('inline-radio', ['icon', 'text', 'undefined']),
    },
  },
  args: {
    customBadgeType: 'icon',
  },
};
