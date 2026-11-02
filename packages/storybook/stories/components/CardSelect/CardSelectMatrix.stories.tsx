import { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { cardSelectWrapper } from '../../utils';
import { composeMatrixStories, StoryMatrix } from '../../utils/StoryMatrix';
import * as CardSelectStories from './CardSelect.stories';

const VARIANTS = composeMatrixStories(CardSelectStories, {
  withoutDecorators: [cardSelectWrapper],
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
