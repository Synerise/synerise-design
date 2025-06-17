import React from 'react';

import type { StoryObj, Meta } from '@storybook/react-webpack5';

import Alert from '@synerise/ds-alert';
import { fn } from 'storybook/test';

import {
  CLASSNAME_ARG_CONTROL,
  REACT_NODE_AS_STRING,
  controlFromOptionsArray, BOOLEAN_CONTROL, gappedColumnDecorator, fixedWrapper800,
} from '../../utils';



const MODE_MAPPING = ['background', 'background-outline', 'outline', 'clear'] as const;

const COLOR_MAPPING = ['blue',
  'grey',
  'red',
  'green',
  'yellow',
  'pink',
  'mars',
  'orange',
  'fern',
  'cyan',
  'purple',
  'violet'] as const;


export default {
  title: "Components/Alert/Alert",
  tags: ['autodocs', 'deprecated'],
  component: Alert,
  decorators: [gappedColumnDecorator, fixedWrapper800],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    showIcon: BOOLEAN_CONTROL,
    closeText: REACT_NODE_AS_STRING,
    description: REACT_NODE_AS_STRING,
    message: REACT_NODE_AS_STRING,
    showMoreLabel: REACT_NODE_AS_STRING,
    onShowMore: { control: false },
    mode: { ...controlFromOptionsArray('select', ['', 'background', 'background-outline', 'outline', 'clear']) },
    type: { ...controlFromOptionsArray('select', ['success', 'warning', 'error', 'info']) },
    color: { ...controlFromOptionsArray('select', ['', 'blue', 'grey', 'red', 'green', 'yellow', 'pink', 'mars', 'orange', 'fern', 'cyan', 'purple', 'violet',]) },
  },
} as Meta<typeof Alert>;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    description: 'This simple modal alert description',
    message: 'Success!',
    type: 'success',
    showIcon: true,
    showMoreLabel: 'Show more Label',
    onShowMore: fn(),
    closeText: '',
  },
  parameters: {
    docs: {
      source: {
        code: `<Alert
  description="This simple modal alert description"
  message="Success!"
  type="success"
  showIcon
  showMoreLabel="Show more Label"
  onShowMore={fn()}
  closeText=""
/>`
      }
    }
  }
};

export const AllModes: Story = {
  render: args => {
    return (
      <>
        {MODE_MAPPING.map(mode => (
          <Alert
            {...args}
            showIcon={true}
            description={'This simple modal alert description'}
            message={'Success!'}
            mode={mode}
            showMoreLabel={'Show more'}
            onShowMore={true}
          />
        ))}
      </>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<>
  {['background', 'background-outline', 'outline', 'clear'].map(mode => (
    <Alert
      showIcon
      description="This simple modal alert description"
      message="Success!"
      color=""
      mode={mode}
      showMoreLabel="Show more"
      onShowMore={true}
    />
  ))}
</>`
      }
    }
  }
};

export const AllColors: Story = {
  render: args => {
    return (
      <>
        {COLOR_MAPPING.map(color => (
          <Alert
            {...args}
            showIcon={true}
            description={'This simple modal alert description'}
            message={'Success!'}
            type={'success'}
            mode={'background'}
            showMoreLabel={'Show more'}
            onShowMore={fn()}
            color={color}
          />
        ))}
      </>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<>
  {['blue','grey','red','green','yellow','pink','mars','orange','fern','cyan','purple','violet'].map(color => (
    <Alert
      showIcon
      description="This simple modal alert description"
      message="Success!"
      type="success"
      mode="background"
      showMoreLabel="Show more"
      onShowMore={true}
      color={color}
    />
  ))}
</>`
      }
    }
  }
};

