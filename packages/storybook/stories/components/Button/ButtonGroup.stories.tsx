
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Button from '@synerise/ds-button';
import ButtonGroup from '@synerise/ds-button-group';
import Icon, { AngleDownM, AngleDownS } from '@synerise/ds-icon';
import { Primary, SingleIcon } from './Button.stories';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/Button/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    buttonsPosition: {
        control: { type: 'inline-radio' },
        options: ['left' , 'center' , 'right']
    } 
    
  },
};

export default meta;


type Story = StoryObj<typeof ButtonGroup>;


export const Split: Story = {
    render: (args) => (
      <ButtonGroup {...args} >
        <Button mode="label" {...Primary.args}>
          {Primary.args?.label}
        </Button>
        <Button mode="single-icon" {...SingleIcon.args}>
          <Icon component={Primary.args?.rightIconSize === 'M' ? <AngleDownM /> : <AngleDownS />} />
        </Button>
      </ButtonGroup>
    ),
    args: {
        splitMode: true,
        title: 'Title',
        description: 'Description',
        fullWidth: false,
        buttonsPosition: 'center',
        disabled: false,
        error: false
    }
  };