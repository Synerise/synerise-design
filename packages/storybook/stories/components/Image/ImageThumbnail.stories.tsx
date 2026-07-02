import React from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Thumbnail, type ThumbnailProps } from '@synerise/ds-image';

import { avatar2, avatar4 } from '../../constants';

const DEFAULT_IMAGE = avatar4;
const SOURCE_IMAGE = avatar2;
const BROKEN = 'https://example.com/does-not-exist.jpg';

const meta: Meta<ThumbnailProps> = {
  title: 'Components/Image/Thumbnail',
  component: Thumbnail,
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    aspectRatio: {
      control: 'select',
      options: ['1:1', '4:3', '16:9', 'source'],
    },
    size: {
      control: 'select',
      options: ['custom', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'],
    },
    height: { control: 'number' },
    background: { control: 'inline-radio', options: ['none', 'subtle-grey'] },
    objectFit: { control: 'inline-radio', options: ['contain', 'cover'] },
    loading: { control: 'inline-radio', options: ['lazy', 'eager'] },
    deletable: { control: 'boolean' },
    openZoom: { control: 'boolean' },
    onDelete: { action: 'delete' },
    onClick: { action: 'click' },
    fallback: { table: { disable: true } },
  },
  args: {
    src: DEFAULT_IMAGE,
    alt: 'User avatar',
    aspectRatio: '1:1',
    size: 'm',
    background: 'none',
    objectFit: 'cover',
    loading: 'lazy',
    deletable: false,
    openZoom: false,
    onDelete: fn(),
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<ThumbnailProps>;

export const Default: Story = {};

export const AspectRatioSource: Story = {
  args: { src: SOURCE_IMAGE, alt: 'User avatar', aspectRatio: 'source' },
};

export const SubtleGreyBackground: Story = {
  args: { background: 'subtle-grey', objectFit: 'contain' },
};

export const Cover: Story = {
  args: { aspectRatio: '16:9', objectFit: 'cover' },
};

export const Contain: Story = {
  args: {
    aspectRatio: '16:9',
    objectFit: 'contain',
    background: 'subtle-grey',
  },
};

export const Deletable: Story = {
  args: { deletable: true },
};

export const Empty: Story = {
  args: { src: undefined },
};

export const ErrorFallback: Story = {
  args: { src: BROKEN },
};

export const OpensPreview: Story = {
  args: { openZoom: true },
};
