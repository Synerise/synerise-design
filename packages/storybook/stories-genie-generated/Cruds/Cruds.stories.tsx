import * as React from 'react';
import {
  Meta,
  Story
} from '@storybook/react';
import {
  AddS,
  CloseS,
  DragHandleM,
  DuplicateS,
  EditS,
  TrashS
} from '@synerise/ds-icon';
import Cruds from './Cruds';
import {
  CrudsProps
} from "./Cruds.types";
export const meta: Meta < CrudsProps > = {
  title: "Components/Crud",
  component: Cruds
}
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < CrudProps > ;
const StoryTemplate: Story = {
  render: (args) => <Cruds {...args} />
};
export default meta;
export const Primary = {
  ...StoryTemplate,
  args: {
    addTooltip: "Add",
    editTooltip: "Edit",
    duplicateTooltip: "Duplicate",
    removeTooltip: "Remove",
    moveTooltip: "Move",
    deleteTooltip: "Delete"
    onAdd: () => console.log("on add click"),
    onEdit: () => console.log("on edit click"),
    onDuplicate: () => console.log("on duplicate click"),
    onDelete: () => console.log("on delete click"),
    onMove: () => console.log("on move click")
  }
}