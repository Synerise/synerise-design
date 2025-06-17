import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import { expect, userEvent, waitFor, within } from 'storybook/test';
import type { InformationCardProps, InformationCardTooltipProps } from '@synerise/ds-information-card';
import Button from '@synerise/ds-button';

import InformationCardTooltipMeta from './InformationCardTooltip.stories';
import { overflowTestWrapper } from '../../utils';

export default {
  ...InformationCardTooltipMeta,
  title: 'Components/InformationCard/Tests',
  tags: ['visualtests'],
} as Meta<InformationCardProps>;

type Story = StoryObj<InformationCardTooltipProps>;

export const InformationCardTooltipOpen: Story = {
  args: {
    children: <Button type="primary">Button with infocard</Button>,
    triggerProps: {
      popupPlacement: 'top',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const storybookRoot = within(canvasElement.parentElement!);
    await userEvent.hover(canvas.getByText('Button with infocard'));
    await waitFor(() => expect(storybookRoot.getByTestId('information-card')).toBeVisible());
  },
};

export const InformationCardTooltipOverflowPlacement: Story = {
  decorators: [overflowTestWrapper],
  args: {
    children: <Button type="primary">Button with infocard</Button>,
    triggerProps: {
      popupPlacement: 'top',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const storybookRoot = within(canvasElement.parentElement!);
    await userEvent.hover(canvas.getByText('Button with infocard'));
    await waitFor(() => expect(storybookRoot.getByTestId('information-card')).toBeVisible());
  },
};
