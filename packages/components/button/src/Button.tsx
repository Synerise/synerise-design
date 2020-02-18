import * as React from 'react';
import { ButtonProps } from 'antd/lib/button';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';

import { JustifyContentProperty } from 'csstype';

import Icon from '@synerise/ds-icon';
import { SpinnerM } from '@synerise/ds-icon/dist/icons';
import AntdButton, * as S from './Button.styles';

export interface Props extends Omit<ButtonProps, 'type'> {
  type?:
    | string
    | 'default'
    | 'primary'
    | 'ghost'
    | 'dashed'
    | 'danger'
    | 'link'
    | 'success'
    | 'flat'
    | 'warning'
    | 'tertiary-white'
    | 'ghost-primary'
    | 'ghost-white';
  mode?: string;
  groupVariant?: string | 'left-rounded' | 'squared' | 'right-rounded';
  justifyContent?: JustifyContentProperty;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const RIPPLE_ANIMATION_OFFSET = 50;

const Button: React.FC<Props> = ({
  type,
  mode,
  justifyContent = 'center',
  groupVariant,
  loading = false,
  onClick,
  ...antdProps
}) => {
  const rippleRef = React.useRef<HTMLSpanElement>(null);
  const [rippleClassName, setRippleClassName] = React.useState('');

  React.useEffect(() => {
    if (rippleClassName !== '') {
      setTimeout(() => {
        setRippleClassName('');
      }, S.RIPPLE_ANIMATION_TIME - RIPPLE_ANIMATION_OFFSET);
    }
  }, [rippleClassName]);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
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

  return (
    <AntdButton
      justifyContent={justifyContent}
      type={type}
      mode={mode}
      groupVariant={groupVariant}
      loading={loading}
      onClick={handleClick}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...antdProps}
    >
      <S.RippleEffect ref={rippleRef} className={`btn-ripple ${rippleClassName}`} />
      {antdProps.children}
      {loading && (
        <S.Spinner className="btn-spinner" data-testid="button-spinner">
          <Icon component={<SpinnerM />} color="#fff" />
        </S.Spinner>
      )}
      <S.ButtonFocus className="btn-focus" />
    </AntdButton>
  );
};

export default Button;
