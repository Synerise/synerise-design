import React from 'react';

import { type TagProps, type TagShape } from '@synerise/ds-tag';

import * as S from '../../Tags.styles';
import { TagsDropdown } from '../TagsDropdown/TagsDropdown';

type LimitedTagsProps = {
  selected: TagProps[];
  tagShape?: TagShape;
  maxVisibleTags?: number;
  removable?: boolean;
  disabled?: boolean;
  asPill?: boolean;
  onRemove?: (tagKey: string | number) => void;
};

export const LimitedTags = ({
  tagShape,
  selected,
  maxVisibleTags,
  asPill,
  removable,
  disabled,
  onRemove,
}: LimitedTagsProps) => {
  const limitedSelectedTags = selected.slice(maxVisibleTags);

  return (
    <TagsDropdown
      tags={limitedSelectedTags}
      trigger={['hover']}
      tagShape={tagShape}
      removable={removable}
      onRemove={removable ? onRemove : undefined}
      disabled={disabled}
      asPill={asPill}
    >
      <S.LimitedTag
        id="limited-tags"
        shape={tagShape}
        name={`+${limitedSelectedTags.length}`}
        asPill
      />
    </TagsDropdown>
  );
};
