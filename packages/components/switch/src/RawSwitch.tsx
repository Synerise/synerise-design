import classNames from 'classnames';
import React, { type MouseEvent, forwardRef, useState } from 'react';

import * as S from './RawSwitch.styles';
import { type RawSwitchProps } from './Switch.types';

/**
 * DS-native bare toggle (antd-free replacement for the former `RawSwitch = antd Switch`). Renders a
 * `<button role="switch">` — keyboard (space/enter) toggling works natively. Controlled via `checked`,
 * uncontrolled via `defaultChecked`. Native button attributes + `data-*` are forwarded so React-Final-Form
 * `{...input}` spreads keep working. The `ds-switch-*` / `ant-switch-*` class hooks are kept on the element
 * (the `ant-*` ones temporarily, for ui-tests / external CSS).
 */
const RawSwitch = forwardRef<HTMLButtonElement, RawSwitchProps>(
  (
    {
      checked,
      defaultChecked,
      disabled,
      loading,
      size: _size,
      className,
      onChange,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const isControlled = checked !== undefined;
    const [internalChecked, setInternalChecked] = useState(
      Boolean(defaultChecked),
    );
    const isChecked = isControlled ? Boolean(checked) : internalChecked;
    const isDisabled = Boolean(disabled || loading);
    // The DS Switch flags the error state by adding an `error` class (kept for back-compat + tests).
    const hasError = (className ?? '').split(/\s+/).includes('error');

    const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
      if (isDisabled) {
        return;
      }
      const next = !isChecked;
      if (!isControlled) {
        setInternalChecked(next);
      }
      onClick?.(next, event);
      onChange?.(next, event);
    };

    return (
      <S.Toggle
        {...rest}
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={isDisabled}
        $checked={isChecked}
        $error={hasError}
        $loading={loading}
        onClick={handleClick}
        className={classNames(
          'ant-switch ds-switch-toggle',
          {
            'ant-switch-checked ds-switch-checked': isChecked,
            'ant-switch-disabled ds-switch-disabled': isDisabled,
            'ant-switch-loading ds-switch-loading': loading,
          },
          className,
        )}
      >
        <S.Handle $checked={isChecked}>{loading && <S.Spinner />}</S.Handle>
      </S.Toggle>
    );
  },
);

export default RawSwitch;
