import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { Label } from '@synerise/ds-input';
import DatePicker from '@synerise/ds-date-picker/dist/DatePicker';
import format from '@synerise/ds-date-picker/dist/format';
import * as S from '../../SubtleForm.styles';
import { SelectContainer, ContentAbove } from './DatePicker.styles';
import { SubtleDatePickerProps } from './DatePicker.types';

const SubtleDatePicker: React.FC<SubtleDatePickerProps> = ({
  value,
  suffix,
  suffixTooltip,
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

  const formatValue = React.useCallback((val): string => {
    if (!val) return '';
    return format(val, showTime ? 'MMM d, yyyy, HH:mm' : 'MMM d, yyyy');
  }, [showTime]);

  const handleActivate = React.useCallback(() => {
    setActive(true);
    setBlurred(false);
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
            autoFocus
            value={value}
            onApply={(date): void => {
              setActive(false);
              setBlurred(true);
              onApply && onApply(date);
            }}
            onDropdownVisibleChange={(visible: boolean) => {
              setActive(visible);
              setBlurred(!visible);
            }}
          />
        ) : (
          <S.Inactive onClick={handleActivate} blurred={blurred}>
            <S.MainContent>{value && !!String(value).trim() ? formatValue(value) : placeholder}</S.MainContent>
            <S.Suffix select>
              <Tooltip title={suffixTooltip}>
                {suffix ?? <Icon component={<AngleDownS />} color={theme.palette['grey-600']} />}
              </Tooltip>
            </S.Suffix>
          </S.Inactive>
        )}
      </SelectContainer>
    </S.Subtle>
  );
};
export default SubtleDatePicker;
