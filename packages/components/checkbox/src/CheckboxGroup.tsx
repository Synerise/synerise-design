import React, { useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import {
  type CheckboxGroupProps,
  type CheckboxOptionType,
  type CheckboxValueType,
} from './Checkbox.types';
import {
  CheckboxGroupContext,
  type CheckboxGroupContextValue,
} from './CheckboxContext';
import { CheckboxBase } from './components/CheckboxBase';
import { cx } from './utils';

const GroupWrapper = styled.div`
  /*
   * antd's '.ant-checkbox-group' is 'inline-block'. Each DS checkbox is a block-level
   * 'CheckboxWrapper' (flex column), so in an inline-block group they stack vertically — matching
   * the previous behaviour. 'inline-flex' forced them onto a single horizontal row (regression,
   * visible in fieldset--with-prefix).
   */
  display: inline-block;
`;

/**
 * DS-native replacement for antd's `Checkbox.Group`. Provides a context that child `Checkbox`es read
 * (checked state + toggle) and emits `onChange` with the checked values ordered by child mount order
 * (or `options` order). Controlled via `value`, uncontrolled via `defaultValue`.
 */
const CheckboxGroup = ({
  value,
  defaultValue = [],
  onChange,
  options,
  disabled,
  name,
  children,
  className,
  style,
}: CheckboxGroupProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] =
    useState<CheckboxValueType[]>(defaultValue);
  const resolvedValue = isControlled
    ? (value as CheckboxValueType[])
    : internalValue;
  const registeredRef = useRef<CheckboxValueType[]>([]);

  const registerValue = useCallback((optionValue: CheckboxValueType) => {
    if (!registeredRef.current.includes(optionValue)) {
      registeredRef.current = [...registeredRef.current, optionValue];
    }
  }, []);

  const unregisterValue = useCallback((optionValue: CheckboxValueType) => {
    registeredRef.current = registeredRef.current.filter(
      (registered) => registered !== optionValue,
    );
  }, []);

  const toggleOption = useCallback(
    (optionValue: CheckboxValueType) => {
      const isCurrentlyChecked = resolvedValue.includes(optionValue);
      const nextSet = isCurrentlyChecked
        ? resolvedValue.filter((v) => v !== optionValue)
        : [...resolvedValue, optionValue];

      // Order the result by child mount order (or `options` order when provided).
      const order = options
        ? options.map((option) =>
            typeof option === 'object' ? option.value : option,
          )
        : registeredRef.current;
      const ordered = order.filter((v) => nextSet.includes(v));
      const extras = nextSet.filter((v) => !order.includes(v));
      const result = [...ordered, ...extras];

      if (!isControlled) {
        setInternalValue(result);
      }
      onChange?.(result);
    },
    [resolvedValue, isControlled, onChange, options],
  );

  const contextValue = useMemo<CheckboxGroupContextValue>(
    () => ({
      value: resolvedValue,
      toggleOption,
      registerValue,
      unregisterValue,
      disabled,
      name,
    }),
    [
      resolvedValue,
      toggleOption,
      registerValue,
      unregisterValue,
      disabled,
      name,
    ],
  );

  const normalizedOptions: CheckboxOptionType[] | undefined = options?.map(
    (option) =>
      typeof option === 'object'
        ? option
        : { label: String(option), value: option },
  );

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <GroupWrapper
        className={cx('ant-checkbox-group', 'ds-checkbox-group', className)}
        style={style}
      >
        {normalizedOptions
          ? normalizedOptions.map((option) => (
              <CheckboxBase
                key={String(option.value)}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </CheckboxBase>
            ))
          : children}
      </GroupWrapper>
    </CheckboxGroupContext.Provider>
  );
};

export default CheckboxGroup;
