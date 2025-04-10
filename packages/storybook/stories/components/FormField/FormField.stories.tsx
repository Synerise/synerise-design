import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import FormField, { FormFieldProps } from '@synerise/ds-form-field';
import { fixedWrapper400, REACT_NODE_AS_STRING, REACT_NODE_NO_CONTROL } from '../../utils';
import styled from 'styled-components';


const ChildrenWrapper = styled.div`
  opacity: 0.5;
  background: ${props => props.theme.palette['grey-200']};
  line-height: 30px;
`

export default {
  component: FormField,
  title: 'Components/FormField',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: <ChildrenWrapper>{'{render children here}'}</ChildrenWrapper>
  },
  argsTypes: {
    tooltipConfig: { control: false },
    children: REACT_NODE_NO_CONTROL,
    description: REACT_NODE_AS_STRING,
    tooltip: REACT_NODE_AS_STRING,
    rightSide: REACT_NODE_AS_STRING,
    label: REACT_NODE_AS_STRING,
    errorText: REACT_NODE_AS_STRING
  },
  decorators: [fixedWrapper400],
} as Meta<FormFieldProps>;

export const Default: StoryObj<FormFieldProps> = {}
export const WithLabelAndDescription: StoryObj<FormFieldProps> = {
  args: {
    label: 'Label',
    description: 'Description',
    tooltip: 'Label tooltip text',
  }
};

export const CompleteExample: StoryObj<FormFieldProps> = {
  decorators: [fixedWrapper400],
  args: {
    label: 'Label',
    description: 'Description',
    errorText: 'Error message',
    tooltip: 'Label tooltip text',
    rightSide: 'counter / link / anything'
  }
};
