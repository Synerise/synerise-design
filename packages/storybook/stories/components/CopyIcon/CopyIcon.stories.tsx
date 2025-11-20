import React from 'react';

import { Meta, StoryObj } from '@storybook/react-webpack5';

import CopyIcon, { type CopyIconProps } from '../../../../components/copy-icon';
import { REACT_NODE_AS_STRING, centeredPaddedWrapper } from '../../utils';

export default {
  component: CopyIcon,
  title: 'Components/CopyIcon',
  tags: ['autodocs'],
  decorators: [centeredPaddedWrapper],
  parameters: {
    layout: 'padded',
  },
  argsTypes: {
    icon: REACT_NODE_AS_STRING,
    copyValue: REACT_NODE_AS_STRING,
    texts: {
      copyTooltip: REACT_NODE_AS_STRING,
      copiedTooltip: REACT_NODE_AS_STRING,
    },
  },
} as Meta<CopyIconProps>;

export const Default: StoryObj<CopyIconProps> = {
  args: {
    copyValue: 'New text',
    texts: { copyTooltip: 'Copy value', copiedTooltip: 'Copied!' },
  },
};
