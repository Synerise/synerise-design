import React, { ReactNode } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import EmptyStates, {
  EmptyStatesProps,
  EmptyStatesSize,
} from '@synerise/ds-empty-states';

import {
  CLASSNAME_ARG_CONTROL,
  REACT_NODE_AS_STRING,
  centeredPaddedWrapper,
  controlFromOptionsArray,
  reactNodeAsSelect,
} from '../../utils';
import { BUTTON_OPTIONS, ICONS } from './EmptyStates.data';

export default {
  title: 'Components/EmptyStates',
  tags: ['autodocs'],
  component: EmptyStates,
  decorators: [centeredPaddedWrapper],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    text: REACT_NODE_AS_STRING,
    label: REACT_NODE_AS_STRING,
    iconPosition: {
      ...controlFromOptionsArray('inline-radio', ['top', 'left', 'right']),
    },
    textAlign: {
      ...controlFromOptionsArray('inline-radio', [
        'center',
        'left',
        'right',
        'justify',
      ]),
    },
    fontSize: {
      ...controlFromOptionsArray(
        'inline-radio',
        Object.values(EmptyStatesSize),
      ),
    },
    size: {
      ...controlFromOptionsArray(
        'inline-radio',
        Object.values(EmptyStatesSize),
      ),
    },
    customIcon: {
      ...controlFromOptionsArray('select', Object.keys(ICONS)),
      mapping: ICONS,
    },
    button: {
      ...reactNodeAsSelect(Object.keys(BUTTON_OPTIONS), BUTTON_OPTIONS),
    },
  },
} as Meta<EmptyStatesProps>;

export const Default: StoryObj<EmptyStatesProps> = {
  args: {
    label:
      'Currently you have no Segmentations saved. Get started with a new one to analyze your database.',
    text: 'Create new segmentation',
    labelPosition: 'bottom',
    fontSize: EmptyStatesSize.MEDIUM,
    size: EmptyStatesSize.MEDIUM,
    button: 'singleButtonPrimary',
    customIcon: ICONS['EventXl'],
  },
};
