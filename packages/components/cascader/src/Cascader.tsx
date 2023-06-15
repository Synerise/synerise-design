import * as React from 'react';
import { CascaderProps, Category, Path } from 'Cascader.types';
import SearchBar from '@synerise/ds-search-bar';
import Menu from '@synerise/ds-menu';
import Icon, { SearchM } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import { useResize } from '@synerise/ds-utils';
import * as S from './Cascader.styles';
import { filterPaths, getAllPaths, hasNestedCategories, searchCategoryWithId } from './utlis';
import BreadcrumbsList from './Elements/BreadcrumbsList/BreadcrumbsList';
import CategoriesList from './Elements/CategoriesList/CategoriesList';
import Navigation from './Elements/Navigation/Navigation';

const VERTICAL_PADDING_OFFSET = 8;
const BREADCRUMB_ITEM_HEIGHT = 50;
const CATEGORY_ITEM_HEIGHT = 32;

const Cascader: React.FC<CascaderProps> = ({
  rootCategory,
  searchClearTooltip,
  searchInputPlaceholder,
  onCategorySelect,
  categorySuffix,
  maxHeight,
  contentStyles,
  selectedCategoriesIds,
}) => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [activeCategory, setActiveCategory] = React.useState<Category>(rootCategory);
  const [paths, setPaths] = React.useState<Path[] | undefined>([]);
  const [filteredPaths, setFilteredPaths] = React.useState<Path[] | undefined>([]);
  const [enteredCategories, setEnteredCategories] = React.useState<Category[]>([]);
  const [scrollTop, setScrollTop] = React.useState<number>(0);
  const [selectedIds, setSelectedIds] = React.useState<React.ReactText[]>(selectedCategoriesIds || []);

  const searchResultsContainer = React.useRef<HTMLDivElement>();
  const categoriesContainer = React.useRef<HTMLDivElement>();

  const { height } = useResize(searchResultsContainer);
  const previousCategory = enteredCategories[enteredCategories.length - 2];
  const isSearching = !!paths && searchQuery.length > 0;

  const categoriesMaxHeight = maxHeight
    ? Math.floor((maxHeight - Number(categoriesContainer?.current?.offsetTop)) / CATEGORY_ITEM_HEIGHT) *
        CATEGORY_ITEM_HEIGHT +
      VERTICAL_PADDING_OFFSET
    : undefined;
  const calculateVisibleRows = React.useMemo(() => {
    return Math.floor((height - VERTICAL_PADDING_OFFSET) / BREADCRUMB_ITEM_HEIGHT);
  }, [height]);

  React.useEffect(() => {
    const allPaths = getAllPaths(rootCategory, []);
    setPaths(allPaths);
    if (activeCategory.id === rootCategory.id || !activeCategory.id) {
      setActiveCategory(rootCategory);
    }
  }, [rootCategory, activeCategory.id]);

  React.useEffect(() => {
    setSelectedIds(selectedCategoriesIds);
  }, [selectedCategoriesIds]);

  const onItemSelect = (item: Category): void => {
    let newSelectedList;
    const itemAlreadySelected = selectedIds.indexOf(item.id) !== -1;
    if (!itemAlreadySelected) {
      newSelectedList = [...selectedIds, item.id];
      onCategorySelect && onCategorySelect(item, true);
    } else {
      newSelectedList = selectedIds.filter(id => id !== item.id);
      onCategorySelect && onCategorySelect(item, false);
    }
    setSelectedIds([...newSelectedList]);
  };

  const onCategoryClick = (category: Category): void => {
    const entered = { id: category.id, name: category.name, path: category.path };
    const updatedEnteredCategories = [...enteredCategories, entered];
    const hasMoreCategories = hasNestedCategories(category);
    if (hasMoreCategories) {
      setActiveCategory(category);
      setEnteredCategories(updatedEnteredCategories);
    } else {
      onItemSelect(category);
    }
  };

  const onPathClick = React.useCallback(
    (pathName: string) => {
      const chosenCategory = enteredCategories.find(enteredCategory => enteredCategory.name === pathName);
      let updatedEnteredCategories;
      if (chosenCategory) {
        updatedEnteredCategories = enteredCategories.slice(0, enteredCategories.indexOf(chosenCategory) + 1);
      }
      if (chosenCategory?.id) {
        const nextActiveCategory = searchCategoryWithId(rootCategory, chosenCategory.id);
        if (nextActiveCategory) {
          setActiveCategory(nextActiveCategory);
        }
      } else {
        setActiveCategory(rootCategory);
      }
      setEnteredCategories(updatedEnteredCategories || []);
    },
    [rootCategory, enteredCategories]
  );

  const onHomeIconClick = React.useCallback(() => {
    setActiveCategory(rootCategory);
    setEnteredCategories([]);
  }, [rootCategory]);

  const filterPathsBySearchQuery = React.useCallback(
    (value: string) => {
      if (paths) {
        const filtered = filterPaths(paths, value.toLowerCase());
        setFilteredPaths(filtered);
      } else setFilteredPaths([]);
    },
    [paths]
  );
  return (
    <S.Wrapper className="ds-cascader">
      <S.InputWrapper>
        <SearchBar
          onSearchChange={(value: string): void => {
            setSearchQuery(value);
            filterPathsBySearchQuery(value);
          }}
          placeholder={searchInputPlaceholder || ''}
          value={searchQuery}
          iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
          onClearInput={(): void => setSearchQuery('')}
          clearTooltip={searchClearTooltip}
        />
      </S.InputWrapper>
      <S.SearchResults
        visible={!isSearching || (filteredPaths && filteredPaths?.length > 0)}
        ref={searchResultsContainer as React.RefObject<HTMLDivElement>}
        style={contentStyles}
      >
        <Menu>
          {isSearching && filteredPaths && (
            <S.CascaderScrollbar
              maxHeight={maxHeight}
              searching={isSearching}
              absolute={isSearching}
              onScroll={({ currentTarget }: React.SyntheticEvent): void => {
                setScrollTop(currentTarget.scrollTop);
              }}
            >
              <BreadcrumbsList
                width="calc(100% - 8px)"
                visibleRows={calculateVisibleRows}
                rowHeight={BREADCRUMB_ITEM_HEIGHT}
                paths={filteredPaths}
                highlight={searchQuery}
                onBreadCrumbClick={(breadcrumb: Path): void => {
                  const selectedCategory = searchCategoryWithId(rootCategory, breadcrumb?.id);
                  selectedCategory ? onItemSelect(selectedCategory) : onItemSelect(breadcrumb as Category);
                }}
                scrollTop={scrollTop}
              />
            </S.CascaderScrollbar>
          )}
          <Navigation
            backActionVisible={
              !searchQuery && !!previousCategory && !!previousCategory.name && enteredCategories.length > 1
            }
            breadcrumbVisible={!searchQuery && !!activeCategory.path}
            onPathClick={onPathClick}
            onHomeIconClick={onHomeIconClick}
            previousCategory={previousCategory}
            activeCategory={activeCategory}
          />
          {!searchQuery && (
            <div ref={categoriesContainer as React.RefObject<HTMLDivElement>}>
              <S.CascaderScrollbar
                maxHeight={categoriesMaxHeight}
                searching={isSearching}
                absolute={isSearching}
                onScroll={({ currentTarget }: React.SyntheticEvent): void => {
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
        </Menu>
      </S.SearchResults>
    </S.Wrapper>
  );
};

export default Cascader;
