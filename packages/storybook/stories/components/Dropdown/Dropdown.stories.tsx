import React, { ReactNode, useRef, useState } from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@synerise/ds-button';
import { theme } from '@synerise/ds-core';
import Dropdown from '@synerise/ds-dropdown';
import type { DropdownProps } from '@synerise/ds-dropdown';
import Icon, { SearchM } from '@synerise/ds-icon';
import ListItem, { ListWrapper } from '@synerise/ds-list-item';
import Menu from '@synerise/ds-menu';
import Result from '@synerise/ds-result';
import Scrollbar from '@synerise/ds-scrollbar';
import SearchBar from '@synerise/ds-search-bar';
import { DropdownSkeleton } from '@synerise/ds-skeleton';
import Tabs from '@synerise/ds-tabs';
import { focusWithArrowKeys } from '@synerise/ds-utils';
import { useOnClickOutside } from '@synerise/ds-utils';

import { controlFromOptionsArray } from '../../utils';
import Advanced from './Advanced';
import { data, dataCopy, dataItems, tabsWithIcons } from './Dropdown.data';
import * as S from './Dropdown.styles';

type DataType = {
  id: string;
  text: string;
};

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    return <Dropdown {...args} />;
  },
  argTypes: {
    placement: {
      ...controlFromOptionsArray('select', [
        'topLeft',
        'topRight',
        'topCenter',
        'bottomLeft',
        'bottomRight',
        'bottomCenter',
      ]),
    },
  },
  args: {
    onVisibleChange: fn(),
    overlay: <>hello</>,
  },
} as Meta<DropdownProps>;

type Story = StoryObj<DropdownProps & { children: ReactNode }>;

export const Default: Story = {
  args: {
    overlay: <div>Dropdown overlay content</div>,
    children: <Button>Click</Button>,
  },
};

export const Example: Story = {
  args: {
    overlay: (
      <Dropdown.Wrapper
        onKeyDown={(e) => focusWithArrowKeys(e, 'ds-menu-item', () => {})}
      >
        <Dropdown.BackAction label="Attributes" onClick={() => {}} />
        <Menu
          dataSource={data}
          asDropdownMenu={true}
          style={{ width: '100%' }}
        />
      </Dropdown.Wrapper>
    ),
    children: <Button>Click</Button>,
  },
};

export const Placement: Story = {
  ...Example,
  args: {
    ...Example.args,
    placement: 'topCenter',
  },
};

export const Copyable: Story = {
  args: {
    onVisibleChange: fn(),
    overlay: (
      <Dropdown.Wrapper
        style={{ width: '220px' }}
        onKeyDown={(e) => focusWithArrowKeys(e, 'ds-menu-item', () => {})}
      >
        <Dropdown.BackAction label="Attributes" onClick={() => {}} />
        <Menu
          dataSource={dataCopy}
          asDropdownMenu={true}
          style={{ width: '100%' }}
        />
      </Dropdown.Wrapper>
    ),
    children: <Button>Click</Button>,
  },
};

export const withSearch: Story = {
  args: {
    onVisibleChange: fn(),
  },
  render: (args) => {
    const data = [{ text: 'Preview' }, { text: 'Edit' }, { text: 'Duplicate' }];
    const [filteredData, setFilteredData] = useState(data);
    const filter = (searchTerm: string) => {
      setValue(searchTerm);

      const newData = data.filter((item) => {
        return item.text.toLowerCase().includes(searchTerm.toLowerCase());
      });

      setFilteredData(newData);
    };

    const onClearInput = () => {
      setValue('');
      setFilteredData(data);
    };
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [value, setValue] = useState('');
    const searchRef = useRef<HTMLDivElement | null>(null);
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, () => {
      setDropdownVisible(false);
    });
    return (
      <div>
        <Dropdown
          {...args}
          visible={dropdownVisible}
          placement="bottomLeft"
          overlay={
            <Dropdown.Wrapper
              style={{ width: '220px' }}
              onKeyDown={(e) =>
                focusWithArrowKeys(e, 'ds-menu-item', () => {
                  searchRef.current?.focus();
                })
              }
              ref={ref}
            >
              <SearchBar
                handleInputRef={(ref) => (searchRef.current = ref.current)}
                onSearchChange={filter}
                onClearInput={onClearInput}
                placeholder="Search"
                value={value}
                iconLeft={
                  <Icon
                    component={<SearchM />}
                    color={theme.palette['grey-600']}
                  />
                }
              />
              {filteredData?.length === 0 ? (
                <Result
                  type="no-results"
                  noSearchResults
                  description={'No results'}
                />
              ) : (
                <Menu
                  dataSource={filteredData}
                  highlight={value}
                  asDropdownMenu={true}
                  style={{ width: '100%' }}
                />
              )}
            </Dropdown.Wrapper>
          }
        >
          <Button
            onClick={() => setDropdownVisible(!dropdownVisible)}
            type="primary"
          >
            Dropdown
          </Button>
        </Dropdown>
      </div>
    );
  },
};

export const withTabs: Story = {
  render: (args) => {
    const data = [{ text: 'Preview' }, { text: 'Edit' }, { text: 'Duplicate' }];
    const [filteredData, setFilteredData] = useState(data);
    const filter = (searchTerm: string) => {
      setValue(searchTerm);

      const newData = data.filter((item) => {
        return item.text.toLowerCase().includes(searchTerm.toLowerCase());
      });

      setFilteredData(newData);
    };

    const onClearInput = () => {
      setValue('');
      setFilteredData(data);
    };
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [value, setValue] = useState('');
    const [activeTab, setActiveTab] = useState(0);

    const ref = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement | null>(null);
    useOnClickOutside(ref, () => {
      setDropdownVisible(false);
    });
    return (
      <div>
        <Dropdown
          {...args}
          visible={dropdownVisible}
          placement="bottomLeft"
          overlay={
            <Dropdown.Wrapper
              onKeyDown={(e) =>
                focusWithArrowKeys(e, 'ds-menu-item', () => {
                  searchRef.current?.focus();
                })
              }
              ref={ref}
            >
              <SearchBar
                handleInputRef={(ref) => (searchRef.current = ref.current)}
                onSearchChange={filter}
                onClearInput={onClearInput}
                placeholder="Search"
                value={value}
                iconLeft={
                  <Icon
                    component={<SearchM />}
                    color={theme.palette['grey-600']}
                  />
                }
              />
              <S.TabsWrapper>
                <Tabs
                  block
                  tabs={tabsWithIcons}
                  activeTab={activeTab}
                  handleTabClick={(index: number) => {
                    setActiveTab(index);
                  }}
                />
              </S.TabsWrapper>
              {filteredData?.length === 0 ? (
                <Result
                  type="no-results"
                  noSearchResults
                  description={'No results'}
                />
              ) : (
                <Menu
                  dataSource={filteredData}
                  highlight={value}
                  asDropdownMenu={true}
                />
              )}
            </Dropdown.Wrapper>
          }
        >
          <Button
            onClick={() => setDropdownVisible(!dropdownVisible)}
            type="primary"
          >
            Dropdown
          </Button>
        </Dropdown>
      </div>
    );
  },
};

export const withTextTrigger: Story = {
  render: (args) => {
    const data = [{ text: 'Preview' }, { text: 'Edit' }, { text: 'Duplicate' }];
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, () => {
      setDropdownVisible(false);
    });
    return (
      <div>
        <Dropdown
          {...args}
          trigger={['click']}
          overlayStyle={{ borderRadius: '3px' }}
          visible={dropdownVisible}
          placement="bottomLeft"
          overlay={
            <Dropdown.Wrapper
              onKeyDown={(e) => focusWithArrowKeys(e, 'ds-menu-item', () => {})}
              ref={ref}
            >
              <Menu
                dataSource={data}
                asDropdownMenu={true}
                style={{ width: '204px' }}
              />
            </Dropdown.Wrapper>
          }
        >
          <Dropdown.TextTrigger
            onClick={() => setDropdownVisible(!dropdownVisible)}
            size={5}
            value={'Select'}
            inactiveColor={'blue-600'}
          />
        </Dropdown>
      </div>
    );
  },
};

export const withSkeleton: Story = {
  render: (args) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, () => {
      setDropdownVisible(false);
    });
    return (
      <div>
        <Dropdown
          {...args}
          trigger={['click']}
          overlayStyle={{ borderRadius: '3px' }}
          visible={dropdownVisible}
          placement="bottomLeft"
          overlay={
            <Dropdown.Wrapper
              onKeyDown={(e) => focusWithArrowKeys(e, 'ds-menu-item', () => {})}
              ref={ref}
            >
              <div style={{ width: '200px' }}>
                <DropdownSkeleton />
              </div>
            </Dropdown.Wrapper>
          }
        >
          <Dropdown.TextTrigger
            onClick={() => setDropdownVisible(!dropdownVisible)}
            size={5}
            value={'Select'}
            inactiveColor={'blue-600'}
          />
        </Dropdown>
      </div>
    );
  },
};

export const resizableContent: Story = {
  render: (args) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, () => {
      setDropdownVisible(false);
    });
    return (
      <div>
        <Dropdown
          {...args}
          trigger={['click']}
          overlayStyle={{ borderRadius: '3px' }}
          visible={dropdownVisible}
          placement="bottomLeft"
          overlay={
            <Dropdown.Wrapper
              style={{ width: '200px' }}
              onKeyDown={(e) => focusWithArrowKeys(e, 'ds-menu-item', () => {})}
            >
              <Scrollbar absolute maxHeight={300}>
                <Menu
                  dataSource={dataItems}
                  asDropdownMenu={true}
                  style={{ width: '100%' }}
                />
              </Scrollbar>
            </Dropdown.Wrapper>
          }
        >
          <Button
            onClick={() => setDropdownVisible(!dropdownVisible)}
            type="primary"
          >
            Dropdown
          </Button>
        </Dropdown>
      </div>
    );
  },
};

export const resizableContentListItems: Story = {
  render: (args) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, () => {
      setDropdownVisible(false);
    });
    return (
      <div>
        <Dropdown
          {...args}
          trigger={['click']}
          overlayStyle={{ borderRadius: '3px' }}
          visible={dropdownVisible}
          placement="bottomLeft"
          overlay={
            <Dropdown.Wrapper
              style={{ width: '200px' }}
              onKeyDown={(e) => focusWithArrowKeys(e, 'ds-menu-item', () => {})}
            >
              <Scrollbar absolute maxHeight={300}>
                <ListWrapper>
                  {dataItems.map((item) => (
                    <ListItem {...item} />
                  ))}
                </ListWrapper>
              </Scrollbar>
            </Dropdown.Wrapper>
          }
        >
          <Button
            onClick={() => setDropdownVisible(!dropdownVisible)}
            type="primary"
          >
            Dropdown
          </Button>
        </Dropdown>
      </div>
    );
  },
};

export const SearchAndInfiniteLoader: Story = {
  render: () => {
    const generateData = () => {
      return Array.from(Array(30).keys()).map((_, index) => ({
        id: `test_${Math.ceil(Math.random() * 1000) + '_' + index}`,
        text: `Test_${index}`,
      }));
    };

    const [data, setData] = useState<DataType[]>(generateData());
    const [value, setValue] = useState<string | null>(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [query, setQuery] = useState('');

    const onSearchChange = (query: string) => {
      setQuery(query);
    };

    const onChange = ({ id }: { id: string }) => {
      setValue(id);
      setDropdownVisible(false);
    };

    const onLoadMore = () => setData([...data, ...generateData()]);

    const filteredData =
      query.length > 1
        ? data.filter((dates) =>
            dates.text.toLowerCase().includes(query.toLowerCase()),
          )
        : data;

    return (
      <Advanced
        data={filteredData}
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
  },
};
