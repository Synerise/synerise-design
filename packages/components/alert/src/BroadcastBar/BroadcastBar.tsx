import * as React from 'react';
import { CloseM, WarningFillM, Check3M, ErrorFillM } from '@synerise/ds-icon/dist/icons';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import * as S from './BroadcastBar.styles';
import { BroadcastBarTypes, Props } from './BroadcastBar.types';

const ICONS: Record<BroadcastBarTypes, React.ReactNode> = {
  success: <Check3M />,
  warning: <WarningFillM />,
  negative: <ErrorFillM />,
};

const DEFAULT_ICON = <WarningFillM />;

const BroadcastBar: React.FC<Props> = ({
  icon,
  type,
  message,
  description,
  button,
  withEmphasis,
  withLink,
  unorderedList,
  color,
  withClose,
  textButton,
  onCloseClick,
}: Props) => {
  const renderMessage = React.useMemo(() => {
    return (
      <S.AlertContent color={color} withLink={withLink}>
        <S.Text color={color}>
          {message && (
            <S.AlertMessage emphasis={withEmphasis} color={color}>
              {message}
            </S.AlertMessage>
          )}
          {description && !withEmphasis && <S.AlertDescription color={color}>{description}</S.AlertDescription>}
          {withLink && !withEmphasis && !description && <S.LinkWrapper color={color}>{withLink}</S.LinkWrapper>}
          {withEmphasis && <S.EmphasisWrapper color={color}>{withEmphasis}</S.EmphasisWrapper>}
        </S.Text>
      </S.AlertContent>
    );
  }, [message, description, withEmphasis, withLink, unorderedList, color]);

  const renderIcon = React.useMemo(() => {
    if (icon) return icon;
    if (ICONS[type]) return ICONS[type];
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
          <S.ButtonWrapper>
            {button && (
              <Button type={color === 'yellow' ? 'tertiary' : 'tertiary-white'} mode="label">
                {textButton}
              </Button>
            )}
          </S.ButtonWrapper>
        </S.AllContent>
        <S.ButtonWrapper color={color}>
          {withClose && (
            <S.IconCloseWrapper onClick={onCloseClick} color={color}>
              <Icon component={<CloseM />} />
            </S.IconCloseWrapper>
          )}
        </S.ButtonWrapper>
      </S.WrapperSectionMessage>
    </S.Container>
  );
};

export default BroadcastBar;
