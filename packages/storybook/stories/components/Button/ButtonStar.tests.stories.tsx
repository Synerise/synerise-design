import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import styled from 'styled-components';

import type { StarButtonProps } from '@synerise/ds-button';
import Button from '@synerise/ds-button';

import { BOOLEAN_CONTROL, CLASSNAME_ARG_CONTROL } from '../../utils';
import { NO_SNAPSHOT } from '../../utils/chromatic';

const meta: Meta<StarButtonProps> = {
  title: 'Components/Button/Tests',
  tags: ['visualtests'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    return <Button.Star {...args} />;
  },
  component: Button.Star,
  argTypes: {
    active: BOOLEAN_CONTROL,
    hasError: BOOLEAN_CONTROL,
    className: CLASSNAME_ARG_CONTROL,
  },
};

export default meta;

export const RendersButtonStar: StoryObj<StarButtonProps> = {
  parameters: { ...NO_SNAPSHOT },
};

export const RendersButtonStarActive: StoryObj<StarButtonProps> = {
  parameters: { ...NO_SNAPSHOT },
  args: { active: true },
};
export const RendersButtonStarError: StoryObj<StarButtonProps> = {
  parameters: { ...NO_SNAPSHOT },
  args: { hasError: true },
};
export const RendersButtonStarActiveError: StoryObj<StarButtonProps> = {
  parameters: { ...NO_SNAPSHOT },
  args: {
    hasError: true,
    active: true,
  },
};
export const RendersButtonStarDisabled: StoryObj<StarButtonProps> = {
  parameters: { ...NO_SNAPSHOT },
  args: { disabled: true },
};
export const RendersButtonStarDisabledActive: StoryObj<StarButtonProps> = {
  parameters: { ...NO_SNAPSHOT },
  args: {
    disabled: true,
    active: true,
  },
};

const STAR_STATES = {
  RendersButtonStar,
  RendersButtonStarActive,
  RendersButtonStarError,
  RendersButtonStarActiveError,
  RendersButtonStarDisabled,
  RendersButtonStarDisabledActive,
};

const MatrixGrid = styled.div`
  display: grid;
  grid-template-columns: max-content max-content;
  align-items: center;
  gap: 16px 24px;
`;

/** Every star state side by side, so the single-state stories need no snapshot of their own. */
export const ButtonStarStates: StoryObj<StarButtonProps> = {
  render: (args) => (
    <MatrixGrid>
      {Object.entries(STAR_STATES).map(([name, story]) => (
        <React.Fragment key={name}>
          <span>{name}</span>
          <Button.Star {...args} {...story.args} />
        </React.Fragment>
      ))}
    </MatrixGrid>
  ),
};
