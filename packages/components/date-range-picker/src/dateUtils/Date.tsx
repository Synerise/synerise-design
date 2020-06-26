import React from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';

export const ParsedDate = props => (
  <>
    <FormattedDate value={props.date} year="numeric" month="short" day="numeric" />
    &nbsp;
    <FormattedTime value={props.date} day="numeric" hour="numeric" minute="numeric" />
  </>
);
