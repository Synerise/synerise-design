import React from 'react';
import { DimensionsWithBreakpoint } from '@synerise/ds-utils/dist/useBreakpoint/useBreakpoint';
import { GridItemProps } from '../Grid.types';
import * as S from '../Grid.styles';
import { DEFAULT_COLUMNS_NUMBER, GridContext } from '../Grid';

const BREAKPOINTS = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

const Item = ({ children, contentWrapper, ...props }: GridItemProps) => {
  const breakpointData: DimensionsWithBreakpoint = React.useContext(GridContext);

  const definedBreakpoints = React.useMemo(() => {
    return BREAKPOINTS.filter(breakpoint => props[breakpoint] !== undefined).map(breakpoint => {
      return {
        name: breakpoint,
        index: BREAKPOINTS.indexOf(breakpoint),
      };
    });
  }, [props]);

  const breakpointColumns = React.useMemo((): number | undefined => {
    if (breakpointData.breakpoint) {
      const { name } = breakpointData.breakpoint;
      if (props[name] !== undefined) return props[name];
      const indexOfCurrentBreakpoint = BREAKPOINTS.indexOf(name);
      const nextAvailableBreakpoint = definedBreakpoints.find(
        breakpoint => breakpoint.index >= indexOfCurrentBreakpoint
      );
      return nextAvailableBreakpoint ? props[nextAvailableBreakpoint.name] : undefined;
    }
    return undefined;
  }, [breakpointData.breakpoint, definedBreakpoints, props]);

  const getColumns = React.useMemo(() => {
    if (breakpointColumns !== undefined) return breakpointColumns;
    return breakpointData.breakpoint?.columns || DEFAULT_COLUMNS_NUMBER;
  }, [breakpointColumns, breakpointData]);

  return (
    <S.GridItem
      className="ds-grid-item"
      columns={getColumns}
      maxColumns={breakpointData?.breakpoint?.columns || getColumns}
      contentWrapper={Boolean(contentWrapper)}
    >
      {children}
    </S.GridItem>
  );
};

export default Item;
