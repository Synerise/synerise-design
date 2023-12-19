import * as React from 'react';
import type {
  Meta,
  StoryObj
} from '@storybook/react';
import Badge from '@synerise/ds-badge';

const meta: Meta < typeof Badge > = {
  title: "components/Badge",
  component: Badge,
  argTypes: {
    
  }
};
export default meta;
type Story = StoryObj < typeof Badge > ;
const StoryTemplate: Story = {
  render: (args) => <Badge {...args} />
};
export const Primary = {
  ...StoryTemplate,
  args: {
    flag: true,
    outlined: false,
    backgroundColor: 'red',
    textColor: 'white',
    backgroundColorHue: 'primary',
    textColorHue: 'light',
    pulsing: false,
    customColor: 'blue'
  }
};