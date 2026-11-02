import { composeStories, Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { StoryMatrix } from '../../utils/StoryMatrix';
import * as CardSelectStories from './CardSelect.stories';

// the stories' own cardSelectWrapper sizes each one to the viewport
const VARIANTS = composeStories({
  ...CardSelectStories,
  default: { ...CardSelectStories.default, decorators: [] },
});

const meta: Meta = {
  title: 'Components/CardSelect/Matrix',
  parameters: { layout: 'padded' },
};

export default meta;

/** Every single CardSelect story, so they need no snapshot of their own. */
export const CardSelectMatrix: StoryObj = {
  render: () => <StoryMatrix stories={VARIANTS} columns={4} />,
};
