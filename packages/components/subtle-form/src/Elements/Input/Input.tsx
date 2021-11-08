import * as React from 'react';
import Tooltip from '@synerise/ds-tooltip';
import Icon, { EditS } from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { Input, Label } from '@synerise/ds-input';
import * as S from '../../SubtleForm.styles';

import { focusPadding } from '../../SubtleForm.styles';
import { SubtleInputProps } from './Input.types';

const SubtleTextArea: React.FC<SubtleInputProps> = ({
  disabled,
  value,
  onChange,
  placeholder,
  label,
  labelTooltip,
  suffixTooltip,
  suffix,
  error,
  errorText,
  inputProps,
  ...rest
}) => {
  const [active, setActive] = React.useState<boolean>(false);
  const [blurred, setBlurred] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const hasError = error || !!errorText;
  const handleDeactivate = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (inputProps) {
        const { onBlur } = inputProps;
        onBlur && onBlur(e);
      }
      setActive(false);
      setBlurred(true);
    },
    [inputProps]
  );
  const handleActivate = React.useCallback(() => {
    setActive(true);
    setBlurred(false);
  }, []);
  return (
    <S.Subtle className="ds-subtle-form">
      <S.ContentAbove active={active}>
        <Label label={label} tooltip={labelTooltip} />
      </S.ContentAbove>
      <S.Container ref={containerRef} className="ds-subtle-input" active={active} disabled={disabled}>
        {(active || hasError) && !disabled ? (
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          <Input
            autoFocus={!hasError && !disabled}
            disabled={disabled}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              onChange && onChange(e.currentTarget.value);
            }}
            onBlur={!disabled ? handleDeactivate : undefined}
            value={value}
            style={{ margin: 0, padding: focusPadding }}
            placeholder={placeholder}
            error={error}
            errorText={errorText}
            {...rest}
            {...inputProps}
          />
        ) : (
          <S.Inactive onClick={!disabled ? handleActivate : undefined} blurred={blurred} disabled={disabled}>
            <S.MainContent>{value && !!value.trim() ? value : placeholder}</S.MainContent>
            <S.Suffix>
              <Tooltip title={suffixTooltip}>
                {suffix ?? <Icon component={<EditS />} color={theme.palette['grey-600']} />}
              </Tooltip>
            </S.Suffix>
          </S.Inactive>
        )}
      </S.Container>
    </S.Subtle>
  );
};
export default SubtleTextArea;
