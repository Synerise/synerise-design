import * as React from 'react';
import { focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';
import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import { SearchM } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Menu from '@synerise/ds-menu';
import Button from '@synerise/ds-button';
import { renderFooter, typesFooter } from '../index.stories';
import { boolean, select } from '@storybook/addon-knobs';
import Result from '@synerise/ds-result';
import SearchBar from '@synerise/ds-search-bar';


const WithSearch: React.FC = () => {
  const data = [{ text: 'Preview' }, { text: 'Edit' }, { text: 'Duplicate' }];
  const [filteredData, setFilteredData] = React.useState(data);
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
  const footer = boolean('Set footer', false);
  const navigation = boolean('Set navigation', false);
  const setTypeFooter = select('Set footer type', typesFooter, 'singleButton');
  const [value, setValue] = React.useState('');
  const [searchRef, setSearchRef]= React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setDropdownVisible(false);
  });
  return (
    <div>
      <Dropdown
        visible={dropdownVisible}
        placement="bottomLeft"
        overlay={
          <Dropdown.Wrapper style={{ width: '220px' }} onKeyDown={e=>
            focusWithArrowKeys(e, 'ds-menu-item',() => {searchRef.current.input.focus()})} ref={ref} >
            <SearchBar
              handleInputRef={setSearchRef}
              onSearchChange={filter}
              onClearInput={onClearInput}
              placeholder="Search"
              value={value}
              iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
            />
            {navigation &&
            <Dropdown.BackAction label="Attributes" onClick={() => alert('BackAction clicked')} />}
            {filteredData?.length === 0 ? <Result type="no-results" noSearchResults description={'No results'} /> :
            <Menu asDropdownMenu={true}  style={{ width: '220px' }}>
              {filteredData.map(item => (<Menu.Item text={item.text} highlight={value}/>))}
            </Menu>}
            {footer && renderFooter(setTypeFooter)}
          </Dropdown.Wrapper>
        }
      >
        <Button onClick={() => setDropdownVisible(!dropdownVisible)} type="primary">
          Dropdown
        </Button>
      </Dropdown>
    </div>
  );
};

export default WithSearch;
