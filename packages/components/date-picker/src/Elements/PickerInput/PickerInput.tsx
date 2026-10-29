import { isValid as fnsIsValid, parseISO } from 'date-fns';
import React, {
  forwardRef,
  type MouseEvent,
  type Ref,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useIntl } from 'react-intl';

import { getDefaultDataTimeOptions, useDataFormat } from '@synerise/ds-core';
import Icon, { CalendarM, Close3S } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './PickerInput.styles';
import type { PickerInputProps } from './PickerInput.types';

const PickerInputBase = <ValueType extends Date | string = Date>(
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
    isInstantValue,
    ...rest
  }: PickerInputProps<ValueType>,
  ref?: Ref<HTMLDivElement>,
) => {
  const { formatValue } = useDataFormat();
  const intl = useIntl();

  const [hovered, setHovered] = useState(false);

  const getText = useCallback(() => {
    if (!value) {
      return '';
    }
    // `value` is `Date | string` and both denote the same thing, so both take the same route.
    // They used to diverge: only the `Date` reached `formatValue`, while a string was run through
    // a hardcoded token pattern, so the same instant rendered two different ways depending on
    // which form the caller happened to hold.
    // `value` is the generic `ValueType extends Date | string`, and TypeScript cannot narrow a
    // type parameter to `Date` in the else branch, so the annotation states what the branch
    // already guarantees.
    const date: Date =
      typeof value === 'string' ? parseISO(value) : (value as Date);

    // `parseISO` yields an Invalid Date for anything unparseable; the token formatter this
    // replaced guarded with the same check and rendered nothing.
    if (!fnsIsValid(date)) {
      return '';
    }

    // Whether the value is an *instant* is signalled explicitly by `isInstantValue`, not inferred
    // from its runtime type — inference by type is exactly what the unification above removed,
    // and it would also flip the rendering of every consumer that happens to hold a string.
    // An instant only renders in the provider timezone when `applyTimeZoneOffset` is set, and that
    // flag defaults to `false` in DataFormatConfig, so request it here rather than inheriting it
    // or the trigger drifts by the browser-to-provider delta.
    return formatValue(date, {
      ...getDefaultDataTimeOptions(showTime),
      ...valueFormatOptions,
      ...(isInstantValue && intl.timeZone ? { applyTimeZoneOffset: true } : {}),
    });
  }, [
    value,
    showTime,
    formatValue,
    valueFormatOptions,
    isInstantValue,
    intl.timeZone,
  ]);

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
      (hovered || highlight) && allowClear && !readOnly && value ? (
        <S.ClearIconWrapper>
          <Tooltip title={clearTooltip}>
            <Icon component={<Close3S />} onClick={handleIconClick} />
          </Tooltip>
        </S.ClearIconWrapper>
      ) : (
        <S.DefaultIconWrapper>
          <Icon component={<CalendarM />} />
        </S.DefaultIconWrapper>
      ),
    [
      hovered,
      highlight,
      allowClear,
      readOnly,
      value,
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
};

type PickerInputType = <ValueType extends Date | string = Date>(
  p: PickerInputProps<ValueType> & {
    ref?: Ref<HTMLDivElement>;
  },
) => ReturnType<typeof PickerInputBase>;

const PickerInput = forwardRef(PickerInputBase) as PickerInputType;

export default PickerInput;
