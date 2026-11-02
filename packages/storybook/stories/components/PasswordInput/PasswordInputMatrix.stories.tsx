import { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { centeredPaddedWrapper } from '../../utils';
import { composeMatrixStories, StoryMatrix } from '../../utils/StoryMatrix';
import * as PasswordInputStories from './PasswordInput.stories';

const VARIANTS = composeMatrixStories(PasswordInputStories, {
  withoutDecorators: [centeredPaddedWrapper],
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
