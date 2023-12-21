{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import React from 'react';
  import TreeMenu, {
    TreeMenuProps,
    TreeData
  } from './TreeMenu';
  const meta: Meta < TreeMenuProps > = {
    title: 'TreeMenu',
    component: TreeMenu,
  };
  export default meta;
  const excludedProps = ['onChange'];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < TreeMenuProps > ;
  const StoryTemplate: Story = {
    render: (args) => <TreeMenu {...args} />,
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      dataSource: [{
        key: '1',
        name: 'Root',
        children: [{
          key: '1-1',
          name: 'Folder 1',
          children: [{
            key: '1-1-1',
            name: 'File 1'
          }, {
            key: '1-1-2',
            name: 'File 2'
          }, ],
        }, {
          key: '1-2',
          name: 'Folder 2'
        }, ],
      }, ] as TreeData[],
      showToolbar: true,
      showHeader: true,
      draggable: true,
      texts: {
        addFolder: 'Add Folder',
        addItem: 'Add Item',
        copy: 'Copy',
        cut: 'Cut',
        paste: 'Paste',
        duplicate: 'Duplicate',
        delete: 'Delete',
        visibility: 'Visibility',
        rename: 'Rename',
        searchPlaceholder: 'Search...',
      },
      addItemList: {
        folder: {
          name: 'Folder',
          component: Folder,
          icon: <FolderAddM />,
        },
      },
      onChange: (data: TreeData[]) => console.log('Data changed:', data),
    },
  };
}