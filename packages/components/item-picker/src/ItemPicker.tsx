import * as React from 'react';
import Label from '@synerise/ds-input/dist/Label/Label';
import { Description } from '@synerise/ds-typography';
import Dropdown from '@synerise/ds-dropdown';
import { injectIntl } from 'react-intl';
import * as S from './ItemPicker.styles';
import ItemPickerDropdown from './ItemPickerDropdown/ItemPickerDropdown';
import Trigger from './ItemPickerTrigger/Trigger';
import { ItemPickerProps } from './ItemPicker.types';

const ItemPicker: React.FC<ItemPickerProps> = ({
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
  selectedItem,
  tooltip,
  size = 'small',
  yesText = intl.formatMessage({ id: 'DS.ITEM-PICKER.YES-TEXT', defaultMessage: 'Yes' }),
  withClearConfirmation,
}) => {
  const [dropdownOpened, setDropdownOpened] = React.useState<boolean>(false);

  const onVisibilityChange = (state: boolean): void => {
    setDropdownOpened(state);

    if (state && typeof onFocus === 'function') {
      onFocus();
    }

    if (!state && typeof onBlur === 'function') {
      onBlur();
    }
  };

  const openDropdown = React.useCallback(() => {
    setDropdownOpened(true);
    typeof onFocus === 'function' && onFocus();
  }, [setDropdownOpened, onFocus]);

  const closeDropdown = React.useCallback(() => {
    setDropdownOpened(false);
    typeof onBlur === 'function' && onBlur();
  }, [setDropdownOpened, onBlur]);

  const dropdownOverlay = React.useMemo(
    () => (
      <ItemPickerDropdown
        searchBarProps={searchBarProps}
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
    ]
  );

  const renderTrigger = React.useMemo(
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
      />
    ),
    [
      clear,
      selectedItem,
      onClear,
      dropdownOpened,
      error,
      disabled,
      placeholderIcon,
      placeholder,
      openDropdown,
      closeDropdown,
      size,
      changeButtonLabel,
      clearConfirmTitle,
      yesText,
      noText,
      withClearConfirmation,
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
