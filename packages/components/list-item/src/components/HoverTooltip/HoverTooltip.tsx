import React, { useCallback } from 'react';
import Trigger from 'rc-trigger';
import { useTheme } from '@synerise/ds-core';
import { HoverTooltipProps } from './HoverTooltip.types';
import { TRIGGER_PLACEMENTS } from '../../utils';

const HoverTooltip = ({ hoverTooltipProps, renderHoverTooltip, children, style }: HoverTooltipProps) => {
  const dsTheme = useTheme();
  const zIndex = parseInt(dsTheme.variables['zindex-tooltip'], 10);

  const cancelBubblingEvent = useCallback(() => (event: Event) => event.stopPropagation(), []);
  // onKeyDown is used to disallow propagating key events to tooltip's container element
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onKeyDown={cancelBubblingEvent} onClick={cancelBubblingEvent}>
      <Trigger
        builtinPlacements={TRIGGER_PLACEMENTS}
        defaultPopupVisible={hoverTooltipProps?.defaultPopupVisible ?? false}
        action={hoverTooltipProps?.action || ['click', 'hover']}
        popupPlacement={hoverTooltipProps?.popupPlacement || 'right'}
        popup={renderHoverTooltip && renderHoverTooltip()}
        popupClassName="ignore-click-outside ds-hide-arrow"
        mouseEnterDelay={0.2}
        popupStyle={{ zIndex }}
        zIndex={zIndex}
        {...hoverTooltipProps}
      >
        <div style={{ position: 'relative', ...style }}>{children}</div>
      </Trigger>
    </div>
  );
};
export default HoverTooltip;
