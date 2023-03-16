import * as React from 'react';
import { injectIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import Tooltip from '@synerise/ds-tooltip';
import Icon, { ArrowRightS } from '@synerise/ds-icon';
import { getDefaultDataTimeOptions, useDataFormat } from '@synerise/ds-data-format';

import * as S from './Footer.styles';
import { Props } from './Footer.types';
import fnsFormat from '../dateUtils/format';
import getDateFromString from '../dateUtils/getDateFromString';
import * as CONST from '../constants';
import { isLifetime } from '../RelativeRangePicker/Elements/RangeDropdown/RangeDropdown';

const Footer: React.FC<Props> = ({
  canApply,
  onApply,
  intl,
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
}) => {
  const { formatValue } = useDataFormat();
  const footerFormat = format || (showTime ? 'MMM D, YYYY, HH:mm' : 'MMM D, YYYY');

  const footerDateToString = React.useCallback(
    (date: Date | string) => {
      if (format || typeof date === 'string') {
        return fnsFormat(getDateFromString(date), footerFormat, intl.locale);
      }
      return formatValue(date, { ...getDefaultDataTimeOptions(showTime), ...valueFormatOptions });
    },
    [footerFormat, format, formatValue, intl.locale, valueFormatOptions, showTime]
  );

  const ChosenRange = React.useMemo(() => {
    if (value?.key === CONST.ALL_TIME || (value && isLifetime(value))) {
      return (
        <S.ChosenRange className="ds-date-range-picker-value">
          {value?.translationKey ? texts[value.translationKey] ?? value.translationKey : value?.key || 'LIFETIME'}
        </S.ChosenRange>
      );
    }
    return (
      <S.ChosenRange className={displayDateContainerClass}>
        {!!value && !!value.from ? footerDateToString(value?.from) : texts.startDatePlaceholder}
        <S.InvisibleTextContent>{' – '}</S.InvisibleTextContent>
        <Icon component={<ArrowRightS />} />
        {!!value && !!value.to ? footerDateToString(value?.to) : texts.endDatePlaceholder}
      </S.ChosenRange>
    );
  }, [value, footerFormat, intl.locale, texts, displayDateContainerClass]);
  return (
    <S.Container className="ds-date-range-picker-footer" {...rest}>
      {ChosenRange}
      <S.ActionsPlaceholder />
      <S.Actions>
        <Tooltip title={message}>
          <Button
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

export default injectIntl(Footer);
