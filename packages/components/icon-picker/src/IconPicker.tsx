import React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import { useOnClickOutside } from '@synerise/ds-utils';
import * as S from './IconPicker.styles';
import Overlay from './Overlay/Overlay';
import { FilterElement, IconPickerProps } from './IconPicker.types';

const IconPicker: React.FC<IconPickerProps> = ({ button, data, onSelect, trigger, placeholder, noResultMsg }) => {
  const [filteredData, setFilteredData] = React.useState(data);
  const [value, setValue] = React.useState('');
  const [isOpen, setOpen] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const filter = (searchTerm: string) => {
    setValue(searchTerm);
    const final = data.filter((item: FilterElement): boolean => {
      return item.category.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredData(final);
  };

  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  const onClearInput = () => {
    setValue('');
    setFilteredData(data);
  };

  const toggleOpen = (newState: boolean) => {
    setOpen(newState);
    setFocus(newState);
  };

  return (
    <Dropdown
      visible={isOpen}
      onVisibleChange={toggleOpen}
      trigger={trigger}
      placement="bottomRight"
      overlay={
        <S.Overlay ref={ref}>
          <Overlay
            value={value}
            onSearchChange={(val: string) => filter(val)}
            onClearInput={onClearInput}
            placeholder={placeholder}
            data={filteredData}
            onSelect={val => {
              toggleOpen(false);
              onSelect(val);
            }}
            focus={focus}
            noResultMsg={noResultMsg}
          />
        </S.Overlay>
      }
    >
      {button}
    </Dropdown>
  );
};

export default IconPicker;
