import * as React from 'react';
import useBreakpoint from '@synerise/ds-utils/dist/useBreakpoint/useBreakpoint';
import * as S from './Grid.styles';

export type GridProps = {
  children: React.ReactChildren;
};
const Grid: React.FC<GridProps> = ({ children }) => {
  const breakpoint = useBreakpoint();
  console.log(breakpoint);
  return <S.GridContainer>{children}</S.GridContainer>;
};

export default Grid;
