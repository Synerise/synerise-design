import type {
  Meta,
  StoryObj
} from '@storybook/react';
import Notification from './Notification';
const meta: Meta < typeof Notification > = {
  title: "Notification",
  component: Notification
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < typeof Notification > ;
const StoryTemplate: Story = {
    render: (args) => <Notification {...args} /> //render component  }; 
    export const Primary = {
      ...StoryTemplate,
      args: {
        children: "You have been notified.",
        buttonText: "Click me!",
        type: "success",
        onButtonClick: (ev) => console.log('clicked'),
        closeIconClassName: 'ds-close-icon',
        placement: 'bottom',
      }
    }