import * as React from 'react';
import * as S from './Ordered-list.styles';
import Item from './Elements/Item/Item';
import { ListProps } from './Ordered-list.types';

const OrderedList: React.FC<ListProps> = ({ data, indexFormatter,listStyle }) => {
  return (
    <S.OrderedList>
      {data.map((item, index) => (
        <Item listStyle={listStyle} index={index} key={String(item?.id)} indexFormatter={indexFormatter} {...item} />
      ))}
    </S.OrderedList>
  );
};

export default OrderedList;
