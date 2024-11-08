import React, { ReactNode } from 'react';
import Radio from '@synerise/ds-radio';

export type StepData = {
  stepNumber: number;
  label: string;
  children: ReactNode;
  tooltip?: ReactNode;
  validated?: boolean;
  warning?: boolean;
};
export const STEPPER_STEPS: StepData[] = [
  {
    stepNumber: 1,
    label: 'Details',
    children: (
      <Radio.Group>
        <Radio name="radio" value="radio" description="Description">
          Radio
        </Radio>
        <Radio name="radio" value="tv" description="Description">
          TV
        </Radio>
      </Radio.Group>
    ),
  },
  {
    stepNumber: 2,
    label: 'Settings',
    tooltip: 'Settings step tooltip',
    children: (
      <Radio.Group>
        <Radio name="radio" value="radio" description="Description">
          Radio
        </Radio>
        <Radio name="radio" value="tv" description="Description">
          TV
        </Radio>
      </Radio.Group>
    ),
  },
  {
    stepNumber: 3,
    label: 'Filters & Facets in analytics',
    tooltip: 'Filters step tooltip',
    children: (
      <Radio.Group>
        <Radio name="radio" value="radio" description="Description">
          Radio
        </Radio>
        <Radio name="radio" value="tv" description="Description">
          TV
        </Radio>
      </Radio.Group>
    ),
  },
  {
    stepNumber: 4,
    label: 'Ranking',
    children: (
      <Radio.Group>
        <Radio name="radio" value="radio" description="Description">
          Radio
        </Radio>
        <Radio name="radio" value="tv" description="Description">
          TV
        </Radio>
      </Radio.Group>
    ),
  },
];
