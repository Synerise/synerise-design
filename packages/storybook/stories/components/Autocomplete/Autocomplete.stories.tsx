import React, { ReactNode } from 'react';
import type {
  Meta,
  StoryObj
} from '@storybook/react';
import Autocomplete from '@synerise/ds-autocomplete/dist/Autocomplete';

import { fixedWrapper400 } from '../shared/decorators';

type ComponentProps = typeof Autocomplete & {
  placeholder: ReactNode;
}

const reactNodeAsString = {
  control: 'text',
  table: {
    type: {
      summary: 'ReactNode'
    }
  }
}

const excludedProps = ['animation'];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');

const meta: Meta < ComponentProps > = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  decorators: [fixedWrapper400],
  parameters: {
    controls: {
      exclude: excludeRegexp
    }
  },
  argTypes: {
    autoResize: {
      control: 'select',
      options: ['false', 'min & max width', 'stretch to fit'],
      mapping: {
        'false': false,
        'min & max width': { minWidth: '100px', maxWidth:'300px' },
        'stretch to fit': { minWidth: '100px', stretchToFit: true }
      }
    }
  }
};

export default meta;

type Story = StoryObj < ComponentProps > ;
const StoryTemplate: Story = {
  render: (args) => <Autocomplete {...args} />
};
export const Primary = {
  ...StoryTemplate,
  args: {
    label: "Select option",
    description: 'Description',
    placeholder: 'Placeholder',
    //handleInputRef: (inputRef) => {},
    autoResize: false
  }
};