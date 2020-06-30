import * as React from 'react';

const Day = (props: any): JSX.Element => {
  return (
    <div>
      Time Window day
      {props?.children}
    </div>
  );
};
export default Day;
