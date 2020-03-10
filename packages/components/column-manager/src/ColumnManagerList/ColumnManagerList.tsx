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
  texts: {
    [k: string]: string | React.ReactNode;
  };
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
  texts,
}) => {
  return (
    <S.ColumnManagerList>
      {!searchQuery ? (
        <>
          <S.ListHeadline>{texts.visible}</S.ListHeadline>
          <ReactSortable
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...SORTABLE_COFIG}
            list={visibleList}
            setList={updateVisibleList}
          >
            {visibleList.map(item => (
              <ColumnManagerItem
                data-testid="ds-column-manager-visible-item"
                key={item.id}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...item}
                setFixed={setFixed}
                switchAction={toggleColumn}
                draggable
              />
            ))}
          </ReactSortable>
          <S.ListHeadline>{texts.hidden}</S.ListHeadline>
          <ReactSortable
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...SORTABLE_COFIG}
            list={hiddenList}
            setList={updateHiddenList}
          >
            {hiddenList.map(item => (
              <ColumnManagerItem
                data-testid="ds-column-manager-hidden-item"
                key={item.id}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...item}
                setFixed={setFixed}
                switchAction={toggleColumn}
                draggable
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
