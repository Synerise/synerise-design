import React from 'react';

import Tooltip from '@synerise/ds-tooltip';

import type { HandlerConfig } from '../../Slider.types';
import * as S from './BlockedHandlerWthTooltip.styles';

type BlockedHandlersWithTooltipProps = {
  blockedHandlersKeys: number[];
  handlersPosition: number[];
  handlers?: HandlerConfig;
};

export const BlockedHandlersWithTooltip = ({
  blockedHandlersKeys,
  handlers,
  handlersPosition,
}: BlockedHandlersWithTooltipProps) => {
  return (
    <>
      {blockedHandlersKeys.map((blockedHandlerKey) => (
        <S.BlockedHandlerWithTooltipWrapper key={blockedHandlerKey}>
          <Tooltip
            {...handlers?.[blockedHandlerKey].blockedTooltipProps}
            overlayStyle={{ zIndex: 999999 }}
          >
            <S.ElementOverHandler
              position={handlersPosition[blockedHandlerKey - 1]}
            />
          </Tooltip>
        </S.BlockedHandlerWithTooltipWrapper>
      ))}
    </>
  );
};
