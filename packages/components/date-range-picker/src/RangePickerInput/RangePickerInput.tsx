import * as React from 'react';
import Icon, { ArrowRightS, CalendarM, Close3S } from '@synerise/ds-icon';
import fnsIsValid from 'date-fns/isValid';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Tooltip from '@synerise/ds-tooltip';
// eslint-disable-next-line import/no-named-default
import { default as fnsFormat } from '../dateUtils/format';
import { RangePickerInputProps } from './RangePickerInput.types';
import * as S from './RangePickerInput.styles';

import { normalizeRange } from '../utils';
import type { DateRange } from '../date.types';
import { isLifetime } from '../RelativeRangePicker/Elements/RangeDropdown/RangeDropdown';

const RangePickerInput: React.FC<RangePickerInputProps> = ({
  value,
  format,
  showTime,
  onChange,
  onClick,
  highlight,
  texts,
  active,
  label,
  description,
  tooltip,
  disabled,
  onFocus,
  onBlur,
  error,
  errorText,
  preferRelativeDesc = false,
}: RangePickerInputProps) => {
  const dateRangeValue = value ? normalizeRange(value as DateRange) : value;
  const [hovered, setHovered] = React.useState<boolean>(false);
  const showError = error || !!errorText;

  const handleIconMouseEnter = React.useCallback(() => setHovered(true), []);
  const handleIconMouseLeave = React.useCallback(() => setHovered(false), []);

  const handleClear = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange && onChange(undefined);
    },
    [onChange]
  );

  const handleInputClick = React.useCallback(
    e => {
      onClick && onClick(e);
    },
    [onClick]
  );

  const getText = React.useCallback(
    (dateToDisplay): string => {
      if (!dateToDisplay || !fnsIsValid(dateToDisplay)) return '';
      let dateValue = dateToDisplay;
      if (typeof dateToDisplay === 'string') dateValue = new Date(dateToDisplay);
      return fnsFormat(dateValue, format || showTime ? 'MMM D, YYYY, HH:mm' : 'MMM D, YYYY');
    },
    [format, showTime, preferRelativeDesc]
  );

  const renderFromDate = React.useCallback(() => {
    const isFromDateDefined = dateRangeValue && dateRangeValue.from;
    const text =
      dateRangeValue && isFromDateDefined ? (
        <S.DateValue>{getText(dateRangeValue.from)}</S.DateValue>
      ) : (
        texts?.startDatePlaceholder
      );
    return <S.DateWrapper highlight={active && !disabled && !isFromDateDefined && highlight}>{text}</S.DateWrapper>;
  }, [dateRangeValue, getText, active, disabled, texts, highlight]);

  const renderEndDate = React.useCallback(() => {
    const isEndDateDefined = dateRangeValue && dateRangeValue.to;
    const isFromDateDefined = dateRangeValue && dateRangeValue.from;

    const text =
      isEndDateDefined && dateRangeValue ? (
        <S.DateValue>{getText(dateRangeValue.to)}</S.DateValue>
      ) : (
        texts?.endDatePlaceholder
      );
    return (
      <S.DateWrapper highlight={active && !!isFromDateDefined && !isEndDateDefined && highlight}>{text}</S.DateWrapper>
    );
  }, [dateRangeValue, getText, active, texts, highlight]);

  const placeholder = React.useMemo(() => {
    if (isLifetime(value as typeof dateRangeValue)) {
      return <>{texts?.['allTime'] || 'Lifetime'}</>;
    }
    return (
      <>
        {preferRelativeDesc &&
          dateRangeValue?.translationKey &&
          `${texts?.[dateRangeValue.translationKey] || dateRangeValue?.translationKey} (`}
        {renderFromDate()}
        <Icon component={<ArrowRightS />} color={theme.palette['grey-400']} />
        {renderEndDate()}
        {preferRelativeDesc && dateRangeValue?.translationKey && value && ')'}
      </>
    );
  }, [dateRangeValue, renderFromDate, renderEndDate, theme, preferRelativeDesc]);

  return (
    <>
      {label && <S.Label label={label} tooltip={tooltip} />}
      <S.Container
        tabIndex={0}
        onFocus={onFocus}
        onClick={handleInputClick}
        onBlur={onBlur}
        onMouseEnter={handleIconMouseEnter}
        onMouseLeave={handleIconMouseLeave}
      >
        <S.RangeInputWrapper
          error={showError}
          disabled={disabled}
          active={!!highlight && !disabled}
          tabIndex={disabled ? -1 : 0}
          focus={active && !disabled}
        >
          {placeholder}
          <S.IconSeparator />
          {hovered && !!value && !!value.to && !!value.from ? (
            <Tooltip title={texts?.clear}>
              <S.ClearIconWrapper>
                <Icon component={<Close3S />} onClick={handleClear} />
              </S.ClearIconWrapper>
            </Tooltip>
          ) : (
            <S.DefaultIconWrapper>
              <Icon component={<CalendarM />} color={theme.palette['grey-600']} />
            </S.DefaultIconWrapper>
          )}
        </S.RangeInputWrapper>
      </S.Container>
      {(showError || description) && (
        <S.ContentBelow>
          {showError && <S.ErrorText>{errorText}</S.ErrorText>}
          {description && <S.Description>{description}</S.Description>}
        </S.ContentBelow>
      )}
    </>
  );
};

export default RangePickerInput;
