import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { CalendarM } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { Label } from '@synerise/ds-input';
import DatePicker from '@synerise/ds-date-picker/dist/DatePicker';
import format from '@synerise/ds-date-picker/dist/format';
import * as S from '../../SubtleForm.styles';
import { SelectContainer, ContentAbove, MaskedDatePlaceholder } from './DatePicker.styles';
import { SubtleDatePickerProps } from './DatePicker.types';
import { getFormattingString, replaceLettersWithUnderscore } from './utils';

const SubtleDatePicker: React.FC<SubtleDatePickerProps> = ({
  value,
  suffix,
  suffixTooltip,
  format: dateFormat,
  label,
  children,
  labelTooltip,
  placeholder,
  onApply,
  onClear,
  errorText,
  error,
  activeProp,
  onDropdownVisibleChange,
  ...rest
}) => {
  const [active, setActive] = React.useState<boolean>(false);
  const [blurred, setBlurred] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const hasError = error || !!errorText;
  const { showTime } = rest;
  const dateFormattingString = React.useMemo(() => getFormattingString(dateFormat, showTime), [dateFormat, showTime]);
  const formatValue = React.useCallback(
    (val): string => {
      if (!val) return '';
      return format(val, dateFormattingString);
    },
    [dateFormattingString]
  );
  const getDisplayText = React.useCallback((): string | undefined => {
    return value && !!String(value).trim() ? formatValue(value) : placeholder;
  }, [value, placeholder, formatValue]);

  React.useEffect(() => {
    if (error) {
      setActive(false);
      setBlurred(true);
    }
  }, [error, errorText]);
  const handleActivate = React.useCallback((): void => {
    setActive(true);
    setBlurred(false);
  }, []);

  const handleDeactivate = React.useCallback((): void => {
    setActive(false);
    setBlurred(true);
  }, []);

  return (
    <S.Subtle className="ds-subtle-form">
      <ContentAbove active={active || hasError}>
        <Label label={label} tooltip={labelTooltip} />
      </ContentAbove>
      <SelectContainer ref={containerRef} className="ds-subtle-date-picker" active={active || hasError}>
        {(active && !blurred) || hasError ? (
          <DatePicker
            {...rest}
            value={value}
            onApply={(date): void => {
              handleDeactivate();
              onApply && onApply(date);
            }}
            onClear={(): void => {
              handleDeactivate();
              onClear && onClear();
            }}
            error={error}
            errorText={errorText}
            autoFocus={!hasError}
            format={dateFormat}
            onDropdownVisibleChange={(visible: boolean): void => {
              setActive(visible);
              setBlurred(!visible);
              onDropdownVisibleChange && onDropdownVisibleChange(visible);
            }}
          />
        ) : (
          <S.Inactive onClick={handleActivate} blurred={blurred} datePicker datePickerValue={value}>
            <S.MainContent hasMargin>
              {getDisplayText()}
              <MaskedDatePlaceholder>{replaceLettersWithUnderscore(dateFormattingString)}</MaskedDatePlaceholder>
            </S.MainContent>

            {!active && (
              <S.Suffix select>
                <Tooltip title={suffixTooltip}>
                  {suffix ?? <Icon component={<CalendarM />} color={theme.palette['grey-600']} />}
                </Tooltip>
              </S.Suffix>
            )}
          </S.Inactive>
        )}
      </SelectContainer>
    </S.Subtle>
  );
};
export default SubtleDatePicker;
