import * as React from 'react';

const InlineCollapse = (props: any): JSX.Element => {
  return (
    <div>
      Inline collapse
      {props?.children}
    </div>
  );
};
export default InlineCollapse;
