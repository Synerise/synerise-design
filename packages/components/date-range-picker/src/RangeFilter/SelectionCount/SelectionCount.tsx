import * as React from 'react';
import { InfoFillS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from './SelectionCount.styles';
import { SelectionCountProps } from './SelectionCount.types';

const SelectionCount: React.FC<SelectionCountProps> = ({
  label,
  selectedDayCount,
  tooltipLabel,
}: SelectionCountProps) => {
  return (
    <S.Container>
      <Tooltip title={tooltipLabel}>
        <Icon component={<InfoFillS />} color={theme.palette['grey-400']} />
      </Tooltip>
      <span>{label}:</span>
      <S.Count>{selectedDayCount}</S.Count>
    </S.Container>
  );
};

export default SelectionCount;
