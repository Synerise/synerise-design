import * as React from 'react';
import '@synerise/ds-core/dist/js/style';

import * as S from './Danger.styles';
import { BasicItemProps } from '../Text/Text.types';

const Danger: React.FC<BasicItemProps> = props => {
  const { children, ...rest } = props;
  return (
    <S.DangerItem {...rest} >
      {children}
    </S.DangerItem>
  );
};

export default Danger;
