import { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { centeredPaddedWrapper } from '../../utils';
import { composeMatrixStories, StoryMatrix } from '../../utils/StoryMatrix';
import * as InputStories from './Input.stories';

const VARIANTS = composeMatrixStories(InputStories, {
  exclude: {
    AutoresizeInModal: 'opens a modal, which a cell cannot hold',
  },
  withoutDecorators: [centeredPaddedWrapper],
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
