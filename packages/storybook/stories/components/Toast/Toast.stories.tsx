import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Toast } from '@synerise/ds-alert';
import Button from '@synerise/ds-button';
import {
  FirstButtonWrapper, Wrapper,
} from '@synerise/ds-alert/dist/Toast/Toast.styles';
import UnorderedList from '@synerise/ds-unordered-list';
import {
  BOOLEAN_CONTROL,
  centeredPaddedWrapper,
  REACT_NODE_AS_STRING
} from '../../utils';
import { color, colorIcon, customColor, data, type } from './Toast.data';




export default {
  title: "Components/Alert/Toast",
  tags: ['autodocs'],
  component: Toast,
  decorators: [centeredPaddedWrapper],
  render: (args) => {
    return <Toast {...args} />;
  },
  argTypes: {
    message: REACT_NODE_AS_STRING,
    description: REACT_NODE_AS_STRING,
    type: type,
    color: color,
    colorIcon: colorIcon,
    customColor: customColor,
    customColorIcon: customColor,
    customColorText: customColor,
    withClose: BOOLEAN_CONTROL,
    expander: BOOLEAN_CONTROL,
    expanded: BOOLEAN_CONTROL,
    button: {
      control: false
    },
    expandedContent: {
      control: false
    }
  },
} as Meta<typeof Toast>;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  parameters: {
    controls: {
      exclude: ['customColor', 'customColorIcon', 'customColorText']
    }
  },
  args: {
    message: 'Campaign saved!',
    type: 'success',
    color: 'green',
    colorIcon: 'white'
  },
};

export const withDescription: Story = {
  ...Default,
  parameters: {
    controls: {
      exclude: ['customColor', 'customColorIcon', 'customColorText']
    }
  },
  args: {
    ...Default.args,
    description: 'No response from server, try again later',
  },
};


export const withCustomColor: Story = {
  args: {
    message: 'Campaign saved!',
    description: 'No response from server, try again later',
    type: 'informative',
    customColor: 'pink',
    customColorIcon: 'blue',
    customColorText: 'blue',
  },
};

export const withCloseIcon: Story = {
  ...withDescription,
  parameters: {
    controls: {
      exclude: ['customColor', 'customColorIcon', 'customColorText']
    }
  },
  args: {
    ...withDescription.args,
    withClose: true
  },
};
export const withExpander: Story = {
    ...withDescription,
    parameters: {
      controls: {
        exclude: ['customColor', 'customColorIcon', 'customColorText']
      }
    },
    args: {
      ...withDescription.args,
      expander: true,
  },
};
export const withButton: Story = {
  ...withDescription,
  parameters: {
    controls: {
      exclude: ['customColor', 'customColorIcon', 'customColorText']
    }
  },
  args: {
    ...withDescription.args,
    expanded: true,
    button: <FirstButtonWrapper>
      <Button type='tertiary-white' mode="label">
        Button
      </Button>
    </FirstButtonWrapper>
  },
};
export const withList: Story = {
  ...withDescription,
  parameters: {
    controls: {
      exclude: ['customColor', 'customColorIcon', 'customColorText']
    }
  },
  args: {
    ...withDescription.args,
    expanded: true,
    expandedContent: <Wrapper>
      <UnorderedList data={data} indexFormatter={undefined} />
    </Wrapper>
  },
};





