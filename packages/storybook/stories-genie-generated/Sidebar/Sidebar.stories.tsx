{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import * as React from 'react';
  import ComponentName from './ComponentName';
  const meta: Meta < React.ComponentType > = {
    title: 'ComponentName',
    component: ComponentName,
  };
  export default meta;
  const excludedProps = [];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < React.ComponentType > ;
  const StoryTemplate: Story = {
    render: (args) => <ComponentName {...args} />,
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      // add component's props
    },
  };
}
Note: Replace "ComponentName"
with the actual name of the component you are creating the story
for.