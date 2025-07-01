import React, { useMemo } from 'react';

import Button from '@synerise/ds-button';
import Icon, { AngleDownS, AngleUpS } from '@synerise/ds-icon';

import * as S from '../../Banner.styles';
import type { BannerHeaderProps } from '../../Banner.types';

export const BannerHeader = ({
  closeButton,
  icon,
  title,
  isExpanded = true,
  texts,
  onToggle,
}: BannerHeaderProps) => {
  const toggleButtonElement = useMemo(() => {
    return (
      <Button
        mode="label-icon"
        type="ghost-primary"
        onClick={() => onToggle(!isExpanded)}
      >
        {isExpanded ? texts.collapse : texts.expand}
        <Icon component={isExpanded ? <AngleUpS /> : <AngleDownS />} />
      </Button>
    );
  }, [isExpanded, onToggle, texts.collapse, texts.expand]);

  return (
    <S.BannerHeaderWrapper isExpanded={isExpanded}>
      {icon && <S.BannerHeaderIcon>{icon}</S.BannerHeaderIcon>}
      <S.BannerHeaderTitle size="small">{title}</S.BannerHeaderTitle>
      <S.BannerHeaderToggle>{toggleButtonElement}</S.BannerHeaderToggle>
      {closeButton && (
        <>
          <S.BannerDivider />
          {closeButton}
        </>
      )}
    </S.BannerHeaderWrapper>
  );
};
