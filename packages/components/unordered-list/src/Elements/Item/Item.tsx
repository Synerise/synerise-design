import React from 'react';

import UnorderedList from '../../Unordered-list';
import {
  type ListProps,
  type UnorderedListItem,
} from '../../Unordered-list.types';
import * as S from './Item.styles';

const Item: React.FC<UnorderedListItem & Pick<ListProps, 'indexFormatter'>> = ({
  label,
  suffixel,
  prefixel,
  subMenu,
  indexFormatter,
  index,
  subMenuProps,
  text,
}) => {
  return (
    <>
      <S.ItemWrapper>
        {indexFormatter && (
          <S.IndexFormatterWrapper>
            {indexFormatter(index)}
          </S.IndexFormatterWrapper>
        )}
        {prefixel}
        {label}
        {suffixel}
      </S.ItemWrapper>
      {!!subMenu && subMenu?.length > 0 && (
        <UnorderedList
          text={text}
          indexFormatter={indexFormatter}
          data={subMenu}
          {...subMenuProps}
        />
      )}
    </>
  );
};

export default React.memo(Item);
