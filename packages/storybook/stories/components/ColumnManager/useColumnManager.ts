import { ReactText, useState } from 'react';
import moment from 'moment';
import { SavedView } from '@synerise/ds-column-manager';
import { COLUMNS, CATEGORIES, EMPTY_FILTER } from './ColumnManager.data';
import { Category } from '@synerise/ds-item-filter';

export const useColumnManager = (visible?: boolean) => {
  const [columns, setColumns] = useState(COLUMNS);
  const [categories, setCategories] = useState(CATEGORIES);
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(undefined);
  const [columnManagerVisible, setColumnManagerVisible] = useState(!!visible);
  const [groupSettings, setGroupSettings] = useState<any>(undefined);

  const saveFilter = (savedView: SavedView) => {
    const id = moment().format('MM-DD-YYYY_HH:mm:ss');
    const newCategories = [...categories];

    newCategories[0].items = [
      ...newCategories[0].items,
      {
        ...EMPTY_FILTER,
        name: savedView.meta.name,
        description: savedView.meta.description,
        columns: [...savedView.columns],
        id: id,
        created: moment(),
        groupSettings: savedView.groupSettings,
      },
    ];

    setSelectedItemId(id);
    setCategories(newCategories);
    setColumns([...savedView.columns]);
    setGroupSettings(savedView.groupSettings);
  };

  const removeItem = (props: {id: ReactText}): void => {
    setCategories(
      categories.map(category => ({
        ...category,
        items: category.items.filter(item => item.id !== props.id),
      }))
    );
  };

  const editItem = (props: {id: ReactText; name: string}): void => {
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

  const setSelectedItem = (props: {id: ReactText}): void => {
    let newCategories = [];
    categories.forEach(cat => {
      newCategories = [...newCategories, ...cat.items];
    });
    setSelectedItemId(props.id);
    setGroupSettings(categories.filter(filter => filter.id === props.id)[0].groupSettings || undefined);
    setColumns(categories.filter(filter => filter.id === props.id)[0].columns);
  };

  return {
    columns,
    categories,
    selectedItemId,
    columnManagerVisible,
    groupSettings,
    saveFilter,
    editItem,
    removeItem,
    setSelectedItem,
    setColumnManagerVisible
  };
};
