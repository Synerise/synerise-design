import React, { type ReactElement } from 'react';

import {
  type UnorderedListItem,
  type UnorderedListProps,
} from '../../Unordered-list.types';
import * as S from './Item.styles';

const Item = ({
  label,
  suffixel,
  prefixel,
  subMenu,
  indexFormatter,
  index,
  subMenuProps,
  text,
  NestedList,
}: UnorderedListItem &
  Pick<UnorderedListProps, 'indexFormatter'> & {
    NestedList?: (props: UnorderedListProps) => ReactElement;
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
      {!!subMenu && subMenu?.length > 0 && NestedList && (
        <NestedList
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
