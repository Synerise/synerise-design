import React from 'react';

import { useBreakpoint } from '@synerise/ds-utils';
import { type DimensionsWithBreakpoint } from '@synerise/ds-utils/dist/useBreakpoint/useBreakpoint';

import * as S from './Grid.styles';
import { type GridProps } from './Grid.types';
import Item from './GridItem/GridItem';

export const GridContext = React.createContext({
  dimensions: { width: window.innerWidth, height: window.innerHeight },
});

const DEFAULT_GUTTER = 24;
export const DEFAULT_COLUMNS_NUMBER = 24;

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
