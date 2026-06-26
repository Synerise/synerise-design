import React, { type ChangeEvent, useContext, useState } from 'react';

import * as S from '../Radio.styles';
import {
  type RadioChangeEvent,
  type RadioProps,
  type RadioValueType,
} from '../Radio.types';
import { RadioGroupContext } from '../RadioContext';

const cx = (...classes: (string | false | undefined)[]): string =>
  classes.filter(Boolean).join(' ');

export const RadioBase = ({
  value,
  checked,
  defaultChecked,
  disabled,
  name,
  id,
  autoFocus,
  tabIndex,
  onChange,
  onClick,
  label,
  description,
  children,
  className,
  style,
  // forward data-*/aria-* (e.g. data-testid) to the input, as antd's rc-checkbox did
  ...rest
}: RadioProps) => {
  const group = useContext(RadioGroupContext);
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(
    Boolean(defaultChecked),
  );

  const isChecked = group
    ? group.value === value
    : isControlled
      ? Boolean(checked)
      : internalChecked;
  const isDisabled = Boolean(disabled ?? group?.disabled);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (isDisabled) {
      return;
    }
    if (group) {
      group.onChange(value as RadioValueType, event.nativeEvent);
      return;
    }
    if (!isControlled) {
      setInternalChecked(true);
    }
    const changeEvent: RadioChangeEvent = {
      target: { value, checked: true, name },
      stopPropagation: () => event.stopPropagation(),
      preventDefault: () => event.preventDefault(),
      nativeEvent: event.nativeEvent,
    };
    onChange?.(changeEvent);
  };

  return (
    <S.RadioWrapper className={cx('ds-radio-field', className)} style={style}>
      <S.RadioLabel
        className={cx(
          'ant-radio-wrapper',
          'ds-radio',
          isChecked && 'ant-radio-wrapper-checked',
          isDisabled && 'ant-radio-wrapper-disabled',
        )}
        $checked={isChecked}
        $disabled={isDisabled}
        onClick={onClick}
      >
        <S.RadioBox
          className={cx(
            'ant-radio',
            'ds-radio-box',
            isChecked && 'ant-radio-checked',
            isDisabled && 'ant-radio-disabled',
          )}
        >
          <S.RadioInput
            type="radio"
            className="ant-radio-input ds-radio-input"
            checked={isChecked}
            disabled={isDisabled}
            name={name ?? group?.name}
            id={id}
            autoFocus={autoFocus}
            tabIndex={tabIndex}
            value={value === undefined ? undefined : String(value)}
            onChange={handleChange}
            {...rest}
          />
          <S.RadioInner
            className="ant-radio-inner ds-radio-inner"
            $checked={isChecked}
            $disabled={isDisabled}
          />
        </S.RadioBox>
        <S.RadioText $checked={isChecked} $disabled={isDisabled}>
          {label ? <S.Label disabled={isDisabled}>{label}</S.Label> : children}
        </S.RadioText>
      </S.RadioLabel>
      {description && (
        <S.AdditionalData>
          <S.Description disabled={isDisabled}>{description}</S.Description>
        </S.AdditionalData>
      )}
    </S.RadioWrapper>
  );
};
