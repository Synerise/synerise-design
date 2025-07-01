import { range, rangeRight } from 'lodash';
import React from 'react';

import { type Action, Header } from '../Header/Header';
import * as S from '../TimeWindow.styles';
import { HeaderWrapper } from '../TimeWindow.styles';
import { reverseRange } from '../utils';
import { type GridProps } from './Grid.types';

const Grid: React.FC<GridProps> = ({
  keys,
  numberOfDays,
  numberOfDaysPerRow,
  rowLabelFormatter,
  title,
  texts,
  showSelectAll,
  showUnselectAll,
  inverted,
  labelInverted,
  reverseGroup,
  onSelectAll,
  onUnselectAll,
  renderDay,
}: GridProps) => {
  const numberOfColumns = numberOfDaysPerRow || numberOfDays;
  const rangeMethod = labelInverted ? rangeRight : range;
  const actions: Action[] = [];

  if (showSelectAll) {
    actions.push({
      key: 'select-all',
      onClick: onSelectAll,
      label: <>{texts.selectAll}</>,
    });
  }
  if (showUnselectAll) {
    actions.push({
      key: 'unselect-all',
      onClick: onUnselectAll,
      label: <>{texts.unselectAll}</>,
    });
  }
  let grid = React.useMemo(
    () => (
      <S.Days columns={numberOfColumns}>
        {inverted
          ? reverseRange(keys, reverseGroup).map(renderDay)
          : keys.map(renderDay)}
      </S.Days>
    ),
    [numberOfColumns, inverted, keys, reverseGroup, renderDay],
  );
  const numberOfRows = Math.ceil(numberOfDays / numberOfColumns);

  if (rowLabelFormatter) {
    grid = (
      <S.Wrapper>
        <S.Labels>
          {rangeMethod(numberOfRows).map(
            (rowIndex: number): React.ReactNode => (
              <span key={rowIndex}>{rowLabelFormatter(rowIndex)}</span>
            ),
          )}
        </S.Labels>
        {grid}
      </S.Wrapper>
    );
  }
  return (
    <S.GridContainer className="time-window-grid">
      <HeaderWrapper>
        <Header title={title} actions={actions} />
      </HeaderWrapper>
      {grid}
    </S.GridContainer>
  );
};

export default Grid;
