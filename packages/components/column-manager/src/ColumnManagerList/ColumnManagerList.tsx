import * as React from 'react';
import { ReactSortable } from 'react-sortablejs-typescript';
import * as S from './ColumnManager.style';
import ColumnManagerItem, { Column } from '../ColumnManagerItem/ColumnManagerItem';
import ColumnManagerSearchResults from '../ColumnManagerSearchResults/ColumnManagerSearchResults';

type Props = {
  searchQuery: string;
  visibleList: Column[];
  hiddenList: Column[];
  searchResults: Column[];
  setFixed: (id: string, fixed?: string) => void;
  toggleColumn: (id: string, visible: boolean) => void;
  updateVisibleList: (newList: Column[]) => void;
  updateHiddenList: (newList: Column[]) => void;
};

const SORTABLE_COFIG = {
  ghostClass: 'sortable-list-ghost-element',
  className: 'sortable-list',
  animation: 150,
  group: 'column-manager',
};

const ColumnManagerList: React.FC<Props> = ({
  searchQuery,
  visibleList,
  hiddenList,
  updateVisibleList,
  updateHiddenList,
  setFixed,
  toggleColumn,
  searchResults,
}) => {
  return (
    <S.ColumnManagerList>
      {!searchQuery ? (
        <>
          <S.ListHeadline>Visible</S.ListHeadline>
          <ReactSortable
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...SORTABLE_COFIG}
            list={visibleList}
            setList={updateVisibleList}
          >
            {visibleList.map(item => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <ColumnManagerItem key={item.id} {...item} setFixed={setFixed} switchAction={toggleColumn} draggable />
            ))}
          </ReactSortable>
          <S.ListHeadline>Hidden</S.ListHeadline>
          <ReactSortable
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...SORTABLE_COFIG}
            list={hiddenList}
            setList={updateHiddenList}
          >
            {hiddenList.map(item => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <ColumnManagerItem key={item.id} {...item} setFixed={setFixed} switchAction={toggleColumn} draggable />
            ))}
          </ReactSortable>
        </>
      ) : (
        <ColumnManagerSearchResults
          searchResults={searchResults}
          searchQuery={searchQuery}
          setFixed={setFixed}
          switchAction={toggleColumn}
        />
      )}
    </S.ColumnManagerList>
  );
};

export default ColumnManagerList;
