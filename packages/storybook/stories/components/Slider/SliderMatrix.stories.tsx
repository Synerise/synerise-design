import { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentType } from 'react';
import React from 'react';

import { composeMatrixStories, StoryMatrix } from '../../utils/StoryMatrix';
import * as AllocationSliderStories from './AllocationSlider.stories';
import * as RangeSliderStories from './RangeSlider.stories';
import * as SliderStories from './Slider.stories';

const prefixed = (
  prefix: string,
  stories: Record<string, ComponentType>,
): Record<string, ComponentType> =>
  Object.fromEntries(
    Object.entries(stories).map(([name, story]) => [
      `${prefix}/${name}`,
      story,
    ]),
  );

const VARIANTS = {
  ...prefixed('DefaultSlider', composeMatrixStories(SliderStories)),
  ...prefixed('RangeSlider', composeMatrixStories(RangeSliderStories)),
  ...prefixed(
    'AllocationSlider',
    composeMatrixStories(AllocationSliderStories),
  ),
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
