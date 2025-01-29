import React, { useEffect, useState, MouseEvent, useMemo, useRef } from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';

import Icon, { SpinnerM } from '@synerise/ds-icon';

import * as S from './Button.styles';
import { ButtonProps } from './Button.types';

const RIPPLE_ANIMATION_OFFSET = 50;

const Button = ({
  type = 'secondary',
  mode,
  justifyContent = 'center',
  groupVariant,
  loading = false,
  onClick,
  className,
  color = 'red',
  error,
  activated,
  children,
  ...antdProps
}: ButtonProps) => {
  const rippleRef = useRef<HTMLSpanElement>(null);
  const [rippleClassName, setRippleClassName] = useState('');
  const [pressed, setPressed] = useState<boolean>(false);

  useEffect(() => {
    let rippleAnimation: ReturnType<typeof setTimeout>;
    if (rippleClassName !== '') {
      rippleAnimation = setTimeout(() => {
        setRippleClassName('');
      }, S.RIPPLE_ANIMATION_TIME - RIPPLE_ANIMATION_OFFSET);
    }
    return () => {
      rippleAnimation && clearTimeout(rippleAnimation);
    };
  }, [rippleClassName]);

  const handleClick = (event: MouseEvent<HTMLElement>): void => {
    const button = event.currentTarget.closest('.ant-btn');
    if (button) {
      const buttonBoundingRect = button.getBoundingClientRect();
      const x = event.clientX - buttonBoundingRect.left;
      const y = event.clientY - buttonBoundingRect.top;

      if (rippleRef.current) {
        rippleRef.current.style.cssText = `top: ${y}px; left: ${x}px`;
      }
      setRippleClassName('animate');
      onClick && onClick(event);
    }
  };

  const classNameString = useMemo((): string => {
    const modeStringifed = mode || '';
    const readOnlyStringifed = antdProps.readOnly ? 'read-only' : '';
    const classNameStringifed = className || '';
    return `ds-button ${modeStringifed} ${classNameStringifed} ${readOnlyStringifed}`;
  }, [mode, className, antdProps.readOnly]);

  return (
    <S.AntdButton
      justifyContent={justifyContent}
      type={type || 'secondary'}
      mode={mode}
      error={error}
      activated={activated}
      groupVariant={groupVariant}
      loading={loading}
      onClick={handleClick}
      onMouseDown={(): void => {
        setPressed(true);
      }}
      onMouseUp={(): void => {
        setPressed(false);
      }}
      pressed={pressed}
      className={classNameString}
      customColor={color}
      {...antdProps}
    >
      {!antdProps.readOnly && <S.RippleEffect ref={rippleRef} className={`btn-ripple ${rippleClassName}`} />}
      <S.ButtonLabel data-testid="ds-button-label" className="ds-button-label">
        {children}
      </S.ButtonLabel>
      {loading && (
        <S.Spinner className="btn-spinner" data-testid="button-spinner">
          <Icon component={<SpinnerM />} color="#fff" />
        </S.Spinner>
      )}
      <S.ButtonFocus className="btn-focus" />
    </S.AntdButton>
  );
};

export default Button;
