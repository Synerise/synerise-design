import React, {
  type ChangeEvent,
  type FocusEvent,
  useCallback,
  useRef,
  useState,
} from 'react';

import { useTheme } from '@synerise/ds-core';
import Icon, { EditS } from '@synerise/ds-icon';
import { Input } from '@synerise/ds-input';
import Tooltip from '@synerise/ds-tooltip';

import * as S from '../../SubtleForm.styles';
import { focusPadding } from '../../SubtleForm.styles';
import { type SubtleInputProps } from './Input.types';

const SubtleInput = ({
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
}: SubtleInputProps) => {
  const [active, setActive] = useState(false);
  const [blurred, setBlurred] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();

  const hasError = error || !!errorText;
  const handleDeactivate = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      if (inputProps) {
        const { onBlur } = inputProps;
        onBlur && onBlur(event);
      }
      setActive(false);
      setBlurred(true);
    },
    [inputProps],
  );
  const handleActivate = useCallback(() => {
    setActive(true);
    setBlurred(false);
  }, []);
  return (
    <S.Subtle className="ds-subtle-form">
      <S.SubtleFormField active={active} label={label} tooltip={labelTooltip}>
        <S.Container
          ref={containerRef}
          className="ds-subtle-input"
          active={active}
          disabled={disabled}
        >
          {(active || hasError) && !disabled ? (
            <Input
              autoFocus={!hasError && !disabled}
              disabled={disabled}
              onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                onChange && onChange(event.currentTarget.value);
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
            <S.Inactive
              onClick={!disabled ? handleActivate : undefined}
              blurred={blurred}
              disabled={disabled}
            >
              <S.MainContent>
                {value && !!value.trim() ? value : placeholder}
              </S.MainContent>
              <S.Suffix>
                <Tooltip title={suffixTooltip}>
                  {suffix ?? (
                    <Icon
                      component={<EditS />}
                      color={theme.palette['grey-600']}
                    />
                  )}
                </Tooltip>
              </S.Suffix>
            </S.Inactive>
          )}
        </S.Container>
      </S.SubtleFormField>
    </S.Subtle>
  );
};
export default SubtleInput;
