import React from 'react';
import { useArgs } from 'storybook/preview-api';
import { v4 as uuid } from 'uuid';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@synerise/ds-button';
import { theme } from '@synerise/ds-core';
import Icon, { ExternalLinkM } from '@synerise/ds-icon';
import Tags, { TagShape } from '@synerise/ds-tags';
import type { TagProps, TagsProps } from '@synerise/ds-tags';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  COLOR_CONTROL,
  NUMBER_CONTROL,
  REACT_NODE_AS_STRING,
  STRING_CONTROL,
  STYLE_ARG_CONTROL,
  controlFromOptionsArray,
  fixedWrapper400,
} from '../../utils';
import { ALL_TAGS, TAG_PROP_CATEGORY, TAG_TEXTS } from './Tags.constants';
import { getTagNameForShape } from './Tags.utils';

type TagStoryProps = TagsProps & {
  color: TagProps['color'];
};
type Story = StoryObj<TagStoryProps>;

const TagsMeta = {
  title: 'Components/Tags/Tags',
  component: Tags,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: ({ selected, color, ...args }) => {
    const selectedProp = selected?.length
      ? selected.map((tagData) => ({
          ...tagData,
          name: getTagNameForShape(args.tagShape!),
          color,
        }))
      : [];
    return <Tags selected={selectedProp} {...args} />;
  },
  argTypes: {
    tagShape: {
      ...controlFromOptionsArray('select', Object.values(TagShape)),
      mapping: TagShape,
    },
    asPill: BOOLEAN_CONTROL,
    addable: BOOLEAN_CONTROL,
    removable: BOOLEAN_CONTROL,
    title: REACT_NODE_AS_STRING,
    dropdownFooter: REACT_NODE_AS_STRING,
    creatable: BOOLEAN_CONTROL,
    disabled: BOOLEAN_CONTROL,
    color: {
      ...TAG_PROP_CATEGORY,
      ...COLOR_CONTROL,
    },
    className: CLASSNAME_ARG_CONTROL,
    style: STYLE_ARG_CONTROL,
    onManageTagClick: {
      action: 'onManageTagClick',
    },
    onSelectedChange: {
      action: 'onSelectedChange',
    },
    onCreate: {
      action: 'onCreate',
    },
    overlayPlacement: controlFromOptionsArray('select', [
      'topLeft',
      'topCenter',
      'topRight',
      'bottomLeft',
      'bottomCenter',
      'bottomRight',
    ]),
    maxVisibleTags: NUMBER_CONTROL,
  },
  args: {
    tagShape: TagShape[0],
    texts: TAG_TEXTS,
    title: 'Tags:',
    dropdownFooter: (
      <Button type="ghost" mode="icon-label">
        <Icon
          component={<ExternalLinkM />}
          size={24}
          color={theme.palette['grey-600']}
        />{' '}
        Manage tags
      </Button>
    ),
  },
} as Meta<TagStoryProps>;
export default TagsMeta;

export const Default: Story = {
  args: {
    selected: [
      {
        id: 0,
        name: 'Tag name',
      },
    ],
  },
};

export const WithAddButton: Story = {
  render: (args) => {
    const [{ selected, data }, updateArgs] = useArgs();

    return (
      <Tags
        {...args}
        selected={selected}
        data={data}
        maxHeight={200}
        onCreate={(name) => {
          const tag = {
            id: uuid(),
            name,
            color: theme.palette['grey-200'],
          };
          updateArgs({
            data: [...data, tag],
            selected: [...selected, tag],
          });
          args.onCreate?.(name);
        }}
        onSelectedChange={(tags, actionTaken) => {
          updateArgs({
            selected: tags,
          });
          args.onSelectedChange?.(tags, actionTaken);
        }}
      />
    );
  },
  args: {
    selected: ALL_TAGS.slice(0, 6),
    data: ALL_TAGS,
    creatable: true,
    addable: true,
    removable: true,
  },
};

export const WithLimit = {
  ...WithAddButton,
  args: {
    ...WithAddButton.args,
    maxVisibleTags: 2,
  },
};
export const InNarrowContainer = {
  decorators: [fixedWrapper400],
  ...WithAddButton,
};
