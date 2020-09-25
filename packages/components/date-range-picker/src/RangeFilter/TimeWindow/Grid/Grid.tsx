import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { range, rangeRight } from 'lodash';
import { GridProps } from './Grid.types';
import { Action, Header } from '../Header/Header';
import * as S from '../TimeWindow.styles';
import { reverseRange } from '../utils';

const Grid: React.FC<GridProps> = ({
  keys,
  numberOfDays,
  numberOfDaysPerRow,
  rowLabelFormatter,
  title,
  showUnselectAll,
  showSelectAll,
  inverted,
  labelInverted,
  reverseGroup,
  onClearSelected,
  onSelectAll,
  renderDay,
}: GridProps) => {
  const numberOfColumns = numberOfDaysPerRow || numberOfDays;
  const rangeMethod = labelInverted ? rangeRight : range;
  const actions: Action[] = [];

  if (showUnselectAll)
    actions.push({
      key: 'unselect-all',
      onClick: onClearSelected,
      label: <FormattedMessage id="DS.DATE-RANGE-PICKER.UNSELECT-ALL" />,
    });
  if (showSelectAll)
    actions.push({
      key: 'select-all',
      onClick: onSelectAll,
      label: <FormattedMessage id="DS.DATE-RANGE-PICKER.SELECT-ALL" />,
    });
  let grid = (
    <S.Days columns={numberOfColumns}>
      {inverted ? reverseRange(keys, reverseGroup).map(renderDay) : keys.map(renderDay)}
    </S.Days>
  );
  const numberOfRows = Math.ceil(numberOfDays / numberOfColumns);

  if (rowLabelFormatter) {
    grid = (
      <S.Wrapper>
        <S.Labels>
          {rangeMethod(numberOfRows).map(
            (rowIndex: number): React.ReactNode => (
              <span key={rowIndex}>{rowLabelFormatter(rowIndex)}</span>
            )
          )}
        </S.Labels>
        {grid}
      </S.Wrapper>
    );
  }
  return (
    <>
      <Header title={title} actions={actions} style={{ marginBottom: 16 }} />
      {grid}
    </>
  );
};

export default Grid;
