import * as React from 'react';
import { CascaderProps, CascaderState, Category } from 'Cascader.types';
import SearchBar from '@synerise/ds-search-bar';
import Menu from '@synerise/ds-menu';
import Icon from '@synerise/ds-icon';
import { HomeM } from '@synerise/ds-icon/dist/icons';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { focusWithArrowKeys } from '@synerise/ds-utils';
import BackAction from './Elements/BackAction/BackAction';
import Divider from './Elements/Divider/Divider';
import * as S from './Cascader.styles';
import { filterPaths, getAllPaths, searchCategoryWithId } from './utlis';
import BreadcrumbsList from './Elements/BreadcrumbsList/BreadcrumbsList';
import CategoriesList from './Elements/CategoriesList/CategoriesList';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = (): void => {};

class Cascader extends React.PureComponent<CascaderProps, CascaderState> {
  static InputWrapper = S.InputWrapper;
  static Dropdown = S.Dropdown;
  static Wrapper = S.Wrapper;
  static Divider: typeof Divider = Divider;

  constructor(props: CascaderProps) {
    super(props);
    const { categories } = this.props;
    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      searchQuery: '',
      activeCategory: categories,
      paths: [],
      enteredCategories: [{ id: categories.id, name: categories.name, path: categories.path }],
    };
  }

  componentDidMount(): void {
    const { categories } = this.props;
    const allPaths = getAllPaths(categories,[]);
    this.setState({ paths:  allPaths});
    console.log('AFTER MOUNT', allPaths);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleClickOutside = (): void => {};

  render(): React.ReactNode {
    const { itemsTitle, itemsTooltip, disabled, categories } = this.props;
    const { searchQuery, activeCategory, paths, enteredCategories } = this.state;
    const previousCategory = enteredCategories[enteredCategories.length - 2];
    return (
      <S.Wrapper
        className="ds-cascader"
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>): void => focusWithArrowKeys(e, 'ds-menu-item', NOOP)}
      >
        <S.InputWrapper>
          <SearchBar
            onSearchChange={(value: string): void => {
              this.setState({ searchQuery: value });
            }}
            disabled={disabled}
            placeholder="Placeholder"
            value={searchQuery}
            iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
          />
        </S.InputWrapper>
        <S.Dropdown visible>
          <Menu>
            {!!paths && searchQuery.length > 0 && (
              <BreadcrumbsList paths={filterPaths(paths, searchQuery)} highlight={searchQuery} />
            )}
            {!searchQuery && activeCategory.path && (
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              <Menu.Breadcrumb
                path={activeCategory.path}
                onPathClick={item => {
                  const chosenCategory = enteredCategories.find(enteredCategory => enteredCategory.name === item);
                  let updatedEnteredCategories;
                  if (chosenCategory) {
                    updatedEnteredCategories = enteredCategories.slice(0, enteredCategories.indexOf(chosenCategory));
                  }
                  this.setState({
                    activeCategory: searchCategoryWithId(categories, chosenCategory.id || categories.id),
                    enteredCategories: updatedEnteredCategories || [],
                  });
                }}
                prefixel={<Icon component={<HomeM />} />}
              />
            )}
            {!searchQuery && previousCategory && previousCategory.name && enteredCategories.length > 1 && (
              <BackAction
                label={previousCategory.name}
                onClick={(): void => {
                  enteredCategories.pop();
                  this.setState({ activeCategory: searchCategoryWithId(categories, previousCategory.id) as Category });
                }}
              />
            )}

            {!searchQuery && (
              <CategoriesList
                title={itemsTitle}
                tooltip={itemsTooltip}
                rootCategory={activeCategory}
                onCategoryClick={(category: Category): void => {
                  const entered = { id: category.id, name: category.name, path: category.path };
                  const updatedEnteredCategories = [...enteredCategories, entered];
                  this.setState({ activeCategory: category, enteredCategories: updatedEnteredCategories });
                }}
              />
            )}
          </Menu>
        </S.Dropdown>
      </S.Wrapper>
    );
  }
}

export default Cascader;
