import * as React from 'react';

import { FormattedDate, FormattedDateTime, FormattedNumber, FormattedTime } from '@synerise/ds-data-format';
import { object, number, text } from '@storybook/addon-knobs';

const stories = {
  FormattedNumber: () => (
    <FormattedNumber value={number('value', 1234567.89)} options={object('valueFormatOptions', {})} />
  ),
  FormattedDate: () => (
    <FormattedDate value={new Date(text('date', '2023-06-25T15:40:00'))} options={object('valueFormatOptions', {})} />
  ),
  FormattedDateTime: () => (
    <FormattedDateTime
      value={new Date(text('date', '2023-06-25T15:40:00'))}
      options={object('ValueToFormatOptions', {})}
    />
  ),
  FormattedTime: () => (
    <FormattedTime value={new Date(text('date', '2023-06-25T15:40:00'))} options={object('valueFormatOptions', {})} />
  ),
};

export default {
  name: 'Components/DataFormat',
  config: {},
  stories,
  Component: FormattedNumber,
};
