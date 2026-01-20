import React from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@synerise/ds-button';
import type {
  InformationCardProps,
  InformationCardTooltipProps,
} from '@synerise/ds-information-card';

import { overflowTestWrapper } from '../../utils';
import InformationCardTooltipMeta from './InformationCardTooltip.stories';

export default {
  ...InformationCardTooltipMeta,
  title: 'Components/InformationCard/Tests',
  tags: ['visualtests'],
} as Meta<InformationCardProps>;

type Story = StoryObj<InformationCardTooltipProps>;

export const InformationCardTooltipOpen: Story = {
  args: {
    children: <Button type="primary">Button with infocard</Button>,
    popoverProps: {
      placement: 'top',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const storybookRoot = within(canvasElement.parentElement!);
    await userEvent.hover(canvas.getByText('Button with infocard'));
    await waitFor(() =>
      expect(storybookRoot.getByTestId('information-card')).toBeVisible(),
    );
  },
};

export const InformationCardTooltipOverflowPlacement: Story = {
  decorators: [overflowTestWrapper],
  args: {
    children: <Button type="primary">Button with infocard</Button>,
    popoverProps: {
      placement: 'top',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const storybookRoot = within(canvasElement.parentElement!);
    await userEvent.hover(canvas.getByText('Button with infocard'));
    await waitFor(() =>
      expect(storybookRoot.getByTestId('information-card')).toBeVisible(),
    );
  },
};
