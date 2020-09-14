import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import { Add3M, FolderM,SearchM } from '@synerise/ds-icon/dist/icons';
import { FolderItem } from '@synerise/ds-folders/Folders.types';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { DropdownWrapper, MenuWrapper } from './Dropdown.style';
import { HeaderTexts } from '../Header.types';

interface Props {
  value: string;
  onSearchChange: (value: string) => void;
  data: any;
  onClickAction: () => void;
  onClearInput?: () => void;
  parentFolder: FolderItem;
  texts: HeaderTexts;
}

const DropdownOverlay: React.FC<Props> = ({ value, onSearchChange, onClearInput, data, onClickAction,parentFolder , texts }) => {
  return (
    <DropdownWrapper>
      <Dropdown.SearchInput
        onSearchChange={onSearchChange}
        onClearInput={onClearInput}
        placeholder={texts.search}
        value={value}
        iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
        autofocus
      />
      <MenuWrapper>
        <Menu dataSource={data}>
          {data.map(item =>  (
            <Menu.Item key={value} checked={parentFolder.id === item.id} prefixel={<Icon component={<FolderM />} />}>
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
