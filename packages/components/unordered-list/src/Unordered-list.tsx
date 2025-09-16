import React from 'react';

import { FormFieldLabel } from '@synerise/ds-form-field';

import Item from './Elements/Item/Item';
import * as S from './Unordered-list.styles';
import { type UnorderedListProps } from './Unordered-list.types';

const UnorderedList = ({
  data,
  indexFormatter,
  text,
  className,
}: UnorderedListProps) => {
  return (
    <div className={className}>
      {text && (
        <S.ContentAbove>
          <FormFieldLabel label={text} />
        </S.ContentAbove>
      )}
      <S.UnorderedList>
        {data.map(({ index, ...item }, i) => (
          <Item
            index={i}
            key={String(item?.id)}
            indexFormatter={indexFormatter}
            {...item}
            // pass component to avoid circular dependencies
            NestedList={UnorderedList}
          />
        ))}
      </S.UnorderedList>
    </div>
  );
};

export default UnorderedList;
