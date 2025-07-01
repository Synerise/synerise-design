import React, {
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  useCallback,
} from 'react';

import { type WithHTMLAttributes } from '@synerise/ds-utils';

import * as S from './Text.styles';

export type TextProps = WithHTMLAttributes<
  HTMLLIElement,
  {
    disabled?: boolean;
    icon?: JSX.Element;
    danger?: boolean;
    actions?: ReactNode;
    children?: ReactNode;
    onSelect?: (e?: MouseEvent | KeyboardEvent) => void;
    size?: S.ListItemType;
  }
>;

const Text = ({
  disabled,
  icon,
  onSelect,
  danger,
  actions,
  children,
  size = 'small',
  ...htmlAttributes
}: TextProps) => {
  const onKeyUpHandler = useCallback(
    (event: KeyboardEvent): void | false =>
      event.nativeEvent.code === 'Space' && onSelect && onSelect(event),
    [onSelect],
  );
  return (
    <S.Wrapper
      disabled={disabled}
      tabIndex={!disabled ? 0 : undefined}
      onClick={onSelect}
      onKeyUp={onKeyUpHandler}
      danger={danger}
      icon={icon}
      size={size}
      {...htmlAttributes}
    >
      {icon && <S.IconWrapper>{icon}</S.IconWrapper>}
      <S.ContentWrapper icon={icon}>{children}</S.ContentWrapper>
      <S.ActionWraper>{actions && actions}</S.ActionWraper>
    </S.Wrapper>
  );
};

export default Text;
