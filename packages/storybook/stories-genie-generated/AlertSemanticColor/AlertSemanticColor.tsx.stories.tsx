import type {
  Meta,
  StoryObj
} from '@storybook/react';
import AlertSemanticColor from './AlertSemanticColor';
const meta: Meta < typeof AlertSemanticColor > = {
  title: 'Components/AlertSemanticColor',
  component: AlertSemanticColor,
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < typeof AlertSemanticColor > ;
const StoryTemplate: Story = {
  render: (args) => <AlertSemanticColor {...args} />,
};
export const Primary = {
  ...StoryTemplate,
  args: {
    icon: <UserCheckM />,
    type: "positive",
    color: "blue",
    mode: "normal"
  }
};