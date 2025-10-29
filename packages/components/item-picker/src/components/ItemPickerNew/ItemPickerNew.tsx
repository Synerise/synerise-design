import React, { forwardRef, useEffect, useMemo, useState } from 'react';

import Dropdown from '@synerise/ds-dropdown';
import FormField from '@synerise/ds-form-field';

import * as S from '../../ItemPicker.styles';
import { useDefaultTexts } from '../../hooks/useDefaultTexts';
import { ItemPickerList } from '../ItemPickerList/ItemPickerList';
import { type ItemPickerListRef } from '../ItemPickerList/ItemPickerList.types';
import Trigger from '../ItemPickerTrigger/Trigger';
import type { ItemPickerProps } from './ItemPickerNew.types';
import type {
  BaseItemType,
  BaseSectionType,
} from './types/baseItemSectionType.types';

const ItemPickerNewInner = <
  ItemType extends BaseItemType,
  SectionType extends BaseSectionType,
>(
  {
    onFocus,
    onBlur,
    onClear,
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
    errorText,
    disabled,
    tooltip,
    tooltipConfig,
    ...rest
  }: ItemPickerProps<ItemType, SectionType>,
  forwardedRef: ItemPickerListRef,
) => {
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
    onChange?.(item);
    closeDropdown();
  };

  useEffect(() => setSelected(selectedItem), [selectedItem]);

  const trigger = useMemo(() => {
    return renderTrigger ? (
      renderTrigger({
        selected: selectedItem,
        openDropdown,
        closeDropdown,
        error,
        disabled,
      })
    ) : (
      <Trigger
        size="small"
        {...triggerProps}
        opened={visible}
        texts={allTexts}
        disabled={disabled}
        placeholder={placeholder}
        placeholderIcon={placeholderIcon}
        selected={selectedItem}
        onClear={onClear}
        openDropdown={openDropdown}
        closeDropdown={closeDropdown}
        error={error}
      />
    );
  }, [
    allTexts,
    disabled,
    error,
    onClear,
    placeholder,
    placeholderIcon,
    renderTrigger,
    selectedItem,
    triggerProps,
    visible,
  ]);

  return (
    <S.ItemPickerWrapper className="ds-items-picker" disabled={disabled}>
      <FormField
        label={label}
        tooltip={tooltip}
        tooltipConfig={tooltipConfig}
        errorText={errorText || errorMessage}
        description={description}
      >
        <Dropdown
          overlayStyle={{ width: '400px' }}
          {...dropdownProps}
          visible={visible}
          trigger={['click']}
          disabled={disabled}
          onVisibleChange={handleVisibilityChange}
          overlay={
            <ItemPickerList
              {...rest}
              isDropdown
              texts={allTexts}
              isVisible={visible}
              selectedItem={selected}
              onItemSelect={handleItemSelect}
              ref={forwardedRef}
            />
          }
        >
          {trigger}
        </Dropdown>
      </FormField>
    </S.ItemPickerWrapper>
  );
};

type ItemPickerNewType = <
  ItemType extends BaseItemType,
  SectionType extends BaseSectionType,
>(
  p: ItemPickerProps<ItemType, SectionType> & {
    ref?: ItemPickerListRef;
  },
) => ReturnType<typeof ItemPickerNewInner>;

export const ItemPickerNew = forwardRef(
  ItemPickerNewInner,
) as ItemPickerNewType;
