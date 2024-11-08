
import { Meta, StoryObj } from '@storybook/react';
import { userEvent, waitFor, within, expect } from '@storybook/test';
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

  const TOOLTIP_TITLE = 'Tooltip title'
  export const Default: Story = {
    args: {
        title: TOOLTIP_TITLE,
        trigger: 'click'
    },
    play: isChromatic() ? async ({ canvasElement, args}) => {
        const canvas = within(canvasElement.parentElement!);
        await userEvent.click(await canvas.findByTestId('tooltip-trigger'));
        await waitFor(async () => expect(await canvas.findByText(TOOLTIP_TITLE)).toBeInTheDocument());
    } : undefined
  }