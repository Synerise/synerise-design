import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Day = (props: any): JSX.Element => {
  return (
    <div>
      Time Window day
      {props?.children}
    </div>
  );
};
export default Day;
