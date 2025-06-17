
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { userEvent, waitFor, within, expect } from 'storybook/test';
import isChromatic from "chromatic/isChromatic";

import { centeredPaddedWrapper } from '../../utils';
import StoriesMeta, { StoryProps } from './Tooltip.stories';


export default {
  ...StoriesMeta,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [centeredPaddedWrapper],
  title: 'Components/Tooltip/Tests',
  tags: ['visualtests'],
} as Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

const TOOLTIP_TITLE = 'Tooltip title';
const TOOLTIP_TITLE_NO_SPACES = 'Unnamed_segmentation_Unnamed_segmentation_Unnamed_segmentation_Unnamed_segmentation_Unnamed_segmentation_Unnamed_segmentation_Unnamed_segmentation_Unnamed_segmentation';
const TOOLTIP_TITLE_LONG = 'Unnamed segmentation Unnamed segmentation Unnamed segmentation Unnamed segmentation Unnamed segmentation Unnamed segmentation Unnamed segmentation Unnamed segmentation';
export const Default: Story = {
  args: {
    title: TOOLTIP_TITLE,
    trigger: 'click'
  },
  play: isChromatic() ? async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.click(await canvas.findByTestId('tooltip-trigger'));
    await waitFor(async () => expect(await canvas.findByText(TOOLTIP_TITLE)).toBeInTheDocument());
  } : undefined
}

export const TextWrappingNoSpaces: Story = {
  args: {
    title: TOOLTIP_TITLE_NO_SPACES,
    trigger: 'click'
  },
  play: isChromatic() ? async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.click(await canvas.findByTestId('tooltip-trigger'));
    await waitFor(async () => expect(await canvas.findByText(TOOLTIP_TITLE_NO_SPACES)).toBeInTheDocument());
  } : undefined
}


export const TextWrapping: Story = {
  args: {
    title: TOOLTIP_TITLE_LONG,
    trigger: 'click'
  },
  play: isChromatic() ? async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.click(await canvas.findByTestId('tooltip-trigger'));
    await waitFor(async () => expect(await canvas.findByText(TOOLTIP_TITLE_LONG)).toBeInTheDocument());
  } : undefined
}