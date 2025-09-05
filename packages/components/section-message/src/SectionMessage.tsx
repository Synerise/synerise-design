import React, { useMemo } from 'react';

import Icon, { CloseM } from '@synerise/ds-icon';

import { DEFAULT_ICON, ICONS } from './SectionMessage.const';
import * as S from './SectionMessage.styles';
import { type SectionMessageProps } from './SectionMessage.types';
import { isSectionType } from './SectionMessage.utils';

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
  withClose,
  customColor,
  customColorIcon,
  customIcon,
  ...htmlAttributes
}: SectionMessageProps) => {
  const renderMessage = useMemo(() => {
    return (
      <S.AlertContent withLink={withLink}>
        {message && <S.AlertMessage>{message}</S.AlertMessage>}
        <S.Text>
          {description && (
            <S.AlertDescription>{description}</S.AlertDescription>
          )}
          {withLink && <S.LinkWrapper>{withLink}</S.LinkWrapper>}
          {withEmphasis && !withLink && (
            <S.EmphasisWrapper>{withEmphasis}</S.EmphasisWrapper>
          )}
        </S.Text>
        {onShowMore && showMoreLabel && (
          <S.AlertShowMore onClick={onShowMore}>
            {showMoreLabel}
          </S.AlertShowMore>
        )}
        {moreButtons}
        {unorderedList && !moreButtons && unorderedList}
      </S.AlertContent>
    );
  }, [
    message,
    description,
    showMoreLabel,
    onShowMore,
    moreButtons,
    withEmphasis,
    withLink,
    unorderedList,
  ]);

  const renderIcon = useMemo(() => {
    if (icon) {
      return icon;
    }
    if (isSectionType(type)) {
      return ICONS[type];
    }
    return DEFAULT_ICON;
  }, [icon, type]);

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <S.Container
      data-testid={`ds-section-message-${type}`}
      type={type}
      customColor={customColor}
      {...htmlAttributes}
    >
      <S.WrapperSectionMessage>
        <S.AllContent>
          <S.IconWrapper type={type} customColorIcon={customColorIcon}>
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
