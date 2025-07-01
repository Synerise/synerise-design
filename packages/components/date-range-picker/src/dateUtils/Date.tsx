import React from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';

const ParsedDate: React.FC<{ date: Date }> = (props: { date: Date }) => {
  const { date } = props;
  return (
    <>
      <FormattedDate value={date} year="numeric" month="short" day="numeric" />
      &nbsp;
      <FormattedTime
        value={date}
        day="numeric"
        hour="numeric"
        minute="numeric"
      />
    </>
  );
};
export default ParsedDate;
