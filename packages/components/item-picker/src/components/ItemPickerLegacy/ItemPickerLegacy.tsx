import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import Dropdown from '@synerise/ds-dropdown';
import FormField from '@synerise/ds-form-field';

import * as S from '../../ItemPicker.styles';
import ItemPickerDropdown from '../ItemPickerDropdown/ItemPickerDropdown';
import Trigger from '../ItemPickerTrigger/Trigger';
import { type ItemPickerProps } from './ItemPickerLegacy.types';

/**
 * @deprecated - use new ItemPicker
 */

const ItemPickerLegacy = ({
  dataSource,

  onChange,
  onClear,
  placeholder,
  changeButtonLabel,
  clear,
  clearConfirmTitle,
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
  noResults,
  noText,
  placeholderIcon,
  searchPlaceholder,
  searchBarProps,
  selectedItem,
  tooltip,
  tooltipConfig,
  size = 'small',
  yesText,
  withClearConfirmation,
  scrollbarProps,
  informationCardTooltipProps,
  hideSearchBar,
}: ItemPickerProps) => {
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const clearSearchBarValue = useRef<number>();
  const intl = useIntl();

  const texts = useMemo(
    () => ({
      changeButtonLabel:
        changeButtonLabel ||
        intl.formatMessage({ id: 'DS.ITEM-PICKER.CHANGE-BUTTON' }),
      clear: clear || intl.formatMessage({ id: 'DS.ITEM-PICKER.CLEAR' }),
      clearConfirmTitle:
        clearConfirmTitle ||
        intl.formatMessage({ id: 'DS.ITEM-PICKER.CLEAR-CONFIRM' }),
      noResults:
        noResults ||
        intl.formatMessage({
          id: 'DS.ITEM-PICKER.NO-RESULTS',
          defaultMessage: 'No results',
        }),
      noText:
        noText ||
        intl.formatMessage({
          id: 'DS.ITEM-PICKER.NO-TEXT',
          defaultMessage: 'No',
        }),
      yesText:
        yesText ||
        intl.formatMessage({
          id: 'DS.ITEM-PICKER.YES-TEXT',
          defaultMessage: 'Yes',
        }),
      searchPlaceholder:
        searchPlaceholder ||
        intl.formatMessage({
          id: 'DS.ITEM-PICKER.SEARCH',
          defaultMessage: 'Search',
        }),
    }),
    [
      changeButtonLabel,
      clear,
      clearConfirmTitle,
      intl,
      noResults,
      noText,
      searchPlaceholder,
      yesText,
    ],
  );

  const onVisibilityChange = (state: boolean) => {
    setDropdownOpened(state);

    if (state && typeof onFocus === 'function') {
      onFocus();
    }
    if (!state) {
      clearSearchBarValue.current = clearSearchBarValue.current
        ? (clearSearchBarValue.current += 1)
        : 1;
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
        searchBarProps={searchBarProps}
        clearSearchQuery={clearSearchBarValue.current}
        onChange={onChange}
        dataSource={dataSource}
        placeholder={texts.searchPlaceholder}
        closeDropdown={closeDropdown}
        noResults={texts.noResults}
        dropdownVisibleRows={dropdownVisibleRows}
        dropdownRowHeight={dropdownRowHeight}
        dropdownBottomAction={dropdownBottomAction}
        closeOnBottomAction={closeOnBottomAction}
        isDropdownOpened={dropdownOpened}
        scrollbarProps={scrollbarProps}
        hideSearchBar={hideSearchBar}
      />
    ),
    [
      searchBarProps,
      onChange,
      dataSource,
      texts,
      closeDropdown,
      dropdownVisibleRows,
      dropdownRowHeight,
      dropdownBottomAction,
      closeOnBottomAction,
      dropdownOpened,
      hideSearchBar,
      scrollbarProps,
    ],
  );

  const renderTrigger = useMemo(
    () => (
      <Trigger
        clear={texts.clear}
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
        changeButtonLabel={texts.changeButtonLabel}
        withChangeButton={!withClearConfirmation}
        clearConfirmTitle={texts.clearConfirmTitle}
        yesText={texts.yesText}
        noText={texts.noText}
        withClearConfirmation={Boolean(withClearConfirmation)}
        informationCardTooltipProps={informationCardTooltipProps}
      />
    ),
    [
      closeDropdown,
      disabled,
      dropdownOpened,
      error,
      informationCardTooltipProps,
      onClear,
      openDropdown,
      placeholder,
      placeholderIcon,
      selectedItem,
      size,
      texts.changeButtonLabel,
      texts.clear,
      texts.clearConfirmTitle,
      texts.noText,
      texts.yesText,
      withClearConfirmation,
    ],
  );

  return (
    <S.ItemPickerWrapper className="ds-items-picker" disabled={disabled}>
      <FormField
        label={label}
        tooltip={tooltip}
        tooltipConfig={tooltipConfig}
        errorText={errorMessage}
        description={description}
      >
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
      </FormField>
    </S.ItemPickerWrapper>
  );
};
export default ItemPickerLegacy;
