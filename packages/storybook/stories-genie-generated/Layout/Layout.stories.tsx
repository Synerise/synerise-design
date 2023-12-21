import type {
  Meta,
  StoryObj
} from '@storybook/react';
import React from 'react';
import Layout, {
  LayoutProps
} from './Layout';
const meta: Meta < LayoutProps > = {
  title: 'Components/Layout',
  component: Layout,
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < LayoutProps > ;
const StoryTemplate: Story = {
  render: (args) => <Layout {...args} />,
};
export const Primary = {
  ...StoryTemplate,
  args: {
    header: 'Header',
    left: {
      width: 300,
      opened: true,
      content: 'Left Sidebar',
      onChange: (opened: boolean) => console.log(opened),
    },
    right: {
      width: 300,
      opened: true,
      content: 'Right Sidebar',
      onChange: (opened: boolean) => console.log(opened),
    },
    children: 'Main Content',
    className: 'custom-class',
    styles: {
      left: {
        background: 'red'
      },
      right: {
        background: 'blue'
      },
      main: {
        background: 'yellow'
      },
      mainInner: {
        background: 'green'
      },
    },
    subheader: 'Subheader',
    fullPage: false,
    sidebarAnimationDisabled: false,
    renderLeftSidebarControls: false,
    renderRightSidebarControls: false,
    leftSidebarWithDnd: false,
    rightSidebarWithDnd: false,
    mainSidebarWithDnd: false,
  },
};