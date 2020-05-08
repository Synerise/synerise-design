import * as React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import './style/index.less';
import * as S from './Scrollbar.styles';

export type ScrollbarProps = {
  children: React.ReactNode | string;
  classes?: string;
  maxHeight?: string | number;
  absolute?: boolean;
  onScroll?: (e: React.UIEvent) => void;
};

const Scrollbar: React.FC<ScrollbarProps> = ({ children, classes, maxHeight, absolute = false, onScroll }) => {
  return (
    <PerfectScrollbar onScroll={onScroll} options={{ minScrollbarLength: 48 }}>
      <S.ScrollbarContent className={classes} style={{ maxHeight }}>
        <S.ScrollbarWrapper absolute={absolute}>{children}</S.ScrollbarWrapper>
      </S.ScrollbarContent>
    </PerfectScrollbar>
  );
};
export default Scrollbar;
