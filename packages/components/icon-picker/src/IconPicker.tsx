import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import * as S from './IconPicker.styles';
import Overlay from './Overlay/Overlay';
import List from './List/List';
import { FilterElement, IconPickerProps } from './IconPicker.types';

const IconPicker: React.FC<IconPickerProps> = ({ button, data, onSelect, trigger, placeholder }) => {
  const [filteredData, setFilteredData] = React.useState(data);
  const [value, setValue] = React.useState('');

  const filter = (searchTerm: string): void => {
    setValue(searchTerm);
    const final = data.filter((item: FilterElement): boolean => {
      return item.category.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredData(final);
  };

  const onClearInput = (): void => {
    setValue('');
    setFilteredData(data);
  };

  return (
    <Dropdown
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
            onSelect={onSelect}
          />
          <List onSelect={onSelect} data={filteredData} />
        </S.Overlay>
      }
    >
      {!!button && button}
    </Dropdown>
  );
};

export default IconPicker;
