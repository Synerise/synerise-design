import React, { ReactNode, useRef, useState } from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@synerise/ds-button';
import { theme } from '@synerise/ds-core';
import Dropdown, {
  type DropdownProps,
  TextTrigger,
} from '@synerise/ds-dropdown';
import Icon, { SearchM } from '@synerise/ds-icon';
import { Input } from '@synerise/ds-input';
import ListItem, { ListWrapper } from '@synerise/ds-list-item';
import Menu from '@synerise/ds-menu';
import Result from '@synerise/ds-result';
import Scrollbar from '@synerise/ds-scrollbar';
import SearchBar from '@synerise/ds-search-bar';
import { DropdownSkeleton } from '@synerise/ds-skeleton';
import Tabs from '@synerise/ds-tabs';
import Tooltip from '@synerise/ds-tooltip';
import { focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';

import { Placeholder } from '../../constants';
import {
  BOOLEAN_CONTROL,
  controlFromOptionsArray,
  fixedWrapper400,
} from '../../utils';
import Advanced from './Advanced';
import {
  PLACEMENTS,
  dataCopy,
  dataItems,
  tabsWithIcons,
} from './Dropdown.data';
import * as S from './Dropdown.styles';
import { PlacementWrapper } from './Dropdown.styles';

type DataType = {
  id: string;
  text: string;
};

export default {
  title: 'Components/Dropdown/CustomContentExamples',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    return <Dropdown {...args} />;
  },
  argTypes: {
    hideOnItemClick: BOOLEAN_CONTROL,
    asChild: {
      ...BOOLEAN_CONTROL,
      table: {
        type: {
          summary:
            'if `true` Dropdown will clone `children` and extend props with ref and event handlers. If false it will wrap with a <span> element that will handle events. \n Use popoverTriggerProps to apply any additional inline syle to the <span> element if needed',
        },
      },
    },
    placement: {
      ...controlFromOptionsArray('select', Object.keys(PLACEMENTS)),
    },
    size: {
      ...controlFromOptionsArray('radio', [
        'small 216px',
        'medium 282px',
        'large 588px',
        'match-trigger',
        'auto',
      ]),
      mapping: {
        'small 216px': 'small',
        'medium 282px': 'medium',
        'large 588px': 'large',
        'match-trigger': 'match-trigger',
        auto: 'auto',
      },
      table: {
        type: {
          detail:
            'By default dropdown overlay will shrink to its content (`auto`). You can choose from 3 predefined sizes: `small` (216px), `medium` (282px) and `large` (588px), `match-trigger` to make dropdown overlay same width as the trigger, or provide a number to set exact pixel width.',
        },
      },
    },
    trigger: controlFromOptionsArray('radio', ['click', 'hover']),
  },
  args: {
    onOpenChange: fn(),
    overlay: <>hello</>,
  },
} as Meta<DropdownProps>;

type Story = StoryObj<DropdownProps & { children: ReactNode }>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Button from '@synerise/ds-button';
import { Placeholder } from '../../constants';

<Dropdown
  size="medium"
  overlay={<Placeholder $height={300} />}
>
  <Button>Click</Button>
</Dropdown>;`,
      },
    },
  },
  args: {
    size: 'medium',
    overlay: <Placeholder $height={300} />,
    children: <Button>Click</Button>,
  },
};

export const Placement: Story = {
  ...Default,
  render: (args) => {
    return (
      <S.PlacementWrapper>
        {Object.entries(PLACEMENTS).map(([placement, label]) => {
          return (
            <S.PlacementItem>
              <Dropdown {...args} placement={placement}>
                <Button>{label}</Button>
              </Dropdown>
            </S.PlacementItem>
          );
        })}
      </S.PlacementWrapper>
    );
  },
  args: {
    ...Default.args,
    asChild: true,
    placement: 'topCenter',
  },
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Button from '@synerise/ds-button';
import * as S from './Dropdown.styles';
import { PLACEMENTS } from './Dropdown.data';

<S.PlacementWrapper>
  {Object.entries(PLACEMENTS).map(([placement, label]) => (
    <S.PlacementItem key={placement}>
      <Dropdown placement={placement} overlay={<div style={{padding: 8}}>Example</div>}>
        <Button>{label}</Button>
      </Dropdown>
    </S.PlacementItem>
  ))}
</S.PlacementWrapper>;`,
      },
    },
  },
};

export const MatchTriggerSize: Story = {
  ...Default,
  decorators: [fixedWrapper400],
  args: {
    ...Default.args,
    asChild: true,
    children: <Input value="input trigger" />,
    size: 'match-trigger',
  },
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Input from '@synerise/ds-input';

<Dropdown asChild size="match-trigger" overlay={<div style={{padding: 8}}>Menu</div>}>
  <Input value="input trigger" />
</Dropdown>;`,
      },
    },
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

    const searchRef = useRef<HTMLDivElement | null>(null);

    return (
      <div>
        <Dropdown
          {...args}
          open={dropdownVisible}
          placement="bottomLeft"
          size="medium"
          overlay={
            <Dropdown.Wrapper
              onKeyDown={(e) =>
                focusWithArrowKeys(e, 'ds-menu-item', () => {
                  searchRef.current?.focus();
                })
              }
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
  ...Default,
  args: {
    children: (
      <TextTrigger size={5} value={'Select'} inactiveColor={'blue-600'} />
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import Dropdown, { TextTrigger } from '@synerise/ds-dropdown';

<Dropdown overlay={<div style={{padding:8}}>Menu</div>}>
  <TextTrigger size={5} value="Select" inactiveColor="blue-600" />
</Dropdown>;`,
      },
    },
  },
};

export const withSkeleton: Story = {
  ...Default,
  args: {
    ...Default.args,
    overlay: (
      <Dropdown.Wrapper>
        <DropdownSkeleton />
      </Dropdown.Wrapper>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import { DropdownSkeleton } from '@synerise/ds-skeleton';

<Dropdown overlay={<Dropdown.Wrapper><DropdownSkeleton /></Dropdown.Wrapper>}>
  <button>Click</button>
</Dropdown>;`,
      },
    },
  },
};

export const resizableContent: Story = {
  ...Default,
  args: {
    ...Default.args,
    overlay: (
      <Dropdown.Wrapper
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
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Scrollbar from '@synerise/ds-scrollbar';
import Menu from '@synerise/ds-menu';
import { dataItems } from './Dropdown.data';

<Dropdown overlay={
  <Dropdown.Wrapper onKeyDown={(e) => {/* arrow nav helper */}}>
    <Scrollbar absolute maxHeight={300}>
      <Menu dataSource={dataItems} asDropdownMenu style={{width: '100%'}} />
    </Scrollbar>
  </Dropdown.Wrapper>
}>
  <button>Open</button>
</Dropdown>;`,
      },
    },
  },
};

export const resizableContentListItems: Story = {
  ...Default,
  args: {
    ...Default.args,
    overlay: (
      <Dropdown.Wrapper>
        <Scrollbar absolute maxHeight={300}>
          <ListWrapper>
            {dataItems.map((item) => (
              <ListItem {...item} />
            ))}
          </ListWrapper>
        </Scrollbar>
      </Dropdown.Wrapper>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Scrollbar from '@synerise/ds-scrollbar';
import ListItem, { ListWrapper } from '@synerise/ds-list-item';
import { dataItems } from './Dropdown.data';

<Dropdown overlay={
  <Dropdown.Wrapper>
    <Scrollbar absolute maxHeight={300}>
      <ListWrapper>
        {dataItems.map(item => <ListItem key={item.id} {...item} />)}
      </ListWrapper>
    </Scrollbar>
  </Dropdown.Wrapper>
}>
  <button>Open</button>
</Dropdown>;`,
      },
    },
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
        open={dropdownVisible}
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

export const PopupContainerTest: Story = {
  render: (args) => {
    return (
      <div>
        <div data-popup-container>
          <div>
            <div>
              <Dropdown {...args} />
            </div>
          </div>
        </div>
      </div>
    );
  },
  ...Default,
  parameters: {
    docs: {
      source: {
        code: `// Example showing how to mount Dropdown inside a custom popup container:
<div data-popup-container>
  <Dropdown overlay={<div>Menu</div>}>
    <button>Trigger</button>
  </Dropdown>
</div>;`,
      },
    },
  },
};

export const Copyable: Story = {
  args: {
    onOpenChange: fn(),
    hideOnItemClick: true,
    overlay: (
      <Dropdown.Wrapper>
        <Dropdown.BackAction label="Attributes" onClick={() => {}} />
        <ListWrapper>
          {dataCopy.map((item) => (
            <ListItem {...item} />
          ))}
        </ListWrapper>
      </Dropdown.Wrapper>
    ),
    children: <Button>Click</Button>,
  },

  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Button from '@synerise/ds-button';
import ListItem, { ListWrapper } from '@synerise/ds-list-item';
import { dataCopy } from './Dropdown.data';

<Dropdown
  hideOnItemClick
  overlay={
    <Dropdown.Wrapper>
      <Dropdown.BackAction label="Attributes" onClick={() => {}} />
      <ListWrapper>
        {dataCopy.map((item) => (
          <ListItem key={item.id} {...item} />
        ))}
      </ListWrapper>
    </Dropdown.Wrapper>
  }
>
  <Button>Click</Button>
</Dropdown>;`,
      },
    },
  },
};

export const DropdownAroundTooltip: Story = {
  ...Default,
  args: {
    ...Default.args,
    children: (
      <Tooltip title="set prop `asChild` to false when using a tooltip around a trigger">
        {Default.args?.children}
      </Tooltip>
    ),
    asChild: false,
  },
  parameters: {
    docs: {
      source: {
        code: `import Tooltip from '@synerise/ds-tooltip';
import Dropdown from '@synerise/ds-dropdown';
import Button from '@synerise/ds-button';

<Dropdown asChild={false} overlay={<div>Menu</div>}>
  <Tooltip title="set prop 'asChild' to false when using a tooltip around a trigger">
    <Button>Click</Button>
  </Tooltip>
</Dropdown>;`,
      },
    },
  },
};
