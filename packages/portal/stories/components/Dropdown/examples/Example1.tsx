import * as React from 'react';
import Button from '@synerise/ds-button';
import OverlayExample1 from './OverlayExample1';

const Example1 = () => {
  const data = [{ text: 'Item 1' }, { text: 'Item 2' }, { text: 'Item 3' }, { text: 'Item 4' }];

  const [filteredData, setFilteredData] = React.useState(data);
  const [value, setValue] = React.useState('');

  const filter = (searchTerm: string) => {
    setValue(searchTerm);

    const newData =
      data.filter(item => {
        return item.text.toLowerCase().includes(searchTerm.toLowerCase());
      });

    setFilteredData(newData);
  };

  const onClearInput = () => {
    setValue('');
    setFilteredData(data);
  };
  const [dropdownVisible, setDropdownVisible] = React.useState(false);

  return {
    visible: dropdownVisible,
    overlay: (
      <OverlayExample1
        value={value}
        onSearchChange={filter}
        onClearInput={onClearInput}
        data={filteredData}
        onClickAction={() => alert('Action clicked')}
      />
    ),
    children: (
      <Button
        onClick={() => {
          setDropdownVisible(!dropdownVisible);
        }}
      >
        Click
      </Button>
    ),
  };
};

export default Example1;
