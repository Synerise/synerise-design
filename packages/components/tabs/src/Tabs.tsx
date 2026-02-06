import debounce from 'lodash.debounce';
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { theme } from '@synerise/ds-core';
import {
  DropdownMenu,
  type DropdownMenuListItemProps,
} from '@synerise/ds-dropdown';
import Icon, { OptionHorizontalM } from '@synerise/ds-icon';
import { NOOP, useResizeObserver } from '@synerise/ds-utils';

import Tab from './Tab/Tab';
import * as S from './Tabs.styles';
import { type TabWithRef, type TabsProps } from './Tabs.types';

const MARGIN_BETWEEN_TABS = 24;
const DROPDOWN_TRIGGER_SIZE = 32;
const DROPDOWN_OVERLAY_STYLE = {
  zIndex: parseInt(theme.variables['zindex-modal'], 10) - 1,
};

const Tabs = ({
  activeTab,
  tabs,
  handleTabClick,
  configuration,
  underscore,
  block,
}: TabsProps) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const helperContainerRef = useRef<HTMLDivElement>(null);
  const { width } = useResizeObserver(containerRef);
  const { width: helperWidth } = useResizeObserver(helperContainerRef);
  const [items, setItems] = useState<TabWithRef[]>([]);
  const [itemsWidths, setItemsWidths] = useState<number[]>([]);
  const [visibleTabs, setVisibleTabs] = useState<TabWithRef[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [hiddenTabs, setHiddenTabs] = useState<TabWithRef[]>([]);
  const debouncedEventHandler = useMemo(
    () => debounce((newWidth: number) => setContainerWidth(newWidth), 200),
    [],
  );

  useEffect(() => {
    debouncedEventHandler(width);
  }, [width, debouncedEventHandler]);

  useEffect(() => {
    containerRef.current &&
      setContainerWidth(containerRef.current?.offsetWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef.current]);

  useEffect(() => {
    const newTabs = tabs.map((tab) => {
      return {
        ...tab,
        ref: createRef<HTMLButtonElement>(),
      };
    });
    setItems(newTabs);
  }, [tabs]);

  const widthsAreNonZero = containerWidth > 0 && helperWidth > 0;

  useEffect(() => {
    if (widthsAreNonZero) {
      const itemsWithWidths: number[] = [];
      items.forEach((item, index) => {
        itemsWithWidths[index] =
          item.ref.current !== null
            ? item.ref.current.offsetWidth + MARGIN_BETWEEN_TABS
            : 0;
      });
      setItemsWidths(itemsWithWidths);
    }
  }, [items, widthsAreNonZero]);

  useEffect(() => {
    if (block) {
      setVisibleTabs(items);
      setHiddenTabs([]);
    }
  }, [items, block]);

  useEffect(() => {
    if (!block) {
      let tabsWidth = DROPDOWN_TRIGGER_SIZE + MARGIN_BETWEEN_TABS;
      const visibleItems: TabWithRef[] = [];
      const hiddenItems: TabWithRef[] = [];
      itemsWidths.forEach((itemWidth, index) => {
        if (containerRef && tabsWidth + itemWidth < containerWidth) {
          visibleItems.push(items[index]);
        } else {
          hiddenItems.push(items[index]);
        }
        tabsWidth += itemWidth;
      });
      setVisibleTabs(visibleItems);
      setHiddenTabs(hiddenItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block, itemsWidths, containerWidth]);

  const handleConfigurationAction = useCallback(() => {
    configuration && configuration.action();
    setIsDropdownVisible(false);
  }, [configuration]);

  const handleHiddenTabClick = useCallback(
    (index: number) => {
      setIsDropdownVisible(false);
      handleTabClick(index);
    },
    [handleTabClick],
  );

  const dropdownMenuItems = hiddenTabs.map((item, index) => ({
    key: `${item.label}-dropdown-${index}`,
    onClick: () => handleHiddenTabClick(visibleTabs.length + index),
    disabled: item.disabled,
    text: item.label,
  }));

  const hiddenTabsItems = useMemo(() => {
    const temp: DropdownMenuListItemProps[] =
      hiddenTabs.length > 0 ? [...dropdownMenuItems] : [];
    if (hiddenTabs.length > 0 && configuration) {
      temp.push({ type: 'divider' });
    }
    if (configuration) {
      temp.push({
        key: 'configuration-btn',
        onClick: handleConfigurationAction,
        disabled: !!configuration?.disabled,
        text: configuration.label,
      });
    }
    return temp;
  }, [
    hiddenTabs.length,
    dropdownMenuItems,
    configuration,
    handleConfigurationAction,
  ]);

  const renderDropdown = () => {
    return (
      <>
        {(hiddenTabs.length || configuration) && (
          <DropdownMenu
            trigger="click"
            dataSource={hiddenTabsItems}
            open={isDropdownVisible}
            onOpenChange={setIsDropdownVisible}
            disabled={!!configuration?.disabled && !hiddenTabs.length}
            overlayStyle={DROPDOWN_OVERLAY_STYLE}
            placement="bottomLeft"
            popoverProps={{
              testId: 'tabs-hidden',
              autoUpdate: {
                ancestorScroll: true,
                ancestorResize: true,
                elementResize: true,
                layoutShift: true,
                animationFrame: true,
              },
            }}
          >
            <S.ShowHiddenTabsTrigger
              data-testid="tabs-dropdown-trigger"
              type="ghost"
              mode="single-icon"
              disabled={!!configuration?.disabled && !hiddenTabs.length}
            >
              <Icon component={<OptionHorizontalM />} />
            </S.ShowHiddenTabsTrigger>
          </DropdownMenu>
        )}
      </>
    );
  };

  const renderVisibleTabs = useMemo(() => {
    return (
      <>
        {visibleTabs
          .filter((tab) => Boolean(tab))
          .map((tab, index) => {
            const key = `tabs-tab-${index}`;
            const { ref, ...tabProps } = tab;
            return (
              <Tab
                underscore={underscore}
                forwardedRef={ref}
                key={key}
                index={index}
                block={block}
                onClick={handleTabClick}
                isActive={index === activeTab}
                {...tabProps}
              />
            );
          })}
      </>
    );
  }, [visibleTabs, activeTab, handleTabClick, underscore, block]);

  const renderHelpers = useMemo(() => {
    return (
      <S.HiddenTabs
        ref={helperContainerRef}
        data-testid="ds-tabs-hidden-helper"
        className="ds-hidden-helper"
      >
        {items.map((tab, index) => {
          const key = `tabs-tab-helper-${index}`;
          const { ref, ...tabProps } = tab;
          return (
            <Tab
              className="hidden"
              underscore={underscore}
              forwardedRef={ref}
              key={key}
              index={index}
              onClick={NOOP}
              block={block}
              {...tabProps}
            />
          );
        })}
      </S.HiddenTabs>
    );
  }, [items, underscore, block]);

  return (
    <>
      {tabs.length > 0 || configuration ? (
        <S.TabsContainer
          className="ds-tabs"
          ref={containerRef}
          data-testid="tabs-container"
          block={block}
          data-popup-container
        >
          {renderVisibleTabs}
          {renderDropdown()}
        </S.TabsContainer>
      ) : null}
      {/* rendering hidden tabs to measure their width */}
      {!block && renderHelpers}
    </>
  );
};

Tabs.defaultProps = {
  underscore: true,
};

export default Tabs;
