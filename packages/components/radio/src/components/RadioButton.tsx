import React, { type ChangeEvent, useContext } from 'react';

import * as S from '../Radio.styles';
import {
  type RadioButtonProps,
  type RadioChangeEvent,
  type RadioValueType,
} from '../Radio.types';
import { RadioGroupContext } from '../RadioContext';

const cx = (...classes: (string | false | undefined)[]): string =>
  classes.filter(Boolean).join(' ');

/**
 * Segmented button-style radio (`Radio.Button`). Reproduces antd's `ant-radio-button-wrapper` DOM
 * (class names kept as hooks only); the segment visual lives in the `RadioButtonLabel`
 * styled-component, driven by checked/disabled/solid `$`-props read from the group context. When
 * standalone (no group) `checked` applies directly; inside a group the group's value wins (antd
 * parity). `onChange`/`onClick`/`style` always pass through.
 */
export const RadioButton = ({
  value,
  disabled,
  children,
  className,
  checked,
  onChange,
  onClick,
  style,
  // forward data-*/aria-* (e.g. data-testid) to the input, as antd's rc-checkbox did
  ...rest
}: RadioButtonProps) => {
  const group = useContext(RadioGroupContext);
  // Inside a group the group's value decides checked (matches antd and RadioBase); the explicit
  // `checked` prop only applies standalone. Letting `checked` win inside a group keeps the native
  // radio `checked` so its `change` (→ group.onChange) stops firing on click — the form value never
  // updates even though the visual selection (a consumer-driven prop) does.
  const isChecked = group ? group.value === value : Boolean(checked);
  const isDisabled = Boolean(disabled ?? group?.disabled);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (isDisabled) {
      return;
    }
    if (group) {
      group.onChange(value as RadioValueType, event.nativeEvent);
    }
    if (onChange) {
      const changeEvent: RadioChangeEvent = {
        target: { value, checked: true, name: group?.name },
        stopPropagation: () => event.stopPropagation(),
        preventDefault: () => event.preventDefault(),
        nativeEvent: event.nativeEvent,
      };
      onChange(changeEvent);
    }
  };

  return (
    <S.RadioButtonLabel
      className={cx(
        'ant-radio-button-wrapper',
        'ds-radio-button',
        isChecked && 'ant-radio-button-wrapper-checked',
        isDisabled && 'ant-radio-button-wrapper-disabled',
        className,
      )}
      style={style}
      onClick={onClick}
      $checked={isChecked}
      $disabled={isDisabled}
      $solid={group?.buttonStyle === 'solid'}
      $size={group?.size}
    >
      <span
        className={cx(
          'ant-radio-button',
          isChecked && 'ant-radio-button-checked',
          isDisabled && 'ant-radio-button-disabled',
        )}
      >
        <S.RadioButtonInput
          type="radio"
          className="ant-radio-button-input ds-radio-button-input"
          checked={isChecked}
          disabled={isDisabled}
          name={group?.name}
          value={value === undefined ? undefined : String(value)}
          onChange={handleChange}
          {...rest}
        />
      </span>
      <span>{children}</span>
    </S.RadioButtonLabel>
  );
};
