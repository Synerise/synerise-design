import React, { type ComponentType, useMemo, useState } from 'react';

import SearchBar from '@synerise/ds-search-bar';
import { getPopupContainer as getPopupContainerDefault } from '@synerise/ds-utils';

import { Wrapper } from './Dropdown.styles';
import { type DropdownProps } from './Dropdown.types';
import { BackAction } from './components/BackAction/BackAction';
import { BottomAction } from './components/BottomAction/BottomAction';
import { DropdownFooter } from './components/DropdownFooter/DropdownFooter';
import { MenuWrapper } from './components/DropdownMenuList/DropdownMenuList.styles';
import { DropdownPopover } from './components/DropdownPopover/DropdownPopover';
import { TextTrigger } from './components/TextTrigger/TextTrigger';
import { useDropdownVisibility } from './hooks/useDropdownVisibility';

type SubComponents = {
  Wrapper: typeof Wrapper;
  MenuWrapper: typeof MenuWrapper;
  SearchInput: typeof SearchBar;
  BottomAction: typeof BottomAction;
  BackAction: typeof BackAction;
  TextTrigger: typeof TextTrigger;
};

export const Dropdown: ComponentType<DropdownProps> & SubComponents = ({
  hideOnItemClick,
  placement,
  dropdownRender,
  open,
  onOpenChange,
  onDismiss,
  overlay,
  trigger = 'click',
  size,
  asChild,
  children,
  overlayStyle,
  overlayClassName,
  disabled,
  destroyPopupOnHide, // unused
  align, // unused
  getPopupContainer = getPopupContainerDefault,
  popoverProps,
  popoverTriggerProps,
  footer,
  ...htmlAttributes
}: DropdownProps) => {
  const { open: isOpen, toggleOpen } = useDropdownVisibility({
    open,
    onOpenChange,
  });

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const renderedOverlay = useMemo(() => {
    return overlay ? overlay : dropdownRender && dropdownRender();
  }, [dropdownRender, overlay]);

  const isTriggeredByClick = Array.isArray(trigger)
    ? trigger.includes('click')
    : trigger === 'click';

  return disabled ? (
    <>{children}</>
  ) : (
    <DropdownPopover
      getPopupContainer={getPopupContainer}
      overlayHTMLAttributes={htmlAttributes}
      open={isOpen}
      placement={placement}
      asChild={asChild}
      overlay={
        <>
          {renderedOverlay}
          {footer && <DropdownFooter footer={footer} />}
        </>
      }
      handleOpenChange={toggleOpen}
      handleTriggerClick={() => {
        isTriggeredByClick && toggleOpen(!isOpen);
      }}
      hideOnItemClick={hideOnItemClick}
      handleItemClick={() => {
        if (hideOnItemClick) {
          toggleOpen(false);
        }
      }}
      onDismiss={onDismiss}
      popoverProps={{ ...popoverProps, componentId: 'dropdown' }}
      popoverTriggerProps={popoverTriggerProps}
      trigger={trigger}
      size={size}
      overlayStyle={overlayStyle}
      overlayClassName={overlayClassName}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
    >
      {children}
    </DropdownPopover>
  );
};

Dropdown.Wrapper = Wrapper;
Dropdown.MenuWrapper = MenuWrapper;
Dropdown.SearchInput = SearchBar;
Dropdown.BottomAction = BottomAction;
Dropdown.BackAction = BackAction;
Dropdown.TextTrigger = TextTrigger;

export default Dropdown;
