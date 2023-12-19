import React from 'react';
import type {
  Meta,
  StoryObj
} from '@storybook/react';
import ActionArea from '@synerise/ds-action-area';

type ComponentProps = typeof ActionArea & {};
const meta: Meta < ComponentProps > = {
    title: 'Components/Action Area', //title of component, 
    // controls: { //controls what props are displayed in storybook interface. Exclude can take an array of string values that will be excluded from the list.    
    //   exclude: [ ] 
    // },
    component: ActionArea,
    argTypes:{
      label: {
        control: 'text',
        table: {
          type: {
            summary: 'ReactNode'
          }
        }
      },
    }
};
export default meta;
type Story = StoryObj<ComponentProps>;

const StoryTemplate: Story = {
  render: (args, globals) => <ActionArea {...args} /> 
}; 
export const Primary: Story = {
    ...StoryTemplate,
    args: { label:'label', description:'description', actionLabel:'actionLabel' 
  }
};