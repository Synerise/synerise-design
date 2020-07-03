import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TimeWindow = (props: any): JSX.Element => {
  return (
    <div>
      Time Window
      {props?.children}
    </div>
  );
};
export default TimeWindow;
