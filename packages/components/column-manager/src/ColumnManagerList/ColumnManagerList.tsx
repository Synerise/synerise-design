import * as React from 'react';
import { ReactSortable } from 'react-sortablejs-typescript';
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

const ColumnManagerList: React.FC = () => {
  const [visibleList, setVisibleList] = React.useState(LIST.filter(column => column.visible));
  const [hiddenList, setHiddenList] = React.useState(LIST.filter(column => !column.visible));

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
      <S.ListHeadline>Visible</S.ListHeadline>
      <ReactSortable animation={150} group="test" list={visibleList} setList={updateVisibleItems}>
        {visibleList.map(item => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <ColumnManagerItem key={item.id} {...item} setFixed={setFixed} switchAction={hideColumn} />
        ))}
      </ReactSortable>
      <S.ListHeadline>Hidden</S.ListHeadline>
      <ReactSortable animation={150} group="test" list={hiddenList} setList={updateHiddenItems}>
        {hiddenList.map(item => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <ColumnManagerItem key={item.id} {...item} setFixed={setFixed} switchAction={showColumn} />
        ))}
      </ReactSortable>
    </S.ColumnManagerList>
  );
};

export default ColumnManagerList;
