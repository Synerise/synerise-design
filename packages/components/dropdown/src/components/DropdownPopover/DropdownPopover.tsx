import React, { useRef } from 'react';

import { FloatingList } from '@floating-ui/react';
import { DropdownContextProvider } from '@synerise/ds-core';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  getPlacement,
} from '@synerise/ds-popover';

import {
  POPOVER_FLIP_CONFIG,
  POPOVER_OFFSET_CONFIG,
  POPOVER_SHIFT_CONFIG,
  POPOVER_TRANSITION_DURATION,
} from '../../Dropdown.const';
import { getTransitionConfig } from '../../utils';
import { DropdownOverlay } from '../DropdownOverlay/DropdownOverlay';
import { type DropdownPopoverProps } from './DropdownPopover.types';

export const DropdownPopover = ({
  placement = 'bottomLeft',
  children,
  popoverProps,
  popoverTriggerProps,
  getPopupContainer,
  trigger,
  open,
  onDismiss,
  overlay,
  handleOpenChange,
  size,
  handleItemClick,
  handleTriggerClick,
  hideOnItemClick,
  asChild,
  overlayStyle,
  overlayClassName,
  overlayHTMLAttributes,
  activeIndex,
  setActiveIndex,
}: DropdownPopoverProps) => {
  const floatingPlacement = getPlacement(placement);
  const triggerRef = useRef<HTMLElement>(null);

  const elementsRef = useRef<Array<HTMLElement | null>>([]);

  const listNavigationConfig = {
    enabled: true,
    activeIndex,
    onNavigate: (newIndex: number | null) => {
      setActiveIndex(newIndex);
    },
    listRef: elementsRef,
  };

  return (
    <Popover
      placement={floatingPlacement}
      trigger={trigger}
      modal={false}
      open={open}
      onOpenChange={handleOpenChange}
      onDismiss={onDismiss}
      transitionDuration={POPOVER_TRANSITION_DURATION}
      autoUpdate={true}
      offsetConfig={POPOVER_OFFSET_CONFIG}
      flipConfig={POPOVER_FLIP_CONFIG}
      shiftConfig={POPOVER_SHIFT_CONFIG}
      getTransitionConfig={getTransitionConfig}
      getPopupContainer={getPopupContainer}
      listNavigationConfig={listNavigationConfig}
      testId="dropdown"
      {...popoverProps}
    >
      <PopoverTrigger
        ref={triggerRef}
        asChild={asChild}
        onClick={handleTriggerClick}
        {...popoverTriggerProps}
      >
        {children}
      </PopoverTrigger>
      <PopoverContent>
        <DropdownContextProvider
          hideOnItemClick={hideOnItemClick}
          activeIndex={activeIndex}
          setIsOpen={handleOpenChange}
          isOpen={!!open}
        >
          <FloatingList elementsRef={elementsRef}>
            <DropdownOverlay
              size={size}
              triggerRef={triggerRef}
              htmlAttributes={overlayHTMLAttributes}
              overlayStyle={overlayStyle}
              overlayClassName={overlayClassName}
              hideOnItemClick={hideOnItemClick}
              content={overlay}
              handleItemClick={handleItemClick}
            />
          </FloatingList>
        </DropdownContextProvider>
      </PopoverContent>
    </Popover>
  );
};
