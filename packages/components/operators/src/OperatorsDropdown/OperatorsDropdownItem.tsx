import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';
import { escapeRegEx } from '@synerise/ds-utils';
import * as S from '../Operators.style';
import { OperatorsGroup, OperatorsItem } from '../Operator.types';

interface Props {
  item: OperatorsItem | OperatorsGroup;
  searchQuery: string;
  clearSearch?: () => void;
  hideDropdown?: () => void;
  select: (item: OperatorsItem | OperatorsGroup) => void;
}

const OperatorsDropdownItem: React.FC<Props> = ({ item, clearSearch, searchQuery, hideDropdown, select }) => {
  const name = React.useMemo(() => {
    if (searchQuery) {
      const escapedQuery = escapeRegEx(searchQuery);
      const startOfQuery = item.name.toLowerCase().search(escapedQuery.toLowerCase());
      const endOfQuery = startOfQuery + searchQuery.length;
      const resultArray = [
        item.name.substring(0, startOfQuery),
        <S.SearchResultHighlight key={item.id}>
          {item.name.substring(startOfQuery, endOfQuery)}
        </S.SearchResultHighlight>,
        item.name.substring(endOfQuery, item.name.length),
      ];

      return <S.SearchResult>{resultArray}</S.SearchResult>;
    }
    return item.name;
  }, [item, searchQuery]);

  return (
    <Menu.Item
      key={item.name + item.id}
      prefixel={searchQuery && <Icon component={item.icon} />}
      onClick={(): void => {
        clearSearch && clearSearch();
        hideDropdown && hideDropdown();
        select && select(item);
      }}
    >
      {name}
    </Menu.Item>
  );
};

export default OperatorsDropdownItem;
