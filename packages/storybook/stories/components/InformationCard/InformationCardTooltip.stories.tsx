import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { userEvent, waitFor, within, expect } from '@storybook/test';

import { InformationCardTooltip } from '@synerise/ds-information-card';
import type { InformationCardTooltipProps } from '@synerise/ds-information-card';

import { CompleteExample } from './InformationCard.stories';
import Button from '@synerise/ds-button';
import { centeredPaddedWrapper } from '../../utils';

export default {
  title: 'Components/InformationCard',
  component: InformationCardTooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [centeredPaddedWrapper],
  args: {
    children: <Button type="primary">Button with infocard</Button>,
    informationCardProps: CompleteExample.args,
  },
} as Meta<InformationCardTooltipProps>;

type Story = StoryObj<InformationCardTooltipProps>;

export const DefaultStory: Story = {
  name: 'InformationCardTooltip',
};

export const InformationCardTooltipTopPlacement: Story = {
  args: {
    children: <Button type="primary">Button with infocard</Button>,
    triggerProps: {
      popupPlacement: 'top',
    },
  },
};
