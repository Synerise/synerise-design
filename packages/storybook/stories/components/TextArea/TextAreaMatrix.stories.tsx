import { composeStories, Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { StoryMatrix } from '../../utils/StoryMatrix';
import * as TextAreaStories from './TextArea.stories';

const VARIANTS = composeStories(TextAreaStories);

const meta: Meta = {
  title: 'Components/InputElements/TextArea/Matrix',
  parameters: { layout: 'padded' },
};

export default meta;

/** Every TextArea story, so they need no snapshot of their own. */
export const TextAreaMatrix: StoryObj = {
  render: () => <StoryMatrix stories={VARIANTS} columns={3} />,
};
