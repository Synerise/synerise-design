import * as React from 'react';
import * as S from './Footer.styles';

export type FooterProps = {
  style?: React.CSSProperties;
  className?: string;
};

const Footer: React.FC<FooterProps> = ({ children, className, style }) => (
  <S.Footer style={style} className={className}>
    {children}
  </S.Footer>
);

export default Footer;
