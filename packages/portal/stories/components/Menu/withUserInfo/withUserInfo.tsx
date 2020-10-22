import * as React from 'react';
import { decorator, getDefaultProps } from '../index.stories';
import { text } from '@storybook/addon-knobs';

const withUserInfo = () => {
  const defaultProps = getDefaultProps();
  const userName = text('Set user name', 'User name');
  const email = text('Set user email', 'User email');
  const props = {
    dataSource: [
      {
        text: (
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {!!userName && <span style={{ fontWeight: 500, marginRight: '4px' }}>{userName}</span>}
            <span style={{ fontWeight: 400 }}>{email}</span>
          </div>
        ),
      },
    ],
    ...defaultProps,
  } as object;
  return decorator(props);
};
export default withUserInfo;
