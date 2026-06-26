import React, {
  type ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Description, ErrorText } from '@synerise/ds-typography';

import * as S from '../Checkbox.styles';
import {
  type CheckboxBaseProps,
  type CheckboxChangeEvent,
  type CheckboxValueType,
} from '../Checkbox.types';
import { CheckboxGroupContext } from '../CheckboxContext';
import { cx } from '../utils';

export const CheckboxBase = ({
  description,
  errorText,
  children,
  withoutPadding,
  hasError,
  checked,
  defaultChecked,
  indeterminate,
  disabled,
  onChange,
  // discriminant for the tristate union — consumed here so it never leaks onto the input via ...rest
  tristate,
  value,
  name,
  id,
  autoFocus,
  tabIndex,
  className,
  style,
  // forward data-*/aria-* (e.g. data-testid) to the input, as antd's rc-checkbox did
  ...rest
}: CheckboxBaseProps) => {
  const group = useContext(CheckboxGroupContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(
    Boolean(defaultChecked),
  );

  const isChecked = group
    ? group.value.includes(value as CheckboxValueType)
    : isControlled
      ? Boolean(checked)
      : internalChecked;
  const isDisabled = Boolean(disabled ?? group?.disabled);
  const hasErr = Boolean(hasError || errorText);
  const isSolo = !children && !errorText && !description;

  // Register with the group (in mount order) so its onChange keeps child order.
  useEffect(() => {
    if (!group || value === undefined) {
      return undefined;
    }
    group.registerValue(value);
    return () => group.unregisterValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // `indeterminate` is a DOM property, not an attribute.
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (isDisabled) {
      return;
    }
    const nextChecked = event.target.checked;
    if (!group && !isControlled) {
      setInternalChecked(nextChecked);
    }
    if (group && value !== undefined) {
      group.toggleOption(value);
    }
    const changeEvent: CheckboxChangeEvent = {
      // `type: 'checkbox'` mirrors antd/rc-checkbox's event target — consumers that read
      // `event.target.type` (e.g. react-final-form's getValue) need it to treat the value as a
      // boolean from `checked`; without it they fall back to `target.value` and the field never updates.
      target: {
        type: 'checkbox',
        value,
        name: name ?? group?.name,
        checked: nextChecked,
      },
      stopPropagation: () => event.stopPropagation(),
      preventDefault: () => event.preventDefault(),
      nativeEvent: event.nativeEvent,
    };
    onChange?.(changeEvent);
  };

  return (
    <S.CheckboxWrapper
      className={cx('ds-checkbox', className)}
      style={style}
      withoutPadding={Boolean(withoutPadding)}
    >
      <S.CheckboxLabel
        className={cx(
          'ant-checkbox-wrapper',
          'ds-checkbox-wrapper',
          hasErr && 'error',
          isDisabled && 'ant-checkbox-wrapper-disabled',
          isDisabled && 'ds-checkbox-disabled',
        )}
        $solo={isSolo}
        $checked={isChecked}
        $indeterminate={Boolean(indeterminate)}
        $disabled={isDisabled}
        $error={hasErr}
      >
        <S.CheckboxBox
          className={cx(
            'ant-checkbox',
            'ds-checkbox-box',
            isChecked && 'ant-checkbox-checked',
            indeterminate && 'ant-checkbox-indeterminate',
            isDisabled && 'ant-checkbox-disabled',
          )}
        >
          <S.CheckboxInput
            ref={inputRef}
            type="checkbox"
            className="ant-checkbox-input ds-checkbox-input"
            checked={isChecked}
            disabled={isDisabled}
            name={name ?? group?.name}
            id={id}
            autoFocus={autoFocus}
            tabIndex={tabIndex}
            onChange={handleChange}
            {...rest}
          />
          <S.CheckboxInner
            className="ant-checkbox-inner ds-checkbox-inner"
            $checked={isChecked}
            $indeterminate={Boolean(indeterminate)}
            $disabled={isDisabled}
            $error={hasErr}
          />
        </S.CheckboxBox>
        {children !== undefined && children !== null && children !== false && (
          <S.CheckboxText $checked={isChecked} $disabled={isDisabled}>
            {children}
          </S.CheckboxText>
        )}
      </S.CheckboxLabel>
      {(errorText || description) && (
        <S.AdditionalData>
          {errorText && <ErrorText>{errorText}</ErrorText>}
          {description && (
            <Description disabled={isDisabled}>{description}</Description>
          )}
        </S.AdditionalData>
      )}
    </S.CheckboxWrapper>
  );
};
