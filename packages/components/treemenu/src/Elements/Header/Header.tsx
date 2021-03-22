import React from 'react';
import { TreeMenuProps } from '../../TreeMenu.types';

import * as S from './Header.styles';

export type HeaderProps = Pick<TreeMenuProps, 'texts'> & {
  count?: number;
};

const Header: React.FC<HeaderProps> = ({ count, texts, ...props }) => {
  return (
    <S.Header {...props}>
      <h3>{texts?.elements}</h3>
      <span>{count}</span>
    </S.Header>
  );
};

export default React.memo(Header);
