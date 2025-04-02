import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Button from '@synerise/ds-button';
import Icon, { Add3M, AngleDownS } from '@synerise/ds-icon';
import Menu, { MenuItemProps } from '@synerise/ds-menu';
import Dropdown from '@synerise/ds-dropdown';
import InformationCard from '@synerise/ds-information-card';
import { getPopupContainer } from '@synerise/ds-utils';

import ContextSelectorDropdown from './ContextSelectorDropdown/ContextSelectorDropdown';
import { ContextGroup, ContextItem, ContextProps } from './ContextSelector.types';
import { ItemWrapper, ErrorWrapper } from './ContextSelector.styles';
import { DROPDOWN_HEIGHT, DROPDOWN_HEIGHT_BELOW_THRESHOLD, DROPDOWN_HEIGHT_THRESHOLD } from './constants';
import { useTexts } from './hooks/useTexts';

const ContextSelector = ({
  defaultDropdownVisibility,
  selectedItem,
  onSelectItem,
  onSetGroup,
  groups,
  items,
  recentItems,
  texts,
  opened,
  addMode,
  loading,
  customTriggerComponent,
  trigger = ['click'],
  menuItemHeight,
  dropdownWrapperStyles,
  onClickOutsideEvents,
  onClickOutside,
  onSearch,
  hideSearchField = false,
  hasMoreItems,
  onFetchData,
  onActivate,
  onDeactivate,
  onOpen,
  getPopupContainerOverride,
  type,
  dropdownProps,
  disabled,
  errorText,
  isError,
  readOnly = false,
  getMenuEntryProps,
  dropdownDimensionsConfig,
}: ContextProps) => {
  const allTexts = useTexts(texts);
  const [dropdownVisible, setDropdownVisible] = useState(defaultDropdownVisibility ?? false);
  const dimensionsConfig = {
    defaultHeight: DROPDOWN_HEIGHT,
    lowerHeight: DROPDOWN_HEIGHT_BELOW_THRESHOLD,
    threshold: DROPDOWN_HEIGHT_THRESHOLD,
    ...dropdownDimensionsConfig,
  };
  const [outerHeight, setOuterHeight] = useState(dimensionsConfig.defaultHeight);

  useEffect(() => {
    const checkViewportHeight = () =>
      setOuterHeight(
        window.innerHeight < dimensionsConfig.threshold ? dimensionsConfig.lowerHeight : dimensionsConfig.defaultHeight
      );
    checkViewportHeight();
    window.addEventListener('resize', checkViewportHeight);
    return () => {
      window.removeEventListener('resize', checkViewportHeight);
    };
  }, [dimensionsConfig.defaultHeight, dimensionsConfig.lowerHeight, dimensionsConfig.threshold]);

  useEffect(() => {
    setDropdownVisible(defaultDropdownVisibility ?? false);
  }, [defaultDropdownVisibility]);
  const handleChange = useCallback(
    (val: ContextItem | ContextGroup) => {
      setDropdownVisible(false);
      onSelectItem(val);
    },
    [onSelectItem]
  );
  const handleOnSetGroup = useCallback(
    (val: ContextItem | ContextGroup) => {
      onSetGroup && onSetGroup(val);
    },
    [onSetGroup]
  );

  useEffect(() => {
    if (opened) {
      setDropdownVisible(true);
    }
  }, [opened]);

  const triggerMode = useMemo(() => {
    if (selectedItem) {
      return readOnly ? 'icon-label' : 'two-icons';
    }

    return readOnly ? 'simple' : 'label-icon';
  }, [selectedItem, readOnly]);

  const triggerColor = useMemo(() => {
    if (!selectedItem) return 'blue';
    return type === 'event' ? 'cyan' : 'green';
  }, [selectedItem, type]);

  const handleClick = useCallback(() => {
    onOpen && onOpen();
    setDropdownVisible(true);
  }, [onOpen]);

  const triggerButton = useMemo(() => {
    const { buttonLabel } = allTexts;
    const hasError = Boolean(errorText) || isError;

    return addMode && !selectedItem ? (
      <>
        <Button
          error={hasError}
          disabled={disabled}
          type="primary"
          mode="icon-label"
          onClick={!readOnly ? handleClick : undefined}
          readOnly={readOnly}
        >
          <Icon component={<Add3M />} />
          {buttonLabel}
        </Button>
      </>
    ) : (
      <Menu
        asDropdownMenu
        showTextTooltip
        asInfoCardContainer
        dataSource={[
          {
            text: (
              <Button
                error={hasError}
                disabled={disabled}
                type="custom-color"
                color={triggerColor}
                mode={triggerMode}
                onClick={!readOnly ? handleClick : undefined}
                readOnly={readOnly}
              >
                {selectedItem ? <Icon component={selectedItem.icon} /> : null}
                <ItemWrapper>{selectedItem ? selectedItem.name : buttonLabel}</ItemWrapper>
                {!readOnly && <Icon component={<AngleDownS />} />}
              </Button>
            ),
            hoverTooltipProps: {
              popupPlacement: 'top',
              getPopupContainer: getPopupContainerOverride || getPopupContainer,
            } as MenuItemProps['hoverTooltipProps'],
            renderHoverTooltip: selectedItem
              ? selectedItem.renderHoverTooltip ||
                ((): JSX.Element => (
                  <InformationCard
                    icon={selectedItem.icon}
                    subtitle={selectedItem.subtitle}
                    title={selectedItem.name}
                    renderAdditionalDescription={selectedItem.renderAdditionalDescription}
                    descriptionConfig={
                      selectedItem.description
                        ? { value: selectedItem.description as string, disabled: true, label: undefined }
                        : undefined
                    }
                    {...selectedItem.informationCardProps}
                  />
                ))
              : undefined,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...getMenuEntryProps?.(selectedItem as any),
          },
        ]}
      />
    );
  }, [
    allTexts,
    errorText,
    isError,
    addMode,
    selectedItem,
    disabled,
    readOnly,
    handleClick,
    triggerColor,
    triggerMode,
    getPopupContainerOverride,
    getMenuEntryProps,
  ]);

  const onDropdownVisibilityChange = useCallback(
    (value: boolean) => {
      if (value) {
        onActivate && onActivate('');
        setDropdownVisible(true);
      } else {
        onDeactivate && onDeactivate();
        setDropdownVisible(false);
      }
    },
    [onActivate, onDeactivate]
  );

  if (readOnly) return <>{customTriggerComponent ?? triggerButton}</>;

  return (
    <>
      <div data-popup-container>
        <Dropdown
          {...dropdownProps}
          getPopupContainer={getPopupContainerOverride || getPopupContainer}
          onVisibleChange={onDropdownVisibilityChange}
          trigger={trigger}
          visible={dropdownVisible}
          overlay={
            <ContextSelectorDropdown
              value={selectedItem}
              setDropdownVisible={setDropdownVisible}
              setSelected={handleChange}
              onSetGroup={handleOnSetGroup}
              groups={groups}
              items={items}
              recentItems={recentItems}
              texts={allTexts}
              visible={dropdownVisible}
              loading={loading}
              menuItemHeight={menuItemHeight}
              dropdownWrapperStyles={dropdownWrapperStyles}
              onClickOutsideEvents={onClickOutsideEvents}
              onClickOutside={onClickOutside}
              onSearch={onSearch}
              hideSearchField={hideSearchField}
              hasMoreItems={hasMoreItems}
              onFetchData={onFetchData}
              outerHeight={outerHeight}
            />
          }
        >
          {customTriggerComponent ?? triggerButton}
        </Dropdown>
      </div>
      {errorText && <ErrorWrapper>{errorText}</ErrorWrapper>}
    </>
  );
};
export default ContextSelector;
