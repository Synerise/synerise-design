import * as React from 'react';
import Button from '@synerise/ds-button';
import Dropdown from '@synerise/ds-dropdown';
import Scrollbar from '@synerise/ds-scrollbar';
import Menu from '@synerise/ds-menu';
import { focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';

const resizableContentWithScrollbar = () => {
  const subItems = [ { text: 'sub 1' }, { text: 'sub 1' }, { text: 'sub 1' }, { text: 'sub 1' }, { text: 'sub 1' }, { text: 'sub 1' }, { text: 'sub 1' }, { text: 'sub 1' }, { text: 'sub 1' }, { text: 'sub 1' }, { text: 'sub 1' }]
  const data = [{ text: 'Item 1' }, { text: 'Item 2' }, { text: 'Item 3' }, { text: 'Item 4', subMenu: subItems } ];

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
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setDropdownVisible(false);
  });

  return {
    visible: dropdownVisible,
    overlay: (
      <Dropdown.Wrapper
        style={{ width: '200px' }}
        onKeyDown={e => focusWithArrowKeys(e, 'ds-menu-item', () => {})}
        ref={ref}
      >
        <Scrollbar absolute maxHeight={300}>
          <Menu dataSource={data} asDropdownMenu={true} style={{ width: '100%' }} />
        </Scrollbar>
      </Dropdown.Wrapper>
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

export default resizableContentWithScrollbar;
