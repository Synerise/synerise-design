import React, { type ReactNode } from 'react';

import IconComponent from '@synerise/ds-icon';

import * as S from './Icon.styles';

type AppMenuIconProps = {
  active: ReactNode;
  inActive: ReactNode;
};
export const AppMenuIcon = ({ active, inActive }: AppMenuIconProps) => {
  return (
    <S.Wrapper>
      <IconComponent
        className="item__icon item__icon--active"
        component={active}
      />
      <IconComponent
        className="item__icon item__icon--in-active"
        component={inActive}
      />
    </S.Wrapper>
  );
};

export default AppMenuIcon;
