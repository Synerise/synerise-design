import * as React from 'react';
import AntdTooltip from 'antd/lib/tooltip';
import * as S from './ConfirmMessage.style';
import { ConfirmMessageProps } from './ConfirmMessage.types';

export const ConfirmMessage: React.FC<ConfirmMessageProps> = ({
  children,
  placement = 'topLeft',
  title,
  onClick,
  displayDuration = 5000,
  icon,
}) => {
  const [visible, setVisible] = React.useState<boolean>(false);

  React.useEffect((): (() => void) => {
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

  const handleClick = React.useCallback(() => {
    onClick && onClick(showMessage);
  }, [onClick]);

  const content = React.useMemo(() => {
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
