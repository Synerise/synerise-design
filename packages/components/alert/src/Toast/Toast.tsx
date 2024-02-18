import React, { useCallback, useMemo } from 'react';
import Icon, { CloseM, WarningFillM, Check3M, HelpFillM, InfoFillM, AngleDownS } from '@synerise/ds-icon';

import * as S from './Toast.styles';
import { Props, ToastType } from './Toast.types';

const ICONS: Record<ToastType, React.ReactNode> = {
  success: <Check3M />,
  warning: <WarningFillM />,
  negative: <WarningFillM />,
  neutral: <HelpFillM />,
  informative: <InfoFillM />,
};

const DEFAULT_ICON = <WarningFillM />;

const Toast = ({
  icon,
  type,
  message,
  description,
  expander,
  expandedContent,
  color,
  withClose,
  customColor,
  customColorIcon,
  customIcon,
  colorIcon,
  customColorText,
  expanded,
  onExpand,
  onCloseClick,
  show,
  button,
}: Props) => {
  const renderMessage = useMemo(() => {
    return (
      <S.AlertContent>
        {message && (
          <S.AlertMessage customColorText={customColorText} color={color}>
            {message}
          </S.AlertMessage>
        )}
        <S.Text customColorText={customColorText} color={color}>
          {description && (
            <S.AlertDescription
              expandedContent={expandedContent}
              button={button}
              customColorText={customColorText}
              color={color}
            >
              {description}
            </S.AlertDescription>
          )}
        </S.Text>
        {expandedContent && expanded && (
          <S.ListWrapper description={description} visible={expanded}>
            {expandedContent}
          </S.ListWrapper>
        )}
        {button}
      </S.AlertContent>
    );
  }, [message, description, expandedContent, customColorText, color, expanded, button]);
  const renderIcon = useMemo(() => {
    if (icon) return icon;
    if (ICONS[type]) return ICONS[type];
    return DEFAULT_ICON;
  }, [icon, type]);
  const expandContent = useCallback(() => {
    onExpand && onExpand(!expanded);
  }, [onExpand, expanded]);

  return (
    <S.Container
      expander={expander}
      expandedContent={expandedContent}
      withClose={withClose}
      visible={show}
      onCloseClick={onCloseClick}
      color={color}
      customColor={customColor}
    >
      <S.WrapperSectionMessage>
        <S.AllContent>
          <S.IconWrapper colorIcon={colorIcon} customColorIcon={customColorIcon}>
            {customIcon || <Icon component={renderIcon} />}
          </S.IconWrapper>
          {renderMessage}
        </S.AllContent>
        <S.ButtonWrapper>
          {expander && (
            <S.IconExpanderWrapper
              onClick={expandContent}
              expanded={expanded}
              customColorText={customColorText}
              color={color}
            >
              <Icon component={<AngleDownS />} size={24} />
            </S.IconExpanderWrapper>
          )}
          {withClose && (
            <S.IconCloseWrapper onClick={onCloseClick} customColorText={customColorText} color={color}>
              <Icon component={<CloseM />} />
            </S.IconCloseWrapper>
          )}
        </S.ButtonWrapper>
      </S.WrapperSectionMessage>
    </S.Container>
  );
};

export default Toast;
