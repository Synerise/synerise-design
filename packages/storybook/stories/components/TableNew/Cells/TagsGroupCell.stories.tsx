import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { theme } from '@synerise/ds-core';
import { type BaseTagsGroupProps, TagsGroupCell } from '@synerise/ds-table-new';

import { BOOLEAN_CONTROL, fixedWrapper300 } from '../../../utils';

const SAMPLE_TAGS = [
  { id: '0', name: 'Segment A', color: theme.palette['grey-200'] },
  { id: '1', name: 'Segment B', color: theme.palette['blue-600'] },
  { id: '2', name: 'Segment C', color: theme.palette['fern-600'] },
];

const meta: Meta<BaseTagsGroupProps> = {
  title: 'Components/TableNew/Cells/TagsGroupCell',
  component: TagsGroupCell,
  tags: ['autodocs', 'new'],
  parameters: { layout: 'centered' },
  decorators: [fixedWrapper300],
  argTypes: {
    disabled: BOOLEAN_CONTROL,
    isLoading: BOOLEAN_CONTROL,
    isError: BOOLEAN_CONTROL,
  },
};

export default meta;

type Story = StoryObj<BaseTagsGroupProps>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TagsGroupCell
  tagsProps={{
    tags: [
      { id: '0', name: 'Segment A', color: '#ccc' },
      { id: '1', name: 'Segment B', color: '#0b68ff' },
    ],
  }}
/>`,
      },
    },
  },
  render: (args) => <TagsGroupCell {...args} />,
  args: {
    tagsProps: { tags: SAMPLE_TAGS },
  },
};

export const Loading: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TagsGroupCell isLoading />`,
      },
    },
  },
  render: (args) => <TagsGroupCell {...args} />,
  args: {
    isLoading: true,
  },
};

export const Error: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TagsGroupCell isError />`,
      },
    },
  },
  render: (args) => <TagsGroupCell {...args} />,
  args: {
    isError: true,
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TagsGroupCell
  tagsProps={{ tags: [...] }}
  disabled
/>`,
      },
    },
  },
  render: (args) => <TagsGroupCell {...args} />,
  args: {
    tagsProps: { tags: SAMPLE_TAGS },
    disabled: true,
  },
};
