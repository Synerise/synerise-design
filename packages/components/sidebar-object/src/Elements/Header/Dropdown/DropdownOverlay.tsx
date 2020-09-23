import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import { Add3M, FolderM, SearchM } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { useOnClickOutside } from '@synerise/ds-utils';
import { DropdownWrapper, MenuWrapper } from './Dropdown.style';
import { Props } from './DropdownOverlay.types';


const DropdownOverlay: React.FC<Props> = ({ onClearInput, data, onClickAction, parentFolder, texts,onDropdownOutsideClick, onSearchChange, searchValue  }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
   onDropdownOutsideClick();
  });
  return (
    <DropdownWrapper ref={ref}>
      <Dropdown.SearchInput
        onSearchChange={onSearchChange}
        onClearInput={onClearInput}
        placeholder={texts.search}
        value={searchValue}
        iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
        autofocus
      />
      <MenuWrapper>
        <Menu dataSource={data}>
          {data.map(item => (
            <Menu.Item key={parentFolder.id} checked={parentFolder.id === item.id} prefixel={<Icon component={<FolderM />} />}>
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </MenuWrapper>
      <Dropdown.BottomAction
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        onClickAction={onClickAction}
        icon={<Add3M />}
      >
        Add folder
      </Dropdown.BottomAction>
    </DropdownWrapper>
  );
};

export default DropdownOverlay;
