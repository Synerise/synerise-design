import * as React from 'react';
import Label from '@synerise/ds-input/dist/Label/Label';
import * as S from './Ordered-list.styles';
import Item from './Elements/Item/Item';
import { ListProps } from './Ordered-list.types';

const OrderedList: React.FC<ListProps> = ({ data, indexFormatter, listStyle, text }) => {
  return (
    <div>
      {text && (
        <S.ContentAbove>
          <Label label={text} />
        </S.ContentAbove>
      )}
      <S.OrderedList listStyle={listStyle}>
        {data.map(({ index, ...item }, i) => (
          <Item listStyle={listStyle} index={i} key={String(item?.id)} indexFormatter={indexFormatter} {...item} />
        ))}
      </S.OrderedList>
    </div>
  );
};

export default OrderedList;
