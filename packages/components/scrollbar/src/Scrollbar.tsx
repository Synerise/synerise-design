import * as React from 'react';
import SimpleBar from 'simplebar-react';
import './style/index.less';
import * as S from './Scrollbar.styles';

export type ScrollbarProps = {
  children: React.ReactNode | string;
  classes?: string;
  maxHeight?: string | number;
  absolute?: boolean;
};

const Scrollbar: React.FC<ScrollbarProps> = ({ children, classes, maxHeight, absolute = true }) => {
  return (
    <S.ScrollbarContent absolute={absolute}>
      {/*
        // @ts-ignore */}
      <SimpleBar className={classes} style={{ maxHeight }} autoHide={false}>
        {children}
      </SimpleBar>
    </S.ScrollbarContent>
  );
};
export default Scrollbar;
