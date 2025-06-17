import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import Cruds from '@synerise/ds-cruds';
import { fn } from 'storybook/test';

import {
  BOOLEAN_CONTROL,
  centeredPaddedWrapper,
  STRING_CONTROL,
} from '../../utils';


export default {
  component: Cruds,
  title: 'Components/Cruds',
  tags: ['autodocs'],
  decorators: [centeredPaddedWrapper],
  render: (args) => <Cruds {...args} />,
  argTypes: {
    onMoveUp: BOOLEAN_CONTROL,
    moveUpTooltip: STRING_CONTROL,
    onMoveDown: BOOLEAN_CONTROL,
    moveDownTooltip: STRING_CONTROL,
    onAdd: BOOLEAN_CONTROL,
    addTooltip: STRING_CONTROL,
    onEdit: BOOLEAN_CONTROL,
    editTooltip: STRING_CONTROL,
    onPreview: BOOLEAN_CONTROL,
    previewTooltip: STRING_CONTROL,
    onDuplicate: BOOLEAN_CONTROL,
    duplicateTooltip: STRING_CONTROL,
    onDelete: BOOLEAN_CONTROL,
    deleteTooltip: STRING_CONTROL,
    onMove: BOOLEAN_CONTROL,
    moveTooltip: STRING_CONTROL,
    onRemove: BOOLEAN_CONTROL,
    removeTooltip: STRING_CONTROL,
  }
} as Meta<typeof Cruds>;

type Story = StoryObj<typeof Cruds>;


export const Default: Story = {
  args: {
    removeTooltip: 'Remove',
    moveTooltip: 'Move',
    deleteTooltip: 'Delete',
    duplicateTooltip: 'Duplicate',
    previewTooltip: 'Preview',
    editTooltip: 'Edit',
    addTooltip: 'Add',
    moveDownTooltip: 'Down',
    moveUpTooltip: 'Up',
    action: fn(),
  }
}
export const SingleCrud: Story = {
  args: {
    removeTooltip: 'Remove',
    moveTooltip: 'Move',
    deleteTooltip: 'Delete',
    duplicateTooltip: 'Duplicate',
    previewTooltip: 'Preview',
    editTooltip: 'Edit',
    addTooltip: 'Add',
    moveDownTooltip: 'Down',
    moveUpTooltip: 'Up',
    action: fn(),
    onRemove: false,
    onMove: false,
    onAdd: false,
    onEdit: false,
    onDelete: false,
    onMoveUp: false,
    onMoveDown: false,
    onPreview: true,
    onDuplicate: false,
  },
};







