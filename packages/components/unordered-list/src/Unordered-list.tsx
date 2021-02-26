import * as React from 'react';
import Label from '@synerise/ds-input/dist/Label/Label';
import * as S from './Unordered-list.styles';
import Item from './Elements/Item/Item';
import { ListProps } from './Unordered-list.types';

const UnorderedList: React.FC<ListProps> = ({ data, indexFormatter, text }) => {
  return (
    <div>
      {text && (
        <S.ContentAbove>
          <Label label={text} />
        </S.ContentAbove>
      )}
      <S.UnorderedList>
        {data.map((item, index) => (
          <Item index={index} key={String(item?.id)} indexFormatter={indexFormatter} {...item} />
        ))}
      </S.UnorderedList>
    </div>
  );
};

export default UnorderedList;
