import type {
  Meta,
  StoryObj
} from '@storybook/react';
import CheckboxTristate from './CheckboxTristate';
const meta: Meta < CheckboxTristateProps > = {
  title: "Checkbox Tristate",
  component: CheckboxTristate,
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < CheckboxTristateProps > ;
const StoryTemplate: Story = {
  render: (args) => <CheckboxTristate {...args} />
};
export const Primary = {
  ...StoryTemplate,
  args: {
    checked: false,
    defaultChecked: false,
    onChange: (event) => console.log(event),
  }
};