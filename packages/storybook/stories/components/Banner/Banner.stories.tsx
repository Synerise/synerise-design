import React from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import Banner, { BannerProps } from '@synerise/ds-banner';
import Icon, { ProductLastSeenColor } from '@synerise/ds-icon';

import {
  BOOLEAN_CONTROL,
  NUMBER_CONTROL,
  controlFromOptionsArray,
  fixedWrapper1200,
  flexColumnWrapper,
} from '../../utils';
import { SLIDES } from './Banner.data';

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
    transitionEffect: controlFromOptionsArray('inline-radio', [
      'fade',
      'scrollx',
    ]),
  },
  args: {
    onClose: fn(),
    onBeforeChange: fn(),
    onAfterChange: fn(),
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
        {slides?.map((slide) => (
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
