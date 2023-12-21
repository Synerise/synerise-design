This is the Storybook component
for the React ObjectAvatar Component: import type {
  Meta,
  StoryObj
} from '@storybook/react';
import ObjectAvatar from '../ObjectAvatar';
const meta: Meta < ObjectAvatarProps > = {
  title: 'Components/Object Avatar',
  component: ObjectAvatar,
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < ObjectAvatarProps > ;
const StoryTemplate: Story = {
  render: (args) => <ObjectAvatar {...args} />
};
export const Primary = {
  ...StoryTemplate,
  args: {
    backgroundColor: '#00FF00',
    badgeStatus: 'success',
    iconComponent: 'Icon',
    color: 'grey',
    object: {
      name: 'John Doe ',
      description: 'Description of John Doe ',
      status: "active"
    },
    size: "small",
    src: "image.jpg",
    tooltip: {
      title: "John Doe ",
      description: "Description of John Doe ",
      status: (<Status label="active" type="disabled"/>)
    },
    text: "Name",
    children: (<span>John</span>),
    disabled: false,
    style: {
      width: "100px"
    }
  }
};