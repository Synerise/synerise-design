import React from 'react';

import Tags from '@synerise/ds-tags';

import * as S from './TagsGroup.styles';
import { type TagsGroupProps } from './TagsGroup.types';

export const TagsGroupCell = ({
  disabled,
  tagsProps,
  ...htmlAttributes
}: TagsGroupProps) => {
  const isEmpty = !tagsProps?.selected?.length;

  return (
    <S.TagsGroupWrapper
      {...htmlAttributes}
      isDisabled={disabled}
      isEmpty={isEmpty}
    >
      <Tags
        maxVisibleTags={1}
        disabled={disabled}
        addButtonType={isEmpty ? 'icon-label' : 'single-icon'}
        {...tagsProps}
        addable={tagsProps?.addable && !disabled}
        removable={tagsProps?.removable && !disabled}
      />
    </S.TagsGroupWrapper>
  );
};
