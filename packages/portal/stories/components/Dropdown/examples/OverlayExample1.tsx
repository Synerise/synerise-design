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
import Result from '@synerise/ds-result';

interface Props {
  value: string;
  onSearchChange: (value: string) => void;
  onClearInput?: () => void;
  data: any;
}

const OverlayExample1: React.FC<Props> = ({ value, onSearchChange, onClearInput, data}) => {
  return (
    <Dropdown.Wrapper>
      <Dropdown.SearchInput
        onSearchChange={onSearchChange}
        onClearInput={onClearInput}
        placeholder="Search"
        value={value}
        iconLeft={<Icon component={<SearchM />} color="#6a7580" />}
      />
      <Dropdown.BackAction label="Attributes" onClick={() => alert('BackAction clicked')} />
      {data?.length === 0 ? <Result type="no-results" noSearchResults description={'No results'} /> :
      <Menu
        style={{padding: '8px 2px 8px 8px'}}
        asDropdownMenu={true}
        >
        {data.map(item => (
          <Menu.Item onSelect={action('onSelect')} highlight={value} prefixel={<Icon component={<FileM />}/>} >
            {(item as any).text}
          </Menu.Item>
        ))}
          </Menu>}
      <Dropdown.BottomAction
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        style={{ marginTop: '0px', padding: '0 8px', cursor: 'auto',alignItems: 'center' }}
      >
        <Button type="ghost" mode="icon-label" >
          {<Icon component={<ArrowRightCircleM />} size={24} color={theme.palette['grey-500']} />}
          Add folder
        </Button>
      </Dropdown.BottomAction>
    </Dropdown.Wrapper>
  );
};

export default OverlayExample1;
