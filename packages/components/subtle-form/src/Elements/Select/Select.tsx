import React, { useCallback, useRef, useState } from 'react';

import { useTheme } from '@synerise/ds-core';
import Icon, { AngleDownS } from '@synerise/ds-icon';
import Select from '@synerise/ds-select';
import Tooltip from '@synerise/ds-tooltip';

import * as S from '../../SubtleForm.styles';
import { SelectContainer } from './Select.styles';
import { type SubtleSelectProps } from './Select.types';

const SubtleSelect = ({
  disabled,
  value,
  suffix,
  suffixTooltip,
  label,
  children,
  labelTooltip,
  placeholder,
  error,
  errorText,
  dropdownAlign = {},
  ...rest
}: SubtleSelectProps) => {
  const [active, setActive] = useState(false);
  const [blurred, setBlurred] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasError = error || !!errorText;
  const handleDeactivate = useCallback(() => {
    setActive(false);
    setBlurred(true);
  }, []);
  const handleActivate = useCallback(() => {
    setActive(true);
    setBlurred(false);
  }, []);
  const theme = useTheme();
  return (
    <S.Subtle className="ds-subtle-form" disabled={disabled}>
      <S.SubtleFormField active={active} label={label} tooltip={labelTooltip}>
        <SelectContainer
          ref={containerRef}
          className="ds-subtle-select"
          active={active}
        >
          {(active && !blurred) || hasError ? (
            <Select
              disabled={disabled}
              autoFocus={!hasError}
              size="middle"
              onBlur={handleDeactivate}
              value={value}
              placeholder={placeholder}
              errorText={errorText}
              error={error}
              defaultOpen={!hasError}
              dropdownAlign={{ offset: [0, 8], ...dropdownAlign }}
              {...rest}
            >
              {children}
            </Select>
          ) : (
            <S.Inactive
              className="inactive-content"
              onClick={!disabled ? handleActivate : undefined}
              blurred={blurred}
              disabled={disabled}
            >
              <S.MainContent className="main-content" hasMargin>
                <>{value && !!String(value).trim() ? value : placeholder}</>
              </S.MainContent>
              {!active && !disabled && (
                <S.Suffix select>
                  <Tooltip title={suffixTooltip}>
                    {suffix ?? (
                      <Icon
                        component={<AngleDownS />}
                        color={theme.palette['grey-600']}
                      />
                    )}
                  </Tooltip>
                </S.Suffix>
              )}
            </S.Inactive>
          )}
        </SelectContainer>
      </S.SubtleFormField>
    </S.Subtle>
  );
};
SubtleSelect.displayName = 'SubtleSelect';
export default SubtleSelect;
