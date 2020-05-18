import * as React from 'react';
import { action } from '@storybook/addon-actions';

import List from '@synerise/ds-list';

import Icon from '@synerise/ds-icon';
import FileM from '@synerise/ds-icon/dist/icons/FileM';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import ArrowRightCircleM from '@synerise/ds-icon/dist/icons/ArrowRightCircleM';

import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import { HomeM } from '@synerise/ds-icon/dist/icons';

interface Props {
  value: string;
  onSearchChange: (value: string) => void;
  data: any;
  onClickAction: () => void;
  onClearInput?: () => void;
}

const DropdownWithCascader: React.FC<Props> = ({ value, onSearchChange, onClearInput, data, onClickAction }) => {
  return (
    <Dropdown.Wrapper style={{width:'300px'}}>
      <Dropdown.SearchInput
        onSearchChange={onSearchChange}
        onClearInput={onClearInput}
        placeholder="Search"
        value={value}
        iconLeft={<Icon component={<SearchM />} color="#6a7580" />}
        autofocus
      />
      <Menu>
        <Menu.Header headerText={"Attributes"} tooltip={"Is it me"}></Menu.Header>
        <Menu.Breadcrumb routes={[{path:"Computers",name:'Computers'},{path:"other",name:'Laptops'},{path:"other",name:'Notebooks'},{path:"other",name:'Apple'}]} prefixel={<Icon component={<HomeM />} />}/>
      </Menu>
      <Dropdown.BackAction label="Attributes" onClick={() => alert('BackAction clicked')} />
      <Menu
        dataSource={data}
      />
      <Dropdown.BottomAction onClickAction={onClickAction} icon={<ArrowRightCircleM />}>
        Add folder
      </Dropdown.BottomAction>
    </Dropdown.Wrapper>
  );
};

export default DropdownWithCascader;
