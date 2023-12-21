The storybook component
for the given React component would be: import type {
  Meta,
  StoryObj
} from '@storybook/react';
import Block from './Block';
const meta: Meta < BlockProps > = {
  title: 'Block',
  component: Block,
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < BlockProps > ;
const StoryTemplate: Story = {
  render: (args) => <Block {...args} />,
};
export const Primary = {
  ...StoryTemplate,
  args: {
    className: 'ds-block',
    children: 'My block name',
    isDragging: false,
    icon: "icon"
  },
};