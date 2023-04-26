import * as React from 'react';
import Button from '@synerise/ds-button';
import Icon, { Add3M, AngleDownS } from '@synerise/ds-icon';

import Menu from '@synerise/ds-menu';
import Dropdown from '@synerise/ds-dropdown';
import InformationCard from '@synerise/ds-information-card';
import { getPopupContainer } from '@synerise/ds-utils';
import type { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';

import ContextSelectorDropdown from './ContextSelectorDropdown/ContextSelectorDropdown';
import { ContextProps } from './ContextSelector.types';
import { ItemWrapper } from './ContextSelector.styles';

const ContextSelector: React.FC<ContextProps> = ({
  defaultDropdownVisibility,
  selectedItem,
  onSelectItem,
  onSetGroup,
  groups,
  items,
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
  hasMoreItems,
  onFetchData,
  onActivate,
  onDeactivate,
  onOpen,
  getPopupContainerOverride,
  type,
  dropdownProps,
  disabled,
  readOnly = false,
}) => {
  const [dropdownVisible, setDropdownVisible] = React.useState(defaultDropdownVisibility ?? false);
  React.useEffect(() => {
    setDropdownVisible(defaultDropdownVisibility ?? false);
  }, [defaultDropdownVisibility]);
  const handleChange = React.useCallback(
    val => {
      setDropdownVisible(false);
      onSelectItem(val);
    },
    [onSelectItem]
  );
  const handleOnSetGroup = React.useCallback(
    val => {
      onSetGroup && onSetGroup(val);
    },
    [onSetGroup]
  );

  React.useEffect(() => {
    if (opened) {
      setDropdownVisible(true);
    }
  }, [opened]);

  const triggerMode = React.useMemo(() => {
    if (selectedItem) {
      return readOnly ? 'icon-label' : 'two-icons';
    }

    return readOnly ? 'simple' : 'label-icon';
  }, [selectedItem, readOnly]);

  const triggerColor = React.useMemo(() => {
    if (!selectedItem) return 'blue';
    return type === 'event' ? 'cyan' : 'green';
  }, [selectedItem, type]);

  const handleClick = React.useCallback(() => {
    onOpen && onOpen();
    setDropdownVisible(true);
  }, [onOpen]);

  const triggerButton = React.useMemo(() => {
    const { buttonLabel } = texts;

    return addMode && !selectedItem ? (
      <>
        <Button
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
              ? (): JSX.Element => (
                  <InformationCard
                    icon={selectedItem.icon}
                    subtitle={selectedItem.subtitle}
                    title={selectedItem.name}
                    descriptionConfig={
                      selectedItem.description
                        ? { value: selectedItem.description as string, disabled: true, label: undefined }
                        : undefined
                    }
                  />
                )
              : undefined,
          },
        ]}
      />
    );
  }, [
    texts,
    addMode,
    selectedItem,
    disabled,
    readOnly,
    handleClick,
    triggerColor,
    triggerMode,
    getPopupContainerOverride,
  ]);

  const onDropdownVisibilityChange = React.useCallback(
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
            texts={texts}
            visible={dropdownVisible}
            loading={loading}
            menuItemHeight={menuItemHeight}
            dropdownWrapperStyles={dropdownWrapperStyles}
            onClickOutsideEvents={onClickOutsideEvents}
            onClickOutside={onClickOutside}
            onSearch={onSearch}
            hasMoreItems={hasMoreItems}
            onFetchData={onFetchData}
          />
        }
      >
        {customTriggerComponent ?? triggerButton}
      </Dropdown>
    </div>
  );
};
export default ContextSelector;
