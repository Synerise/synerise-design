import * as React from 'react';
import IconComponent from '@synerise/ds-icon';

import * as S from './Icon.styles';

const Icon: React.FC<{ active: React.ReactNode; inActive: React.ReactNode }> = ({ active, inActive }) => {
  return (
    <S.Wrapper>
      <IconComponent className="item__icon item__icon--active" component={active} />
      <IconComponent className="item__icon item__icon--in-active" component={inActive} />
    </S.Wrapper>
  );
};

export default Icon;
