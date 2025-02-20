import React, { useCallback, useMemo } from 'react';
import Trigger from 'rc-trigger';
import { useTheme } from '@synerise/ds-core';

import InformationCard from '../InformationCard';
import { InformationCardTooltipProps } from './InformationCardTooltip.types';
import { TRIGGER_PLACEMENTS } from './InformationCard.constants';
import * as S from './InformationCardTooltip.styles';

export const InformationCardTooltip = ({
  triggerProps,
  children,
  style,
  informationCardProps,
  ...rest
}: InformationCardTooltipProps) => {
  const dsTheme = useTheme();
  const zIndex = parseInt(dsTheme.variables['zindex-tooltip'], 10);

  const renderedInfocard = useMemo(() => <InformationCard {...informationCardProps} />, [informationCardProps]);

  const cancelBubblingEvent = useCallback(() => (event: Event) => event.stopPropagation(), []);
  const { popupAlign } = triggerProps || {};
  const triggerPopupAlign = {
    overflow: {
      adjustX: true,
      adjustY: true,
      ...popupAlign?.overflow,
    },
    ...popupAlign,
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <S.InformationCardTooltipWrapper {...rest} onKeyDown={cancelBubblingEvent} onClick={cancelBubblingEvent}>
      <Trigger
        builtinPlacements={TRIGGER_PLACEMENTS}
        defaultPopupVisible={triggerProps?.defaultPopupVisible ?? false}
        action={triggerProps?.action || ['click', 'hover']}
        popupPlacement={triggerProps?.popupPlacement || 'right'}
        popup={renderedInfocard}
        popupClassName="ignore-click-outside ds-hide-arrow"
        mouseEnterDelay={0.2}
        popupStyle={{ zIndex }}
        zIndex={zIndex}
        popupAlign={triggerPopupAlign}
        {...triggerProps}
      >
        <S.InformationCardTooltipTrigger>{children}</S.InformationCardTooltipTrigger>
      </Trigger>
    </S.InformationCardTooltipWrapper>
  );
};
