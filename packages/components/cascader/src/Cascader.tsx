import * as React from 'react';
import { CascaderProps, Category, Path } from 'Cascader.types';
import SearchBar from '@synerise/ds-search-bar';
import Menu from '@synerise/ds-menu';
import Icon from '@synerise/ds-icon';
import { HomeM } from '@synerise/ds-icon/dist/icons';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import Divider from '@synerise/ds-divider';
import BackAction from './Elements/BackAction/BackAction';
import * as S from './Cascader.styles';
import { filterPaths, getAllPaths, hasNestedCategories, searchCategoryWithId } from './utlis';
import BreadcrumbsList from './Elements/BreadcrumbsList/BreadcrumbsList';
import CategoriesList from './Elements/CategoriesList/CategoriesList';

const Cascader: React.FC<CascaderProps> = ({ rootCategory, disabled }) => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [activeCategory, setActiveCategory] = React.useState<Category>(rootCategory);
  const [paths, setPaths] = React.useState<Path[] | undefined>([]);
  const [filteredPaths, setFilteredPaths] = React.useState<Path[] | undefined>([]);
  const [enteredCategories, setEnteredCategories] = React.useState<Category[]>([]);
  const [selectedIds, setSelectedIds] = React.useState<Array<string | number>>([]);

  const previousCategory = enteredCategories[enteredCategories.length - 2];
  const isSearching = !!paths && searchQuery.length > 0;

  React.useEffect(() => {
    const allPaths = getAllPaths(rootCategory, []);
    setPaths(allPaths);
  }, [rootCategory]);

  const onItemSelect = (item: Category): void => {
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
          placeholder="Placeholder"
          value={searchQuery}
          iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
        />
      </S.InputWrapper>
      <S.Dropdown visible searching={isSearching}>
        <Menu>
          {isSearching && filteredPaths && (
            <BreadcrumbsList
              paths={filteredPaths}
              highlight={searchQuery}
              onBreadCrumbClick={(breadcrumb: Path | MenuItemProps): void => {
                onItemSelect(breadcrumb as Category);
              }}
            />
          )}
          {!searchQuery && activeCategory.path && (
            <>
              <Menu.Breadcrumb
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                path={activeCategory.path}
                onPathClick={onPathClick}
                startWithArrow
                gradientOverlap={activeCategory.path.length > 1}
                prefixel={
                  <S.BreadcrumbPrefix onClick={onHomeIconClick}>
                    <Icon component={<HomeM />} />
                  </S.BreadcrumbPrefix>
                }
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
