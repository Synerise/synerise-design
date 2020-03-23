import * as React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import './style/index.less';
import * as S from './Scrollbar.styles';

export type ScrollbarProps = {
  children: React.ReactNode | string;
  classes?: string;
  maxHeight?: string | number;
  absolute?: boolean;
};

const Scrollbar: React.FC<ScrollbarProps> = ({ children, classes, maxHeight, absolute = false }) => {
  return (
    <PerfectScrollbar>
      <S.ScrollbarContent className={classes} style={{ maxHeight }}>
        <S.ScrollbarWrapper absolute={absolute}>{children}</S.ScrollbarWrapper>
      </S.ScrollbarContent>
    </PerfectScrollbar>
  );
};
export default Scrollbar;
