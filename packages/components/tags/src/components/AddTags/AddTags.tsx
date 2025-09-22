import React, { type ReactNode, useState } from 'react';

import Button from '@synerise/ds-button';
import { useTheme } from '@synerise/ds-core';
import { type DropdownProps } from '@synerise/ds-dropdown';
import Icon, { Add3M, SearchM } from '@synerise/ds-icon';
import Result from '@synerise/ds-result';
import SearchBar from '@synerise/ds-search-bar';
import { type TagProps, type TagShape, type TagTexts } from '@synerise/ds-tag';

import { type ActionTaken } from '../../Tags.types';
import { TagsDropdown } from '../TagsDropdown/TagsDropdown';
import * as S from './AddTags.styles';

type AddTagsProps = {
  creatable?: boolean;
  data?: TagProps[];
  selected: TagProps[];
  overlayPlacement: DropdownProps['placement'];
  overlayStyle: DropdownProps['overlayStyle'];
  texts?: TagTexts;
  maxHeight?: number;
  dropdownFooter?: ReactNode;
  tagShape?: TagShape;
  onSelectedChange?: (tags: Array<TagProps>, action: ActionTaken) => void;
  onCreate?: (name: string) => void;
};

export const AddTags = ({
  creatable,
  data,
  selected,
  overlayPlacement,
  overlayStyle,
  texts,
  tagShape,
  maxHeight,
  dropdownFooter,
  onSelectedChange,
  onCreate,
}: AddTagsProps) => {
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [isTagAddDropdownOpen, setIsTagAddDropdownOpen] = useState(false);

  const reset = () => {
    setIsTagAddDropdownOpen(false);
    setSearchQuery('');
  };

  const onPoolTagSelect = (tag: TagProps) => {
    onSelectedChange &&
      selected &&
      onSelectedChange([...selected, tag], {
        type: 'ADD',
        tag,
      });

    reset();
  };

  const onCreateNewTag = () => {
    onCreate && onCreate(searchQuery);
    reset();
  };

  const notSelectedList =
    data &&
    selected &&
    data.filter((t) => !selected.find((s) => s.id === t.id));

  const selectablePool = !searchQuery
    ? notSelectedList
    : notSelectedList &&
      notSelectedList.filter(
        (t) =>
          t.name && t.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );

  const isExactMatchFound =
    searchQuery &&
    selectablePool &&
    selectablePool.find((t) => t.name === searchQuery);

  const emptyPool = selectablePool && selectablePool.length === 0;
  const isCreatable = creatable && !isExactMatchFound && searchQuery;
  const isSeparated = !emptyPool;

  const noTagsContentLabel =
    !!notSelectedList?.length && !!searchQuery
      ? texts?.noResultsLabel
      : texts?.dropdownNoTags;

  return (
    <TagsDropdown
      tags={selectablePool}
      trigger={['click']}
      maxHeight={maxHeight}
      placement={overlayPlacement}
      open={isTagAddDropdownOpen}
      onOpenChange={setIsTagAddDropdownOpen}
      overlayStyle={overlayStyle}
      tagShape={tagShape}
      onTagClick={onPoolTagSelect}
      dropdownFooter={dropdownFooter}
      aboveTagsContent={
        isCreatable && (
          <>
            <S.CreateTagDropdownButton
              data-testid="ds-tags-create-button"
              type="ghost"
              mode="icon-label"
              onClick={onCreateNewTag}
              marginless={!isSeparated}
            >
              <Icon
                component={<Add3M />}
                size={24}
                color={theme.palette['grey-500']}
              />
              <span>{texts && texts.createTagButtonLabel}</span>
              <strong>{searchQuery}</strong>
            </S.CreateTagDropdownButton>

            {isSeparated && <S.Separator />}
          </>
        )
      }
      noTagsContent={
        <Result
          type="no-results"
          description={noTagsContentLabel || 'No results'}
        />
      }
      dropdownHeader={
        <SearchBar
          value={searchQuery}
          onSearchChange={setSearchQuery}
          placeholder={(texts && texts.searchPlaceholder) || ''}
          iconLeft={
            <Icon component={<SearchM />} color={theme.palette['grey-600']} />
          }
          onClearInput={() => setSearchQuery('')}
          clearTooltip={texts && texts.clearTooltip}
        />
      }
    >
      <Button
        type="ghost"
        mode={texts?.addButtonLabel ? 'icon-label' : 'single-icon'}
      >
        <Icon
          component={<Add3M />}
          size={24}
          color={theme.palette['grey-500']}
        />
        {texts && texts.addButtonLabel}
      </Button>
    </TagsDropdown>
  );
};
