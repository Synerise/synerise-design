import React, {
  type MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useTheme } from '@synerise/ds-core';
import Icon, { SearchM } from '@synerise/ds-icon';
import { type ListItemProps } from '@synerise/ds-list-item';
import SearchBar from '@synerise/ds-search-bar';

import {
  DEFAULT_MATCHING_FUNCTION,
  MAX_VISIBLE_ITEMS,
} from '../../Dropdown.const';
import { useDefaultTexts } from '../../hooks/useDefaultTexts';
import { DropdownFooter } from '../DropdownFooter/DropdownFooter';
import { DropdownMenuList } from '../DropdownMenuList/DropdownMenuList';
import { DropdownPopover } from '../DropdownPopover/DropdownPopover';
import { type DropdownMenuProps } from './DropdownMenu.types';

export const DropdownMenu = <ItemType extends ListItemProps>({
  dataSource,
  withSearch,
  texts,
  children,
  trigger = 'click',
  placement = 'bottomLeft',
  maxVisibleItems = MAX_VISIBLE_ITEMS,
  size = 'auto',
  open,
  onOpenChange,
  onDismiss,
  onSearchQueryChange,
  getPopupContainer,
  virtualised,
  disabled,
  asChild,
  hideOnItemClick = true,
  itemMatchesSearchQuery = DEFAULT_MATCHING_FUNCTION,
  footer,
  overlayStyle,
  overlayClassName,
  overlayHTMLAttributes,
  popoverProps,
  popoverTriggerProps,
}: DropdownMenuProps<ItemType>) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(open);
  const allTexts = useDefaultTexts(texts);
  const theme = useTheme();

  const toggleOpen = useCallback(
    (openState: boolean) => {
      onOpenChange?.(openState);
      setIsOpen(openState);
    },
    [onOpenChange],
  );

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open, toggleOpen]);

  const handleSearchChange = useCallback(
    (query: string) => {
      onSearchQueryChange?.(query);
      setSearchQuery(query);
    },
    [onSearchQueryChange],
  );

  const filteredItems = useMemo(() => {
    return searchQuery
      ? dataSource
          .filter((item) => itemMatchesSearchQuery(item, searchQuery))
          .map((item) => {
            const props: ItemType = {
              ...item,
              highlight: searchQuery,
            };
            return props;
          })
      : dataSource;
  }, [dataSource, itemMatchesSearchQuery, searchQuery]);

  const handleSearchFocus = useCallback(
    (ref: MutableRefObject<HTMLInputElement | null>) => {
      setTimeout(() => {
        activeIndex ?? ref?.current?.focus();
      }, 10);
    },
    [activeIndex],
  );

  const overlay = useMemo(() => {
    return (
      <>
        {withSearch && (
          <SearchBar
            placeholder={allTexts.searchPlaceholder}
            value={searchQuery}
            handleInputRef={handleSearchFocus}
            onSearchChange={handleSearchChange}
            iconLeft={
              <Icon component={<SearchM />} color={theme.palette['grey-600']} />
            }
            onClearInput={() => setSearchQuery('')}
            clearTooltip={allTexts.searchClearTooltip}
          />
        )}
        <DropdownMenuList
          maxVisibleItems={maxVisibleItems}
          hideOnItemClick={hideOnItemClick}
          dataSource={filteredItems}
          closeOverlay={() => toggleOpen(false)}
          texts={allTexts}
          virtualised={virtualised}
        />
        {footer && <DropdownFooter footer={footer} />}
      </>
    );
  }, [
    withSearch,
    allTexts,
    searchQuery,
    handleSearchFocus,
    handleSearchChange,
    theme.palette,
    maxVisibleItems,
    hideOnItemClick,
    filteredItems,
    virtualised,
    footer,
    toggleOpen,
  ]);

  return disabled || dataSource.length === 0 ? (
    <>{children}</>
  ) : (
    <DropdownPopover
      getPopupContainer={getPopupContainer}
      overlayHTMLAttributes={overlayHTMLAttributes}
      overlayStyle={overlayStyle}
      overlayClassName={overlayClassName}
      trigger={trigger}
      open={isOpen}
      size={size}
      placement={placement}
      asChild={asChild}
      onDismiss={onDismiss}
      overlay={overlay}
      handleOpenChange={toggleOpen}
      handleTriggerClick={() => {
        toggleOpen(!isOpen);
      }}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      popoverProps={{ ...popoverProps, componentId: 'dropdown-menu' }}
      popoverTriggerProps={popoverTriggerProps}
    >
      {children}
    </DropdownPopover>
  );
};
