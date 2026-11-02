import { composeStories, Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { StoryMatrix } from '../../utils/StoryMatrix';
import * as AllocationSliderStories from './AllocationSlider.stories';
import * as RangeSliderStories from './RangeSlider.stories';
import * as SliderStories from './Slider.stories';

const prefixed = <T extends object>(prefix: string, stories: T) =>
  Object.fromEntries(
    Object.entries(stories).map(([name, story]) => [
      `${prefix}/${name}`,
      story,
    ]),
  );

const VARIANTS = {
  ...prefixed('DefaultSlider', composeStories(SliderStories)),
  ...prefixed('RangeSlider', composeStories(RangeSliderStories)),
  ...prefixed('AllocationSlider', composeStories(AllocationSliderStories)),
};

const meta: Meta = {
  title: 'Components/Slider/Matrix',
  parameters: { layout: 'padded' },
};

export default meta;

/** Every slider story, so they need no snapshot of their own. */
export const SliderMatrix: StoryObj = {
  render: () => <StoryMatrix stories={VARIANTS} columns={2} />,
};
