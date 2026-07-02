import React from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Gallery, type GalleryProps } from '@synerise/ds-image';

import { avatar1, avatar2, avatar3, avatar4, avatar5 } from '../../constants';

const IMAGES = [
  { src: avatar1, alt: 'User avatar 1' },
  { src: avatar2, alt: 'User avatar 2' },
  { src: avatar3, alt: 'User avatar 3' },
  { src: avatar4, alt: 'User avatar 4' },
  { src: avatar5, alt: 'User avatar 5' },
];

const meta: Meta<GalleryProps> = {
  title: 'Components/Image/Gallery',
  component: Gallery,
  argTypes: {
    aspectRatio: {
      control: 'select',
      options: ['1:1', '4:3', '16:9', 'source'],
    },
    size: {
      control: 'select',
      options: ['custom', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'],
    },
    background: { control: 'inline-radio', options: ['none', 'subtle-grey'] },
    objectFit: { control: 'inline-radio', options: ['contain', 'cover'] },
    openZoom: { control: 'boolean' },
    deletable: { control: 'boolean' },
    initialZoom: { control: 'inline-radio', options: ['fit', 'real-size'] },
    onDelete: { action: 'delete' },
    images: { table: { disable: true } },
    fallback: { table: { disable: true } },
  },
  args: {
    images: IMAGES,
    aspectRatio: '1:1',
    size: 's',
    background: 'subtle-grey',
    objectFit: 'cover',
    openZoom: true,
    deletable: false,
    onDelete: fn(),
  },
};

export default meta;

type Story = StoryObj<GalleryProps>;

export const Default: Story = {};

export const CoverSquares: Story = {
  args: { aspectRatio: '1:1', objectFit: 'cover', background: 'none' },
};

export const ContainWide: Story = {
  args: {
    aspectRatio: '16:9',
    objectFit: 'contain',
    background: 'subtle-grey',
  },
};

export const Deletable: Story = {
  args: { deletable: true },
};

export const WithBrokenImage: Story = {
  args: {
    images: [
      IMAGES[0],
      { src: 'https://example.com/broken.jpg', alt: 'Broken image' },
      IMAGES[2],
    ],
  },
};
