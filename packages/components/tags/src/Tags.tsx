import React from 'react';

import Button from '@synerise/ds-button';
import { useTheme } from '@synerise/ds-core';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { Add3M, SearchM, SettingsM } from '@synerise/ds-icon';
import InformationCard from '@synerise/ds-information-card';
import Result from '@synerise/ds-result';
import Tag, { type TagProps } from '@synerise/ds-tag';

import * as S from './Tags.styles';
import type { TagsProps } from './Tags.types';

const Tags = ({
  data = [],
  tagShape,
  onSelectedChange,
  disabled,
  removable,
  addable,
  creatable,
  texts = {},
  selected = [],
  style,
  className,
  manageLink,
  onCreate,
  title,
  maxHeight,
  overlayStyle,
  overlayPlacement,
  asPill,
  onManageTagClick,
}: TagsProps) => {
  const [isAdding, setAddingState] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const theme = useTheme();

  const onRemove = (tagKey: string | number): void => {
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
  const isSeperated = !(!manageLink && emptyPool);

  const reset = (): void => {
    setAddingState(false);
    setSearchQuery('');
  };

  const onPoolTagSelect = (tag: TagProps): void => {
    onSelectedChange &&
      selected &&
      onSelectedChange([...selected, tag], {
        type: 'ADD',
        tag,
      });

    reset();
  };

  const onCreateNewTag = (): void => {
    onCreate && onCreate(searchQuery);
    reset();
  };

  const dropdownOverlay = (
    <S.Overlay data-testid="dropdown">
      <S.DropdownSearch
        value={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder={(texts && texts.searchPlaceholder) || ''}
        iconLeft={
          <Icon component={<SearchM />} color={theme.palette['grey-600']} />
        }
        onClearInput={(): void => setSearchQuery('')}
        clearTooltip={texts && texts.clearTooltip}
      />
      <S.DropdownContainer maxHeight={maxHeight} style={{ padding: '12px' }}>
        {isCreatable && (
          <>
            <S.CreateTagDropdownButton
              data-testid="ds-tags-create-button"
              type="ghost"
              onClick={onCreateNewTag}
              marginless={!isSeperated}
            >
              <Icon
                component={<Add3M />}
                size={24}
                color={theme.palette['grey-500']}
              />
              <span>{texts && texts.createTagButtonLabel}</span>
              <strong>{searchQuery}</strong>
            </S.CreateTagDropdownButton>

            {isSeperated && <S.Seperator />}
          </>
        )}

        {!emptyPool && (
          <S.DropdownTagsContainer
            data-testid="ds-tags-available-tags"
            isCreatable={!!isCreatable}
          >
            {selectablePool &&
              selectablePool.map((tag) => (
                <Tag
                  {...tag}
                  key={tag.id}
                  shape={tagShape}
                  onClick={(): void => onPoolTagSelect(tag)}
                  texts={texts}
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
              ))}
          </S.DropdownTagsContainer>
        )}

        {emptyPool && !isCreatable && !manageLink && (
          <S.DropdownNoTags>{texts && texts.dropdownNoTags}</S.DropdownNoTags>
        )}
        {emptyPool && isCreatable && (
          <Result
            type="no-results"
            noSearchResults
            description={texts?.noResultsLabel || 'No results'}
          />
        )}
      </S.DropdownContainer>
      {manageLink && selectablePool && !selectablePool.length && (
        <Dropdown.BottomAction
          onClickAction={(): void => {
            onManageTagClick && onManageTagClick();
          }}
          style={{ padding: '0 8px', cursor: 'auto' }}
        >
          <S.ManageLinkButton
            type="ghost"
            mode="icon-label"
            href={manageLink}
            onlyChild={!!(emptyPool && !isCreatable)}
          >
            <Icon
              component={<SettingsM />}
              size={20}
              color={theme.palette['grey-500']}
            />{' '}
            {texts && texts.manageLinkLabel}
          </S.ManageLinkButton>
        </Dropdown.BottomAction>
      )}
    </S.Overlay>
  );

  return (
    <S.Container
      className={`ds-tags ${className || ''}`}
      style={style}
      data-testid="tags"
    >
      {title && <S.Title shape={tagShape}>{title}</S.Title>}
      <S.TagsWrapper>
        <S.SelectedTags>
          {selected &&
            selected.map((tag) => (
              <S.TagOverflow>
                <Tag
                  key={tag.id}
                  shape={tagShape}
                  removable={removable}
                  onRemove={removable ? onRemove : undefined}
                  disabled={disabled}
                  texts={texts}
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
          {addable && (
            <Dropdown
              trigger={['click']}
              placement={overlayPlacement}
              visible={isAdding}
              onVisibleChange={setAddingState}
              overlay={dropdownOverlay}
              overlayStyle={overlayStyle}
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
            </Dropdown>
          )}
        </S.SelectedTags>
      </S.TagsWrapper>
    </S.Container>
  );
};

export default Tags;
