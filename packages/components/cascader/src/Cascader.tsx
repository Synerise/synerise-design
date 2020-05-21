import * as React from 'react';
import { CascaderProps, Category, Path } from 'Cascader.types';
import SearchBar from '@synerise/ds-search-bar';
import Menu from '@synerise/ds-menu';
import Icon from '@synerise/ds-icon';
import { HomeM } from '@synerise/ds-icon/dist/icons';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import BackAction from './Elements/BackAction/BackAction';
import * as S from './Cascader.styles';
import { filterPaths, getAllPaths, searchCategoryWithId } from './utlis';
import BreadcrumbsList from './Elements/BreadcrumbsList/BreadcrumbsList';
import CategoriesList from './Elements/CategoriesList/CategoriesList';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = (): void => {};

const Cascader: React.FC<CascaderProps> = ({ categories, disabled }) => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [activeCategory, setActiveCategory] = React.useState<Category>(categories);
  const [paths, setPaths] = React.useState<Path[] | undefined>([]);
  const [filteredPaths, setFilteredPaths] = React.useState<Path[] | undefined>([]);
  const [enteredCategories, setEnteredCategories] = React.useState<Category[]>([]);
  const [selectedIds, setSelectedIds] = React.useState<Array<string | number>>([]);

  const previousCategory = enteredCategories[enteredCategories.length - 2];

  React.useEffect(() => {
    const allPaths = getAllPaths(categories, []);
    setPaths(allPaths);
  }, []);

  const onCategoryClick = React.useCallback(
    (category: Category) => {
      const entered = { id: category.id, name: category.name, path: category.path };
      const updatedEnteredCategories = [...enteredCategories, entered];
      setActiveCategory(category);
      setEnteredCategories(updatedEnteredCategories);
    },
    [enteredCategories]
  );

  const onPathClick = React.useCallback(
    item => {
      const chosenCategory = enteredCategories.find(enteredCategory => enteredCategory.name === item);
      let updatedEnteredCategories;
      if (chosenCategory) {
        updatedEnteredCategories = enteredCategories.slice(0, enteredCategories.indexOf(chosenCategory));
      }
      setActiveCategory(searchCategoryWithId(categories, chosenCategory.id));
      setEnteredCategories(updatedEnteredCategories || []);
    },
    [categories, enteredCategories]
  );

  const onItemSelect = (item: Category) => {
    const selected = selectedIds;
    let newSelectedList;
    const itemAlreadySelected = selected.indexOf(item.id) !== -1;
    if (!itemAlreadySelected) {
      selected.push(item.id);
      newSelectedList = selected;
    } else {
      newSelectedList = selected.filter(id => id !== item.id);
    }
    setSelectedIds([...newSelectedList]);
  };
  const onBackActionClick = React.useCallback((): void => {
    setActiveCategory(searchCategoryWithId(categories, previousCategory.id) as Category);
  }, [enteredCategories, categories, previousCategory]);

  const onHomeIconClick = React.useCallback(() => {
    setActiveCategory(categories);
  }, [categories]);

  const filterPathsBySearchQuery = React.useCallback(
    (value: string) => {
      if (paths) {
        const filtered = filterPaths(paths, value.toLowerCase());
        setFilteredPaths(filtered);
      } else setFilteredPaths([]);
    },
    [searchQuery, paths]
  );

  return (
    <S.Wrapper className="ds-cascader">
      <S.InputWrapper>
        <SearchBar
          onSearchChange={(value: string): void => {
            setSearchQuery(value);
            filterPathsBySearchQuery(value.toLowerCase());
          }}
          disabled={disabled}
          placeholder="Placeholder"
          value={searchQuery}
          iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
        />
      </S.InputWrapper>
      <S.Dropdown visible>
        <Menu>
          {!!paths && searchQuery.length > 0 && filteredPaths && filteredPaths?.length > 0 && (
            <BreadcrumbsList
              paths={filteredPaths}
              highlight={searchQuery}
              onBreadCrumbClick={(breadcrumb: Path | MenuItemProps): void => {
                onItemSelect(breadcrumb as Category);
              }}
            />
          )}
          {!searchQuery && activeCategory.path && (
            <Menu.Breadcrumb
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              path={activeCategory.path}
              onPathClick={onPathClick}
              startWithArrow
              gradientOverlap={activeCategory.path.length>1}
              compact
              prefixel={
                <S.BreadcrumbPrefix onClick={onHomeIconClick}>
                  <Icon component={<HomeM />} />
                </S.BreadcrumbPrefix>
              }
            />
          )}
          {!searchQuery && previousCategory && previousCategory.name && enteredCategories.length > 1 && (
            <BackAction label={previousCategory.name} onClick={onBackActionClick} />
          )}
          {!searchQuery && (
            <CategoriesList
              rootCategory={activeCategory}
              onCategoryClick={onCategoryClick}
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
