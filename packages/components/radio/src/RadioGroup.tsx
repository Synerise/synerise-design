import React, { useCallback, useMemo, useState } from 'react';

import * as S from './Radio.styles';
import {
  type RadioChangeEvent,
  type RadioChangeEventTarget,
  type RadioGroupProps,
  type RadioOptionType,
  type RadioValueType,
} from './Radio.types';
import { RadioGroupContext, type RadioGroupContextValue } from './RadioContext';
import { RadioBase, RadioButton } from './components';

const cx = (...classes: (string | false | undefined)[]): string =>
  classes.filter(Boolean).join(' ');

/**
 * antd forwarded only `data-*` / `aria-* `/ `role` to the group wrapper. Consumers spread a form
 * library's field bag onto the group, and those carry `type`/`checked` — forwarding them to a div
 * would warn, so filter rather than spread the rest.
 */
const passthroughAttributes = (
  props: Record<string, unknown>,
): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(props).filter(
      ([key]) =>
        key.startsWith('data-') || key.startsWith('aria-') || key === 'role',
    ),
  );

/**
 * DS-native `Radio.Group`. Provides a single-value selection context that child `Radio`/`Radio.Button`s
 * read, and emits `onChange(RadioChangeEvent)` (`target.value` = the selected value). Controlled via
 * `value`, uncontrolled via `defaultValue`. `optionType="button"` renders segmented `Radio.Button`s.
 */
const RadioGroup = ({
  value,
  defaultValue,
  onChange,
  options,
  optionType = 'default',
  buttonStyle = 'outline',
  size,
  disabled,
  name,
  fullWidth,
  big,
  children,
  className,
  style,
  id,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: RadioGroupProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<
    RadioValueType | undefined
  >(defaultValue);
  const resolvedValue = isControlled ? value : internalValue;

  const handleChange = useCallback(
    (
      newValue: RadioValueType,
      nativeEvent: Event,
      target: RadioChangeEventTarget,
    ) => {
      const lastValue = resolvedValue;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      // antd only notifies the group when the selection actually changed. Defensive here: `checked`
      // is derived from the group value, so a native change already implies an actual change.
      if (newValue === lastValue) {
        return;
      }
      const event: RadioChangeEvent = {
        // the child builds the target from its own props (antd parity); the group only owns `name`
        target: { ...target, name: target.name ?? name },
        stopPropagation: () => nativeEvent.stopPropagation?.(),
        preventDefault: () => nativeEvent.preventDefault?.(),
        nativeEvent,
      };
      onChange?.(event);
    },
    [isControlled, name, onChange, resolvedValue],
  );

  const contextValue = useMemo<RadioGroupContextValue>(
    () => ({
      value: resolvedValue,
      onChange: handleChange,
      disabled,
      name,
      optionType,
      buttonStyle,
      size,
    }),
    [
      resolvedValue,
      handleChange,
      disabled,
      name,
      optionType,
      buttonStyle,
      size,
    ],
  );

  const normalizedOptions: RadioOptionType[] | undefined = options?.map(
    (option) =>
      typeof option === 'object'
        ? option
        : { label: String(option), value: option },
  );

  const renderOptions = (): React.ReactNode =>
    normalizedOptions?.map((option) =>
      optionType === 'button' ? (
        <RadioButton
          key={String(option.value)}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </RadioButton>
      ) : (
        <RadioBase
          key={String(option.value)}
          value={option.value}
          disabled={option.disabled}
          label={option.label}
        />
      ),
    );

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <S.RadioGroupWrapper
        {...passthroughAttributes(rest)}
        className={cx(
          'ant-radio-group',
          `ant-radio-group-${buttonStyle}`,
          'ds-radio-group',
          className,
        )}
        style={style}
        id={id}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        fullWidth={fullWidth}
        big={big}
      >
        {normalizedOptions ? renderOptions() : children}
      </S.RadioGroupWrapper>
    </RadioGroupContext.Provider>
  );
};

export default RadioGroup;
