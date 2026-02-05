import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Tooltip from '@synerise/ds-tooltip';

import * as S from './ConfirmMessage.style';
import { type ConfirmMessageProps } from './ConfirmMessage.types';

export const ConfirmMessage = ({
  children,
  placement = 'topLeft',
  title,
  onClick,
  displayDuration = 5000,
  icon,
}: ConfirmMessageProps) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect((): (() => void) => {
    const timeout = setTimeout(() => {
      setOpen(false);
    }, displayDuration);
    return (): void => {
      clearTimeout(timeout);
    };
  }, [open, displayDuration]);

  const showMessage = (): void => {
    setOpen(true);
  };

  const handleClick = useCallback(() => {
    onClick && onClick(showMessage);
  }, [onClick]);

  const content = useMemo(() => {
    return (
      <S.ConfirmMessage>
        {icon}
        <S.ConfirmMessageTitle>{title}</S.ConfirmMessageTitle>
      </S.ConfirmMessage>
    );
  }, [title, icon]);

  return (
    <S.Message onClick={handleClick} data-testid="confirm-message">
      <Tooltip
        trigger="click"
        render={() => content}
        open={open}
        placement={placement}
      >
        {children}
      </Tooltip>
    </S.Message>
  );
};

export default ConfirmMessage;
