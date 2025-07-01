import AntdTooltip from 'antd/lib/tooltip';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

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
  const [visible, setVisible] = useState<boolean>(false);

  useEffect((): (() => void) => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, displayDuration);
    return (): void => {
      clearTimeout(timeout);
    };
  }, [visible, displayDuration]);

  const showMessage = (): void => {
    setVisible(true);
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
      <AntdTooltip
        overlayStyle={{ maxWidth: '300px' }}
        autoAdjustOverflow={false}
        title={content}
        align={{ offset: [0, 0] }}
        visible={visible}
        placement={placement}
      >
        {children}
      </AntdTooltip>
    </S.Message>
  );
};

export default ConfirmMessage;
