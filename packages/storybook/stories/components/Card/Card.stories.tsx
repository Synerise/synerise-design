import React, { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Card, { CardBadge, CardGroup, CardSummary } from '@synerise/ds-card';
import type { CardProps } from '@synerise/ds-card';
import { CheckS } from '@synerise/ds-icon';
import Layout from '@synerise/ds-layout';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  REACT_NODE_AS_STRING,
  STYLE_ARG_CONTROL,
  controlFromOptionsArray,
} from '../../utils';
import * as S from '../Layout/components/Layout.styles';
import {
  CARD_CONTENT,
  CARD_HEADER_VARIANTS,
  CARD_SUMMARY_ITEMS,
  CUSTOM_BADGES,
  CardWithState,
  TYPES_OF_BADGES,
  defaultRender,
} from './card.data';

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
export const withLayout: Story = {
  render: (args) => {
    const [leftOpened, setLeftOpened] = useState(false);
    const [rightOpened, setRightOpened] = useState(false);

    return (
      <Card {...args}>
        <Layout
          renderLeftSidebarControls
          renderRightSidebarControls
          left={{
            content: <S.Placeholder></S.Placeholder>,
            opened: leftOpened,
            onChange: setLeftOpened,
          }}
          right={{
            content: <S.Placeholder></S.Placeholder>,
            opened: rightOpened,
            onChange: setRightOpened,
          }}
        >
          {CARD_CONTENT}
        </Layout>
      </Card>
    );
  },
  args: {
    icon: <CardBadge icon={<CheckS />} />,
    background: 'grey-shadow',
    defaultHeaderBackgroundColor: true,
    hideContent: false,
    title: 'title',
    description: 'description',
    withoutPadding: true,
  },
};

export const Static: Story = {
  render: (args) => <Card {...args}>{CARD_CONTENT}</Card>,
  args: {
    icon: <CardBadge icon={<CheckS />} />,
    hideContent: false,
    title: 'title',
    description: 'description',
  },
};

export const WithGreyBackground: Story = {
  args: {
    icon: <CardBadge icon={<CheckS />} />,
    background: 'grey-shadow',
    defaultHeaderBackgroundColor: true,
  },
};

export const WithStaticSummary: Story = {
  args: {
    icon: <CardBadge icon={<CheckS />} />,
    staticContent: (
      <CardSummary
        title="Summary"
        items={CARD_SUMMARY_ITEMS}
        data-tesid="card-summary-example"
      />
    ),
  },
};

export const HeaderVariants: Story = {
  render: (args) => (
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

export const BadgeVariants: Story = {
  render: (args) => (
    <CardGroup columns={1}>
      {TYPES_OF_BADGES.map((icons) => (
        <Card {...args} icon={icons.icon} />
      ))}
    </CardGroup>
  ),
};

export const CustomBadge: StoryObj<CardProps & { customBadgeType: string }> = {
  render: (args) => {
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
