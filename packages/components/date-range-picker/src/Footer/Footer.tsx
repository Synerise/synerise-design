import { isValid as fnsIsValid, parseISO } from 'date-fns';
import React, { useCallback, useMemo } from 'react';

import Button from '@synerise/ds-button';
import { getDefaultDataTimeOptions, useDataFormat } from '@synerise/ds-core';
import Icon, { ArrowRightS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import * as CONST from '../constants';
import type { Texts } from '../DateRangePicker.types';
import {
  getDateToDisplay,
  getFormatOptionsToDisplay,
} from '../dateUtils/displayDate';
import { isLifetime } from '../RelativeRangePicker/Elements/RangeDropdown/RangeDropdown';
import * as S from './Footer.styles';
import type { Props } from './Footer.types';

const Footer = ({
  canApply,
  onApply,
  canSwitchMode,
  onSwitchMode,
  mode,
  dateOnly,
  message,
  texts,
  value,
  valueFormatOptions,
  showTime,
  timeZone,
  displayDateContainerClass = 'ds-date-range-picker-value',
  ...rest
}: Props) => {
  const { formatValue } = useDataFormat();

  const footerDateToString = useCallback(
    (date: Date | string) => {
      // Bounds arrive as either form and both denote the same thing, so both take the same
      // route. A string used to be run through a hardcoded moment-token pattern instead, which
      // is what kept `@date-fns/upgrade`'s `convertTokens` alive.
      const parsed = typeof date === 'string' ? parseISO(date) : date;

      if (!fnsIsValid(parsed)) {
        return '';
      }

      return formatValue(
        getDateToDisplay(parsed, timeZone),
        getFormatOptionsToDisplay(
          {
            ...getDefaultDataTimeOptions(showTime),
            ...valueFormatOptions,
          },
          timeZone,
        ),
      );
    },
    [formatValue, showTime, timeZone, valueFormatOptions],
  );

  const ChosenRange = useMemo(() => {
    if (value?.key === CONST.ALL_TIME || (value && isLifetime(value))) {
      return (
        <S.ChosenRange className="ds-date-range-picker-value">
          {value?.translationKey
            ? (texts[value.translationKey as keyof Texts] ??
              value.translationKey)
            : value?.key || 'LIFETIME'}
        </S.ChosenRange>
      );
    }
    return (
      <S.ChosenRange
        className={displayDateContainerClass}
        data-testid="ds-date-range-picker-footer"
      >
        <span>
          {value && value.from
            ? footerDateToString(value?.from)
            : texts.startDatePlaceholder}
        </span>
        <S.InvisibleTextContent>{' – '}</S.InvisibleTextContent>
        <Icon component={<ArrowRightS />} />
        <span>
          {value && value.to
            ? footerDateToString(value?.to)
            : texts.endDatePlaceholder}
        </span>
      </S.ChosenRange>
    );
  }, [value, texts, displayDateContainerClass, footerDateToString]);

  return (
    <S.Container className="ds-date-range-picker-footer" {...rest}>
      {ChosenRange}
      <S.ActionsPlaceholder />
      <S.Actions>
        <Tooltip title={message}>
          <Button
            data-testid="date-range-picker-apply-button"
            disabled={!canApply}
            type="primary"
            onClick={(): void => {
              onApply && onApply(value);
            }}
          >
            {texts.apply}
          </Button>
        </Tooltip>
      </S.Actions>
    </S.Container>
  );
};

export default Footer;
