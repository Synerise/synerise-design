import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';
import { escapeRegEx } from '@synerise/ds-utils';
import { SubjectItem } from '../Subject.types';
import * as S from './SubjectList.styles';

interface Props {
  item: SubjectItem;
  clearSearch: () => void;
  searchQuery: string;
  hideDropdown: () => void;
  select: (item: SubjectItem) => void;
}

const SubjectListItem: React.FC<Props> = ({ item, clearSearch, searchQuery, hideDropdown, select }) => {
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
      onClick={(): void => {
        hideDropdown();
        clearSearch();
        select(item);
      }}
      prefixel={<Icon component={item.icon} />}
    >
      {name}
    </Menu.Item>
  );
};

export default SubjectListItem;
