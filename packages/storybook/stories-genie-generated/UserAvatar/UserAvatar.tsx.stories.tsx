import type {
  Meta,
  StoryObj
} from '@storybook/react';
import UserAvatar from '../UserAvatar';
const meta: Meta < UserAvatar > = {
  title: "User Avatar",
  component: UserAvatar
};
export default meta;
const excludedProps = ['user'];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < UserAvatar > ;
const StoryTemplate: Story = {
  render: (args) => <UserAvatar {...args} />
};
export const Primary = {
  ...StoryTemplate,
  args: {
    backgroundColor: 'red',
    size: 'small',
    badgeStatus: 'approved',
    src: "https://example.com/avatars/default_1.png",
    tooltip: {
      title: "John Doe",
      description: "john@doe.com"
    },
    disabled: false
  }
}