import * as React from 'react';
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

  const filter = (searchTerm: string): void => {
    setValue(searchTerm);
    const final = data.filter((item: FilterElement): boolean => {
      return item.category.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredData(final);
  };

  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  const onClearInput = (): void => {
    setValue('');
    setFilteredData(data);
  };

  const toggleOpen = (): void => {
    setOpen(prevState => !prevState);
    setFocus(() => {
      return !isOpen && true;
    });
  };

  return (
    <div ref={ref}>
      <Dropdown
        visible={isOpen}
        trigger={trigger}
        placement="bottomRight"
        overlay={
          <S.Overlay>
            <Overlay
              value={value}
              onSearchChange={(val: string): void => filter(val)}
              onClearInput={onClearInput}
              placeholder={placeholder}
              data={filteredData}
              onSelect={(val): void => {
                onSelect(val);
                setFocus(false);
              }}
              focus={focus}
              noResultMsg={noResultMsg}
            />
          </S.Overlay>
        }
      >
        {button && React.cloneElement(button, { onClick: toggleOpen })}
      </Dropdown>
    </div>
  );
};

export default IconPicker;
