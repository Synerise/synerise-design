import type {
  Meta,
  StoryObj
} from '@storybook/react';
import AppMenu from './AppMenu'
const meta: Meta < AppMenu > = {
  title: "App Menu",
  component: AppMenu
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < AppMenu > ;
const StoryTemplate: Story = {
    render: (args) => <AppMenu {...args} />, //render component  with arguments passed to it as a props.  e.g <MyComponent name="John Doe" age={30} />    };
    export const Primary = {
      ...StoryTemplate,
      args: {
        className: "myClassName",
        activeItem: "activeId",
        top: 0
      }
    };