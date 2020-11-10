import * as React from 'react';
import { action } from '@storybook/addon-actions';


import Icon from '@synerise/ds-icon';
import FileM from '@synerise/ds-icon/dist/icons/FileM';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import ArrowRightCircleM from '@synerise/ds-icon/dist/icons/ArrowRightCircleM';

import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import Button from '@synerise/ds-button';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

interface Props {
  value: string;
  onSearchChange: (value: string) => void;
  onClearInput?: () => void;
}

const OverlayExample1: React.FC<Props> = ({ value, onSearchChange, onClearInput }) => {
  const data = [{ text: 'Item 1' }, { text: 'Item 2' }, { text: 'Item 3' },{ text: 'Item 4' } ];
  return (
    <Dropdown.Wrapper>
      <Dropdown.SearchInput
        onSearchChange={onSearchChange}
        onClearInput={onClearInput}
        placeholder="Search"
        value={value}
        iconLeft={<Icon component={<SearchM />} color="#6a7580" />}
        autofocus
      />
      <Dropdown.BackAction label="Attributes" onClick={() => alert('BackAction clicked')} />
      <Menu
        style={{padding: '8px 2px 8px 8px'}}
        asDropdownMenu={true}
        >
        {data.map(item => (
          <Menu.Item onSelect={action('onSelect')} prefixel={<Icon component={<FileM />}/>} >
            {(item as any).text}
          </Menu.Item>
        ))}
          </Menu>
      <Dropdown.BottomAction
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        style={{ marginTop: '0px', padding: '0 8px', cursor: 'auto',alignItems: 'center' }}
      >
        <Button type="ghost" style={{ paddingLeft: '8px', marginBottom:'1px' }}>
          {<Icon component={<ArrowRightCircleM />} size={24} color={theme.palette['grey-500']} />}
          <div style={{ paddingLeft: '4px',paddingTop:'1px' }}>Add folder</div>
        </Button>
      </Dropdown.BottomAction>
    </Dropdown.Wrapper>
  );
};

export default OverlayExample1;
