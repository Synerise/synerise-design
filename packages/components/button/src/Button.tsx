import React, {
  type MouseEvent,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import Icon, { SpinnerM } from '@synerise/ds-icon';
import { TagShape } from '@synerise/ds-tag';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './Button.styles';
import { ButtonMode, type ButtonProps } from './Button.types';

const RIPPLE_ANIMATION_OFFSET = 50;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'secondary',
      mode,
      groupVariant,
      loading = false,
      onClick,
      className,
      color = 'red',
      error,
      icon,
      tagProps,
      children,
      tooltipProps,
      ...restProps
    },
    forwardedRef,
  ) => {
    const rippleRef = useRef<HTMLSpanElement>(null);
    const [rippleClassName, setRippleClassName] = useState('');
    const [pressed, setPressed] = useState(false);
    const activeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    const clearActiveTimer = (): void => {
      if (activeTimerRef.current) {
        clearTimeout(activeTimerRef.current);
        activeTimerRef.current = null;
      }
      setPressed(false);
    };

    const handleMouseDown = (event: MouseEvent<HTMLElement>): void => {
      const button = event.currentTarget.closest('.ant-btn');
      if (button) {
        const buttonBoundingRect = button.getBoundingClientRect();
        const x = event.clientX - buttonBoundingRect.left;
        const y = event.clientY - buttonBoundingRect.top;

        if (rippleRef.current) {
          rippleRef.current.style.cssText = `top: ${y}px; left: ${x}px`;
        }
        setRippleClassName('animate');
      }
      clearActiveTimer();
      activeTimerRef.current = setTimeout(() => {
        setPressed(true);
      }, S.ACTIVE_DELAY);
    };

    const handleClick = (event: MouseEvent<HTMLElement>): void => {
      onClick && onClick(event);
    };

    const classNameString = useMemo((): string => {
      const modeStringifed = mode || '';
      const readOnlyStringifed = restProps.readOnly ? 'read-only' : '';
      const classNameStringifed = className || '';
      const pressedStringified = pressed ? 'pressed' : '';
      return `ds-button ${modeStringifed} ${classNameStringifed} ${readOnlyStringifed} ${pressedStringified}`;
    }, [mode, className, restProps.readOnly, pressed]);

    const iconBefore = icon && mode !== ButtonMode.LABEL_ICON ? icon : null;
    const iconAfter = icon && mode === ButtonMode.LABEL_ICON ? icon : null;

    const buttonLabel = useMemo(() => {
      const label = (
        <S.ButtonLabel
          withTooltip={!!tooltipProps}
          data-testid="ds-button-label"
          className="ds-button-label"
        >
          {iconBefore}
          {children}
          {iconAfter}
          {tagProps && mode !== ButtonMode.SINGLE_ICON && (
            <S.Tag {...tagProps} shape={TagShape.MEDIUM_ROUND} asPill />
          )}
        </S.ButtonLabel>
      );
      return tooltipProps ? (
        <Tooltip {...tooltipProps}>{label}</Tooltip>
      ) : (
        label
      );
    }, [children, tagProps, mode, tooltipProps, iconBefore, iconAfter]);

    return (
      <S.StyledButton
        ref={forwardedRef}
        type={type || 'secondary'}
        mode={mode}
        error={error}
        groupVariant={groupVariant}
        loading={loading}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={clearActiveTimer}
        onMouseLeave={clearActiveTimer}
        className={classNameString}
        customColor={color}
        {...restProps}
      >
        {!restProps.readOnly && (
          <S.RippleEffect
            ref={rippleRef}
            className={`btn-ripple ${rippleClassName}`}
          />
        )}
        {buttonLabel}
        {loading && (
          <S.Spinner className="btn-spinner" data-testid="button-spinner">
            <Icon component={<SpinnerM />} />
          </S.Spinner>
        )}
        <S.ButtonFocus className="btn-focus" />
      </S.StyledButton>
    );
  },
);

export default Button;
