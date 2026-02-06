import debounce from 'lodash.debounce';
import React, { useEffect, useRef, useState } from 'react';

import Dropdown from '@synerise/ds-dropdown';
import Icon, { SearchM } from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';
import Result from '@synerise/ds-result';
import Scrollbar from '@synerise/ds-scrollbar';

type AdvancedProps = {
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
};

const Advanced = ({
  value,
  visible,
  onVisibilityChange,
  onSearch,
  onLoadMore,
  children,
  dropdownMaxHeight = 320,
  debounceTimeout = 1500,
  data,
}: AdvancedProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const searchDebounce = useRef(debounce(onSearch, debounceTimeout)).current;

  const onSearchChange = (value: string, disableDebounce?: boolean) => {
    searchDebounce.cancel();
    setSearchQuery(value);

    if (disableDebounce) {
      onSearch(value);
    } else {
      searchDebounce(value);
    }
  };

  useEffect(() => {
    return () => {
      searchDebounce.cancel();
    };
  }, [searchDebounce]);

  const onMenuScroll = (event: React.UIEvent) => {
    const scrollTop = event.target.scrollTop;
    const max = event.target.scrollHeight - event.target.clientHeight;

    if (scrollTop >= max - 20) {
      onLoadMore();
    }
  };

  return (
    <Dropdown
      open={visible}
      onOpenChange={onVisibilityChange}
      overlay={
        <>
          <Dropdown.SearchInput
            onSearchChange={onSearchChange}
            onClearInput={() => onSearchChange('', true)}
            placeholder="Search"
            value={searchQuery}
            iconLeft={<Icon component={<SearchM />} color="#6a7580" />}
          />

          {data?.length === 0 ? (
            <Result
              type="no-results"
              noSearchResults
              description={'No results'}
            />
          ) : (
            <Scrollbar maxHeight={dropdownMaxHeight} onScroll={onMenuScroll}>
              <Menu
                asDropdownMenu
                selectedKeys={[value]}
                style={{
                  padding: '8px 2px 8px 8px',
                }}
                dataSource={data}
              />
            </Scrollbar>
          )}
        </>
      }
    >
      {children}
    </Dropdown>
  );
};

export default Advanced;
