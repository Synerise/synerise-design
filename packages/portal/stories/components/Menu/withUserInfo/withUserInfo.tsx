import * as React from 'react';
import { decorator, getDefaultProps } from '../index.stories';
import { text } from '@storybook/addon-knobs';
import * as S from './withUserInfo.styles';

const withUserInfo = () => {
  const defaultProps = getDefaultProps();
  const userName = text('Set user name', 'User name');
  const email = text('Set user email', 'User email');
  const props = {
    dataSource: [
      {
        text: (
          <S.UserInfo>
            {!!userName && <span className={'name'}>{userName}</span>}
            <span className={'email'}>{email}</span>
          </S.UserInfo>
        ),
      },
    ],
    ...defaultProps,
  } as object;
  return decorator(props);
};
export default withUserInfo;
