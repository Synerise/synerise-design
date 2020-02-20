import * as React from 'react';
import { ReactSortable } from 'react-sortablejs-typescript';
import Result from '@synerise/ds-result';
import * as S from './ColumnManager.style';
import ColumnManagerItem, { Column } from '../ColumnManagerItem/ColumnManagerItem';

const LIST: Column[] = [
  {
    id: '0',
    name: 'test',
    visible: true,
    type: 'text',
    fixed: 'left',
  },
  {
    id: '1',
    name: 'test 1',
    visible: true,
    type: 'text',
    fixed: undefined,
  },
  {
    id: '2',
    name: 'test 2',
    visible: true,
    type: 'number',
    fixed: undefined,
  },
  {
    id: '3',
    name: 'test 4',
    visible: false,
    type: 'text',
    fixed: undefined,
  },
  {
    id: '4',
    name: 'test 5',
    visible: false,
    type: 'text',
    fixed: undefined,
  },
  {
    id: '5',
    name: 'test 6',
    visible: false,
    type: 'text',
    fixed: undefined,
  },
];

type Props = {
  searchQuery: string;
};

const SORTABLE_COFIG = {
  ghostClass: 'sortable-list-ghost-element',
  className: 'sortable-list',
  animation: 150,
  group: 'column-manager',
};

const ColumnManagerList: React.FC<Props> = ({ searchQuery }) => {
  const [visibleList, setVisibleList] = React.useState(LIST.filter(column => column.visible));
  const [hiddenList, setHiddenList] = React.useState(LIST.filter(column => !column.visible));

  const searchResult = React.useMemo(() => {
    return [...visibleList, ...hiddenList].filter(column => column.name.includes(searchQuery));
  }, [searchQuery, visibleList, hiddenList]);

  const updateVisibleItems = (newVisibleList: Column[]): void => {
    setVisibleList(newVisibleList.map((column: Column): Column => ({ ...column, visible: true })));
  };

  const updateHiddenItems = (newHiddenList: Column[]): void => {
    setHiddenList(newHiddenList.map((column: Column): Column => ({ ...column, visible: false })));
  };

  const setFixed = (id: string, fixed?: string): void => {
    setVisibleList(
      visibleList.map(visibleColumn => (visibleColumn.id === id ? { ...visibleColumn, fixed } : visibleColumn))
    );
  };

  const hideColumn = (id: string): void => {
    const column = visibleList.find(col => col.id === id);
    column && setVisibleList(visibleList.filter(visibleColumn => visibleColumn.id !== column.id));
    column && setHiddenList([...hiddenList, { ...column, visible: false }]);
  };

  const showColumn = (id: string): void => {
    const column = hiddenList.find(col => col.id === id);
    column && setHiddenList(hiddenList.filter(hiddenColumn => hiddenColumn.id !== column.id));
    column && setVisibleList([...visibleList, { ...column, visible: true }]);
  };

  return (
    <S.ColumnManagerList>
      {!searchQuery ? (
        <>
          <S.ListHeadline>Visible</S.ListHeadline>
          <ReactSortable
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...SORTABLE_COFIG}
            list={visibleList}
            setList={updateVisibleItems}
          >
            {visibleList.map(item => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <ColumnManagerItem key={item.id} {...item} setFixed={setFixed} switchAction={hideColumn} draggable />
            ))}
          </ReactSortable>
          <S.ListHeadline>Hidden</S.ListHeadline>
          <ReactSortable
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...SORTABLE_COFIG}
            list={hiddenList}
            setList={updateHiddenItems}
          >
            {hiddenList.map(item => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <ColumnManagerItem key={item.id} {...item} setFixed={setFixed} switchAction={showColumn} draggable />
            ))}
          </ReactSortable>
        </>
      ) : (
        <>
          <S.ListHeadline>Search results</S.ListHeadline>
          {searchResult.length ? (
            searchResult.map(item => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <ColumnManagerItem key={item.id} {...item} setFixed={setFixed} switchAction={hideColumn} />
            ))
          ) : (
            <Result description="No results" type="no-results" title="" />
          )}
        </>
      )}
    </S.ColumnManagerList>
  );
};

export default ColumnManagerList;
