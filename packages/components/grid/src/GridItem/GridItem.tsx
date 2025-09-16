import React, { useContext, useMemo } from 'react';

import {
  type BreakpointKey,
  type DimensionsWithBreakpoint,
} from '@synerise/ds-utils';

import { DEFAULT_COLUMNS_NUMBER } from '../Grid.const';
import { GridContext } from '../Grid.context';
import * as S from '../Grid.styles';
import { type GridItemProps } from '../Grid.types';

const BREAKPOINTS: BreakpointKey[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

const Item = ({ children, contentWrapper, ...props }: GridItemProps) => {
  const breakpointData: DimensionsWithBreakpoint = useContext(GridContext);

  const definedBreakpoints = useMemo(() => {
    return BREAKPOINTS.filter(
      (breakpoint) => props[breakpoint] !== undefined,
    ).map((breakpoint) => {
      return {
        name: breakpoint,
        index: BREAKPOINTS.indexOf(breakpoint),
      };
    });
  }, [props]);

  const breakpointColumns = useMemo((): number | undefined => {
    if (breakpointData.breakpoint) {
      const { name } = breakpointData.breakpoint;
      if (props[name] !== undefined) {
        return props[name];
      }
      const indexOfCurrentBreakpoint = BREAKPOINTS.indexOf(name);
      const nextAvailableBreakpoint = definedBreakpoints.find(
        (breakpoint) => breakpoint.index >= indexOfCurrentBreakpoint,
      );
      return nextAvailableBreakpoint
        ? props[nextAvailableBreakpoint.name]
        : undefined;
    }
    return undefined;
  }, [breakpointData.breakpoint, definedBreakpoints, props]);

  const getColumns = useMemo(() => {
    if (breakpointColumns !== undefined) {
      return breakpointColumns;
    }
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
