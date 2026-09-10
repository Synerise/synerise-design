import { isValid as fnsIsValid, parseISO } from 'date-fns';
import React, { useCallback, useMemo } from 'react';

import Button from '@synerise/ds-button';
import { getDefaultDataTimeOptions, useDataFormat } from '@synerise/ds-core';
import Icon, { ArrowRightS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import { type Texts } from '../DateRangePicker.types';
import { isLifetime } from '../RelativeRangePicker/Elements/RangeDropdown/RangeDropdown';
import * as CONST from '../constants';
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
  valueFormatOptions,
  showTime,
  displayDateContainerClass = 'ds-date-range-picker-value',
  ...rest
}: Props) => {
  const { formatValue } = useDataFormat();

  const footerDateToString = useCallback(
    (date: Date | string) => {
      // Bounds arrive as either form, and both denote the same thing, so both take the same route.
      // A string used to be run through a hardcoded moment-token pattern instead, which is what
      // kept `@date-fns/upgrade`'s `convertTokens` alive and made the rendering depend on which
      // form the caller happened to hold.
      const parsed = typeof date === 'string' ? parseISO(date) : date;

      if (!fnsIsValid(parsed)) {
        return '';
      }

      return formatValue(parsed, {
        ...getDefaultDataTimeOptions(showTime),
        ...valueFormatOptions,
      });
    },
    [formatValue, valueFormatOptions, showTime],
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
