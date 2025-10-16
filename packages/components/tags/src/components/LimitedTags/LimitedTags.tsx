import React from 'react';

import { useTheme } from '@synerise/ds-core';
import { type TagProps, type TagShape } from '@synerise/ds-tag';

import * as S from '../../Tags.styles';
import { TagsDropdown } from '../TagsDropdown/TagsDropdown';

type LimitedTagsProps = {
  selected: TagProps[];
  tagShape?: TagShape;
  maxVisibleTags?: number;
  removable?: boolean;
  disabled?: boolean;
  onRemove?: (tagKey: string | number) => void;
};

export const LimitedTags = ({
  tagShape,
  selected,
  maxVisibleTags,
  removable,
  disabled,
  onRemove,
}: LimitedTagsProps) => {
  const limitedSelectedTags = selected.slice(maxVisibleTags);
  const theme = useTheme();

  return (
    <TagsDropdown
      tags={limitedSelectedTags}
      trigger={['hover']}
      tagShape={tagShape}
      removable={removable}
      onRemove={removable ? onRemove : undefined}
      disabled={disabled}
      asPill
      overlayStyle={{
        zIndex: parseInt(theme.variables['zindex-dropdown'], 10) + 1,
      }}
    >
      <S.LimitedTag
        id="limited-tags"
        shape={tagShape}
        color={theme.palette['grey-100']}
        textColor={theme.palette['grey-700']}
        name={`+${limitedSelectedTags.length}`}
        asPill
      />
    </TagsDropdown>
  );
};
