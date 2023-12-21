{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import React from 'react';
  import Menu, {
    AntdMenuProps
  } from './Menu';
  const meta: Meta < AntdMenuProps > = {
    title: 'Menu',
    component: Menu,
  };
  export default meta;
  const excludedProps = ['dataSource', 'ordered', 'selectable', 'showTextTooltip'];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < AntdMenuProps > ;
  const StoryTemplate: Story = {
    render: (args) => <Menu {...args} />,
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      dataSource: [{
        text: 'Item 1',
        key: '1',
      }, {
        text: 'Item 2',
        key: '2',
        subMenu: [{
          text: 'Submenu 1',
          key: '3',
        }, {
          text: 'Submenu 2',
          key: '4',
        }, ],
      }, ],
      ordered: true,
      selectable: true,
      showTextTooltip: true,
    },
  };
}