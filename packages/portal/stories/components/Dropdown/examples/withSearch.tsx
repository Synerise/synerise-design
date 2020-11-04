import * as React from 'react';
import { useOnClickOutside } from '@synerise/ds-utils';
import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import { Add3M, SearchM } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Menu from '@synerise/ds-menu';
import Button from '@synerise/ds-button';
import { renderFooter, typesFooter } from '../index.stories';
import { boolean, select } from '@storybook/addon-knobs';

interface Props {
  onSearchChange: (value: string) => void;
  onClearInput?: () => void;
  onFooter?: React.ReactNode;
  onClickAction: () => void;
}

const WithSearch: React.FC<Props> = () => {
  const data = [{ text: 'Preview' }, { text: 'Edit' }, { text: 'Duplicate' }];
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const footer = boolean('Set footer', false);
  const setTypeFooter = select('Set footer type', typesFooter, 'singleButton');
  const [value, setValue] = React.useState('');
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
          <Dropdown.Wrapper style={{ width: '220px' }} ref={ref}>
            <Dropdown.SearchInput
              onSearchChange={setValue}
              onClearInput={() => {
                setValue('');
              }}
              placeholder="Search"
              value={value}
              iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
            />
            <Menu style={{ padding: '8px' }} dataSource={data} />
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
