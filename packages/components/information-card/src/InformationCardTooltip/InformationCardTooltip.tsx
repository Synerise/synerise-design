import React, { forwardRef, useCallback, useEffect, useState } from 'react';

import { useTheme } from '@synerise/ds-core';
import {
  Popover,
  PopoverContent,
  type PopoverOptions,
  PopoverTrigger,
} from '@synerise/ds-popover';

import InformationCard from '../InformationCard';
import {
  FLIP_CONFIG,
  HOVER_CONFIG,
  OFFSET_CONFIG,
  SHIFT_CONFIG,
} from './InformationCard.constants';
import * as S from './InformationCardTooltip.styles';
import type { InformationCardTooltipProps } from './InformationCardTooltip.types';

export const InformationCardTooltip = forwardRef<
  HTMLDivElement,
  InformationCardTooltipProps
>(
  (
    {
      popoverProps,
      asChild,
      children,
      style,
      content,
      informationCardProps,
      disabled = false,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme();
    const zIndex = parseInt(theme.variables['zindex-tooltip'], 10);
    const [isOpen, setIsOpen] = useState(false);
    const onPopoverOpenChange = popoverProps?.onOpenChange;

    useEffect(() => {
      if (disabled) {
        setIsOpen(false);
      }
    }, [disabled]);

    const handleOpenChange = useCallback<
      NonNullable<PopoverOptions['onOpenChange']>
    >(
      (nextOpen, event, reason) => {
        if (nextOpen && disabled) {
          return;
        }
        setIsOpen(nextOpen);
        onPopoverOpenChange?.(nextOpen, event, reason);
      },
      [disabled, onPopoverOpenChange],
    );

    const cancelBubblingEvent = useCallback(
      () => (event: Event) => event.stopPropagation(),
      [],
    );

    return (
      <Popover
        trigger="hover"
        modal={false}
        componentId="information-card"
        testId="information-card"
        shiftConfig={SHIFT_CONFIG}
        offsetConfig={OFFSET_CONFIG}
        flipConfig={FLIP_CONFIG}
        hoverConfig={HOVER_CONFIG}
        placement="right"
        zIndex={zIndex}
        open={isOpen && !disabled}
        {...popoverProps}
        onOpenChange={handleOpenChange}
      >
        <PopoverContent>
          <S.InformationCardTooltipWrapper
            {...rest}
            onKeyDown={cancelBubblingEvent}
            onClick={cancelBubblingEvent}
          >
            {informationCardProps ? (
              <InformationCard {...informationCardProps} />
            ) : (
              content
            )}
          </S.InformationCardTooltipWrapper>
        </PopoverContent>

        <PopoverTrigger asChild={asChild} ref={ref}>
          {children}
        </PopoverTrigger>
      </Popover>
    );
  },
);
