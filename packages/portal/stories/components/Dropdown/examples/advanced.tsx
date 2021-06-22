import * as React from 'react';
import { action } from '@storybook/addon-actions';

import Icon from '@synerise/ds-icon';
import FileM from '@synerise/ds-icon/dist/icons/FileM';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import CheckS from '@synerise/ds-icon/dist/icons/CheckS';
import Scrollbar from '@synerise/ds-scrollbar';
import debounce from 'lodash/debounce';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import Button from '@synerise/ds-button';
import Result from '@synerise/ds-result';

interface Props {
  value: string;
  onSearch: (value: string) => void;
  data: any;
  onChange: (value: { id: string }) => void;
  onClickOutside?: () => void;
  debounceTimeout?: number;
  dropdownMaxHeight?: number;
  onLoadMore: () => void;
  onVisibilityChange: (state: boolean) => void;
  visible: boolean;
  children: React.ReactNode;
}

const Advanced: React.FC<Props> = ({ value, visible, onVisibilityChange, onSearch, onChange, onLoadMore, children, dropdownMaxHeight = 320, debounceTimeout = 1500, data }) => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const searchDebounce = React.useRef(debounce(onSearch, debounceTimeout)).current;

  const onSearchChange = (value: string, force?: boolean) => {
    searchDebounce.cancel();
    setSearchQuery(value);

    if (force) {
      onSearch(value);
    } else {
      searchDebounce(value);
    }
  };

  const onMenuScroll = (e: React.UIEvent) => {
    const scrollTop = e.target.scrollTop;
    const max = e.target.scrollHeight - e.target.clientHeight;

    if (scrollTop >= (max - 20)) {
      onLoadMore();
    }
  }

  return (
    <Dropdown
      visible={visible}
      onVisibleChange={onVisibilityChange}
      overlay={(
        <>
          <Dropdown.SearchInput
            onSearchChange={onSearchChange}
            onClearInput={() => onSearchChange('', true)}
            placeholder="Search"
            value={searchQuery}
            iconLeft={<Icon component={<SearchM />} color="#6a7580" />}
          />

          {data?.length === 0 ? <Result type="no-results" noSearchResults description={'No results'} /> :
            <Scrollbar maxHeight={dropdownMaxHeight} onScroll={onMenuScroll}>
              <Menu
                asDropdownMenu
                selectedKeys={[value]}
                style={{
                  padding: '8px 2px 8px 8px',
                }}
              >
                {data.map(item => (
                  <Menu.Item
                    type="select"
                    key={item.id}
                    onClick={() => onChange(item)}
                    prefixel={<Icon component={<FileM />}/>}
                    suffixel={
                      item.id === value ? (
                        <Icon color={theme.palette['green-600']} component={<CheckS />} />
                      ) : (
                        undefined
                      )
                    }
                  >
                    {(item as any).text}
                  </Menu.Item>
                ))}
              </Menu>
            </Scrollbar>
          }
        </>
      )}
    >
      {children}
    </Dropdown>
  );
};



export default () => {
  const generateData = () => {
    return Array.from(Array(30).keys()).map((_, index) => ({
      id: `test_${Math.ceil(Math.random() * 1000) + '_' + index}`,
      text: `Test_${index}`,
    }));
  }

  const [data, setData] = React.useState<any[]>(generateData());
  const [value, setValue] = React.useState<string | null>(null);
  const [dropdownVisible, setDropdownVisible] = React.useState<boolean>(false);

  const onSearchChange = (query: string) => {
    action(`Debounced search query`)(query);
    setData(generateData());
  };

  const onChange = ({ id }: { id: string }) => {
    action(`Value change to id`)(id);
    setValue(id);
    setDropdownVisible(false);
  };

  const onLoadMore = () =>
    setData([
      ...data,
      ...generateData(),
    ]);

  return (
    <Advanced
      data={data}
      value={value}
      onSearch={onSearchChange}
      onChange={onChange}
      visible={dropdownVisible}
      onLoadMore={onLoadMore}
      onVisibilityChange={setDropdownVisible}
    >
      <Button onClick={() => setDropdownVisible(!dropdownVisible)}>
        {value || 'Set value'}
      </Button>
    </Advanced>
  );
}
