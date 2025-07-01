import React from 'react';

import { theme } from '@synerise/ds-core';
import Icon, { InfoFillS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import * as S from '../../Mapping.styles';
import type { TitleRowProps } from '../../Mapping.types';

export const TitleRow = ({
  leftTitle,
  leftTitleTooltip,
  rightTitle,
  rightTitleTooltip,
  hasCenterComponent,
  hasSelection,
}: TitleRowProps) => {
  return (
    <S.MappingRow>
      {hasSelection && <S.RowSelectionWrapper />}
      <S.MappingRowLeft>
        <S.ColumnTitle level={6}>
          {leftTitle}{' '}
          {leftTitleTooltip && (
            <Tooltip {...leftTitleTooltip}>
              <Icon
                component={<InfoFillS />}
                color={theme.palette['grey-400']}
              />
            </Tooltip>
          )}
        </S.ColumnTitle>
      </S.MappingRowLeft>
      {hasCenterComponent && <S.MappingRowCenter />}
      <S.MappingRowLeft>
        <S.ColumnTitle level={6}>
          {rightTitle}{' '}
          {rightTitleTooltip && (
            <Tooltip {...rightTitleTooltip}>
              <Icon
                component={<InfoFillS />}
                color={theme.palette['grey-400']}
              />
            </Tooltip>
          )}
        </S.ColumnTitle>
      </S.MappingRowLeft>
    </S.MappingRow>
  );
};
