import * as React from 'react';
import {
  Meta,
  Story
} from '@storybook/react';
import CardSelect, {
  CardSelectProps
} from './CardSelect';
const meta: Meta < CardSelectProps > = {
  title: 'Components/Card Select',
  component: CardSelect,
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < CardSelectProps > ;
const StoryTemplate: Story = {
  render: (args) => <CardSelect {...args} />
};
export const Primary = {
  ...StoryTemplate,
  args: {
    title: 'Title',
    description: 'Description',
    customTickVisible: false,
    customTickVisibleComponent: "",
    tickVisible: true,
    stretchToFit: false raised = false value = false size = 'medium'
    disabled = false onChange = {
      (): void => console.log()
    }
    icon = ""
    iconSize = 48 tickSize = ""
    elementsPosition = 'center'
    className = ""
    onClick = {
      (): void => console.log()
    }
    theme = "Default"
    error = ""
  }
};