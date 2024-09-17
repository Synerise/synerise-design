import moment from 'moment';
import { ReactText, useState } from 'react';

import { SavedView } from '@synerise/ds-column-manager';

import { COLUMNS, EMPTY_VIEW, ViewsType, CategoriesType } from './WithFiltersAndSearch.data';
import { SuggestionType } from './WithFiltersAndSearch.stories';

type ItemType = { id: ReactText };

export const useFiltersAndSearch = <CategoryType extends any, ViewType extends any, ColumnType extends any>(initialCategories: CategoryType[], initialViews: ViewType[], initialColumns: ColumnType[]) => {
  const [categories, setCategories] = useState(initialCategories);
  const [savedViews, setSavedViews] = useState(initialViews);
  const [columns, setColumns] = useState(initialColumns);
  const [selectedViewId, setSelectedViewId] = useState<ReactText | undefined>();
  const [selectedFilterId, setSelectedFilterId] = useState<ReactText | undefined>();
  const [savedViewsVisible, setSavedViewsVisible] = useState(false);
  const [columnManagerVisible, setColumnManagerVisible] = useState(false);
  const [itemFilterVisible, setItemFilterVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchFilterValue, setSearchFilterValue] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<Array<SuggestionType>>([]);

  const saveFilter = (savedView: SavedView) => {
    const id = moment().format('MM-DD-YYYY_HH:mm:ss');
    const newViews = [...savedViews];
    newViews[0].items = [
      // @ts-ignore
      ...newViews[0].items,
      {
        ...EMPTY_VIEW,
        name: savedView.meta.name,
        description: savedView.meta.description,
        // @ts-ignore
        columns: [...savedView.columns],
        id: id,
        created: moment().format('MM-DD-YYYY HH:mm:ss'),
      },
    ];

    setSelectedViewId(id);
    setSavedViews(newViews);
    // @ts-ignore
    setColumns([...savedView.columns]);
  };

  const removeViewItem = props => {
    setSavedViews(
      savedViews.map(category => ({
        ...category,
        items: category.items.filter(item => item.id !== props.id),
      }))
    );
  };

  const editViewItem = props => {
    setSavedViews(
      savedViews.map(category => ({
        ...category,
        items: category.items.map(item => {
          if (item.id === props.id) {
            item.name = props.name;
          }
          return item;
        }),
      }))
    );
  };

  const removeItem = props => {
    setCategories(
      categories.map(category => ({
        ...category,
        items: category.items.filter(item => item.id !== props.id),
      }))
    );
  };

  const editItem = props => {
    setCategories(
      categories.map(category => ({
        ...category,
        items: category.items.map(item => {
          if (item.id === props.id) {
            item.name = props.name;
          }
          return item;
        }),
      }))
    );
  };

  const handleSetSelectedFilter = (props?: ItemType) => {
    if (!props) {
      setSelectedFilterId(undefined);
      setColumns(COLUMNS);
      return;
    }
    let categoriesItems: CategoriesType['items'] = [];
    categories.forEach(cat => {
      categoriesItems = [...categoriesItems, ...cat.items];
    });
    setSelectedFilterId(props.id);
    setColumns(categoriesItems.filter(filter => filter.id === props.id)[0].columns);
  };

  const handleSetSelectedView = (props?: ItemType) => {
    if (!props) {
      setSelectedViewId(undefined);
      setColumns(COLUMNS);
      return;
    }
    let viewsItems: ViewsType['items'] = [];
    savedViews.forEach(cat => {
      viewsItems = [...viewsItems, ...cat.items];
    });
    setSelectedViewId(props.id);
    setColumns(viewsItems.filter(filter => filter.id === props.id)[0].columns);
  };

  return {
    searchValue,
    setSearchValue,
    searchFilterValue,
    setSearchFilterValue,
    searchSuggestions,
    setSearchSuggestions,
    itemFilterVisible,
    setItemFilterVisible,
    modalVisible,
    setModalVisible,
    columnManagerVisible,
    setColumnManagerVisible,
    savedViewsVisible,
    setSavedViewsVisible,
    columns,
    setColumns,
    editItem,
    saveFilter,
    editViewItem,
    removeViewItem,
    removeItem,
    savedViews,
    selectedViewId,
    categories,
    selectedFilterId,
    handleSetSelectedFilter,
    handleSetSelectedView,
  };
};
