import * as React from 'react';
import { CascaderProps, Category, Path } from 'Cascader.types';
import SearchBar from '@synerise/ds-search-bar';
import Menu from '@synerise/ds-menu';
import Icon from '@synerise/ds-icon';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { useResize } from '@synerise/ds-utils';
import * as S from './Cascader.styles';
import { filterPaths, getAllPaths, hasNestedCategories, searchCategoryWithId } from './utlis';
import BreadcrumbsList from './Elements/BreadcrumbsList/BreadcrumbsList';
import CategoriesList from './Elements/CategoriesList/CategoriesList';
import Navigation from './Elements/Navigation/Navigation';

const DROPDOWN_WIDTH_OFFSET = 18;
const VERTICAL_PADDING_OFFSET = 8;
const BREADCRUMB_ITEM_HEIGHT = 50;

const Cascader: React.FC<CascaderProps> = ({
  rootCategory,
  searchClearTooltip,
  searchInputPlaceholder,
  onCategorySelect,
  categorySuffix,
  dropdownMaxHeight,
  dropdownStyle,
  selectedCategoriesIds,
}) => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [activeCategory, setActiveCategory] = React.useState<Category>(rootCategory);
  const [paths, setPaths] = React.useState<Path[] | undefined>([]);
  const [filteredPaths, setFilteredPaths] = React.useState<Path[] | undefined>([]);
  const [enteredCategories, setEnteredCategories] = React.useState<Category[]>([]);
  const [selectedIds, setSelectedIds] = React.useState<React.ReactText[]>(selectedCategoriesIds || []);

  const dropdownRef = React.useRef<HTMLDivElement>();
  const { width, height } = useResize(dropdownRef);

  const previousCategory = enteredCategories[enteredCategories.length - 2];
  const isSearching = !!paths && searchQuery.length > 0;

  const calculateWidth = React.useMemo(() => {
    return width - DROPDOWN_WIDTH_OFFSET;
  }, [width]);

  const calculateDropdownMaxHeight = React.useMemo(() => {
    return dropdownMaxHeight ? dropdownMaxHeight - 2 * VERTICAL_PADDING_OFFSET : height - 2 * VERTICAL_PADDING_OFFSET;
  }, [dropdownMaxHeight, height]);

  const calculateVisibleRows = React.useMemo(() => {
    return Math.floor((height - VERTICAL_PADDING_OFFSET) / 50);
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
      <S.Dropdown
        visible={!isSearching || (filteredPaths && filteredPaths?.length > 0)}
        ref={dropdownRef as React.RefObject<HTMLDivElement>}
        maxHeight={dropdownMaxHeight}
        style={dropdownStyle}
      >
        <S.DropdownScroll maxHeight={calculateDropdownMaxHeight} searching={isSearching} absolute={isSearching}>
          <Menu>
            {isSearching && filteredPaths && (
              <BreadcrumbsList
                width={calculateWidth}
                visibleRows={calculateVisibleRows}
                rowHeight={BREADCRUMB_ITEM_HEIGHT}
                paths={filteredPaths}
                highlight={searchQuery}
                onBreadCrumbClick={(breadcrumb: Path): void => {
                  onItemSelect(breadcrumb as Category);
                }}
              />
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
              <CategoriesList
                rootCategory={activeCategory}
                onCategoryClick={onCategoryClick}
                suffixel={categorySuffix}
                onSuffixelClick={onItemSelect}
                selectedIds={selectedIds}
              />
            )}
          </Menu>
        </S.DropdownScroll>
      </S.Dropdown>
    </S.Wrapper>
  );
};

export default Cascader;
