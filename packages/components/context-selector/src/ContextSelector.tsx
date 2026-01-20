import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Button from '@synerise/ds-button';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { Add3M, AngleDownS } from '@synerise/ds-icon';
import InformationCard, {
  InformationCardTooltip,
} from '@synerise/ds-information-card';
import { getClosest, getPopupContainer } from '@synerise/ds-utils';

import { ErrorWrapper, ItemWrapper } from './ContextSelector.styles';
import {
  type ContextGroup,
  type ContextItem,
  type ContextProps,
} from './ContextSelector.types';
import ContextSelectorDropdown from './ContextSelectorDropdown/ContextSelectorDropdown';
import {
  DROPDOWN_HEIGHT,
  DROPDOWN_HEIGHT_BELOW_THRESHOLD,
  DROPDOWN_HEIGHT_THRESHOLD,
} from './constants';
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
  popoverDelay,
  dropdownDimensionsConfig,
}: ContextProps) => {
  const allTexts = useTexts(texts);
  const [dropdownVisible, setDropdownVisible] = useState(
    defaultDropdownVisibility ?? false,
  );
  const dimensionsConfig = {
    defaultHeight: DROPDOWN_HEIGHT,
    lowerHeight: DROPDOWN_HEIGHT_BELOW_THRESHOLD,
    threshold: DROPDOWN_HEIGHT_THRESHOLD,
    ...dropdownDimensionsConfig,
  };
  const [outerHeight, setOuterHeight] = useState(
    dimensionsConfig.defaultHeight,
  );

  useEffect(() => {
    const checkViewportHeight = () =>
      setOuterHeight(
        window.innerHeight < dimensionsConfig.threshold
          ? dimensionsConfig.lowerHeight
          : dimensionsConfig.defaultHeight,
      );
    checkViewportHeight();
    window.addEventListener('resize', checkViewportHeight);
    return () => {
      window.removeEventListener('resize', checkViewportHeight);
    };
  }, [
    dimensionsConfig.defaultHeight,
    dimensionsConfig.lowerHeight,
    dimensionsConfig.threshold,
  ]);

  useEffect(() => {
    setDropdownVisible(defaultDropdownVisibility ?? false);
  }, [defaultDropdownVisibility]);
  const handleChange = useCallback(
    (val: ContextItem | ContextGroup) => {
      setDropdownVisible(false);
      onSelectItem(val);
    },
    [onSelectItem],
  );
  const handleOnSetGroup = useCallback(
    (val: ContextItem | ContextGroup) => {
      onSetGroup && onSetGroup(val);
    },
    [onSetGroup],
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
    if (!selectedItem) {
      return 'blue';
    }
    return type === 'event' ? 'cyan' : 'green';
  }, [selectedItem, type]);

  const handleClick = useCallback(() => {
    onOpen && onOpen();
    setDropdownVisible(true);
  }, [onOpen]);

  const selectedItemInfoCard = useMemo(() => {
    return (
      selectedItem &&
      (selectedItem.renderHoverTooltip?.() || (
        <InformationCard
          icon={selectedItem.icon}
          subtitle={selectedItem.subtitle}
          title={selectedItem.name}
          renderAdditionalDescription={selectedItem.renderAdditionalDescription}
          descriptionConfig={
            selectedItem.description
              ? {
                  value: selectedItem.description as string,
                  disabled: true,
                  label: undefined,
                }
              : undefined
          }
          {...selectedItem.informationCardProps}
        />
      ))
    );
  }, [selectedItem]);

  const triggerButton = useMemo(() => {
    const { buttonLabel } = allTexts;
    const hasError = Boolean(errorText) || isError;

    const addModeButton = (
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
    );

    const standardButton = selectedItem ? (
      <InformationCardTooltip
        content={selectedItemInfoCard}
        popoverProps={{
          placement: 'top',
          getPopupContainer: getPopupContainerOverride || getPopupContainer,
        }}
      >
        <Button
          error={hasError}
          disabled={disabled}
          type="custom-color"
          color={triggerColor}
          mode={triggerMode}
          onClick={!readOnly ? handleClick : undefined}
          readOnly={readOnly}
        >
          <Icon component={selectedItem.icon} />
          <ItemWrapper>{selectedItem.name}</ItemWrapper>
          {!readOnly && <Icon component={<AngleDownS />} />}
        </Button>
      </InformationCardTooltip>
    ) : (
      <Button
        error={hasError}
        disabled={disabled}
        type="custom-color"
        color={triggerColor}
        mode={triggerMode}
        onClick={!readOnly ? handleClick : undefined}
        readOnly={readOnly}
      >
        <ItemWrapper>{buttonLabel}</ItemWrapper>
        {!readOnly && <Icon component={<AngleDownS />} />}
      </Button>
    );

    return addMode && !selectedItem ? addModeButton : standardButton;
  }, [
    allTexts,
    errorText,
    isError,
    disabled,
    readOnly,
    handleClick,
    selectedItem,
    selectedItemInfoCard,
    getPopupContainerOverride,
    triggerColor,
    triggerMode,
    addMode,
  ]);

  const onDropdownVisibilityChange = useCallback(
    (value: boolean) => {
      if (value) {
        onActivate && onActivate('');
        setDropdownVisible(true);
      } else {
        setDropdownVisible(false);
      }
    },
    [onActivate],
  );

  if (readOnly) {
    return <>{customTriggerComponent ?? triggerButton}</>;
  }
  return (
    <>
      <div data-popup-container>
        <Dropdown
          getPopupContainer={getPopupContainerOverride || getPopupContainer}
          onOpenChange={onDropdownVisibilityChange}
          onDismiss={() => {
            onClickOutside && onClickOutside();
            // TODO resetList();
            onDeactivate?.();
          }}
          trigger={trigger}
          open={dropdownVisible}
          size="medium"
          {...dropdownProps}
          popoverProps={{
            testId: 'context-selector',
            ...dropdownProps?.popoverProps,
            dismissConfig: {
              outsidePress: (event) =>
                getClosest(event.target as HTMLElement, '.ds-info-card') ===
                null,
            },
          }}
          overlay={
            <ContextSelectorDropdown
              value={selectedItem}
              onDeactivate={onDeactivate}
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
              popoverDelay={popoverDelay}
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
