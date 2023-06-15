import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import Icon, { Add3M, FolderM, SearchM } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import { useOnClickOutside } from '@synerise/ds-utils';
import Result from '@synerise/ds-result';
import Button from '@synerise/ds-button';
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
        placeholder={texts?.search || ''}
        value={searchValue}
        iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
        autofocus
      />
      <MenuWrapper withBottomAction={!!onAddFolderClick}>
        {filteredData?.length > 0 ? (
          <Menu>
            {filteredData?.map((item, i) => (
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
        <Dropdown.BottomAction onClickAction={(): void => onAddFolderClick(searchValue)} style={{ padding: '8px' }}>
          <Button type="ghost" mode="icon-label">
            <Icon component={<Add3M />} size={24} color={theme.palette['grey-500']} />
            <div>{texts.addFolder}</div>
          </Button>
        </Dropdown.BottomAction>
      )}
    </DropdownWrapper>
  );
};

export default DropdownOverlay;
