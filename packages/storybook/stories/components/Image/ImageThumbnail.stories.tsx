import { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { fn } from 'storybook/test';
import styled from 'styled-components';

import { Thumbnail, type ThumbnailProps } from '@synerise/ds-image';

import { avatar2, avatar4 } from '../../constants';
import { NO_SNAPSHOT } from '../../utils/chromatic';

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

export const Default: Story = {
  parameters: { ...NO_SNAPSHOT },
};

export const AspectRatioSource: Story = {
  parameters: { ...NO_SNAPSHOT },
  args: { src: SOURCE_IMAGE, alt: 'User avatar', aspectRatio: 'source' },
};

export const SubtleGreyBackground: Story = {
  parameters: { ...NO_SNAPSHOT },
  args: { background: 'subtle-grey', objectFit: 'contain' },
};

export const Cover: Story = {
  parameters: { ...NO_SNAPSHOT },
  args: { aspectRatio: '16:9', objectFit: 'cover' },
};

export const Contain: Story = {
  parameters: { ...NO_SNAPSHOT },
  args: {
    aspectRatio: '16:9',
    objectFit: 'contain',
    background: 'subtle-grey',
  },
};

export const Deletable: Story = {
  parameters: { ...NO_SNAPSHOT },
  args: { deletable: true },
};

export const Empty: Story = {
  parameters: { ...NO_SNAPSHOT },
  args: { src: undefined },
};

export const ErrorFallback: Story = {
  parameters: { ...NO_SNAPSHOT },
  args: { src: BROKEN },
};

export const OpensPreview: Story = {
  parameters: { ...NO_SNAPSHOT },
  args: { openZoom: true },
};

const VARIANTS = {
  Default,
  AspectRatioSource,
  SubtleGreyBackground,
  Cover,
  Contain,
  Deletable,
  Empty,
  ErrorFallback,
  OpensPreview,
};

const MatrixGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  align-items: start;
  gap: 24px;
`;

const MatrixCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

/** Every variant above side by side, so they need no snapshot of their own. */
export const Matrix: Story = {
  // lazy images below the fold may not have loaded when the snapshot is taken
  args: { loading: 'eager' },
  render: (args) => (
    <MatrixGrid>
      {Object.entries(VARIANTS).map(([name, story]) => (
        <MatrixCell key={name}>
          <span>{name}</span>
          <Thumbnail {...args} {...story.args} />
        </MatrixCell>
      ))}
    </MatrixGrid>
  ),
};
