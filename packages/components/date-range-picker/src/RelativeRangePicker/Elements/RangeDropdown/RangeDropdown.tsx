import { isEqual } from 'lodash';
import find from 'ramda/src/find';
import React, { type MouseEvent, useCallback, useRef, useState } from 'react';

import { theme } from '@synerise/ds-core';
import Icon, { AngleDownS, CheckS } from '@synerise/ds-icon';
import type { ItemData } from '@synerise/ds-list-item';
import Scrollbar from '@synerise/ds-scrollbar';
import { useOnClickOutside } from '@synerise/ds-utils';

import { type Texts } from '../../../DateRangePicker.types';
import { ALL_TIME } from '../../../constants';
import { type DateRange } from '../../../date.types';
import * as S from '../../RelativeRangePicker.styles';
import { findRangeByKey } from '../../utils';
import { type RangeDropdownProps } from './RangeDropdown.types';

const MAX_ITEMS_COUNT = 7;
const ITEMS_HEIGHT = 32;
const DROPDOWN_WIDTH = 160;
const DROPDOWN_PADDING = 8;

/**
 * Tell whether given date (range) is a lifetime value.
 *
 * @param date-value @{type DateRange}
 * @param fallback whether to accept existing properties, but set to `undefined`, default `false`
 */
export const isLifetime = (range?: DateRange, fallback = false): boolean => {
  if (!range) {
    return false;
  }
  const keys = Object.keys(range);
  const legacyDef =
    range.type === 'ABSOLUTE' && !keys.includes('from') && !keys.includes('to');
  // reasonable def comes from the fact that empty from and to sometimes might be also set like this (from/to as undefined)
  const reasonableDef =
    range.type === 'ABSOLUTE' &&
    range.from === undefined &&
    range.to === undefined;
  const legacyValueButLifetimeForSure =
    reasonableDef && range.translationKey === 'allTime';
  return (
    legacyDef || (fallback && reasonableDef) || legacyValueButLifetimeForSure
  );
};

const RangeDropdown = ({
  ranges,
  currentRange,
  texts,
  onChange,
  valueTransformer = (e: DateRange | object): DateRange | object => e,
}: RangeDropdownProps) => {
  const [dropVisible, setDropVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => {
    setDropVisible(false);
  });

  const onMenuItemClick = useCallback(
    (itemData: ItemData<MouseEvent>): void => {
      const range = findRangeByKey(ranges, itemData.key as string);
      onChange(range);
      setDropVisible(false);
    },
    [onChange, ranges],
  );

  if (!ranges || ranges.length === 0) {
    return null;
  }
  const mappedRanges = ranges.map(valueTransformer);
  const transformedCurrentRange = valueTransformer(currentRange);
  const anyOfTransformedRangesMatchesCurrentRange = isLifetime(
    transformedCurrentRange as DateRange,
  )
    ? false
    : find((r) => isEqual(transformedCurrentRange, r), mappedRanges);
  const containsCurrentRange =
    (currentRange &&
      find((range) => {
        const key = isLifetime(currentRange) ? ALL_TIME : currentRange.key;
        return range.key === key;
      }, ranges)) ||
    anyOfTransformedRangesMatchesCurrentRange;
  const overlay = (
    <S.OverlayWrapper visible={dropVisible} width={DROPDOWN_WIDTH}>
      <Scrollbar
        maxHeight={MAX_ITEMS_COUNT * ITEMS_HEIGHT}
        style={{ width: DROPDOWN_WIDTH - DROPDOWN_PADDING }}
        absolute
      >
        <S.DropMenu>
          {ranges.map((range) => {
            const selected =
              currentRange?.key === range.key ||
              (isLifetime(currentRange) && range.key === ALL_TIME);
            return (
              <S.DropMenuItem
                onClick={onMenuItemClick}
                key={range.key || range.id}
                itemKey={range.key || range.id}
                suffixel={
                  selected && (
                    <Icon
                      component={<CheckS />}
                      color={theme.palette['green-600']}
                    />
                  )
                }
              >
                {range.translationKey
                  ? texts[range.translationKey as keyof Texts]
                  : range.key}
              </S.DropMenuItem>
            );
          })}
        </S.DropMenu>
      </Scrollbar>
    </S.OverlayWrapper>
  );
  return (
    <S.DropdownContainer ref={dropdownRef}>
      <S.Range
        data-testid="relative-ranges-dropdown"
        activated={!!containsCurrentRange}
        mode="label-icon"
        onClick={(): void => setDropVisible(!dropVisible)}
      >
        {currentRange &&
          texts[
            containsCurrentRange && currentRange.translationKey
              ? (currentRange.translationKey as keyof Texts)
              : 'more'
          ]}

        <Icon component={<AngleDownS />} />
      </S.Range>
      {overlay}
    </S.DropdownContainer>
  );
};

export default RangeDropdown;
