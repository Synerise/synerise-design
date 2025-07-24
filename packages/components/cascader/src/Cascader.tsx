import React, {
  type ReactText,
  type RefObject,
  type SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { theme } from '@synerise/ds-core';
import Icon, { SearchM } from '@synerise/ds-icon';
import SearchBar from '@synerise/ds-search-bar';
import { useResize } from '@synerise/ds-utils';

import * as S from './Cascader.styles';
import { type CascaderProps, type Category, type Path } from './Cascader.types';
import BreadcrumbsList from './Elements/BreadcrumbsList/BreadcrumbsList';
import CategoriesList from './Elements/CategoriesList/CategoriesList';
import Navigation from './Elements/Navigation/Navigation';
import {
  filterPaths,
  getAllPaths,
  hasNestedCategories,
  searchCategoryWithId,
} from './utils';

const VERTICAL_PADDING_OFFSET = 8;
const BREADCRUMB_ITEM_HEIGHT = 50;
const CATEGORY_ITEM_HEIGHT = 32;

export const Cascader = ({
  rootCategory,
  searchClearTooltip,
  searchInputPlaceholder,
  onCategorySelect,
  categorySuffix,
  maxHeight,
  contentStyles,
  selectedCategoriesIds,
}: CascaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>(rootCategory);
  const [paths, setPaths] = useState<Path[] | undefined>([]);
  const [filteredPaths, setFilteredPaths] = useState<Path[] | undefined>([]);
  const [enteredCategories, setEnteredCategories] = useState<Category[]>([]);
  const [scrollTop, setScrollTop] = useState(0);
  const [selectedIds, setSelectedIds] = useState<ReactText[]>(
    selectedCategoriesIds || [],
  );

  const searchResultsContainer = useRef<HTMLDivElement>();
  const categoriesContainer = useRef<HTMLDivElement>();

  const { height } = useResize(searchResultsContainer);
  const previousCategory = enteredCategories[enteredCategories.length - 2];
  const isSearching = !!paths && searchQuery.length > 0;

  const categoriesMaxHeight = maxHeight
    ? Math.floor(
        (maxHeight - Number(categoriesContainer?.current?.offsetTop)) /
          CATEGORY_ITEM_HEIGHT,
      ) *
        CATEGORY_ITEM_HEIGHT +
      VERTICAL_PADDING_OFFSET
    : undefined;
  const calculateVisibleRows = useMemo(() => {
    return Math.floor(
      (height - VERTICAL_PADDING_OFFSET) / BREADCRUMB_ITEM_HEIGHT,
    );
  }, [height]);

  useEffect(() => {
    const allPaths = getAllPaths(rootCategory, []);
    setPaths(allPaths);
    if (activeCategory.id === rootCategory.id || !activeCategory.id) {
      setActiveCategory(rootCategory);
    }
  }, [rootCategory, activeCategory.id]);

  useEffect(() => {
    setSelectedIds(selectedCategoriesIds);
  }, [selectedCategoriesIds]);

  const onItemSelect = (item: Category) => {
    let newSelectedList;
    const itemAlreadySelected = selectedIds.indexOf(item.id) !== -1;
    if (!itemAlreadySelected) {
      newSelectedList = [...selectedIds, item.id];
      onCategorySelect && onCategorySelect(item, true);
    } else {
      newSelectedList = selectedIds.filter((id) => id !== item.id);
      onCategorySelect && onCategorySelect(item, false);
    }
    setSelectedIds([...newSelectedList]);
  };

  const onCategoryClick = (category: Category) => {
    const entered: Category = {
      id: category.id,
      name: category.name,
      path: category.path,
    };
    const updatedEnteredCategories = [...enteredCategories, entered];
    const hasMoreCategories = hasNestedCategories(category);
    if (hasMoreCategories) {
      setActiveCategory(category);
      setEnteredCategories(updatedEnteredCategories);
    } else {
      onItemSelect(category);
    }
  };

  const onPathClick = useCallback(
    (pathName: string) => {
      const chosenCategory = enteredCategories.find(
        (enteredCategory) => enteredCategory.name === pathName,
      );
      let updatedEnteredCategories;
      if (chosenCategory) {
        updatedEnteredCategories = enteredCategories.slice(
          0,
          enteredCategories.indexOf(chosenCategory) + 1,
        );
      }
      if (chosenCategory?.id) {
        const nextActiveCategory = searchCategoryWithId(
          rootCategory,
          chosenCategory.id,
        );
        if (nextActiveCategory) {
          setActiveCategory(nextActiveCategory);
        }
      } else {
        setActiveCategory(rootCategory);
      }
      setEnteredCategories(updatedEnteredCategories || []);
    },
    [rootCategory, enteredCategories],
  );

  const onHomeIconClick = useCallback(() => {
    setActiveCategory(rootCategory);
    setEnteredCategories([]);
  }, [rootCategory]);

  const filterPathsBySearchQuery = useCallback(
    (value: string) => {
      if (paths) {
        const filtered = filterPaths(paths, value.toLowerCase());
        setFilteredPaths(filtered);
      } else {
        setFilteredPaths([]);
      }
    },
    [paths],
  );

  const handleBreadCrumbClick = (breadcrumb: Path) => {
    const selectedCategory = searchCategoryWithId(rootCategory, breadcrumb?.id);
    selectedCategory
      ? onItemSelect(selectedCategory)
      : onItemSelect(breadcrumb as Category);
  };

  const backActionVisible = useMemo(
    () =>
      !searchQuery &&
      !!previousCategory &&
      !!previousCategory.name &&
      enteredCategories.length > 1,
    [enteredCategories.length, previousCategory, searchQuery],
  );

  return (
    <S.Wrapper className="ds-cascader">
      <S.InputWrapper>
        <SearchBar
          onSearchChange={(value: string) => {
            setSearchQuery(value);
            filterPathsBySearchQuery(value);
          }}
          placeholder={searchInputPlaceholder || ''}
          value={searchQuery}
          iconLeft={
            <Icon component={<SearchM />} color={theme.palette['grey-600']} />
          }
          onClearInput={() => setSearchQuery('')}
          clearTooltip={searchClearTooltip}
        />
      </S.InputWrapper>
      <S.SearchResults
        visible={!isSearching || (filteredPaths && filteredPaths?.length > 0)}
        ref={searchResultsContainer as RefObject<HTMLDivElement>}
        style={contentStyles}
      >
        {isSearching && filteredPaths && (
          <S.CascaderScrollbar
            maxHeight={maxHeight}
            searching={isSearching}
            absolute={isSearching}
            onScroll={({ currentTarget }: SyntheticEvent) => {
              setScrollTop(currentTarget.scrollTop);
            }}
          >
            <BreadcrumbsList
              width="calc(100% - 8px)"
              visibleRows={calculateVisibleRows}
              rowHeight={BREADCRUMB_ITEM_HEIGHT}
              paths={filteredPaths}
              highlight={searchQuery}
              onBreadCrumbClick={handleBreadCrumbClick}
              scrollTop={scrollTop}
              selectedIds={selectedIds}
            />
          </S.CascaderScrollbar>
        )}
        <Navigation
          backActionVisible={backActionVisible}
          breadcrumbVisible={!searchQuery && !!activeCategory.path}
          onPathClick={onPathClick}
          onHomeIconClick={onHomeIconClick}
          previousCategory={previousCategory}
          activeCategory={activeCategory}
        />

        {!searchQuery && (
          <div ref={categoriesContainer as RefObject<HTMLDivElement>}>
            <S.CascaderScrollbar
              maxHeight={categoriesMaxHeight}
              searching={isSearching}
              absolute={isSearching}
              onScroll={({ currentTarget }: SyntheticEvent) => {
                setScrollTop(currentTarget.scrollTop);
              }}
            >
              <CategoriesList
                rootCategory={activeCategory}
                onCategoryClick={onCategoryClick}
                suffixel={categorySuffix}
                onSuffixelClick={onItemSelect}
                selectedIds={selectedIds}
              />
            </S.CascaderScrollbar>
          </div>
        )}
      </S.SearchResults>
    </S.Wrapper>
  );
};

export default Cascader;
