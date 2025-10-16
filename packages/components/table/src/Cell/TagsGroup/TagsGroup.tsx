import React from 'react';

import { useTheme } from '@synerise/ds-core';
import Icon, { WarningFillM } from '@synerise/ds-icon';
import Skeleton from '@synerise/ds-skeleton';
import Tags from '@synerise/ds-tags';

import * as S from './TagsGroup.styles';
import { type TagsGroupProps } from './TagsGroup.types';

export const TagsGroupCell = ({
  disabled,
  isError,
  isLoading,
  tagsProps,
  ...htmlAttributes
}: TagsGroupProps) => {
  const theme = useTheme();
  const isEmpty = !tagsProps?.selected?.length;

  if (isError) {
    return (
      <Icon
        component={<WarningFillM />}
        color={theme.palette['red-600']}
        size={24}
      />
    );
  }

  if (isLoading) {
    return (
      <S.TagsGroupSkeleton>
        <Skeleton size="M" numberOfSkeletons={1} />
      </S.TagsGroupSkeleton>
    );
  }

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
