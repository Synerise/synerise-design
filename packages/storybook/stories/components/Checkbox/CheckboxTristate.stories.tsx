import React from 'react';
import type {
  Meta,
  StoryObj
} from '@storybook/react';

import CheckboxTristate from "@synerise/ds-checkbox-tristate";

import { CheckboxTristateProps } from "@synerise/ds-checkbox-tristate";

const meta: Meta < CheckboxTristateProps > = {
  title: 'Components/Checkbox/CheckboxTristate',
  component: CheckboxTristate,
  argTypes: {

  }
};
export default meta;

type Story = StoryObj < CheckboxTristateProps > ;
const StoryTemplate: Story = {
  render: (args) => <CheckboxTristate {...args} />
};
export const Primary = {
  ...StoryTemplate,
  args: {
    checked: false,
    defaultChecked: false,
    onChange: () => {}
  }
};