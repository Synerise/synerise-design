import React from 'react';
import { v4 as uuid } from 'uuid';

import '@synerise/ds-core/dist/js/style';

import { type BasicItemProps } from '../Text/Text.types';
import * as S from './SubmenuText.styles';

const SubmenuText = ({
  disabled,
  children,
  prefixel,
  suffixel,
  key,
  ...rest
}: BasicItemProps) => {
  return (
    <S.SubtitleItemWrapper className="ds-submenu-title-wrapper">
      <S.SubmenuText
        key={key || uuid()}
        disabled={disabled}
        prefixel={prefixel}
        suffixel={suffixel}
        className="ds-submenu-title"
        {...rest}
      >
        {children}
      </S.SubmenuText>
    </S.SubtitleItemWrapper>
  );
};

export default SubmenuText;
