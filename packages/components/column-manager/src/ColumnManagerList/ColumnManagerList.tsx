import * as React from 'react';
import { ReactSortable } from 'react-sortablejs-typescript';
import * as S from './ColumnManager.style';
import ColumnManagerItem from '../ColumnManagerItem/ColumnManagerItem';
import ColumnManagerSearchResults from '../ColumnManagerSearchResults/ColumnManagerSearchResults';
import { Props } from './ColumnManagerList.types';

const SORTABLE_CONFIG = {
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
  showGroupSettings,
  toggleColumn,
  searchResults,
  texts,
}) => {
  return (
    <S.ColumnManagerList>
      {!searchQuery ? (
        <>
          <S.ListHeadline>{texts.visible}</S.ListHeadline>
          <ReactSortable {...SORTABLE_CONFIG} list={visibleList} setList={updateVisibleList}>
            {visibleList.map(item => (
              <ColumnManagerItem
                data-testid="ds-column-manager-visible-item"
                key={item.id}
                item={item}
                setFixed={setFixed}
                showGroupSettings={showGroupSettings}
                switchAction={toggleColumn}
                draggable
                texts={texts}
              />
            ))}
          </ReactSortable>
          {hiddenList.length > 0 && (
            <>
              <S.ListHeadline>{texts.hidden}</S.ListHeadline>
              <ReactSortable {...SORTABLE_CONFIG} list={hiddenList} setList={updateHiddenList}>
                {hiddenList.map(item => (
                  <ColumnManagerItem
                    data-testid="ds-column-manager-hidden-item"
                    key={item.id}
                    item={item}
                    setFixed={setFixed}
                    switchAction={toggleColumn}
                    showGroupSettings={showGroupSettings}
                    draggable
                    texts={texts}
                  />
                ))}
              </ReactSortable>
            </>
          )}
        </>
      ) : (
        <ColumnManagerSearchResults
          texts={texts}
          searchResults={searchResults}
          showGroupSettings={showGroupSettings}
          searchQuery={searchQuery}
          setFixed={setFixed}
          switchAction={toggleColumn}
        />
      )}
    </S.ColumnManagerList>
  );
};

export default ColumnManagerList;
