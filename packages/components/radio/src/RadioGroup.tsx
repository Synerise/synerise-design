import React, { useCallback, useMemo, useState } from 'react';

import * as S from './Radio.styles';
import {
  type RadioChangeEvent,
  type RadioGroupProps,
  type RadioOptionType,
  type RadioValueType,
} from './Radio.types';
import { RadioGroupContext, type RadioGroupContextValue } from './RadioContext';
import { RadioBase, RadioButton } from './components';

const cx = (...classes: (string | false | undefined)[]): string =>
  classes.filter(Boolean).join(' ');

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
}: RadioGroupProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<
    RadioValueType | undefined
  >(defaultValue);
  const resolvedValue = isControlled ? value : internalValue;

  const handleChange = useCallback(
    (newValue: RadioValueType, nativeEvent: Event) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      const event: RadioChangeEvent = {
        target: { value: newValue, checked: true, name },
        stopPropagation: () => nativeEvent.stopPropagation?.(),
        preventDefault: () => nativeEvent.preventDefault?.(),
        nativeEvent,
      };
      onChange?.(event);
    },
    [isControlled, name, onChange],
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
        className={cx(
          'ant-radio-group',
          `ant-radio-group-${buttonStyle}`,
          'ds-radio-group',
          className,
        )}
        style={style}
        fullWidth={fullWidth}
        big={big}
      >
        {normalizedOptions ? renderOptions() : children}
      </S.RadioGroupWrapper>
    </RadioGroupContext.Provider>
  );
};

export default RadioGroup;
