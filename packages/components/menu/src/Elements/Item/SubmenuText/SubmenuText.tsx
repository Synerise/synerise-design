import * as React from 'react';
import { v4 as uuid } from 'uuid';
import '@synerise/ds-core/dist/js/style';

import * as S from './SubmenuText.styles';
import { BasicItemProps } from '../Text/Text';

const SubmenuText: React.FC<BasicItemProps>  = (props) => {
  const {
    disabled,
    children,
    prefixel,
  } = props;
  return (
    <S.SubmenuText
      key={uuid()}
      disabled={disabled}
      prefixel={prefixel}
    >
      {children}
    </S.SubmenuText>
  );
};

export default SubmenuText;
