import React, { useState } from 'react';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Avatar, { ObjectAvatar } from '@synerise/ds-avatar';
import Badge from '@synerise/ds-badge';
import { theme } from '@synerise/ds-core';
import DSFlag from '@synerise/ds-flag';
import Icon, { CopyClipboardM, TrashM } from '@synerise/ds-icon';
import ListItem, { ListItemProps } from '@synerise/ds-list-item';
import { RawSwitch } from '@synerise/ds-switch';
import Tag, { TagShape } from '@synerise/ds-tag';

import { AVATAR_IMAGE } from '../../constants/images';
import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  NUMBER_CONTROL,
  REACT_NODE_AS_STRING,
  STRING_CONTROL,
  controlFromOptionsArray,
  fixedWrapper200,
} from '../../utils';
import {
  LIST_ITEMS,
  prefixArgTypes,
  prefixType,
  renderPrefix,
  renderSuffix,
  suffixType,
} from './listItem.data';
import * as S from './styles';

type Story = StoryObj<ListItemProps>;
const renderListItem = (args: ListItemProps) => {
  return <S.StyledListItem {...args} />;
};
const renderWithPrefixAndSuffix = ({
  suffixType,
  prefixType,
  ...args
}: ListItemProps & { prefixType?: string; suffixType?: string }) => {
  const [isChecked, setChecked] = useState(false);

  const suffixel = args.suffixel || (suffixType && renderSuffix(suffixType));
  const prefixel =
    args.prefixel ||
    (prefixType && renderPrefix(prefixType, isChecked, setChecked));
  return renderListItem({
    ...args,
    suffixel,
    prefixel,
    onClick: (itemData) => {
      args.onClick && args.onClick(itemData);
      setChecked(!isChecked);
    },
  });
};

export default {
  component: ListItem,
  title: 'Components/ListItem',
  tags: ['autodocs'],
  render: renderListItem,
  decorators: [fixedWrapper200],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,

    timeToHideTooltip: {
      ...NUMBER_CONTROL,
      description: 'copyTooltip',
    },
    noHover: {
      ...BOOLEAN_CONTROL,
    },
    selectable: {
      ...BOOLEAN_CONTROL,
    },
    ordered: {
      ...BOOLEAN_CONTROL,
    },
    parent: {
      ...BOOLEAN_CONTROL,
    },
    disabled: {
      ...BOOLEAN_CONTROL,
    },
    copyable: {
      ...BOOLEAN_CONTROL,
      description:
        'To enable `copyable` also `copyHint` and `copyValue` need to be defined',
    },
    checked: {
      ...BOOLEAN_CONTROL,
    },
    copyHint: {
      ...REACT_NODE_AS_STRING,
    },
    children: {
      ...REACT_NODE_AS_STRING,
    },
    copyTooltip: {
      ...REACT_NODE_AS_STRING,
    },
    description: {
      ...REACT_NODE_AS_STRING,
    },
    copyValue: {
      ...STRING_CONTROL,
    },

    title: {
      ...STRING_CONTROL,
    },
    highlight: {
      ...STRING_CONTROL,
    },
    prefixel: {
      ...REACT_NODE_AS_STRING,
      control: false,
    },
    suffixel: {
      ...REACT_NODE_AS_STRING,
      control: false,
    },
    direction: {
      table: {
        disable: true,
      },
    },
    type: {
      ...controlFromOptionsArray('inline-radio', [
        'default',
        'danger',
        'select',
        'divider',
      ]),
    },
    onClick: { action: 'onClick' },
  },
  args: {
    onItemHover: fn(),
    onSelect: fn(),
    onItemSelect: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onClick: fn(),
    children: 'List Item',
  },
} as Meta<ListItemProps>;

export const LabelOnly: Story = {
  args: {
    key: 'list-item-key-1',
    title: 'List Item Title',
  },
};

export const WithoutHover: Story = {
  args: {
    noHover: true,
    prefixel: (
      <Icon color={theme.palette['grey-700']} component={<CopyClipboardM />} />
    ),
    suffixel: <div>{'select'}</div>,
  },
};

export const WithHighlight: Story = {
  args: {
    highlight: 'High',
    children: 'WithHighlight',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithParent: Story = {
  args: {
    parent: true,
  },
};

export const WithOrderedList: Story = {
  render: (args) => {
    return (
      <S.ListWrapper>
        <S.StyledListItem {...args} />
        <S.StyledListItem {...args} />
        <S.StyledListItem {...args} />
        <S.StyledListItem {...args} />
      </S.ListWrapper>
    );
  },
  args: {
    ordered: true,
    children: 'Item',
  },
};

export const WithSelection: Story = {
  render: (args) => {
    const [{ checked }, updateArgs] = useArgs();

    function onClick() {
      updateArgs({ checked: !checked });
    }

    const suffixel = <div>{checked ? '' : 'select'}</div>;
    const type = !checked ? 'select' : undefined;

    return renderListItem({
      ...args,
      suffixel,
      type,
      checked,
      onClick: (itemData) => {
        args.onClick && args.onClick(itemData);
        onClick();
      },
    });
  },
};

export const WithCopyable: Story = {
  render: renderListItem,
  args: {
    prefixel: (
      <Icon color={theme.palette['grey-700']} component={<CopyClipboardM />} />
    ),
    copyable: true,
    copyHint: 'Copy to clipboard',
    copyValue: 'Item',
    copyTooltip: 'Copied!',
  },
};

export const Divider: Story = {
  render: renderListItem,
  args: {
    type: 'divider',
  },
};

export const WithStar: StoryObj<ListItemProps & { suffixType?: string }> = {
  render: renderWithPrefixAndSuffix,
  args: {
    suffixType: 'star',
    suffixVisibilityTrigger: 'hover',
    prefixel: (
      <Badge status="active">
        <Avatar size="small" src={AVATAR_IMAGE} shape="circle" />
      </Badge>
    ),
  },
};

export const WithTag: StoryObj<ListItemProps & { tagShape?: TagShape }> = {
  render: (args) => {
    const tagName = args.tagShape?.includes('single') ? 'A' : 'Tag';
    const suffixel = <Tag name={tagName} shape={args.tagShape} />;
    return renderListItem({
      ...args,
      suffixel,
    });
  },
  argTypes: {
    tagShape: {
      ...controlFromOptionsArray('select', Object.values(TagShape)),
      table: {
        category: 'Tag props',
      },
    },
  },
  args: {
    tagShape: TagShape.SMALL_SQUARE,
    copyable: true,
    copyHint: 'Copy to clipboard',
    copyValue: 'Item',
    copyTooltip: 'Copied!',
  },
};

export const WithDeletePrefix: Story = {
  args: {
    type: 'danger',
    prefixel: <Icon component={<TrashM />} />,
  },
};

export const WithFlagPrefix: Story = {
  args: {
    prefixel: <DSFlag country="de" />,
  },
};

export const WithHoverTooltip: Story = {
  args: {
    renderHoverTooltip: () => (
      <S.StyledTooltip>Tooltip content</S.StyledTooltip>
    ),
  },
};

export const WithSwitchPrefix: Story = {
  render: (args) => {
    const [isChecked, setChecked] = useState(false);
    const prefixel = (
      <RawSwitch
        id={'toggle'}
        checked={isChecked}
        onChange={() => setChecked(!isChecked)}
      />
    );
    return renderListItem({
      ...args,
      prefixel,
      onClick: (itemData) => {
        args.onClick && args.onClick(itemData);
        setChecked(!isChecked);
      },
    });
  },
};

export const WithObjectAvatarPrefix: StoryObj<
  ListItemProps & { object?: Record<string, any> }
> = {
  render: ({ object, ...args }) => {
    const prefixel = (
      <ObjectAvatar object={object} size="small" tooltip={false} />
    );
    return renderListItem({
      ...args,
      prefixel,
    });
  },
  parameters: {
    controls: ['object', 'prefixVisibilityTrigger'],
  },
  argTypes: {
    object: {
      description: 'Object Avatar `object` prop',
      control: 'object',
    },
  },
  args: {
    object: {
      name: 'A',
    },
  },
};

export const WithSmallAvatarPrefix: StoryObj<
  ListItemProps & { prefixType?: string; suffixType?: string }
> = {
  render: renderWithPrefixAndSuffix,
  parameters: {
    controls: {
      include: [
        'children',
        'description',
        'size',
        'suffixType',
        'suffixVisibilityTrigger',
      ],
    },
  },
  argTypes: prefixArgTypes,
  args: {
    children: 'List Item',
    description: 'Description',
    size: 'large',
    prefixel: (
      <Badge status="active">
        <Avatar size="small" src={AVATAR_IMAGE} shape="circle" />
      </Badge>
    ),
  },
};

export const WithMediumAvatarPrefix: StoryObj<
  ListItemProps & { prefixType?: string; suffixType?: string }
> = {
  render: renderWithPrefixAndSuffix,
  parameters: {
    controls: {
      include: [
        'children',
        'description',
        'size',
        'suffixType',
        'suffixVisibilityTrigger',
      ],
    },
  },
  argTypes: prefixArgTypes,
  args: {
    children: 'List Item',
    description: 'Description',
    size: 'large',
    prefixel: (
      <Badge status="active">
        <Avatar size="medium" src={AVATAR_IMAGE} shape="circle" />
      </Badge>
    ),
  },
};

export const WithCheckboxPrefix: StoryObj<
  ListItemProps & { prefixType?: string; suffixType?: string }
> = {
  render: renderWithPrefixAndSuffix,
  args: {
    prefixType: 'checkbox',
  },
};

export const PrefixAndSuffixOnHover: StoryObj<
  ListItemProps & { prefixType?: string; suffixType?: string }
> = {
  render: renderWithPrefixAndSuffix,
  parameters: {
    controls: {
      include: [
        'suffixType',
        'prefixType',
        'prefixVisibilityTrigger',
        'suffixVisibilityTrigger',
      ],
    },
  },
  argTypes: prefixArgTypes,
  args: {
    prefixType: 'avatar',
    suffixType: 'warning',
    prefixVisibilityTrigger: 'hover',
    suffixVisibilityTrigger: 'hover',
    children: 'List Item',
  },
};

export const AllSuffixes: StoryObj<ListItemProps & { suffixType?: string }> = {
  render: renderWithPrefixAndSuffix,
  parameters: {
    controls: {
      include: ['suffixType', 'suffixVisibilityTrigger', 'disabled'],
    },
  },
  argTypes: {
    suffixType: controlFromOptionsArray('select', Object.values(suffixType)),
  },
  args: {
    suffixType: 'rename,delete',
  },
};

export const AllPrefixes: StoryObj<ListItemProps & { prefixType?: string }> = {
  render: renderWithPrefixAndSuffix,
  parameters: {
    controls: {
      include: ['prefixType', 'prefixVisibilityTrigger', 'disabled'],
    },
  },
  argTypes: {
    prefixType: controlFromOptionsArray('select', Object.values(prefixType)),
  },
  args: {
    prefixType: 'singleIcon',
  },
};

export const AllCombinations: StoryObj<
  ListItemProps & { items: ListItemProps[] }
> = {
  render: ({ items, ...args }) => {
    return (
      <div>
        {items.map((props) => (
          <ListItem {...args} {...props} />
        ))}
      </div>
    );
  },
  args: {
    items: LIST_ITEMS,
  },
};

export const AllCombinationsLarge: StoryObj<
  ListItemProps & { items: ListItemProps[] }
> = {
  render: ({ items, ...args }) => {
    return (
      <div>
        {items.map((props) => (
          <ListItem {...args} {...props} />
        ))}
      </div>
    );
  },
  args: {
    size: 'large',
    description: 'Description',
    items: LIST_ITEMS,
  },
};
