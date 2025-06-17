import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/preview-api';

import Logic from '@synerise/ds-logic';

import { BOOLEAN_CONTROL, centeredPaddedWrapper, STRING_CONTROL } from '../../utils';

export default {
  component: Logic.Matching,
  title: 'Components/Filter/Logic',
  tags: ['autodocs'],
  decorators: [centeredPaddedWrapper],
  argTypes: {
    readOnly: BOOLEAN_CONTROL,
    sentence: STRING_CONTROL,
    texts: {
      control: false,
    },
  },
} as Meta<typeof Logic.Matching>;

export const Matching: StoryObj<typeof Logic.Matching> = {
  render: args => {
    const [{ matching }, updateArgs] = useArgs();
    function onChange(matching: boolean) {
      args.onChange && args.onChange(matching);
      updateArgs({ matching });
    }

    return <Logic.Matching {...args} matching={matching} onChange={onChange} />;
  },
  args: {
    sentence: 'find all items #MATCHING_TOGGLE# this condition',
    matching: true,
  },
};
