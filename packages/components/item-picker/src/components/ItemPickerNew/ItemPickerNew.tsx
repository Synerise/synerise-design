import React, { useEffect, useMemo, useRef, useState } from 'react';
import Dropdown from '@synerise/ds-dropdown';
import { Label } from '@synerise/ds-input';
import { Description } from '@synerise/ds-typography';
import { useOnClickOutside } from '@synerise/ds-utils';

import Trigger from '../ItemPickerTrigger/Trigger';
import { useDefaultTexts } from '../../hooks/useDefaultTexts';
import type { BaseItemType, BaseSectionType, ItemPickerProps } from './ItemPickerNew.types';
import * as S from '../../ItemPicker.styles';
import { ItemPickerList } from '../ItemPickerList/ItemPickerList';

export const ItemPickerNew = <ItemType extends BaseItemType, SectionType extends BaseSectionType>({
  onFocus,
  onBlur,
  selectedItem,
  onChange,
  dropdownProps,
  texts,
  triggerProps,
  renderTrigger,
  placeholder,
  placeholderIcon,
  label,
  description,
  error,
  errorMessage,
  disabled,
  tooltip,
  ...rest
}: ItemPickerProps<ItemType, SectionType>) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(overlayRef, () => {
    closeDropdown();
  });

  const [selected, setSelected] = useState<ItemType | undefined>(selectedItem);
  const [visible, setVisible] = useState(false);
  const allTexts = useDefaultTexts(texts);

  const handleVisibilityChange = (state: boolean) => {
    setVisible(state);
    if (state) {
      onFocus && onFocus();
    } else {
      onBlur && onBlur();
    }
  };

  const openDropdown = () => setVisible(true);
  const closeDropdown = () => setVisible(false);

  const handleItemSelect = (item: ItemType) => {
    // eslint-disable-next-line no-unused-expressions
    onChange?.(item);
    closeDropdown();
  };

  useEffect(() => setSelected(selectedItem), [selectedItem]);

  const trigger = useMemo(() => {
    return renderTrigger ? (
      renderTrigger({ selected: selectedItem, openDropdown, closeDropdown, error, disabled })
    ) : (
      <Trigger
        size="small"
        {...triggerProps}
        opened={visible}
        texts={allTexts}
        placeholder={placeholder}
        placeholderIcon={placeholderIcon}
        selected={selectedItem}
        openDropdown={openDropdown}
        closeDropdown={closeDropdown}
      />
    );
  }, [allTexts, disabled, error, placeholder, placeholderIcon, renderTrigger, selectedItem, triggerProps, visible]);

  return (
    <S.ItemPickerWrapper className="ds-items-picker" disabled={disabled}>
      {label && <Label label={label} tooltip={tooltip} />}
      <Dropdown
        overlayStyle={{ width: '400px' }}
        {...dropdownProps}
        visible={visible}
        trigger={['click']}
        onVisibleChange={handleVisibilityChange}
        overlay={
          <ItemPickerList
            {...rest}
            texts={allTexts}
            isVisible={visible}
            selectedItem={selected}
            onItemSelect={handleItemSelect}
            containerRef={overlayRef}
          />
        }
      >
        {trigger}
      </Dropdown>
      {error && errorMessage && <S.Error>{errorMessage}</S.Error>}
      {description && <Description>{description}</Description>}
    </S.ItemPickerWrapper>
  );
};
