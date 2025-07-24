import React, { type ReactNode, useMemo } from 'react';

import Icon, {
  Check3M,
  CloseM,
  ErrorFillM,
  WarningFillM,
} from '@synerise/ds-icon';

import * as S from './BroadcastBar.styles';
import { type BroadcastBarTypes, type Props } from './BroadcastBar.types';

const ICONS: Record<BroadcastBarTypes, ReactNode> = {
  success: <Check3M />,
  warning: <WarningFillM />,
  negative: <ErrorFillM />,
};
const DEFAULT_ICON = <WarningFillM />;

const BroadcastBar = ({
  icon,
  type,
  description,
  button,
  withEmphasis,
  withLink,
  color,
  withClose,
  textButton,
  onCloseClick,
  text,
}: Props) => {
  const renderMessage = useMemo(() => {
    return (
      <S.AlertContent color={color} withLink={withLink}>
        <S.Text color={color}>
          {description && !withEmphasis && (
            <S.AlertDescription color={color}>{description}</S.AlertDescription>
          )}
          {withLink && !withEmphasis && !description && (
            <S.LinkWrapper color={color}>
              <S.WrapperText>{text}</S.WrapperText>
              <S.Link>{withLink}</S.Link>
            </S.LinkWrapper>
          )}
          {withEmphasis && (
            <S.EmphasisWrapper color={color}>
              <S.WrapperText emphasis={withEmphasis}>{text}</S.WrapperText>
              {withEmphasis}
            </S.EmphasisWrapper>
          )}
        </S.Text>
      </S.AlertContent>
    );
  }, [description, withEmphasis, withLink, text, color]);

  const renderIcon = useMemo(() => {
    if (icon) {
      return icon;
    }
    if (ICONS[type]) {
      return ICONS[type];
    }
    return DEFAULT_ICON;
  }, [icon, type]);

  return (
    <S.Container color={color}>
      <S.WrapperSectionMessage color={color}>
        <div />
        <S.AllContent close={withClose} color={color}>
          <S.IconWrapper color={color}>
            <Icon component={renderIcon} />
          </S.IconWrapper>
          {renderMessage}
          <S.ButtonWrapper color={color}>
            {button && (
              <S.BroadcastButton
                color={color}
                type={color === 'yellow' ? 'tertiary' : 'tertiary-white'}
                mode="label"
              >
                {textButton}
              </S.BroadcastButton>
            )}
          </S.ButtonWrapper>
        </S.AllContent>
        <S.ButtonCloseWrapper color={color}>
          {withClose && (
            <S.IconCloseWrapper onClick={onCloseClick} color={color}>
              <Icon component={<CloseM />} />
            </S.IconCloseWrapper>
          )}
        </S.ButtonCloseWrapper>
      </S.WrapperSectionMessage>
    </S.Container>
  );
};

export default BroadcastBar;
