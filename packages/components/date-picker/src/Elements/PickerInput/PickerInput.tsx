import { isValid as fnsIsValid, parseISO } from 'date-fns';
import React, {
  type MouseEvent,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from 'react';

import {
  getDefaultDataTimeOptions,
  useDataFormat,
  useTheme,
} from '@synerise/ds-core';
import Icon, { CalendarM, Close3S } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './PickerInput.styles';
import { type PickerInputProps } from './PickerInput.types';

const PickerInput = forwardRef<HTMLDivElement, PickerInputProps>(
  (
    {
      disabled,
      readOnly,
      value,
      valueFormatOptions,
      onChange,
      showTime,
      onClear,
      onClick,
      clearTooltip,
      highlight,
      prefixel,
      suffixel,
      allowClear,
      triggerHTMLAttributes,
      ...rest
    },
    ref,
  ) => {
    const { formatValue } = useDataFormat();
    const theme = useTheme();

    const [hovered, setHovered] = useState(false);

    const getText = useCallback(() => {
      if (!value) {
        return '';
      }
      // `value` is `Date | string` and both denote the same thing, so both take the same route.
      // They used to diverge: only the `Date` reached `formatValue`, while a string was run through
      // a hardcoded token pattern, so the same instant rendered as `8 Sep 2026, 13:17` or
      // `Sep 8, 2026, 13:17` depending on which form the caller happened to hold.
      const date = typeof value === 'string' ? parseISO(value) : value;

      // `parseISO` yields an Invalid Date for anything unparseable; the token formatter this
      // replaced guarded with the same check and rendered nothing.
      if (!fnsIsValid(date)) {
        return '';
      }

      return formatValue(date, {
        ...getDefaultDataTimeOptions(showTime),
        ...valueFormatOptions,
      });
    }, [value, showTime, formatValue, valueFormatOptions]);

    const handleApply = useCallback(
      (date?: Date | null) => {
        if (!onChange) {
          return;
        }
        onChange(date, getText());
      },
      [onChange, getText],
    );

    const handleIconClick = useCallback(
      (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        onClear && onClear();
        handleApply(null);
      },
      [onClear, handleApply],
    );

    const handleInputClick = useCallback(
      (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        onClick && onClick();
      },
      [onClick],
    );

    const iconInput = useMemo(
      () =>
        (hovered || highlight) && allowClear && !readOnly && !!value ? (
          <S.ClearIconWrapper>
            <Tooltip title={clearTooltip}>
              <Icon component={<Close3S />} onClick={handleIconClick} />
            </Tooltip>
          </S.ClearIconWrapper>
        ) : (
          <S.DefaultIconWrapper>
            <Icon component={<CalendarM />} color={theme.palette['grey-400']} />
          </S.DefaultIconWrapper>
        ),
      [
        hovered,
        highlight,
        allowClear,
        readOnly,
        value,
        theme,
        clearTooltip,
        handleIconClick,
      ],
    );
    const { className, ...restAttributes } = triggerHTMLAttributes ?? {};

    return (
      <S.PickerInputWrapper
        ref={ref}
        prefixel={!!prefixel}
        suffixel={!!suffixel}
        className={`ds-date-input ${className || ''}`}
        {...restAttributes}
      >
        {!!prefixel && <S.Prefixel>{prefixel}</S.Prefixel>}
        <S.Container
          onMouseEnter={!disabled ? () => setHovered(true) : undefined}
          onMouseLeave={!disabled ? () => setHovered(false) : undefined}
          onClick={!disabled ? handleInputClick : undefined}
        >
          <S.Input
            active={!!highlight}
            resetMargin
            type="text"
            value={getText()}
            icon1={iconInput}
            readOnly={readOnly}
            disabled={disabled}
            {...rest}
          />
        </S.Container>
        {!!suffixel && <S.Suffixel>{suffixel}</S.Suffixel>}
      </S.PickerInputWrapper>
    );
  },
);

export default PickerInput;
