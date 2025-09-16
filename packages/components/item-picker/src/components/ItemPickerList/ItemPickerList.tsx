import { debounce } from 'lodash';
import React, {
  type KeyboardEvent as ReactKeyboardEvent,
  type Ref,
  type UIEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { type VariableSizeList } from 'react-window';
import { v4 as uuid } from 'uuid';

import { useTheme } from '@synerise/ds-core';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { ArrowLeftM } from '@synerise/ds-icon';
import { itemSizes } from '@synerise/ds-list-item';
import { Text } from '@synerise/ds-typography';
import {
  focusWithArrowKeys,
  useCombinedRefs,
  useKeyboardShortcuts,
  useScrollContain,
} from '@synerise/ds-utils';

import { useDefaultTexts } from '../../hooks/useDefaultTexts';
import { type ItemPickerListProps } from '../ItemPickerNew/ItemPickerNew.types';
import type {
  BaseItemType,
  BaseSectionType,
} from '../ItemPickerNew/types/baseItemSectionType.types';
import * as S from './ItemPickerList.styles';
import {
  EmptyListMessage,
  ErrorMessage,
  ItemPickerListFooter,
  ItemPickerListRow,
  type ItemPickerListRowProps,
  ItemPickerListSkeleton,
} from './components';
import { ListSearchInput } from './components/ListSearchInput';
import {
  ITEM_SIZE,
  LIST_INNER_PADDING,
  LIST_STYLE,
  SECTION_HEADER_HEIGHT,
} from './constants';
import { useItemsInSections, useListHeight } from './hooks';
import { findSectionById, isNavKey, isTitle } from './utils';

export const ItemPickerList = <
  ItemType extends BaseItemType,
  SectionType extends BaseSectionType | undefined,
>({
  items,
  recents,
  sections,
  actions,
  texts,
  isLoading,
  selectedItem,
  scrollbarProps,
  searchBarProps,
  showItemsSectionLabel = true,
  onItemSelect,
  onRefresh,
  containerHeight,
  isVisible,
  onSectionChange,
  containerRef: forwardedRef,
  includeFooter = true,
  includeSearchBar = true,
  onLoadedData,
  isDropdown,
  ...htmlAttributes
}: ItemPickerListProps<ItemType, SectionType>) => {
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState('');

  const listRef = useRef<VariableSizeList>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const refs: Ref<HTMLDivElement>[] = [containerRef];
  if (forwardedRef) {
    refs.push(forwardedRef);
  }
  const combinedScrollRef = useCombinedRefs(...refs);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const changeLocalSearchQueryRef = useRef<((value: string) => void) | null>(
    null,
  );
  const scrollContainRef = useScrollContain<HTMLDivElement>();

  const allTexts = useDefaultTexts(texts);

  const changeSearchQuery = useCallback((query: string) => {
    changeLocalSearchQueryRef.current?.(query);
    setSearchQuery(query);
  }, []);

  const debouncedSearchQueryChange = useRef(
    debounce((query: string): void => {
      changeSearchQuery(query);
    }, 300),
  ).current;
  const classNames = useMemo(
    () => `ds-item-picker-dropdown ds-item-picker-dropdown-${uuid()}`,
    [],
  );

  const handleItemSelect = (item: ItemType) => {
    const section = findSectionById(sections, item.sectionId);

    onItemSelect?.(item, section);
  };

  const {
    currentSection,
    resetCurrentSection,
    currentPath,
    goBack,
    mergedItemsList,
    isLoadingMore,
    isLoadingMoreError,
    isLoading: isLoadingItems,
    isLoadedAll,
    isLoadingError,
    handleScrollEndReach,
    refreshItems,
    refreshEnabled,
    contentHeight,
    searchByParamConfig,
    setSearchByParamConfig,
    searchByAction,
    listActions,
    searchInAction,
    searchInItem,
    canPerformListActions,
  } = useItemsInSections({
    items,
    texts: allTexts,
    selectedItem,
    sections,
    recents,
    actions,
    searchQuery,
    handleItemSelect,
    onSectionChange,
    showItemsSectionLabel,
    changeSearchQuery,
    onLoadedData,
  });

  const handleScroll = useCallback(
    ({ currentTarget }: UIEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = currentTarget;
      if (listRef.current) {
        listRef.current.scrollTo(scrollTop);
      }

      if (isDropdown && !isVisible) {
        return;
      }

      const max = scrollHeight - clientHeight;

      if (scrollTop >= max - 20) {
        handleScrollEndReach();
      }
    },
    [handleScrollEndReach, isDropdown, isVisible],
  );

  const focusSearchInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (event: ReactKeyboardEvent) => {
    if (isNavKey(event)) {
      focusWithArrowKeys(event, classNames.split(' ')[1], () => {
        focusSearchInput();
      });
    }
  };

  const getItemSize = useCallback(
    (index: number) => {
      const item = mergedItemsList && mergedItemsList[index];
      if (isTitle(item)) {
        return ITEM_SIZE.title;
      }
      return ITEM_SIZE[item.size || itemSizes.DEFAULT];
    },
    [mergedItemsList],
  );

  const itemData: ItemPickerListRowProps['data'] = useMemo(
    () => ({
      dataSource: mergedItemsList,
      classNames,
      getItemSize,
      texts: allTexts,
      infiniteScroll: {
        isLoading: isLoadingMore,
        hasMore: !isLoadedAll,
        hasError: isLoadingMoreError,
      },
    }),
    [
      mergedItemsList,
      classNames,
      getItemSize,
      allTexts,
      isLoadingMore,
      isLoadedAll,
      isLoadingMoreError,
    ],
  );

  const handleRefresh =
    onRefresh || refreshItems
      ? () => {
          changeSearchQuery('');
          setSearchByParamConfig(undefined);
          resetCurrentSection();
          onRefresh && onRefresh();
          if (refreshItems) {
            refreshItems();
          }
        }
      : undefined;

  const { outerWrapperHeight, listWrapperHeight, offsetSpace } =
    useListHeight({
      heightConfig: containerHeight,
      calculatedContentHeight: contentHeight,
      containerRef: combinedScrollRef,
      includeFooter: includeFooter && !!handleRefresh,
      includeSearchBar,
    }) || 0;

  const isActionSection = Boolean(
    searchByAction || searchInAction || searchInItem,
  );
  const isSection = Boolean(currentSection || isActionSection);

  const listHeight =
    (isSection
      ? listWrapperHeight - SECTION_HEADER_HEIGHT
      : listWrapperHeight) - LIST_INNER_PADDING;

  const clearSearchQuery = () => {
    changeSearchQuery('');
  };

  const showMessage =
    !isLoading &&
    !isLoadingItems &&
    (mergedItemsList?.length === 0 || isLoadingError);

  const listContent = useMemo(() => {
    if (isLoadingError) {
      return <ErrorMessage texts={allTexts} />;
    }
    if (isLoading || isLoadingItems) {
      return <ItemPickerListSkeleton wrapperHeight={listWrapperHeight} />;
    }

    const getSectionLabel = () => {
      const itemsPath = currentPath || [currentSection?.text];

      const searchByActionLabel =
        searchByAction?.sectionTitle || searchByAction?.text;

      const searchInActionLabel = searchInAction?.text;
      const searchInItemLabel =
        searchInItem &&
        `${searchInAction?.renderSearchInValueText(searchInItem)}`;

      const labelParts = [
        ...itemsPath,
        searchInActionLabel,
        searchInItemLabel,
        searchByActionLabel,
      ]
        .filter(Boolean)
        .join(' - ');

      return <Text ellipsis={{ tooltip: labelParts }}>{labelParts}</Text>;
    };

    return (
      <>
        {isSection && (
          <Dropdown.BackAction
            tooltipProps={{
              title: allTexts.backTooltip,
              shortCuts: [
                '⌘',
                <Icon
                  key="hint-arrow-left"
                  size={18}
                  color={theme.palette.white}
                  component={<ArrowLeftM />}
                />,
              ],
            }}
            label={getSectionLabel()}
            onClick={goBack}
          />
        )}
        {mergedItemsList?.length === 0 ? (
          <EmptyListMessage
            buttonOnClick={() => resetCurrentSection()}
            listActions={listActions}
            hasCurrentSection={isSection}
            texts={allTexts}
            isActionSection={isActionSection}
          />
        ) : (
          <S.StyledScrollbar
            withSectionHeader={isSection}
            maxHeight={listHeight}
            data-maxheight={listHeight}
            onScroll={handleScroll}
            absolute
            withDnd={false}
            ref={scrollBarRef}
            {...scrollbarProps}
          >
            <S.ScrollContent>
              <S.StyledList
                width="100%"
                data-listheight={listHeight}
                height={listHeight}
                maxHeight={listHeight}
                itemCount={mergedItemsList.length}
                itemSize={getItemSize}
                itemData={itemData}
                style={LIST_STYLE}
                ref={listRef}
              >
                {(props) => ItemPickerListRow(props as ItemPickerListRowProps)}
              </S.StyledList>
            </S.ScrollContent>
          </S.StyledScrollbar>
        )}
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    allTexts,
    currentSection,
    currentPath,
    getItemSize,
    handleScroll,
    isLoading,
    isLoadingError,
    isLoadingItems,
    itemData,
    listHeight,
    goBack,
    mergedItemsList.length,
    scrollbarProps,
    searchQuery,
    listWrapperHeight,
  ]);

  useEffect(() => {
    setTimeout(focusSearchInput, 0);
  }, [isLoading, isLoadingItems, isLoadingMore, focusSearchInput]);

  useEffect(() => {
    if (isVisible) {
      resetCurrentSection();
      clearSearchQuery();
      setSearchByParamConfig(undefined);
      setTimeout(focusSearchInput, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, focusSearchInput]);

  useEffect(() => {
    if (scrollBarRef.current && listRef.current) {
      scrollBarRef.current.scrollTo({ top: 0 });
      listRef.current.resetAfterIndex(0);
      setTimeout(focusSearchInput, 0);
    }
  }, [
    searchByAction,
    searchByParamConfig,
    searchInAction,
    searchInItem,
    currentSection,
    focusSearchInput,
  ]);

  useEffect(() => {
    listRef.current && listRef.current.resetAfterIndex(0);
  }, [mergedItemsList]);

  useKeyboardShortcuts({
    ArrowLeft: (event: KeyboardEvent) => {
      if (!combinedScrollRef.current?.offsetParent) {
        return;
      }
      const isMetaOrCtrlKey = event.metaKey || event.ctrlKey;
      if (isMetaOrCtrlKey) {
        event.preventDefault();
        event.stopPropagation();
        goBack();
        return;
      }
    },
    Escape: (event: KeyboardEvent) => {
      if (!combinedScrollRef.current?.offsetParent) {
        return;
      }
      if (searchQuery) {
        event.preventDefault();
        event.stopPropagation();
        clearSearchQuery();
        return;
      }

      if (searchByParamConfig) {
        event.preventDefault();
        event.stopPropagation();
        setSearchByParamConfig(undefined);
      }
    },
  });

  const containerHeightMode =
    !containerHeight || typeof containerHeight === 'object'
      ? 'preset'
      : containerHeight;
  return (
    <S.ListContainer
      data-testid="ds-item-picker-dropdown"
      ref={combinedScrollRef}
      onKeyDown={handleKeyDown}
      containerHeightMode={containerHeightMode}
      wrapperHeight={outerWrapperHeight}
      {...htmlAttributes}
    >
      {includeSearchBar && (
        <ListSearchInput
          clearSearchQuery={clearSearchQuery}
          searchByParamConfig={searchByParamConfig}
          setSearchByParamConfig={setSearchByParamConfig}
          searchBarProps={searchBarProps}
          debouncedChangeSearchQuery={debouncedSearchQueryChange}
          inputRef={inputRef}
          changeLocalSearchQueryRef={changeLocalSearchQueryRef}
          allTexts={allTexts}
          canPerformListActions={canPerformListActions}
        />
      )}
      <S.ListWrapper
        data-testid="list-wrapper"
        ref={scrollContainRef}
        wrapperHeight={listWrapperHeight}
        centered={showMessage}
        offsetSpace={offsetSpace}
      >
        {listContent}
      </S.ListWrapper>
      {includeFooter && (
        <ItemPickerListFooter
          data-testid="footer-wrapper"
          texts={allTexts}
          onRefresh={handleRefresh}
          refreshButtonProps={{ disabled: !refreshEnabled }}
        />
      )}
    </S.ListContainer>
  );
};

export default ItemPickerList;
