import React, {
  type MouseEvent,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { legacyParse } from '@date-fns/upgrade/v2';
import {
  getDefaultDataTimeOptions,
  useDataFormat,
  useTheme,
} from '@synerise/ds-core';
import Icon, { CalendarM, Close3S } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import format from '../../format';
import * as S from './PickerInput.styles';
import { type PickerInputProps } from './PickerInput.types';

const PickerInput = forwardRef<HTMLDivElement, PickerInputProps>(
  (
    {
      disabled,
      readOnly,
      value,
      format: dateFormat,
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
      if (dateFormat) {
        return format(legacyParse(value), dateFormat);
      }
      if (typeof value === 'string') {
        return format(
          legacyParse(value),
          dateFormat || showTime ? 'MMM d, yyyy, HH:mm' : 'MMM d, yyyy',
        );
      }
      return formatValue(value, {
        ...getDefaultDataTimeOptions(showTime),
        ...valueFormatOptions,
      });
    }, [value, dateFormat, showTime, formatValue, valueFormatOptions]);

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
