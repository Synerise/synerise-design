import React, { type PointerEvent, useMemo } from 'react';

import * as S from './ButtonToggle.styles';
import type { ButtonToggleProps } from './ButtonToggle.types';

const ButtonToggle = ({
  activated,
  type,
  ...buttonProps
}: ButtonToggleProps) => {
  const mappedButtonType = useMemo(() => {
    switch (type) {
      case 'ghost':
        return activated ? 'ghost' : 'ghost';
      case 'solid':
      default:
        return activated ? 'primary' : 'secondary';
    }
  }, [activated, type]);

  const handlePointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;

    buttonProps.onPointerUp?.(event);
    setTimeout(() => {
      button && button.blur();
    }, 200);
  };

  return (
    <S.ButtonToggle
      {...buttonProps}
      toggleType={type}
      activated={activated}
      onPointerUp={handlePointerUp}
      type={mappedButtonType}
    />
  );
};
export default ButtonToggle;
