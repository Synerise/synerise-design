import React, {
  useRef,
  useState,
  UIEvent,
  useMemo,
  useEffect,
  KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  RefObject,
  Ref,
} from 'react';

import { VariableSizeList } from 'react-window';
import { v4 as uuid } from 'uuid';
import { debounce } from 'lodash';

import Dropdown from '@synerise/ds-dropdown';
import { focusWithArrowKeys, useCombinedRefs, useKeyboardShortcuts, useScrollContain } from '@synerise/ds-utils';
import { itemSizes } from '@synerise/ds-list-item';
import Icon, { ArrowLeftM, SearchM } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';

import { useDefaultTexts } from '../../hooks/useDefaultTexts';
import type { BaseItemType, BaseSectionType } from '../ItemPickerNew/ItemPickerNew.types';

import * as S from './ItemPickerList.styles';
import type { ItemPickerListProps } from './ItemPickerList.types';
import { useItemsInSections, useListHeight } from './hooks';
import { ITEM_SIZE, LIST_INNER_PADDING, LIST_STYLE, SECTION_HEADER_HEIGHT } from './constants';
import { isTitle, isNavKey } from './utils';
import {
  ItemPickerListFooter,
  ItemPickerListRow,
  ItemPickerListSkeleton,
  ItemPickerListRowProps,
  EmptyListMessage,
  ErrorMessage,
} from './components';

export const ItemPickerList = <ItemType extends BaseItemType, SectionType extends BaseSectionType | undefined>({
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
  ...htmlAttributes
}: ItemPickerListProps<ItemType, SectionType>) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const listRef = useRef<VariableSizeList>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const refs: Ref<HTMLDivElement>[] = [containerRef];
  if (forwardedRef) refs.push(forwardedRef);
  const combinedScrollRef = useCombinedRefs(...refs);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollContainRef = useScrollContain<HTMLDivElement>();

  const allTexts = useDefaultTexts(texts);

  const debouncedSearchQueryChange = useRef(
    debounce((query: string): void => {
      setSearchQuery(query);
      setLocalSearchQuery(query);
    }, 300)
  ).current;
  const classNames = useMemo(() => `ds-item-picker-dropdown ds-item-picker-dropdown-${uuid()}`, []);

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
  } = useItemsInSections({
    items,
    texts: allTexts,
    selectedItem,
    sections,
    recents,
    actions,
    searchQuery,
    handleItemSelect: onItemSelect,
    onSectionChange,
    showItemsSectionLabel,
  });

  const handleScroll = ({ currentTarget }: UIEvent) => {
    const { scrollTop } = currentTarget;
    if (listRef.current) {
      listRef.current.scrollTo(scrollTop);
    }
  };

  const focusSearchInput = useCallback(() => {
    // eslint-disable-next-line no-unused-expressions
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
      if (isTitle(item)) return ITEM_SIZE.title;
      return ITEM_SIZE[itemSizes.DEFAULT];
    },
    [mergedItemsList]
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
    [mergedItemsList, classNames, getItemSize, allTexts, isLoadingMore, isLoadedAll, isLoadingMoreError]
  );

  const handleRefresh =
    onRefresh || refreshItems
      ? () => {
          setSearchQuery('');
          setLocalSearchQuery('');
          resetCurrentSection();
          if (refreshItems) {
            refreshItems();
            return;
          }
          onRefresh && onRefresh();
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
  const listHeight =
    (currentSection ? listWrapperHeight - SECTION_HEADER_HEIGHT : listWrapperHeight) - LIST_INNER_PADDING;

  const clearSearchQuery = () => {
    setLocalSearchQuery('');
    setSearchQuery('');
  };
  const handleChangeSearchQuery = (newQuery: string) => {
    setLocalSearchQuery(newQuery);
    debouncedSearchQueryChange(newQuery);
  };

  const showMessage = !isLoading && !isLoadingItems && (mergedItemsList?.length === 0 || isLoadingError);

  const listContent = useMemo(() => {
    if (isLoadingError) {
      return <ErrorMessage texts={allTexts} />;
    }
    if (isLoading || isLoadingItems) {
      return <ItemPickerListSkeleton wrapperHeight={listWrapperHeight} />;
    }
    return (
      <>
        {currentSection && (
          <Dropdown.BackAction
            tooltipProps={{
              title: allTexts.backTooltip,
              shortCuts: [
                '⌘',
                <Icon key="hint-arrow-left" size={18} color={theme.palette.white} component={<ArrowLeftM />} />,
              ],
            }}
            label={currentPath ? currentPath.join(' - ') : currentSection.text}
            onClick={goBack}
          />
        )}
        {mergedItemsList?.length === 0 ? (
          <EmptyListMessage
            buttonOnClick={() => resetCurrentSection()}
            searchQuery={searchQuery}
            hasCurrentSection={!!currentSection}
            texts={allTexts}
          />
        ) : (
          <S.StyledScrollbar
            withSectionHeader={!!currentSection}
            maxHeight={listHeight}
            data-maxheight={listHeight}
            onScroll={handleScroll}
            absolute
            onYReachEnd={handleScrollEndReach}
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
                {props => ItemPickerListRow(props as ItemPickerListRowProps)}
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
    handleScrollEndReach,
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
    if (isVisible) {
      resetCurrentSection();
      clearSearchQuery();
      setTimeout(focusSearchInput, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  useEffect(() => {
    if (scrollBarRef.current && listRef.current) {
      scrollBarRef.current.scrollTo({ top: 0 });
      listRef.current.resetAfterIndex(0);
    }
  }, [currentSection]);

  useEffect(() => {
    listRef.current && listRef.current.resetAfterIndex(0);
  }, [mergedItemsList]);

  useKeyboardShortcuts({
    ArrowLeft: (event: KeyboardEvent) => {
      if (!combinedScrollRef.current?.offsetParent) {
        return;
      }
      (event.metaKey || event.ctrlKey) && currentSection && resetCurrentSection();
      event.preventDefault();
    },
    Escape: (event: KeyboardEvent) => {
      if (!combinedScrollRef.current?.offsetParent) {
        return;
      }
      event.preventDefault();
      if (searchQuery) {
        clearSearchQuery();
      }
    },
  });

  const containerHeightMode = !containerHeight || typeof containerHeight === 'object' ? 'preset' : containerHeight;
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
        <S.SearchWrapper data-testid="search-wrapper">
          <Dropdown.SearchInput
            iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
            placeholder={allTexts.searchPlaceholder}
            {...searchBarProps}
            clearTooltip={allTexts.clearSearchTooltip}
            clearTooltipProps={{ shortCuts: 'ESC' }}
            onClearInput={clearSearchQuery}
            handleInputRef={(ref: RefObject<HTMLInputElement | null>) => {
              inputRef.current = ref.current;
            }}
            onSearchChange={handleChangeSearchQuery}
            value={localSearchQuery}
          />
        </S.SearchWrapper>
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
