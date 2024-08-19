import React from 'react';
import Radio from '@synerise/ds-radio';

export const STEPS = [
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
    label: 'Filters & Facets in analytics',
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

export const DEFAULT_STATE = {
  activeStep: 0,
  visible: false,
};
