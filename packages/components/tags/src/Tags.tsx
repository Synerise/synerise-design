import React from 'react';

import InformationCard from '@synerise/ds-information-card';
import Tag, { useDefaultTexts } from '@synerise/ds-tag';

import * as S from './Tags.styles';
import type { TagsProps } from './Tags.types';
import { AddTags } from './components/AddTags/AddTags';
import { LimitedTags } from './components/LimitedTags/LimitedTags';

const Tags = ({
  data = [],
  tagShape,
  onSelectedChange,
  disabled,
  removable,
  addable,
  creatable,
  texts,
  selected = [],
  style,
  className,
  onCreate,
  title,
  maxHeight,
  overlayStyle,
  overlayPlacement,
  asPill,
  dropdownFooter,
  addButtonType,
  maxVisibleTags,
}: TagsProps) => {
  const isMaxVisibleTagsDefined = typeof maxVisibleTags === 'number';
  const allTexts = useDefaultTexts(texts);

  const visibleSelectedTags = isMaxVisibleTagsDefined
    ? selected.slice(0, maxVisibleTags)
    : selected;

  const areLimitedTags =
    isMaxVisibleTagsDefined && selected.length > maxVisibleTags;

  const onRemove = (tagKey: string | number) => {
    if (!onSelectedChange || !selected) {
      return;
    }

    const removedTag = selected.find((tag) => tag.id === tagKey);

    if (!removedTag) {
      return;
    }

    onSelectedChange(
      selected.filter((tag) => tag.id !== tagKey),
      {
        type: 'REMOVE',
        tag: removedTag,
      },
    );
  };

  return (
    <S.Container
      className={`ds-tags ${className || ''}`}
      style={style}
      data-testid="tags"
    >
      {title && <S.Title shape={tagShape}>{title}</S.Title>}
      <S.TagsWrapper>
        <S.SelectedTags>
          {visibleSelectedTags &&
            visibleSelectedTags.map((tag) => (
              <S.TagOverflow>
                <Tag
                  key={tag.id}
                  shape={tagShape}
                  removable={removable}
                  onRemove={removable ? onRemove : undefined}
                  disabled={disabled}
                  texts={allTexts}
                  asPill={asPill}
                  {...tag}
                  tooltipProps={
                    tag.informationCardProps
                      ? {
                          render: () => (
                            <InformationCard
                              title={tag.name}
                              {...tag.informationCardProps}
                              asTooltip
                            />
                          ),
                          placement: 'bottomLeft',
                          ...tag.tooltipProps,
                        }
                      : undefined
                  }
                />
              </S.TagOverflow>
            ))}
          {areLimitedTags && (
            <LimitedTags
              selected={selected}
              maxVisibleTags={maxVisibleTags}
              tagShape={tagShape}
              removable={removable}
              onRemove={removable ? onRemove : undefined}
              disabled={disabled}
              asPill={asPill}
            />
          )}
          {addable && (
            <AddTags
              data={data}
              selected={selected}
              creatable={creatable}
              overlayPlacement={overlayPlacement}
              overlayStyle={overlayStyle}
              texts={allTexts}
              tagShape={tagShape}
              maxHeight={maxHeight}
              dropdownFooter={dropdownFooter}
              onSelectedChange={onSelectedChange}
              onCreate={onCreate}
              addButtonType={addButtonType}
            />
          )}
        </S.SelectedTags>
      </S.TagsWrapper>
    </S.Container>
  );
};

export default Tags;
