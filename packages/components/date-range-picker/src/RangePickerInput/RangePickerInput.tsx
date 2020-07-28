import * as React from 'react';
import Icon from '@synerise/ds-icon';
import moment from 'moment';

import { ArrowRightS, CalendarM, Close3S } from '@synerise/ds-icon/dist/icons';
import { Props } from './RangePickerInput.types';
import * as S from './RangePickerInput.styles';

import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { normalizeRange } from '../utils';
import relativeToAbsolute from '../dateUtils/relativeToAbsolute';
import { DateRange } from '../date.types';

const RangePickerInput: React.FC<Props> = ({
  size,
  disabled,
  value,
  format,
  onChange,
  showTime,
  style,
  placeholder,
  onClear,
  onClick,
  clearTooltip,
  highlight,
  texts,
  ...rest
}: Props) => {
  const [hovered, setHovered] = React.useState<boolean>(false);
  const [focused, setFocused] = React.useState<boolean>(false);
  const absoluteRange = normalizeRange(value as DateRange);
  const handleApply = React.useCallback(() => {}, []);

  const handleIconClick = React.useCallback((e: React.MouseEvent<HTMLDivElement>): void => {}, [onClear, handleApply]);

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
    [absoluteRange, format, showTime]
  );

  const renderFromDate = React.useCallback(() => {
    const isFromDateDefined = absoluteRange && absoluteRange.from;
    const text = isFromDateDefined ? (
      <S.DateValue>{getText(absoluteRange.from)}</S.DateValue>
    ) : (
      texts?.startDatePlaceholder
    );
    return <S.DateWrapper highlight={focused && !isFromDateDefined}>{text}</S.DateWrapper>;
  }, [absoluteRange, texts]);

  const renderEndDate = React.useCallback(() => {
    const isEndDateDefined = absoluteRange && absoluteRange.to;
    const isFromDateDefined = absoluteRange && absoluteRange.from;

    const text = isEndDateDefined ? <S.DateValue>{getText(absoluteRange.to)}</S.DateValue> : texts?.endDatePlaceholder;
    return <S.DateWrapper highlight={focused && !!isFromDateDefined && !isEndDateDefined}>{text}</S.DateWrapper>;
  }, [absoluteRange, texts]);

  return (
    <S.Container
      onMouseEnter={(): void => setHovered(true)}
      onMouseLeave={(): void => setHovered(false)}
      onClick={handleInputClick}
    >
      <S.RangeInputWrapper active={!!highlight} tabIndex={0} focus={focused}>
        {renderFromDate()}
        <Icon component={<ArrowRightS />} color={theme.palette['grey-400']} />
        {renderEndDate()}
      </S.RangeInputWrapper>
    </S.Container>
  );
};

export default RangePickerInput;
