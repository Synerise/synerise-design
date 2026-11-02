import { composeStories, Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { fixedWrapper300 } from '../../utils';
import { StoryMatrix } from '../../utils/StoryMatrix';
import * as PasswordInputStories from './PasswordInput.stories';

// the stories' own centeredPaddedWrapper sizes each one to the viewport
const VARIANTS = composeStories({
  ...PasswordInputStories,
  default: { ...PasswordInputStories.default, decorators: [fixedWrapper300] },
});

const meta: Meta = {
  title: 'Components/InputElements/PasswordInput/Matrix',
  parameters: { layout: 'padded' },
};

export default meta;

/** Every PasswordInput story, so they need no snapshot of their own. */
export const PasswordInputMatrix: StoryObj = {
  render: () => <StoryMatrix stories={VARIANTS} columns={3} />,
};
