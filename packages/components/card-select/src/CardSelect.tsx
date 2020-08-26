import * as React from 'react';
import { withTheme } from 'styled-components';
import Icon from '@synerise/ds-icon';
import Check3M from '@synerise/ds-icon/dist/icons/Check3M';
import { useOnClickOutside } from '@synerise/ds-utils';
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
  tickSize?: number;
  stretchToFit?: boolean;
  customTickVisible?: boolean;
  customTickVisibleComponent?: React.ReactNode;
  theme: { [k: string]: string };
  onChange?: (value: boolean) => void;
  onClick?: () => void;
  elementsPosition?: string | 'left' | 'center' | 'right';
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
  tickSize,
  elementsPosition = 'center',
  className,
  onClick,
  theme,
}) => {
  const [pressed, setPressed] = React.useState<boolean>(false);
  const wrapperRef = React.useRef(null);
  const tickIconRef = React.useRef<HTMLDivElement>(null);
  const handleClick = (): void => {
    onClick ? onClick() : onChange && onChange(!value);
    setPressed(true);
    if (!tickIconRef) {
      setTimeout(() => {
        tickIconRef.current.blur();
      });
    }
  };
  let realIconSize = iconSize;

  if (!realIconSize) {
    realIconSize = size === 'small' ? 48 : 96;
  }
  let realTickSize = tickSize;
  if (!realTickSize) {
    realTickSize = size === 'small' ? 24 : 30;
  }
  useOnClickOutside(wrapperRef, () => {
    pressed && setPressed(false);
  });
  return (
    <S.CardWrapper disabled={disabled}>
      <S.Container
        ref={wrapperRef}
        pressed={pressed}
        raised={raised}
        disabled={disabled}
        value={value}
        size={size}
        onClick={handleClick}
        stretchToFit={stretchToFit}
        className={`ds-card-select ${className || ''}`}
        elementsPosition={elementsPosition}
      >
        <S.Aside size={size} tabIndex={disabled ? undefined : 0} ref={tickIconRef}>
          {tickVisible && (
            <S.TickIcon
              className="ds-card-select-tick"
              disabled={disabled}
              elementsPosition={elementsPosition}
              selected={value && !disabled}
              size={size}
            >
              {value && !disabled ? (
                <Icon
                  size={realTickSize}
                  color={value ? theme.palette['green-600'] : theme.palette['grey-400']}
                  component={<Check3M />}
                />
              ) : (
                <S.RadioShape size={size} />
              )}
            </S.TickIcon>
          )}
        </S.Aside>

        <S.Main size={size} disabled={disabled} hasTick={tickVisible || customTickVisible}>
          {icon && (
            <S.IconWrapper size={size}>
              <Icon component={icon} size={realIconSize} />
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
    </S.CardWrapper>
  );
};

CardSelect.defaultProps = {
  tickVisible: true,
  value: false,
  size: 'medium',
};

export default withTheme(CardSelect);
