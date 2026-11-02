import { composeStories, Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { fixedWrapper300 } from '../../utils';
import { StoryMatrix } from '../../utils/StoryMatrix';
import * as InputStories from './Input.stories';

// the stories' own centeredPaddedWrapper sizes each one to the viewport
const {
  AutoresizeInModal: _inModal,
  WithPrefixAndSuffix: _withAddons,
  ...VARIANTS
} = composeStories({
  ...InputStories,
  default: { ...InputStories.default, decorators: [fixedWrapper300] },
});

const meta: Meta = {
  title: 'Components/InputElements/Input/Matrix',
  parameters: { layout: 'padded' },
};

export default meta;

/** Every args-only Input story, so they need no snapshot of their own. */
export const InputMatrix: StoryObj = {
  render: () => <StoryMatrix stories={VARIANTS} columns={3} />,
};
