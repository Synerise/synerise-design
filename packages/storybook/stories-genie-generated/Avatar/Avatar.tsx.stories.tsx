This is the Storybook Component
for a React Avatar component: import type {
  Meta,
  StoryObj
} from '@storybook/react';
import Avatar from './Avatar';
const meta: Meta < AvatarProps > = {
  title: 'Avatar',
  component: Avatar
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < AvatarProps > ;
const StoryTemplate: Story = {
  render: (args) => <Avatar {...args} />
};
export const Primary = {
  ...StoryTemplate,
  args: {
    backgroundColor: '#f4f5f7',
    backgroundColorHue: '500',
    disabled: false,
    hasStatus: false,
    iconComponent: null,
    iconScale: true,
    size: 'medium'
  }
}
export const WithIconComponent = {
    ...StoryTemplate,
    args: {
      backgroundColor: '#f4f5f7',
      backgroundColorHue: '500',
      disabled: false,
      hasStatus: false,
      iconComponent: //some custom icon component., iconScale : true , size ==='medium' }