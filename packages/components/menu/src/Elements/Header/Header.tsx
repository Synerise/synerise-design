import React from 'react';

import Icon, { InfoFillS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './Header.styles';
import { type HeaderProps } from './Header.types';

const MenuHeader = ({ headerText, tooltip }: HeaderProps) => {
  return (
    <S.MenuHeader>
      {headerText}
      {tooltip && (
        <Tooltip type="default" trigger="hover" title={tooltip || headerText}>
          <S.HeaderIconWrapper>
            <Icon component={<InfoFillS />} />
          </S.HeaderIconWrapper>
        </Tooltip>
      )}
    </S.MenuHeader>
  );
};

export default MenuHeader;
