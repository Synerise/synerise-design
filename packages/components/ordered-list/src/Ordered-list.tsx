import React from 'react';

import { FormFieldLabel } from '@synerise/ds-form-field';

import Item from './Elements/Item/Item';
import * as S from './Ordered-list.styles';
import { type OrderedListProps } from './Ordered-list.types';

const OrderedList = ({
  data,
  indexFormatter,
  listStyle,
  text,
}: OrderedListProps) => {
  return (
    <div>
      {text && (
        <S.ContentAbove>
          <FormFieldLabel label={text} />
        </S.ContentAbove>
      )}
      <S.OrderedList listStyle={listStyle}>
        {data.map(({ index, ...item }, i) => (
          <Item
            listStyle={listStyle}
            index={i}
            key={String(item?.id)}
            indexFormatter={indexFormatter}
            {...item}
            // pass the component to avoid circular dependencies
            NestedList={OrderedList}
          />
        ))}
      </S.OrderedList>
    </div>
  );
};

export default OrderedList;
