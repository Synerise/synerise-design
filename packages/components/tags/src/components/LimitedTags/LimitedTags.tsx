import React from 'react';

import Tag, { type TagProps, type TagShape } from '@synerise/ds-tag';

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
      <Tag
        id="limited-tags"
        shape={tagShape}
        name={`+${limitedSelectedTags.length}`}
        asPill
      />
    </TagsDropdown>
  );
};
