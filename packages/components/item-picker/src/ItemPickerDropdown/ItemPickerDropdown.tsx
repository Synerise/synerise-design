import * as React from 'react';
import SearchBar from '@synerise/ds-search-bar';
import Menu from '@synerise/ds-menu';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import Result from '@synerise/ds-result';
import { SearchM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import * as S from './ItemPickerDropdown.style';

interface Props {
  onChange: (item: MenuItemProps) => void;
  placeholder: string;
  dataSource: MenuItemProps[];
  closeDropdown: () => void;
  noResults: string;
}

const ItemPickerDropdown: React.FC<Props> = ({ onChange, placeholder, dataSource, closeDropdown, noResults }) => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const handleChange = React.useCallback(
    (item: MenuItemProps) => {
      closeDropdown();
      onChange(item);
    },
    [onChange, closeDropdown]
  );

  const filteredDataSource = React.useMemo(() => {
    return searchQuery
      ? dataSource.filter(
          item =>
            item.text &&
            String(item.text)
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      : dataSource;
  }, [searchQuery, dataSource]);

  return (
    <S.DropdownWrapper>
      <SearchBar
        iconLeft={<Icon component={<SearchM />} />}
        onSearchChange={setSearchQuery}
        placeholder={placeholder}
        value={searchQuery}
        onClearInput={(): void => setSearchQuery('')}
        autofocus
      />
      <Menu>
        <S.Menu>
          {filteredDataSource.length === 0 && <Result type="no-results" description={noResults} />}
          {filteredDataSource.map(item => (
            <Menu.Item
              key={JSON.stringify(item)}
              {...item}
              onClick={(): void => handleChange(item)}
              highlight={searchQuery}
            />
          ))}
        </S.Menu>
      </Menu>
    </S.DropdownWrapper>
  );
};

export default ItemPickerDropdown;
