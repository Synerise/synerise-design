import * as React from 'react';

const TimeWindow = (props: any): JSX.Element => {
  return (
    <div>
      Time Window
      {props?.children}
    </div>
  );
};
export default TimeWindow;
