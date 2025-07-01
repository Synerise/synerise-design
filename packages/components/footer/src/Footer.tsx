import React, { type CSSProperties, type ReactNode } from 'react';

import * as S from './Footer.styles';

export type FooterProps = {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
};

const Footer = ({ children, className, style }: FooterProps) => (
  <S.Footer style={style} className={className}>
    {children}
  </S.Footer>
);

export default Footer;
