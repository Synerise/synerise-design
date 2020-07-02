import * as React from 'react';
import Label from '@synerise/ds-input/dist/Label/Label';
import { Description } from '@synerise/ds-typography';
import Dropdown from '@synerise/ds-dropdown';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import * as S from './ItemPicker.styles';
import ItemPickerDropdown from './ItemPickerDropdown/ItemPickerDropdown';
import Trigger from './ItemPickerTrigger/Trigger';

export type ItemPickerSize = 'small' | 'large';

export type ItemPickerProps = {
  dataSource: MenuItemProps[];
  placeholder: string;
  clear: string;
  searchPlaceholder: string;
  onClear: () => void;
  onChange: (item: MenuItemProps) => void;
  selectedItem?: MenuItemProps | undefined;
  size?: ItemPickerSize;
  label?: string | React.ReactNode;
  description?: string | React.ReactNode;
  placeholderIcon?: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
  tooltip?: string;
  disabled?: boolean;
  withChangeButton?: boolean;
  changeButtonLabel?: string;
  onChangeButtonClick?: () => void;
};

const ItemPicker: React.FC<ItemPickerProps> = ({
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
  searchPlaceholder,
  clear,
  selectedItem,
  size = 'small',
  changeButtonLabel,
  onChangeButtonClick,
}) => {
  const [dropdownOpened, setDropdownOpened] = React.useState<boolean>(false);

  const openDropdown = React.useCallback(() => {
    setDropdownOpened(true);
  }, [dropdownOpened]);

  const closeDropdown = React.useCallback(() => {
    setDropdownOpened(false);
  }, [dropdownOpened]);

  const dropdownOverlay = React.useMemo(
    () => (
      <ItemPickerDropdown
        onChange={onChange}
        dataSource={dataSource}
        placeholder={searchPlaceholder}
        closeDropdown={closeDropdown}
      />
    ),
    [dataSource, searchPlaceholder, onChange]
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
        onChangeButtonClick={onChangeButtonClick}
      />
    ),
    [clear, selectedItem, onClear, dropdownOpened, error, disabled]
  );

  return (
    <S.ItemPickerWrapper className="ds-items-picker" disabled={disabled}>
      {label && <Label label={label} tooltip={tooltip} />}
      <Dropdown
        visible={dropdownOpened}
        disabled={disabled}
        trigger={['click']}
        overlay={dropdownOverlay}
        onVisibleChange={setDropdownOpened}
      >
        {renderTrigger}
      </Dropdown>
      {error && errorMessage && <S.Error>{errorMessage}</S.Error>}
      {description && <Description>{description}</Description>}
    </S.ItemPickerWrapper>
  );
};
export default ItemPicker;
