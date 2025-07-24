import { type Texts } from 'DateRangePicker.types';

import React, { type MouseEvent } from 'react';
import { useIntl } from 'react-intl';

import Badge from '@synerise/ds-badge';
import { theme } from '@synerise/ds-core';
import Icon, { CloseS, FilterM } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './RangeFilterStatus.styles';
import { type RangeFilterStatusProps } from './RangeFilterStatus.types';

const RangeFilterStatus = ({
  onFilterRemove,
  disabled,
  filter,
  label,
  onClick,
  texts,
}: RangeFilterStatusProps) => {
  const intl = useIntl();
  return (
    <S.Container>
      <S.Title>{texts.filter}</S.Title>
      {!filter ? (
        <S.CreatorButton
          label={label}
          disabled={disabled}
          onClick={onClick}
          block
        />
      ) : (
        <S.ContentItem
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
            // @ts-expect-error requires DRP types refactor
            name:
              texts[filter.type.toLocaleLowerCase() as keyof Texts] ||
              intl.formatMessage({
                id: `DS.DATE-RANGE-PICKER.${filter.type}`,
                defaultMessage: 'Filter',
              }),
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
