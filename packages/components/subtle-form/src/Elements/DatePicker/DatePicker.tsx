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
  ...rest
}) => {
  const [active, setActive] = React.useState<boolean>(false);
  const [blurred, setBlurred] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
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
      <ContentAbove active={active}>
        <Label label={label} tooltip={labelTooltip} />
      </ContentAbove>
      <SelectContainer ref={containerRef} className="ds-subtle-textarea" active={active}>
        {active && !blurred ? (
          <DatePicker
            {...rest}
            value={value}
            onApply={(date): void => {
              handleDeactivate();
              onApply && onApply(date);
            }}
            onClear={handleDeactivate}
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            autoFocus
            format={dateFormat}
            onDropdownVisibleChange={(visible: boolean): void => {
              setActive(visible);
              setBlurred(!visible);
            }}
          />
        ) : (
          <S.Inactive onClick={handleActivate} blurred={blurred} datePicker datePickerValue={value}>
            <S.MainContent>
              {getDisplayText()}
              <MaskedDatePlaceholder>{replaceLettersWithUnderscore(dateFormattingString)}</MaskedDatePlaceholder>
            </S.MainContent>

            <S.Suffix select>
              <Tooltip title={suffixTooltip}>
                {suffix ?? <Icon component={<CalendarM />} color={theme.palette['grey-600']} />}
              </Tooltip>
            </S.Suffix>
          </S.Inactive>
        )}
      </SelectContainer>
    </S.Subtle>
  );
};
export default SubtleDatePicker;
