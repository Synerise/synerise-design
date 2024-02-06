import React, { MouseEvent } from 'react';
import ContentItem from '@synerise/ds-manageable-list/dist/Item/ContentItem/ContentItem';
import Badge from '@synerise/ds-badge';
import Icon, { CloseS, FilterM } from '@synerise/ds-icon';

import Tooltip from '@synerise/ds-tooltip';
import { useIntl } from 'react-intl';
import { theme } from '@synerise/ds-core';
import * as S from './RangeFilterStatus.styles';
import { RangeFilterStatusProps } from './RangeFilterStatus.types';

const RangeFilterStatus = ({ onFilterRemove, disabled, filter, label, onClick, texts }: RangeFilterStatusProps) => {
  const intl = useIntl();
  return (
    <S.Container>
      <S.Title>{texts.filter}</S.Title>
      {!filter ? (
        <S.CreatorButton label={label} disabled={disabled} onClick={onClick} block />
      ) : (
        <ContentItem
          onClick={(event: MouseEvent<HTMLDivElement>) => {
            event.stopPropagation();
            onClick();
          }}
          headerSuffix={
            <>
              <S.SuffixText>{texts.change}</S.SuffixText>
              <Tooltip title={texts.remove}>
                <Icon
                  onClick={(event: MouseEvent<HTMLDivElement>) => {
                    event.stopPropagation();
                    onFilterRemove && onFilterRemove();
                  }}
                  component={<CloseS />}
                  color={theme.palette['red-600']}
                />
              </Tooltip>
            </>
          }
          item={{
            id: 'filter-trigger',
            name:
              texts[filter.type.toLocaleLowerCase()] ||
              intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.${filter.type}`, defaultMessage: 'Filter' }),
            tag: (
              <S.BadgeWrapper>
                <Badge status="active" flag pulsing>
                  <Icon component={<FilterM />} />
                </Badge>
              </S.BadgeWrapper>
            ),
          }}
        />
      )}
    </S.Container>
  );
};

export default RangeFilterStatus;
