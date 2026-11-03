import { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect, userEvent, within } from 'storybook/test';

import Badge from '@synerise/ds-badge';
import Icon, { Add3M } from '@synerise/ds-icon';
import InformationCard from '@synerise/ds-information-card';
import Tag, { TagProps, TagShape } from '@synerise/ds-tag';
import { getColorText } from '@synerise/ds-tag/dist/Tag.styles';

import { avatar1 } from '../../constants';
import { VISIBLE_TAG_SHAPES } from '../../constants/tagShapes';
import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  COLOR_CONTROL,
  controlFromOptionsArray,
  STRING_CONTROL,
  STYLE_ARG_CONTROL,
} from '../../utils';
import { NO_SNAPSHOT } from '../../utils/chromatic';
import { CompleteExample } from '../InformationCard/InformationCard.stories';
import { TAG_COLOR } from './Tags.constants';
import { getTagNameForShape } from './Tags.utils';

type Story = StoryObj<TagProps>;

const TagMeta = {
  title: 'Components/Tags/Tag',
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
    image: {
      ...STRING_CONTROL,
      description: 'Deprecated: pass `<img src alt="" />` as `prefixel`.',
    },
    shape: {
      ...controlFromOptionsArray('select', VISIBLE_TAG_SHAPES),
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

export const SingleTag: Story = {
  parameters: { ...NO_SNAPSHOT },
};
export const AllTagShapes: Story = {
  render: ({ name, ...args }) => {
    return (
      <>
        {VISIBLE_TAG_SHAPES.map((shape) => (
          <div key={shape}>
            <Tag
              {...args}
              name={getTagNameForShape(shape, name)}
              shape={shape}
            />
          </div>
        ))}
      </>
    );
  },
};

export const Pill: Story = {
  parameters: { ...NO_SNAPSHOT },
  args: {
    asPill: true,
    shape: TagShape.SMALL_ROUND,
  },
};
export const WithInformationCard: Story = {
  parameters: { ...NO_SNAPSHOT },
  args: {
    tooltipProps: {
      render: () => (
        <InformationCard
          {...CompleteExample.args}
          title="Tag Information"
          subtitle="Additional details about the tag"
          asTooltip
        />
      ),
    },
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
          ...{ boxShadow: `0 0 0 1px ${getColorText(TAG_COLOR)}` },
          margin: '0px',
          backgroundColor: 'transparent',
          color: getColorText(TAG_COLOR),
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
          ...{ boxShadow: `0 0 0 1px ${getColorText(TAG_COLOR)}` },
          backgroundColor: 'transparent',
          color: getColorText(TAG_COLOR),
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
    prefixel: (
      <Icon component={<Add3M />} size={24} color={getColorText(TAG_COLOR)} />
    ),
  },
};

export const WithImagePrefix: Story = {
  parameters: {
    controls: {
      include: ['name', 'disabled', 'asPill', 'removable'],
    },
  },
  args: {
    shape: TagShape.DEFAULT_ROUND,
    prefixel: <img src={avatar1} alt="" />,
  },
};

export const RemovableOnHover: Story = {
  parameters: {
    controls: {
      include: ['name', 'shape', 'color', 'disabled'],
    },
  },
  args: {
    id: 'removable',
    shape: TagShape.DEFAULT_ROUND,
    removable: true,
    suffixel: (
      <Badge
        count={1}
        outlined={false}
        style={{
          boxShadow: `0 0 0 1px ${getColorText()}`,
          backgroundColor: 'transparent',
          color: getColorText(),
          alignItems: 'center',
        }}
      />
    ),
  },
  play: async ({ canvasElement }) => {
    await document.fonts.ready;
    const tag = within(canvasElement).getByTestId('tag-removable');
    const restWidth = tag.getBoundingClientRect().width;

    await userEvent.hover(tag);

    await expect(within(canvasElement).getByTestId('remove-btn')).toBeVisible();
    await expect(tag.getBoundingClientRect().width).toBe(restWidth);
  },
};
