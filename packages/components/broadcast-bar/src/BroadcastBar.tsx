import React, { useMemo } from 'react';

import Icon, { CloseM } from '@synerise/ds-icon';

import * as S from './BroadcastBar.styles';
import { type BroadcastBarProps } from './BroadcastBar.types';
import { DEFAULT_ICON, ICONS } from './constants';

const BroadcastBar = ({
  customIcon,
  type,
  description,
  button,
  withClose,
  onCloseClick,
}: BroadcastBarProps) => {
  const renderMessage = useMemo(() => {
    return (
      <S.AlertContent>
        {description && <S.AlertDescription>{description}</S.AlertDescription>}
      </S.AlertContent>
    );
  }, [description]);

  const renderIcon = useMemo(() => {
    if (customIcon) {
      return customIcon;
    }
    if (ICONS[type]) {
      return ICONS[type];
    }
    return DEFAULT_ICON;
  }, [customIcon, type]);

  return (
    <S.Container close={withClose} type={type}>
      <S.WrapperBroadcastBar close={withClose} type={type}>
        <S.AllContent close={withClose} type={type}>
          <S.IconWrapper type={type}>
            <Icon component={renderIcon} />
          </S.IconWrapper>
          {renderMessage}
          <S.ButtonWrapper type={type}>{button}</S.ButtonWrapper>
        </S.AllContent>
        {withClose && (
          <S.ButtonCloseWrapper>
            <S.IconCloseWrapper onClick={onCloseClick} type={type}>
              <Icon component={<CloseM />} />
            </S.IconCloseWrapper>
          </S.ButtonCloseWrapper>
        )}
      </S.WrapperBroadcastBar>
    </S.Container>
  );
};

export default BroadcastBar;
