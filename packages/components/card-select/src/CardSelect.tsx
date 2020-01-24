import * as React from 'react';
import { withTheme } from 'styled-components';
import Icon from '@synerise/ds-icon';
import Check3M from '@synerise/ds-icon/dist/icons/Check3M';
import * as S from './CardSelect.styles';

export interface CardSelectProps {
  icon?: React.ReactNode;
  raised?: boolean;
  description?: string | React.ReactNode;
  title?: string | React.ReactNode;
  value?: boolean;
  disabled?: boolean;
  tickVisible?: boolean;
  size?: 'small' | 'medium';
  className?: string;
  iconSize?: number;
  stretchToFit?: boolean;
  customTickVisible?: boolean;
  customTickVisibleComponent?: React.ReactNode;
  theme: { [k: string]: string };
  onChange?: (value: boolean) => void;
  onClick?: () => void;
}

const CardSelect: React.FC<CardSelectProps> = ({
  title,
  description,
  customTickVisible,
  customTickVisibleComponent,
  tickVisible,
  stretchToFit,
  raised,
  value,
  size,
  disabled,
  onChange,
  icon,
  iconSize,
  className,
  onClick,
  theme,
}) => {
  const handleClick = (): void => (onClick ? onClick() : onChange && onChange(!value));
  let realIconSize = iconSize;

  if (!realIconSize) {
    realIconSize = size === 'small' ? 48 : 82;
  }

  return (
    <S.Container
      raised={raised}
      disabled={disabled}
      value={value}
      size={size}
      stretchToFit={stretchToFit}
      onClick={handleClick}
      className={className}
      data-testid="test-id"
    >
      <S.Aside size={size}>
        {tickVisible && (
          <S.TickIcon disabled={disabled} selected={value} size={size}>
            {value ? (
              <Icon
                size={30}
                color={value ? theme.palette['green-600'] : theme.palette['grey-400']}
                component={<Check3M />}
              />
            ) : (
              <S.RadioShape />
            )}
          </S.TickIcon>
        )}
      </S.Aside>

      <S.Main size={size} disabled={disabled} hasTick={tickVisible || customTickVisible}>
        {icon && (
          <S.IconWrapper size={size}>
            <Icon size={realIconSize} component={icon} />
          </S.IconWrapper>
        )}

        {title ? (
          <S.Title size={size} hasIcon={!!icon}>
            {title}
          </S.Title>
        ) : null}
        {description && size !== 'small' ? (
          <S.Description size={size} hasTitle={!!title} hasIcon={!!icon}>
            {description}
          </S.Description>
        ) : null}
      </S.Main>

      <S.Aside size={size}>{customTickVisible && customTickVisibleComponent}</S.Aside>
    </S.Container>
  );
};

CardSelect.defaultProps = {
  tickVisible: true,
  value: false,
  size: 'medium',
};

export default withTheme(CardSelect);
