import React, { useState, useCallback, useMemo, useRef } from 'react';
import Label from '@synerise/ds-input/dist/Label/Label';
import { Description } from '@synerise/ds-typography';
import Dropdown from '@synerise/ds-dropdown';
import { injectIntl } from 'react-intl';
import * as S from './ItemPicker.styles';
import ItemPickerDropdown from './ItemPickerDropdown/ItemPickerDropdown';
import Trigger from './ItemPickerTrigger/Trigger';
import { ItemPickerProps } from './ItemPicker.types';

const ItemPicker = ({
  dataSource,
  intl,
  onChange,
  onClear,
  placeholder,
  changeButtonLabel = intl.formatMessage({ id: 'DS.ITEM-PICKER.CHANGE' }),
  clear = intl.formatMessage({ id: 'DS.ITEM-PICKER.CLEAR' }),
  clearConfirmTitle = intl.formatMessage({ id: 'DS.ITEM-PICKER.CLEAR-CONFIRM' }),
  closeOnBottomAction,
  description,
  disabled,
  dropdownBottomAction,
  dropdownProps = {},
  dropdownRowHeight,
  dropdownVisibleRows,
  error,
  errorMessage,
  label,
  onBlur,
  onFocus,
  noResults = intl.formatMessage({ id: 'DS.ITEM-PICKER.NO-RESULTS', defaultMessage: 'No results' }),
  noText = intl.formatMessage({ id: 'DS.ITEM-PICKER.NO-TEXT', defaultMessage: 'No' }),
  placeholderIcon,
  searchPlaceholder = intl.formatMessage({ id: 'DS.ITEM-PICKER.SEARCH', defaultMessage: 'Search' }),
  searchBarProps,
  hideSearchBar,
  selectedItem,
  tooltip,
  size = 'small',
  yesText = intl.formatMessage({ id: 'DS.ITEM-PICKER.YES-TEXT', defaultMessage: 'Yes' }),
  withClearConfirmation,
  scrollbarProps,
  informationCardTooltipProps,
}: ItemPickerProps) => {
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const clearSearchBarValue = useRef<number>();

  const onVisibilityChange = (state: boolean) => {
    setDropdownOpened(state);

    if (state && typeof onFocus === 'function') {
      onFocus();
    }
    if (!state) {
      clearSearchBarValue.current = clearSearchBarValue.current ? (clearSearchBarValue.current += 1) : 1;
      if (typeof onBlur === 'function') {
        onBlur();
      }
    }
  };

  const openDropdown = useCallback(() => {
    setDropdownOpened(true);
    typeof onFocus === 'function' && onFocus();
  }, [setDropdownOpened, onFocus]);

  const closeDropdown = useCallback(() => {
    setDropdownOpened(false);
    typeof onBlur === 'function' && onBlur();
  }, [setDropdownOpened, onBlur]);

  const dropdownOverlay = useMemo(
    () => (
      <ItemPickerDropdown
        hideSearchBar={hideSearchBar}
        searchBarProps={searchBarProps}
        clearSearchQuery={clearSearchBarValue.current}
        onChange={onChange}
        dataSource={dataSource}
        placeholder={searchPlaceholder}
        closeDropdown={closeDropdown}
        noResults={noResults}
        dropdownVisibleRows={dropdownVisibleRows}
        dropdownRowHeight={dropdownRowHeight}
        dropdownBottomAction={dropdownBottomAction}
        closeOnBottomAction={closeOnBottomAction}
        isDropdownOpened={dropdownOpened}
        scrollbarProps={scrollbarProps}
      />
    ),
    [
      searchBarProps,
      onChange,
      dataSource,
      searchPlaceholder,
      closeDropdown,
      noResults,
      dropdownVisibleRows,
      dropdownRowHeight,
      dropdownBottomAction,
      closeOnBottomAction,
      dropdownOpened,
      scrollbarProps,
      hideSearchBar,
    ]
  );

  const renderTrigger = useMemo(
    () => (
      <Trigger
        clear={clear}
        selected={selectedItem}
        onClear={onClear}
        opened={dropdownOpened}
        placeholder={placeholder}
        placeholderIcon={placeholderIcon}
        error={error}
        disabled={disabled}
        openDropdown={openDropdown}
        closeDropdown={closeDropdown}
        size={size}
        changeButtonLabel={changeButtonLabel}
        withChangeButton={!withClearConfirmation}
        clearConfirmTitle={clearConfirmTitle}
        yesText={yesText}
        noText={noText}
        withClearConfirmation={Boolean(withClearConfirmation)}
        informationCardTooltipProps={informationCardTooltipProps}
      />
    ),
    [
      clear,
      selectedItem,
      onClear,
      dropdownOpened,
      placeholder,
      placeholderIcon,
      error,
      disabled,
      openDropdown,
      closeDropdown,
      size,
      changeButtonLabel,
      withClearConfirmation,
      clearConfirmTitle,
      yesText,
      noText,
      informationCardTooltipProps,
    ]
  );

  return (
    <S.ItemPickerWrapper className="ds-items-picker" disabled={disabled}>
      {label && <Label label={label} tooltip={tooltip} />}
      <Dropdown
        visible={dropdownOpened}
        disabled={disabled}
        trigger={['click']}
        overlay={dropdownOverlay}
        onVisibleChange={onVisibilityChange}
        {...dropdownProps}
      >
        {renderTrigger}
      </Dropdown>
      {error && errorMessage && <S.Error>{errorMessage}</S.Error>}
      {description && <Description>{description}</Description>}
    </S.ItemPickerWrapper>
  );
};
export default injectIntl(ItemPicker);
