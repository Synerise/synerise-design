import React from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@synerise/ds-button';
import { InformationCardTooltip } from '@synerise/ds-information-card';
import type { InformationCardTooltipProps } from '@synerise/ds-information-card';

import { centeredPaddedWrapper } from '../../utils';
import { CompleteExample } from './InformationCard.stories';

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
    popoverProps: {
      placement: 'top',
    },
  },
};
