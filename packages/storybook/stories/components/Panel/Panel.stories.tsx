import React from 'react';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Icon, { ExternalLinkM } from '@synerise/ds-icon';
import ListItem from '@synerise/ds-list-item';
import Panel, { PanelProps } from '@synerise/ds-panel';

import { fixedWrapper588 } from '../../utils';
import { controls } from './Panel.data';

export default {
  component: Panel,
  title: 'Components/Panel',
  tags: ['autodocs', 'new'],
  parameters: {
    layout: 'centered',
    controls: {
      include: Object.keys(controls),
    },
  },
  decorators: [fixedWrapper588],
  args: {},
  argTypes: {
    ...controls,
  },
} as Meta<PanelProps>;

export const PanelWithListItem: StoryObj<PanelProps> = {
  args: {
    children: (
      <ListItem suffixel={<Icon component={<ExternalLinkM />} />}>
        Process name
      </ListItem>
    ),
  },
};
