import React from 'react';

import {
  type DimensionsWithBreakpoint,
  useBreakpoint,
} from '@synerise/ds-utils';

import { DEFAULT_COLUMNS_NUMBER, DEFAULT_GUTTER } from './Grid.const';
import { GridContext } from './Grid.context';
import * as S from './Grid.styles';
import { type GridProps } from './Grid.types';
import Item from './GridItem/GridItem';

const Grid = ({ children, gutter = DEFAULT_GUTTER, style }: GridProps) => {
  const breakpointData: DimensionsWithBreakpoint = useBreakpoint();

  return (
    <S.GridContainer
      style={style}
      className="ds-grid"
      columns={breakpointData.breakpoint?.columns || DEFAULT_COLUMNS_NUMBER}
      gutter={gutter}
    >
      <GridContext.Provider value={breakpointData}>
        {children}
      </GridContext.Provider>
    </S.GridContainer>
  );
};

Grid.Item = Item;

export default Grid;
