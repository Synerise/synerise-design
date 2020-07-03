import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const InlineCollapse = (props: any): JSX.Element => {
  return (
    <div>
      Inline collapse
      {props?.children}
    </div>
  );
};
export default InlineCollapse;
