import React from 'react';
import type {
  Meta,
  StoryObj
} from "@storybook/react";

import Divider from '@synerise/ds-divider';
import {
  DividerProps
} from '@synerise/ds-divider/dist/Divider.types';

import { fixedWrapper200 } from '../shared/decorators';

const reactNodeAsText = {
  control: 'text',
  table: {
    type: {
      summary: 'ReactNode',
    }
  }
}
const meta: Meta < DividerProps > = {
  title: "components/Divider",
  decorators: [fixedWrapper200],
  component: Divider,
  argTypes: {
    labelAbove: reactNodeAsText,
    labelBelow: reactNodeAsText
  }
};
export default meta;
type Story = StoryObj < DividerProps > ;


export const Primary: Story = {
  args: {
    marginBottom: 20,
    marginTop: 20
  }
};


export const WithLabelAbove: Story = {
  args: {
    marginBottom: 20,
    marginTop: 20,
    labelAbove: "Primary divider",
  }
};

export const WithLabelBelow: Story = {
  args: {
    marginBottom: 20,
    marginTop: 20,
    labelBelow: "Primary divider",
  }
};