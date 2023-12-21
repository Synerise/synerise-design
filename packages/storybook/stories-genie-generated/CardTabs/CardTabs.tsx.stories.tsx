import * as React from 'react';
import {
  Meta,
  StoryObj
} from '@storybook/react';
import CardTabs, {
  CardTabsProps
} from './CardTabs';
const meta: Meta < CardTabsProps > = {
  title: 'Components/Card Tabs',
  component: CardTabs,
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < CardTabsProps > ;
const StoryTemplate: Story = {
  render: (args) => <CardTabs {...args} />
};
export const Primary = {
  ...StoryTemplate,
  args: {
    className: "",
    onChangeOrder: () => console.log('onChangeOrder called'),
    onAddTab: () => console.log('onAddTab called'),
    maxTabscount: 0,
    children: [],
    addTabLabel: ""
  }
};