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
  intl,
  label,
  tooltip,
  onChange,
  onClear,
  dataSource,
  placeholderIcon,
  disabled,
  placeholder,
  error,
  errorMessage,
  description,
  searchPlaceholder = intl.formatMessage({ id: 'DS.ITEM-PICKER.SEARCH' }),
  clear = intl.formatMessage({ id: 'DS.ITEM-PICKER.CLEAR' }),
  selectedItem,
  onFocus,
  onBlur,
  size = 'small',
  changeButtonLabel = intl.formatMessage({ id: 'DS.ITEM-PICKER.CHANGE' }),
  clearConfirmTitle = intl.formatMessage({ id: 'DS.ITEM-PICKER.CLEAR-CONFIRM' }),
  yesText = intl.formatMessage({ id: 'DS.ITEM-PICKER.YES-TEXT' }),
  noText = intl.formatMessage({ id: 'DS.ITEM-PICKER.NO-TEXT' }),
  noResults = intl.formatMessage({ id: 'DS.ITEM-PICKER.NO-RESULTS' }),
  withClearConfirmation,
  dropdownVisibleRows,
  dropdownRowHeight,
  dropdownBottomAction,
  closeOnBottomAction,
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
        onChange={onChange}
        dataSource={dataSource}
        placeholder={searchPlaceholder}
        closeDropdown={closeDropdown}
        noResults={noResults}
        dropdownVisibleRows={dropdownVisibleRows}
        dropdownRowHeight={dropdownRowHeight}
        dropdownBottomAction={dropdownBottomAction}
        closeOnBottomAction={closeOnBottomAction}
      />
    ),
    [
      dataSource,
      searchPlaceholder,
      onChange,
      closeDropdown,
      noResults,
      dropdownRowHeight,
      dropdownVisibleRows,
      dropdownBottomAction,
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
      >
        {renderTrigger}
      </Dropdown>
      {error && errorMessage && <S.Error>{errorMessage}</S.Error>}
      {description && <Description>{description}</Description>}
    </S.ItemPickerWrapper>
  );
};
export default injectIntl(ItemPicker);
