import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import { getDefaultDataTimeOptions, useDataFormat } from '@synerise/ds-core';
import Icon, { ArrowRightS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import { type Texts } from '../DateRangePicker.types';
import { isLifetime } from '../RelativeRangePicker/Elements/RangeDropdown/RangeDropdown';
import * as CONST from '../constants';
import fnsFormat from '../dateUtils/format';
import getDateFromString from '../dateUtils/getDateFromString';
import { toIsoStringWithoutZone } from '../utils';
import * as S from './Footer.styles';
import { type Props } from './Footer.types';

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
  format,
  valueFormatOptions,
  showTime,
  displayDateContainerClass = 'ds-date-range-picker-value',
  ...rest
}: Props) => {
  const { formatValue } = useDataFormat();
  const { locale } = useIntl();
  const footerFormat =
    format || (showTime ? 'MMM D, YYYY, HH:mm' : 'MMM D, YYYY');

  const footerDateToString = useCallback(
    (date: Date | string) => {
      if (format || typeof date === 'string') {
        return fnsFormat(getDateFromString(date), footerFormat, locale);
      }

      const parseDate = new Date(toIsoStringWithoutZone(date));

      return formatValue(parseDate, {
        ...getDefaultDataTimeOptions(showTime),
        ...valueFormatOptions,
      });
    },
    [footerFormat, format, formatValue, locale, valueFormatOptions, showTime],
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
      <S.ChosenRange className={displayDateContainerClass}>
        {!!value && !!value.from
          ? footerDateToString(value?.from)
          : texts.startDatePlaceholder}
        <S.InvisibleTextContent>{' – '}</S.InvisibleTextContent>
        <Icon component={<ArrowRightS />} />
        {!!value && !!value.to
          ? footerDateToString(value?.to)
          : texts.endDatePlaceholder}
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
