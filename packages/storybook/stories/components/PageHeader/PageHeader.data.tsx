import React, { ReactNode } from 'react';

import Skeleton from '@synerise/ds-skeleton';
import Radio from '@synerise/ds-radio';

export type StepData = {
  stepNumber: number;
  label: string;
  children: ReactNode;
  tooltip?: ReactNode;
  validated?: boolean;
  warning?: boolean;
};

export const tabs = [
  {
    label: 'Tab first',
  },
  {
    label: 'Tab second',
  },
  {
    label: 'Tab Third',
  },
];
export const tabsSkeleton = [
  {
    label: <div style={{width: '66px'}}>
      <Skeleton numberOfSkeletons={1} width='M'/>
    </div>,
  },
  {
    label: <div style={{width: '66px'}}>
      <Skeleton numberOfSkeletons={1} width='M'/>
    </div>,
  },
  {
    label: <div style={{width: '66px'}}>
      <Skeleton numberOfSkeletons={1} width='M'/>
    </div>,
  },
];

export const steps = [
  {
    number: 1,
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
    number: 2,
    label: 'Settings',
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
    number: 3,
    label: 'Filters & Facets',
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
    number: 4,
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
