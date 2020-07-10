import * as React from 'react';
import { v4 as uuid } from 'uuid';
import '@synerise/ds-core/dist/js/style';

import * as S from './SubmenuText.styles';
import { BasicItemProps } from '../Text/Text';

const SubmenuText: React.FC<BasicItemProps> = props => {
  const { disabled, children, prefixel, suffixel, key } = props;
  return (
    <S.SubtitleItemWrapper className="ds-submenu-title-wrapper">
      <S.SubmenuText
        key={key || uuid()}
        disabled={disabled}
        prefixel={prefixel}
        suffixel={suffixel}
        className="ds-submenu-title"
      >
        {children}
      </S.SubmenuText>
    </S.SubtitleItemWrapper>
  );
};

export default SubmenuText;
