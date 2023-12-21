import type {
  Meta,
  StoryObj
} from '@storybook/react';
import Dropdown, {
  DropdownProps
} from './Dropdown';
const meta: Meta < DropdownProps > = {
  title: 'Components/Dropdown',
  component: Dropdown,
};
export default meta;
const excludedProps = ['placement'];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < DropdownProps > ;
const StoryTemplate: Story = {
  render: (args) => <Dropdown {...args} />,
};
export const Primary = {
  ...StoryTemplate,
  args: {
    placement: 'bottomRight',
  },
};
export const WithSearchInput = {
  ...StoryTemplate,
  args: {
    placement: 'topLeft',
    searchInput: true,
  },
};
export const WithBottomAction = {
  ...StoryTemplate,
  args: {
    placement: 'topCenter',
    bottomAction: true,
  },
};
export const WithBackAction = {
  ...StoryTemplate,
  args: {
    placement: 'topRight',
    backAction: true,
  },
};
export const WithTextTrigger = {
  ...StoryTemplate,
  args: {
    placement: 'bottomLeft',
    textTrigger: true,
  },
};