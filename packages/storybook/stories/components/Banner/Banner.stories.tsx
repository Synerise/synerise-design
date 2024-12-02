import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Banner, { BannerProps } from '@synerise/ds-banner';
import Icon, { ArrowRightCircleM, ProductLastSeenColor, ShopingBagColor } from '@synerise/ds-icon';
import { avatar12 } from '../../constants';


import {
  BOOLEAN_CONTROL,
  controlFromOptionsArray,
  fixedWrapper1200,
  flexColumnWrapper,
  NUMBER_CONTROL,
} from '../../utils';
import { SLIDES } from './Banner.data';
import Button from '@synerise/ds-button';

export default {
  component: Banner,
  title: 'Components/Banner',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [fixedWrapper1200],
  argTypes: {
    autoPlay: BOOLEAN_CONTROL,
    autoPlaySpeed: NUMBER_CONTROL,
    texts: { control: false },
    transitionEffect: controlFromOptionsArray('inline-radio', ['fade', 'scrollx']),
  },
} as Meta<BannerProps>;

export const Default: StoryObj<BannerProps> = {
  args: {
    slides: SLIDES,
  },
};

export const Expandable: StoryObj<BannerProps> = {
  args: {
    expandable: {
      title: 'Collapsed Banner Header Example',
      icon: <Icon component={<ProductLastSeenColor />} />,
    },
    slides: SLIDES,
  },
};

export const AllLayouts: StoryObj<BannerProps> = {
  decorators: [flexColumnWrapper],
  render: ({ slides, expandable, ...args }) => {
    return (
      <>
        {slides?.map(slide => (
          <Banner
            {...args}
            expandable={{
              ...expandable,
              title: slide.label,
            }}
            slides={[slide]}
          />
        ))}
      </>
    );
  },
  args: {
    expandable: {
      title: 'Collapsed Banner Header Example',
      icon: <Icon component={<ProductLastSeenColor />} />,
    },
    slides: SLIDES,
  },
};
