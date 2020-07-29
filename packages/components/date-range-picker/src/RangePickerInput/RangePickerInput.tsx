import * as React from 'react';
import Icon from '@synerise/ds-icon';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import moment from 'moment';

import { ArrowRightS, CalendarM, Close3S } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Tooltip from '@synerise/ds-tooltip';
import { Props } from './RangePickerInput.types';
import * as S from './RangePickerInput.styles';

import { normalizeRange } from '../utils';
import { DateRange } from '../date.types';

const RangePickerInput: React.FC<Props> = ({ value, format, showTime, onChange, onClick, highlight, texts }: Props) => {
  const dateRangeValue = value ? normalizeRange(value as DateRange) : value;

  const [focused, setFocused] = React.useState<boolean>(false);
  const [hovered, setHovered] = React.useState<boolean>(false);

  const handleIconMouseEnter = React.useCallback(() => setHovered(true), []);
  const handleIconMouseLeave = React.useCallback(() => setHovered(false), []);

  const handleClear = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange && onChange(undefined);
    },
    [onChange]
  );

  const handleInputClick = React.useCallback(() => {
    onClick && onClick();
    setFocused(true);
  }, [onClick]);

  const getText = React.useCallback(
    (dateToDisplay): string => {
      if (!dateToDisplay) return '';
      let dateValue = dateToDisplay;
      if (typeof dateToDisplay === 'string') dateValue = moment(dateToDisplay);
      return moment(dateValue).format(format || showTime ? 'MMM D, YYYY, HH:mm' : 'MMM D, YYYY');
    },
    [format, showTime]
  );

  const renderFromDate = React.useCallback(() => {
    const isFromDateDefined = dateRangeValue && dateRangeValue.from;
    const text =
      dateRangeValue && isFromDateDefined ? (
        <S.DateValue>{getText(dateRangeValue.from)}</S.DateValue>
      ) : (
        texts?.startDatePlaceholder
      );
    return <S.DateWrapper highlight={focused && !isFromDateDefined}>{text}</S.DateWrapper>;
  }, [dateRangeValue, getText, focused, texts]);

  const renderEndDate = React.useCallback(() => {
    const isEndDateDefined = dateRangeValue && dateRangeValue.to;
    const isFromDateDefined = dateRangeValue && dateRangeValue.from;

    const text =
      isEndDateDefined && dateRangeValue ? (
        <S.DateValue>{getText(dateRangeValue.to)}</S.DateValue>
      ) : (
        texts?.endDatePlaceholder
      );
    return <S.DateWrapper highlight={focused && !!isFromDateDefined && !isEndDateDefined}>{text}</S.DateWrapper>;
  }, [dateRangeValue, getText, focused, texts]);

  return (
    <S.Container onClick={handleInputClick} onMouseEnter={handleIconMouseEnter} onMouseLeave={handleIconMouseLeave}>
      <S.RangeInputWrapper active={!!highlight} tabIndex={0} focus={focused}>
        {renderFromDate()}
        <Icon component={<ArrowRightS />} color={theme.palette['grey-400']} />
        {renderEndDate()}
        <S.IconSeparator />
        {hovered && !!value ? (
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
  );
};

export default RangePickerInput;
