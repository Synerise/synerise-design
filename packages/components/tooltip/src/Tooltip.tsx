import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';

import { useTheme } from '@synerise/ds-core';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  getPlacement,
} from '@synerise/ds-popover';
import { getPopupContainer as defaultGetPopupContainer } from '@synerise/ds-utils';

import {
  POPOVER_FLIP_CONFIG,
  POPOVER_SHIFT_CONFIG,
  POPOVER_TRANSITION_DURATION,
} from './Tooltip.const';
import * as S from './Tooltip.styles';
import type { TooltipProps } from './Tooltip.types';
import { getOffsetConfig, getTransitionConfig } from './Tooltip.utils';
import { TooltipContent } from './TooltipContent';

const Tooltip = forwardRef<HTMLElement, TooltipProps>(
  (
    {
      type = 'default',
      icon,
      title,
      shortCuts,
      status,
      description,
      timeToHideAfterClick = 0,
      offset = 'default',
      children,
      button,
      render,
      image,
      disabled,
      placement = 'top',
      trigger = 'hover',
      open,
      zIndex,
      onOpenChange,
      popoverProps,
      getPopupContainer,
      overlayStyle,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(open || false);
    const timeoutClickRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const theme = useTheme();

    const floatingPlacement = getPlacement(placement);

    const tooltipContentExists = Boolean(
      description || title || icon || typeof render === 'function',
    );

    useEffect(() => {
      return () => {
        timeoutClickRef.current && clearTimeout(timeoutClickRef.current);
      };
    }, []);

    useEffect(() => {
      setIsOpen(!!open);
    }, [open]);

    useEffect(() => {
      if (!tooltipContentExists) {
        setIsOpen(false);
      }
    }, [tooltipContentExists]);

    const handleOnClickHideDelay = (visible: boolean) => {
      if (!visible) {
        timeoutClickRef.current && clearTimeout(timeoutClickRef.current);
        setIsOpen(false);
        onOpenChange?.(false);
      } else {
        setIsOpen(true);
        timeoutClickRef.current = setTimeout(() => {
          onOpenChange?.(false);
          setIsOpen(false);
        }, timeToHideAfterClick);
      }
    };

    const handleOpenChange = (newOpen: boolean) => {
      if (trigger === 'click' && timeToHideAfterClick) {
        handleOnClickHideDelay(newOpen);
      } else {
        setIsOpen(newOpen);
        onOpenChange?.(newOpen);
      }
    };

    const tooltipContent = useMemo(() => {
      return render ? (
        <S.TooltipWrapper style={overlayStyle}>{render()}</S.TooltipWrapper>
      ) : (
        <TooltipContent
          title={title}
          description={description}
          icon={icon}
          button={button}
          shortCuts={shortCuts}
          type={type}
          image={image}
          status={status}
          overlayStyle={overlayStyle}
        />
      );
    }, [
      button,
      description,
      icon,
      image,
      render,
      shortCuts,
      status,
      overlayStyle,
      title,
      type,
    ]);

    const isTriggeredByClick = Array.isArray(trigger)
      ? trigger.includes('click')
      : trigger === 'click';

    const handleTriggerClick = () => {
      isTriggeredByClick && handleOpenChange(!isOpen);
    };

    if (!tooltipContentExists || disabled) {
      return children;
    }
    return (
      <>
        <Popover
          placement={floatingPlacement}
          trigger={trigger}
          modal={false}
          onOpenChange={handleOpenChange}
          open={isOpen}
          autoUpdate={true}
          offsetConfig={getOffsetConfig(offset)}
          transitionDuration={POPOVER_TRANSITION_DURATION}
          flipConfig={POPOVER_FLIP_CONFIG}
          shiftConfig={POPOVER_SHIFT_CONFIG}
          getTransitionConfig={getTransitionConfig}
          getPopupContainer={getPopupContainer || defaultGetPopupContainer}
          testId="tooltip"
          zIndex={zIndex || parseInt(theme.variables['zindex-tooltip'])}
          {...popoverProps}
        >
          <PopoverTrigger ref={ref} asChild onClick={handleTriggerClick}>
            {children}
          </PopoverTrigger>
          <PopoverContent>{tooltipContent}</PopoverContent>
        </Popover>
      </>
    );
  },
);

export default Tooltip;
