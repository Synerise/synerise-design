import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import { Add3M, FolderM, SearchM } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { useOnClickOutside } from '@synerise/ds-utils';
import Result from '@synerise/ds-result';
import { DropdownWrapper, MenuWrapper } from './DropdownOverlay.styles';
import { Props } from './DropdownOverlay.types';

const DropdownOverlay: React.FC<Props> = ({
  texts,
  onClearInput,
  data,
  onAddFolderClick,
  parentFolder,
  onDropdownOutsideClick,
  onSearchChange,
  searchValue,
  onFolderSelect,
  foldersIdKey,
  foldersFilterKey,
  foldersDisplayKey,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const filteredData = data.filter(
    item =>
      typeof item[foldersFilterKey] === 'string' &&
      (item[foldersFilterKey] as string).toLowerCase().includes(searchValue.toLowerCase())
  );
  useOnClickOutside(ref, () => {
    onDropdownOutsideClick && onDropdownOutsideClick();
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
      <MenuWrapper withBottomAction={!!onAddFolderClick}>
        {filteredData?.length > 0 ? (
          <Menu>
            {filteredData?.map((item,i) => (
              <Menu.Item
                key={`${item[foldersIdKey]}-${i}`}
                onClick={(): void => onFolderSelect(item)}
                checked={parentFolder[foldersIdKey] === item[foldersIdKey]}
                prefixel={<Icon component={<FolderM />} />}
                highlight={searchValue}
              >
                {item[foldersDisplayKey]}
              </Menu.Item>
            ))}
          </Menu>
        ) : (
          <Result type="no-results" />
        )}
      </MenuWrapper>
      {onAddFolderClick && (
        <Dropdown.BottomAction onClickAction={onAddFolderClick} icon={<Add3M />}>
          {texts?.addFolder}
        </Dropdown.BottomAction>
      )}
    </DropdownWrapper>
  );
};

export default DropdownOverlay;
