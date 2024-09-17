import React from 'react';
import Label from '@synerise/ds-input/dist/Label/Label';
import * as S from './Unordered-list.styles';
import Item from './Elements/Item/Item';
import { ListProps } from './Unordered-list.types';

const UnorderedList = ({ data, indexFormatter, text, className }: ListProps) => {
  return (
    <div className={className}>
      {text && (
        <S.ContentAbove>
          <Label label={text} />
        </S.ContentAbove>
      )}
      <S.UnorderedList>
        {data.map(({ index, ...item }, i) => (
          <Item index={i} key={String(item?.id)} indexFormatter={indexFormatter} {...item} />
        ))}
      </S.UnorderedList>
    </div>
  );
};

export default UnorderedList;
