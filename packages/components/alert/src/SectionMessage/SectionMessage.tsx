import React, { useMemo } from 'react';
import type { ReactNode } from 'react';
import Icon, {
  CloseM,
  WarningFillM,
  Check3M,
  HelpFillM,
  UserUpM,
  UpdateDataM,
  NotificationsReceiveM,
} from '@synerise/ds-icon';
import * as S from './SectionMessage.styles';
import { Props, AlertTypes } from './SectionMessage.types';

const ICONS: Record<AlertTypes, ReactNode> = {
  positive: <Check3M />,
  notice: <WarningFillM />,
  negative: <WarningFillM />,
  neutral: <HelpFillM />,
  supply: <UserUpM />,
  service: <UpdateDataM />,
  entity: <NotificationsReceiveM />,
};

const DEFAULT_ICON = <WarningFillM />;

const SectionMessage = ({
  icon,
  type,
  message,
  description,
  showMoreLabel,
  onShowMore,
  onClose,
  suffixel,
  moreButtons,
  withEmphasis,
  withLink,
  unorderedList,
  color,
  withClose,
  customColor,
  customColorIcon,
  customIcon,
}: Props) => {
  const renderMessage = useMemo(() => {
    return (
      <S.AlertContent withLink={withLink}>
        {message && <S.AlertMessage>{message}</S.AlertMessage>}
        <S.Text>
          {description && <S.AlertDescription>{description}</S.AlertDescription>}
          {withLink && <S.LinkWrapper>{withLink}</S.LinkWrapper>}
          {withEmphasis && !withLink && <S.EmphasisWrapper>{withEmphasis}</S.EmphasisWrapper>}
        </S.Text>
        {onShowMore && showMoreLabel && <S.AlertShowMore onClick={onShowMore}>{showMoreLabel}</S.AlertShowMore>}
        {moreButtons}
        {unorderedList && !moreButtons && unorderedList}
      </S.AlertContent>
    );
  }, [message, description, showMoreLabel, onShowMore, moreButtons, withEmphasis, withLink, unorderedList]);

  const renderIcon = useMemo(() => {
    if (icon) return icon;
    if (ICONS[type]) return ICONS[type];
    return DEFAULT_ICON;
  }, [icon, type]);

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <S.Container data-testid={`ds-section-message-${type}`} color={color} customColor={customColor}>
      <S.WrapperSectionMessage>
        <S.AllContent>
          <S.IconWrapper color={color} customColorIcon={customColorIcon}>
            {customIcon || <Icon component={renderIcon} />}
          </S.IconWrapper>
          {renderMessage}
        </S.AllContent>
        <S.ButtonWrapper>
          {suffixel && <S.SuffixWrapper>{suffixel}</S.SuffixWrapper>}
          {withClose && (
            <S.IconCloseWrapper onClick={handleClose}>
              <Icon component={<CloseM />} />
            </S.IconCloseWrapper>
          )}
        </S.ButtonWrapper>
      </S.WrapperSectionMessage>
    </S.Container>
  );
};

export default SectionMessage;
