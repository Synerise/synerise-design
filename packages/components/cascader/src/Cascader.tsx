import * as React from 'react';
import { CascaderProps, Category, Path } from 'Cascader.types';
import SearchBar from '@synerise/ds-search-bar';
import Menu from '@synerise/ds-menu';
import Icon from '@synerise/ds-icon';
import { HomeM } from '@synerise/ds-icon/dist/icons';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Divider from '@synerise/ds-divider';
import { useResize } from '@synerise/ds-utils';
import BackAction from './Elements/BackAction/BackAction';
import * as S from './Cascader.styles';
import { filterPaths, getAllPaths, hasNestedCategories, searchCategoryWithId } from './utlis';
import BreadcrumbsList from './Elements/BreadcrumbsList/BreadcrumbsList';
import CategoriesList from './Elements/CategoriesList/CategoriesList';

const DROPDOWN_WIDTH_OFFSET = 18;
const DROPDOWN_HEIGHT_OFFSET = 8;
const BREADCRUMB_ITEM_HEIGHT = 50;

const Cascader: React.FC<CascaderProps> = ({
  rootCategory,
  disabled,
  searchClearTooltip,
  searchInputPlaceholder,
  dropdownStyle,
  onPathSelect,
  categorySuffix,
}) => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [activeCategory, setActiveCategory] = React.useState<Category>(rootCategory);
  const [paths, setPaths] = React.useState<Path[] | undefined>([]);
  const [filteredPaths, setFilteredPaths] = React.useState<Path[] | undefined>([]);
  const [enteredCategories, setEnteredCategories] = React.useState<Category[]>([]);
  const [selectedIds, setSelectedIds] = React.useState<React.ReactText[]>([]);

  const dropdownRef = React.useRef<HTMLDivElement>();
  const { width, height } = useResize(dropdownRef);

  const previousCategory = enteredCategories[enteredCategories.length - 2];
  const isSearching = !!paths && searchQuery.length > 0;

  const calculateWidth = React.useMemo(() => {
    return width - DROPDOWN_WIDTH_OFFSET;
  }, [width]);

  const calculateVisibleRows = React.useMemo(() => {
    return Math.floor((height - DROPDOWN_HEIGHT_OFFSET) / 50);
  }, [height]);

  React.useEffect(() => {
    const allPaths = getAllPaths(rootCategory, []);
    setPaths(allPaths);
  }, [rootCategory]);

  const onItemSelect = (item: Category): void => {
    let newSelectedList;
    const itemAlreadySelected = selectedIds.indexOf(item.id) !== -1;
    if (!itemAlreadySelected) {
      newSelectedList = [...selectedIds, item.id];
      onPathSelect && onPathSelect(item, true);
    } else {
      newSelectedList = selectedIds.filter(id => id !== item.id);
      onPathSelect && onPathSelect(item, false);
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
    item => {
      const chosenCategory = enteredCategories.find(enteredCategory => enteredCategory.name === item);
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
          disabled={disabled}
          placeholder={searchInputPlaceholder || ''}
          value={searchQuery}
          iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
          onClearInput={(): void => setSearchQuery('')}
          clearTooltip={searchClearTooltip}
        />
      </S.InputWrapper>
      <S.Dropdown
        visible={!isSearching || (filteredPaths && filteredPaths?.length > 0)}
        searching={isSearching}
        ref={dropdownRef as React.RefObject<HTMLDivElement>}
        style={dropdownStyle}
      >
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
          {!searchQuery && activeCategory.path && (
            <>
              <Menu.Breadcrumb
                path={activeCategory.path}
                onPathClick={onPathClick}
                gradientOverlap={activeCategory.path.length > 1}
                highlightActivePath
                prefixel={
                  <S.BreadcrumbPrefix onClick={onHomeIconClick}>
                    <Icon component={<HomeM />} />
                  </S.BreadcrumbPrefix>
                }
                compact
              />
              <S.DividerContainer>
                <Divider dashed />
              </S.DividerContainer>
            </>
          )}
          {!searchQuery && previousCategory && previousCategory.name && enteredCategories.length > 1 && (
            <BackAction
              label={previousCategory.name}
              onClick={(): void => {
                onPathClick(previousCategory.name);
              }}
            />
          )}
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
      </S.Dropdown>
    </S.Wrapper>
  );
};

export default Cascader;
