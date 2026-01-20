import React, { useCallback } from 'react';

import { useTheme } from '@synerise/ds-core';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  getPlacement,
} from '@synerise/ds-popover';

import {
  FLIP_CONFIG,
  HOVER_CONFIG,
  OFFSET_CONFIG,
  SHIFT_CONFIG,
  TRANSITION_DURATION,
} from './HoverTooltip.const';
import { PropagationStopper } from './HoverTooltip.styles';
import { type HoverTooltipProps } from './HoverTooltip.types';

const HoverTooltip = ({
  popoverProps,
  renderHoverTooltip,
  children,
  style,
}: HoverTooltipProps) => {
  const dsTheme = useTheme();
  const zIndex = parseInt(dsTheme.variables['zindex-tooltip'], 10);

  const cancelBubblingEvent = useCallback(
    () => (event: Event) => event.stopPropagation(),
    [],
  );
  const popoverPlacement = getPlacement(popoverProps?.placement || 'right');
  return (
    // onKeyDown is used to disallow propagating key events to tooltip's container element
    <PropagationStopper
      onKeyDown={cancelBubblingEvent}
      onClick={cancelBubblingEvent}
    >
      <Popover
        trigger="hover"
        modal={false}
        componentId="information-card"
        testId="information-card"
        shiftConfig={SHIFT_CONFIG}
        offsetConfig={OFFSET_CONFIG}
        flipConfig={FLIP_CONFIG}
        hoverConfig={HOVER_CONFIG}
        transitionDuration={TRANSITION_DURATION}
        zIndex={zIndex}
        {...popoverProps}
        placement={popoverPlacement}
      >
        <PopoverContent>
          {renderHoverTooltip && renderHoverTooltip()}
        </PopoverContent>
        <PopoverTrigger asChild>
          <div style={{ position: 'relative', ...style }}>{children}</div>
        </PopoverTrigger>
      </Popover>
    </PropagationStopper>
  );
};
export default HoverTooltip;
