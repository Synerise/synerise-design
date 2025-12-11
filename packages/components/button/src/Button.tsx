import React, {
  type MouseEvent,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import '@synerise/ds-core/dist/js/style';
import Icon, { SpinnerM } from '@synerise/ds-icon';
import { TagShape } from '@synerise/ds-tag';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './Button.styles';
import { ButtonMode, type ButtonProps } from './Button.types';
import './style/index.less';

const RIPPLE_ANIMATION_OFFSET = 50;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'secondary',
      mode,
      justifyContent = 'center',
      groupVariant,
      loading = false,
      onClick,
      className,
      color = 'red',
      error,
      tagProps,
      children,
      tooltipProps,
      ...antdProps
    },
    forwardedRef,
  ) => {
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

    const buttonLabel = useMemo(() => {
      const label = (
        <S.ButtonLabel
          // ref={forwardedRef}
          withTooltip={!!tooltipProps}
          data-testid="ds-button-label"
          className="ds-button-label"
        >
          {children}
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
    }, [children, tagProps, mode, tooltipProps]);

    return (
      <S.AntdButton
        ref={forwardedRef}
        justifyContent={justifyContent}
        type={type || 'secondary'}
        mode={mode}
        error={error}
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
        {!antdProps.readOnly && (
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
      </S.AntdButton>
    );
  },
);

export default Button;
