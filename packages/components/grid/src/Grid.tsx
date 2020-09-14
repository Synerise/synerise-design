import * as React from 'react';
import { useBreakpoint } from '@synerise/ds-utils';
import { DimensionsWithBreakpoint } from '@synerise/ds-utils/dist/useBreakpoint/useBreakpoint';
import * as S from './Grid.styles';
import { GridProps } from './Grid.types';
import Item from './GridItem/GridItem';

export const GridContext = React.createContext({
  dimensions: { width: window.innerWidth, height: window.innerHeight },
});

const DEFAULT_GUTTER = 24;
export const DEFAULT_COLUMNS_NUMBER = 24;

const Grid: React.FC<GridProps> & {
  Item: React.ElementType;
} = ({ children, gutter = DEFAULT_GUTTER }) => {
  const breakpointData: DimensionsWithBreakpoint = useBreakpoint();

  return (
    <S.GridContainer
      className="ds-grid"
      columns={breakpointData.breakpoint?.columns || DEFAULT_COLUMNS_NUMBER}
      gutter={gutter}
    >
      <GridContext.Provider value={breakpointData}>{children}</GridContext.Provider>
    </S.GridContainer>
  );
};

Grid.Item = Item;

export default Grid;
