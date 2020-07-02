import * as React from 'react';
import Label from '@synerise/ds-input/dist/Label/Label';
import { Description } from '@synerise/ds-typography';
import Dropdown from '@synerise/ds-dropdown';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import * as S from './ItemPicker.styles';
import ItemPickerDropdown from './ItemPickerDropdown/ItemPickerDropdown';
import Trigger from './ItemPickerTrigger/Trigger';

export type ItemPickerProps = {
  dataSource: MenuItemProps[];
  selectedItem?: MenuItemProps | undefined;
  size?: 'small' | 'large';
  withChange?: boolean;
  label?: string | React.ReactNode;
  description?: string | React.ReactNode;
  placeholder: string;
  placeholderIcon?: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
  clear: string;
  tooltip?: string;
  disabled?: boolean;
  searchPlaceholder: string;
  onClear: () => void;
  onChange: (item: MenuItemProps) => void;
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
}) => {
  const [dropdownOpened, setDropdownOpened] = React.useState<boolean>(false);

  const dropdownOverlay = React.useMemo(
    () => <ItemPickerDropdown onChange={onChange} dataSource={dataSource} placeholder={searchPlaceholder} />,
    [dataSource, searchPlaceholder, onChange]
  );

  const renderTrigger = React.useMemo(
    () => (
      <span>
        <Trigger
          clear={clear}
          selected={selectedItem}
          onClear={onClear}
          opened={dropdownOpened}
          placeholder={placeholder}
          placeholderIcon={placeholderIcon}
          error={error}
          disabled={disabled}
        />
      </span>
    ),
    [clear, selectedItem, onClear, dropdownOpened, error, disabled]
  );

  return (
    <S.ItemPickerWrapper className="ds-items-picker" disabled={disabled}>
      {label && <Label label={label} tooltip={tooltip} />}
      <Dropdown disabled={disabled} trigger={['click']} overlay={dropdownOverlay} onVisibleChange={setDropdownOpened}>
        {renderTrigger}
      </Dropdown>
      {error && errorMessage && <S.Error>{errorMessage}</S.Error>}
      {description && <Description>{description}</Description>}
    </S.ItemPickerWrapper>
  );
};
export default ItemPicker;
