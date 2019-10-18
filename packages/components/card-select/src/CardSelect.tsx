import * as React from 'react';

import { withTheme } from 'styled-components';
import Icon from '@synerise/ds-icon';
import { ReactComponent as CheckThreeM } from '@synerise/ds-icon/dist/icons/check-3-m.svg';

import { Props } from './CardSelect.types';
import * as S from './CardSelect.styles';

const CardSelect: React.FC<Props> = ({
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
}: Props) => {
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
                component={<CheckThreeM />}
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
