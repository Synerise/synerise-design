``
`jsx
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import TagsList, { TagsListProps } from './TagsList';

const meta: Meta<TagsListProps> = {
  title: 'TagsList',
  component: TagsList,
};

export default meta;

const excludedProps = ['texts'];

const excludeRegexp = new RegExp(`($ {
  excludedProps.join('|')
})`, 'g');

type Story = StoryObj<TagsListProps>;

const StoryTemplate: Story = {
  render: (args) => <TagsList {...args} />,
};

export const Primary = {
  ...StoryTemplate,
  args: {
    items: [
      { id: '1', name: 'Tag 1', favourite: false, checked: false, visibility: 'visible', canDelete: true, canUpdate: true, canEnterSettings: true },
      { id: '2', name: 'Tag 2', favourite: false, checked: false, visibility: 'visible', canDelete: true, canUpdate: true, canEnterSettings: true },
      { id: '3', name: 'Tag 3', favourite: false, checked: false, visibility: 'visible', canDelete: true, canUpdate: true, canEnterSettings: true },
      { id: '4', name: 'Tag 4', favourite: false, checked: false, visibility: 'visible', canDelete: true, canUpdate: true, canEnterSettings: true },
      { id: '5', name: 'Tag 5', favourite: false, checked: false, visibility: 'visible', canDelete: true, canUpdate: true, canEnterSettings: true },
    ],
    defaultItems: [
      { id: '6', name: 'Tag 6', favourite: false, checked: false, visibility: 'visible', canDelete: true, canUpdate: true, canEnterSettings: true },
      { id: '7', name: 'Tag 7', favourite: false, checked: false, visibility: 'visible', canDelete: true, canUpdate: true, canEnterSettings: true },
      { id: '8', name: 'Tag 8', favourite: false, checked: false, visibility: 'visible', canDelete: true, canUpdate: true, canEnterSettings: true },
      { id: '9', name: 'Tag 9', favourite: false, checked: false, visibility: 'visible', canDelete: true, canUpdate: true, canEnterSettings: true },
      { id: '10', name: 'Tag 10', favourite: false, checked: false, visibility: 'visible', canDelete: true, canUpdate: true, canEnterSettings: true },
    ],
    maxItemsVisible: 10,
    onItemsAdd: () => {},
    onChange: () => {},
    onManageTags: () => {},
    showMoreStep: 5,
    withCheckbox: true,
  },
};
`
``