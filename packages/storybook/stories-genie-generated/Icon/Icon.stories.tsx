import type {
  Meta,
  StoryObj
} from '@storybook/react';
import Icon, {
  IconProps
} from './Icon';
const meta: Meta < IconProps > = {
  title: 'Icon',
  component: Icon,
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < IconProps > ;
const StoryTemplate: Story = {
  render: (args) => <Icon {...args} />,
};
export const Primary = {
  ...StoryTemplate,
  args: {
    color: "blue",
    name: "add",
    size: 20,
    stroke: "none",
    onClick: () => {},
    component: <div>Icon Component</div>,
    className: "custom-icon",
    style: {
      fontSize: "24px"
    },
  },
};