import type { Meta, StoryObj } from '@storybook/react';
import type { ConditionProps } from '@synerise/ds-condition';

export type ConditionStoryProps = ConditionProps & {
  showStepName?: boolean;
  enableAddCondition?: boolean;
  addStepType?: string;
  textFactorInputType: string;
  enableChangeOrder?: boolean;
  withCustomFactor?: boolean;
};
export type ConditionMeta = Meta<ConditionStoryProps>;
export type ConditionStory = StoryObj<ConditionStoryProps>;