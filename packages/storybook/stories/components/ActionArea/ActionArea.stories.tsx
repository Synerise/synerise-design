import React from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import ActionArea from '@synerise/ds-action-area';
import Button from '@synerise/ds-button';
import Tooltip from '@synerise/ds-tooltip';

import {
  BOOLEAN_CONTROL,
  REACT_NODE_AS_STRING,
  centeredPaddedWrapper,
  fixedWrapper400,
} from '../../utils';

export default {
  component: ActionArea,
  title: 'Components/ActionArea',
  tags: ['autodocs'],
  decorators: [centeredPaddedWrapper],
  render: (args) => <ActionArea {...args} />,

  argTypes: {
    label: REACT_NODE_AS_STRING,
    description: REACT_NODE_AS_STRING,
    actionLabel: REACT_NODE_AS_STRING,
    errorText: REACT_NODE_AS_STRING,
    isFullWidth: BOOLEAN_CONTROL,
    buttonProps: {
      control: false,
    },
  },
} as Meta<typeof ActionArea>;

type Story = StoryObj<typeof ActionArea>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ActionArea\n  label=\"Label\"\n  description=\"Very long description\"\n  actionLabel=\"Define\"\n  action={fn()}\n/>`,
      },
    },
  },
  args: {
    label: 'Label',
    description: 'Very long description',
    actionLabel: 'Define',
    action: fn(),
  },
};

export const CustomisedActionButton: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ActionArea\n  label=\"Label\"\n  description=\"Very long description\"\n  actionLabel=\"Define\"\n  action={fn()}\n  buttonProps={{\n    type: 'secondary',\n  }}\n/>`,
      },
    },
  },
  args: {
    ...Default.args,
    buttonProps: {
      type: 'secondary',
    },
  },
};

export const CustomContent: Story = {
  parameters: {
    controls: {
      exclude: ['actionLabel', 'action', 'buttonProps'],
    },
    docs: {
      source: {
        code: `<ActionArea\n  label=\"Choose a template or create a new message\"\n  customAction={\n    <div style={{ display: 'flex', gap: 16 }}>\n      <Tooltip title=\"You must first choose mobile push type in the card above\">\n        <span>\n          <Button disabled type=\"primary\">\n            Select template\n          </Button>\n        </span>\n      </Tooltip>\n      <Tooltip title=\"You must first choose mobile push type in the card above\">\n        <span>\n          <Button type=\"secondary\" readOnly>\n            Create new message\n          </Button>\n        </span>\n      </Tooltip>\n    </div>\n  }\n/>`,
      },
    },
  },
  args: {
    label: 'Choose a template or create a new message',
    customAction: (
      <div style={{ display: 'flex', gap: 16 }}>
        <Tooltip title="You must first choose mobile push type in the card above">
          <span>
            <Button disabled type="primary">
              Select template
            </Button>
          </span>
        </Tooltip>
        <Tooltip title="You must first choose mobile push type in the card above">
          <span>
            <Button type="secondary" readOnly>
              Create new message
            </Button>
          </span>
        </Tooltip>
      </div>
    ),
  },
};

export const FullWidthActionButton: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ActionArea\n  isFullWidth={true}\n  label=\"Label\"\n  description=\"Very long description\"\n  actionLabel=\"Define\"\n  action={fn()}\n  buttonProps={{\n    type: 'primary',\n  }}\n/>`,
      },
    },
  },
  args: {
    isFullWidth: true,
    ...Default.args,
    buttonProps: {
      type: 'primary',
    },
  },
};
export const WithValidationActionButton: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ActionArea\n  isError={true}\n  errorText=\"Error\"\n  label=\"Label\"\n  description=\"Very long description\"\n  actionLabel=\"Define\"\n  action={fn()}\n  buttonProps={{\n    type: 'primary',\n  }}\n/>`,
      },
    },
  },
  args: {
    isError: true,
    errorText: 'Error',
    ...Default.args,
    buttonProps: {
      type: 'primary',
    },
  },
};
