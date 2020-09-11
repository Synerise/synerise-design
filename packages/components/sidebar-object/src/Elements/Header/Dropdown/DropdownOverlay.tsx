import * as React from 'react';
import Icon from '@synerise/ds-icon';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';

import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import { Add3M, FolderM } from '@synerise/ds-icon/dist/icons';
import { FolderItem } from '@synerise/ds-folders/Folders.types';
import { DropdownWrapper, MenuWrapper } from './Dropdown.style';

interface Props {
  value: string;
  onSearchChange: (value: string) => void;
  data: any;
  onClickAction: () => void;
  onClearInput?: () => void;
  parentFolder: FolderItem;
}

const DropdownOverlay: React.FC<Props> = ({ value, onSearchChange, onClearInput, data, onClickAction,parentFolder  }) => {
  return (
    <DropdownWrapper>
      <Dropdown.SearchInput
        onSearchChange={onSearchChange}
        onClearInput={onClearInput}
        placeholder="Search"
        value={value}
        iconLeft={<Icon component={<SearchM />} color="#6a7580" />}
        autofocus
      />
      <MenuWrapper>
        <Menu dataSource={data}>
          {data.map(item => (
            <Menu.Item checked={parentFolder.id === item.id} prefixel={<Icon component={<FolderM />} />}>
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </MenuWrapper>
      <Dropdown.BottomAction onClickAction={onClickAction} icon={<Add3M />}>
        Add folder
      </Dropdown.BottomAction>
    </DropdownWrapper>
  );
};


export default DropdownOverlay;
