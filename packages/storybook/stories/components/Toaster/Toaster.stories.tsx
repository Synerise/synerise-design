import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Toast from '@synerise/ds-toast';
import DSToaster, { ToasterProps, useToaster } from '@synerise/ds-toaster';

import Button from '@synerise/ds-button';

import {
  BOOLEAN_CONTROL,
  controlFromOptionsArray,
  fixedWrapper400,
  gappedColumnDecorator,
  NUMBER_CONTROL,
} from '../../utils';

export default {
  title: 'Components/Toast',
  component: DSToaster,
  decorators: [gappedColumnDecorator, fixedWrapper400],
  argTypes: {
    position: controlFromOptionsArray('select', [
      'top-left',
      'top-center',
      'top-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ]),
    gutter: NUMBER_CONTROL,
    reverseOrder: BOOLEAN_CONTROL,
    toastOptions: { control: false },
    containerStyle: { control: false },
    containerClassName: { control: false },
  },
  args: {
    position: 'bottom-left',
  },
} as Meta<ToasterProps>;

type Story = StoryObj<ToasterProps>;

const CustomiseToasterStory = configOptions => {
  const { setOptions } = useToaster();

  setOptions(configOptions);
  const handleClick = () => {
    Toast.success({ message: 'Success' });
  };
  return (
    <>
      <Button onClick={handleClick}>Update toaster config and click to show toast</Button>;
    </>
  );
};

export const Toaster: Story = {
  render: args => {
    return <CustomiseToasterStory {...args} />;
  },
};
