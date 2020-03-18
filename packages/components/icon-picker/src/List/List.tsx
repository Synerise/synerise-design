import * as React from 'react';
import { v4 as uuid } from 'uuid';
import ListItem from '../ListItem/ListItem';
import { FilterElement, FilterItem } from '../IconPicker.types';
import { ListProps } from './List.types';
import * as S from '../IconPicker.styles';

const List: React.FC<ListProps> = ({ data, onSelect }) => {
  return (
    <>
      {data.map((list: FilterElement) => (
        <S.OverlayWrapper key={uuid()}>
          {list.category && <S.Title>{list.category}</S.Title>}
          <S.List>
            {list.items.map((el: FilterItem, i: number) => (
              <ListItem key={uuid()} element={el} onSelect={onSelect} index={i} />
            ))}
          </S.List>
        </S.OverlayWrapper>
      ))}
    </>
  );
};

export default List;
