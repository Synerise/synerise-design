import * as React from 'react';
import { v4 as uuid } from 'uuid';
import '@synerise/ds-core/dist/js/style';

import * as S from './Select.styles';
import { BasicItemProps } from '../Text/Text';

const Select: React.FC<BasicItemProps>  = (props) => {
  const {
    disabled,
    children,
    ...rest
  } = props;
  return (
    <S.SelectItem
        key={uuid()}
        disabled={disabled}
        {...rest}
        parent
      >
      {children}
    </S.SelectItem>
  );
};

export default Select;
