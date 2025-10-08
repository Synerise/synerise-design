import React, { forwardRef } from 'react';

import Icon, { InfoFillS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './Header.styles';
import { type HeaderProps } from './Header.types';

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({ text, children, tooltip, ...htmlAttributes }, ref) => {
    return (
      <S.MenuHeader ref={ref} {...htmlAttributes}>
        {text || children}
        {tooltip && (
          <Tooltip type="default" trigger="hover" title={tooltip}>
            <S.HeaderIconWrapper>
              <Icon component={<InfoFillS />} />
            </S.HeaderIconWrapper>
          </Tooltip>
        )}
      </S.MenuHeader>
    );
  },
);
