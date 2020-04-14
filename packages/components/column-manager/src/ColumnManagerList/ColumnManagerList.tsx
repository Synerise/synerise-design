import * as React from 'react';
import { ReactSortable } from 'react-sortablejs-typescript';
import * as S from './ColumnManager.style';
import ColumnManagerItem from '../ColumnManagerItem/ColumnManagerItem';
import ColumnManagerSearchResults from '../ColumnManagerSearchResults/ColumnManagerSearchResults';
import { Props } from './ColumnManagerList.types';

const SORTABLE_COFIG = {
  ghostClass: 'sortable-list-ghost-element',
  className: 'sortable-list',
  animation: 150,
  group: 'column-manager',
  forceFallback: true,
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
  texts,
}) => {
  return (
    <S.ColumnManagerList>
      {!searchQuery ? (
        <>
          <S.ListHeadline>{texts.visible}</S.ListHeadline>
          <ReactSortable {...SORTABLE_COFIG} list={visibleList} setList={updateVisibleList}>
            {visibleList.map(item => (
              <ColumnManagerItem
                data-testid="ds-column-manager-visible-item"
                key={item.id}
                {...item}
                setFixed={setFixed}
                switchAction={toggleColumn}
                draggable
                texts={texts}
              />
            ))}
          </ReactSortable>
          <S.ListHeadline>{texts.hidden}</S.ListHeadline>
          <ReactSortable {...SORTABLE_COFIG} list={hiddenList} setList={updateHiddenList}>
            {hiddenList.map(item => (
              <ColumnManagerItem
                data-testid="ds-column-manager-hidden-item"
                key={item.id}
                {...item}
                setFixed={setFixed}
                switchAction={toggleColumn}
                draggable
                texts={texts}
              />
            ))}
          </ReactSortable>
        </>
      ) : (
        <ColumnManagerSearchResults
          texts={texts}
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
