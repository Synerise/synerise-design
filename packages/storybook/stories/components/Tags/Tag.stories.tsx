import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Badge from '@synerise/ds-badge';
import { theme } from '@synerise/ds-core';
import Icon, { Add3M } from '@synerise/ds-icon';
import Tag, { TagShape, TagProps } from '@synerise/ds-tag';
import { getColorText } from '@synerise/ds-tag/dist/Tag.styles';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  COLOR_CONTROL,
  controlFromOptionsArray,
  STRING_CONTROL,
  STYLE_ARG_CONTROL,
} from '../../utils';
import { getTagNameForShape } from './Tags.utils';
import { TAG_COLOR } from './Tags.constants';

type Story = StoryObj<TagProps>;

const TagMeta = {
  title: 'Components/Tags',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      ...COLOR_CONTROL,
    },
    textColor: {
      ...COLOR_CONTROL,
    },
    name: STRING_CONTROL,
    id: STRING_CONTROL,
    image: STRING_CONTROL,
    shape: {
      ...controlFromOptionsArray('select', Object.values(TagShape)),
      mapping: TagShape,
    },
    removable: BOOLEAN_CONTROL,
    disabled: BOOLEAN_CONTROL,
    asPill: BOOLEAN_CONTROL,
    className: CLASSNAME_ARG_CONTROL,
    style: STYLE_ARG_CONTROL,
  },
  args: {
    name: 'Tag name',
  },
} as Meta<TagProps>;
export default TagMeta;

export const SingleTag: Story = {};
export const AllTagShapes: Story = {
  render: ({ name, ...args }) => {
    return (
      <>
        {Object.values(TagShape).map(shape => (
          <div>
            <Tag {...args} name={getTagNameForShape(shape, name)} shape={shape} />
          </div>
        ))}
      </>
    );
  },
};
export const Pill: Story = {
  args: {
    asPill: true,
    shape: TagShape.SMALL_ROUND,
  },
};

export const WithPrefixAndSuffix: Story = {
  parameters: {
    controls: {
      include: ['name', 'disabled', 'asPill'],
    },
  },
  args: {
    shape: TagShape.DEFAULT_ROUND,
    color: TAG_COLOR,
    suffixel: (
      <Badge
        count={1}
        overflowCount={99}
        outlined={false}
        style={{
          ...{ boxShadow: `0 0 0 1px ${getColorText(theme, TAG_COLOR)}` },
          margin: '0px',
          backgroundColor: 'transparent',
          color: getColorText(theme, TAG_COLOR),
          alignItems: 'center',
        }}
      />
    ),
    prefixel: (
      <Badge
        count={1}
        overflowCount={99}
        outlined={false}
        style={{
          ...{ boxShadow: `0 0 0 1px ${getColorText(theme, TAG_COLOR)}` },
          backgroundColor: 'transparent',
          color: getColorText(theme, TAG_COLOR),
          alignItems: 'center',
          margin: '0px',
        }}
      />
    ),
  },
};

export const WithIconPrefix: Story = {
  parameters: {
    controls: {
      include: ['name', 'disabled', 'asPill'],
    },
  },
  args: {
    shape: TagShape.DEFAULT_ROUND,
    color: TAG_COLOR,
    prefixel: <Icon className="icon1" component={<Add3M />} size={20} color={getColorText(theme, TAG_COLOR)} />,
  },
};
