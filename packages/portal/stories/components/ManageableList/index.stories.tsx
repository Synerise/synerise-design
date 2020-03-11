import * as React from 'react';
import ManageableList from '@synerise/ds-manageable-list';
import FileM from '@synerise/ds-icon/dist/icons/FileM';
import Tag, { TagShape } from '@synerise/ds-tags/dist/Tag/Tag';
import { withState } from '@dump247/storybook-state';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import FolderM from '@synerise/ds-icon/dist/icons/FolderM';

const decorator = storyFn => (
  <div style={{ width: '600px' }}>
    <div style={{ background: '#fff', width: '600px' }}>{storyFn()}</div>
  </div>
);

const removeItem = (props, store): void => {
  store.set({
    items: store.state.items.filter(item => item.id !== props.id),
  });
};

const editItem = (props, store): void => {
  store.set({
    items: store.state.items.map(item => {
      if (item.id === props.id) {
        item.name = props.name;
      }
      return item;
    }),
  });
};

const setSelectedItem = (props, store): void => {
  store.set({
    selectedItemId: props.id,
  });
};

const ITEMS: any = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Default',
    canAdd: true,
    canUpdate: false,
    canDelete: false,
    icon: <FolderM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Basic',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    icon: <FolderM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'My folder',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    icon: <FolderM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    name: 'My folder 2',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    icon: <FolderM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    name: 'My folder 3',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    icon: <FolderM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000005',
    name: 'My folder 4',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    icon: <FolderM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000006',
    name: 'My folder 5',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    icon: <FolderM />,
  },
];

const EMPTY_ITEM = {
  id: '',
  name: '',
  canAdd: true,
  canUpdate: true,
  canDelete: true,
  icon: <FolderM />,
};

const CONTENT_ITEMS: any = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Position 0',
    canAdd: true,
    canUpdate: false,
    canDelete: false,
    tag: <Tag name={'A'} shape={TagShape.SINGLE_CHARACTER_ROUND} color={'red'} />,
    content: <div>content</div>,
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Position 1',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    tag: <Tag name={'1'} shape={TagShape.SINGLE_CHARACTER_SQUARE} color={'#f3f5f6'} textColor={'#949ea6'} />,
    content: <div>content</div>,
  },
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Position 2',
    canAdd: true,
    canUpdate: true,
    canDuplicate: true,
    canDelete: true,
    icon: <FileM />,
  },
];

const EMPTY_CONTENT_ITEM = {
  id: '',
  name: 'New Item',
  canAdd: true,
  canUpdate: true,
  canDelete: true,
  tag: <Tag name={'A'} shape={TagShape.SINGLE_CHARACTER_ROUND} color={'red'} />,
  content: <div>content</div>,
};

const FILTER_LIST_ITEMS = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Position 0',
    description: 'The last 10 days of all customers sales ',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canDuplicate: true,
    user: {
      avatar_url: 'https://www.w3schools.com/howto/img_avatar.png',
    },
    created: '2020-02-14T08:50:05+00:00',
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Position 1',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    user: {
      firstname: 'Jan',
      lastname: 'Nowak',
    },
    created: '2020-02-12T08:50:05+00:00',
  },
];

const getTexts = () => ({
  addItemLabel: text('Add item label', 'Add folder'),
  showMoreLabel: text('Show more label', 'show all'),
  showLessLabel: text('Show less label', 'show less'),
  more: text('More', 'more'),
  less: text('Less', 'less'),
  activateItemTitle: text('Activate item', 'By activating this filter, you will cancel your unsaved filter settings'),
  activate: text('Activate', 'Activate'),
  cancel: text('Cancel', 'Cancel'),
  deleteConfirmationTitle: text('Delete confirmation title', 'Detele filter'),
  deleteConfirmationDescription: text(
    'Delete confirmation description',
    'Deleting this filter will permanently remove it from templates library. All tables using this filter will be reset.'
  ),
  deleteLabel: text('Delete', 'Delete'),
});

const stories = {
  default: withState({
    items: ITEMS,
  })(({ store }) => {
    const addItem = ({ name }): void => {
      store.set({
        items: [
          ...store.state.items,
          {
            ...EMPTY_ITEM,
            id: Date.now(),
            name,
          },
        ],
      });
    };

    return (
      <ManageableList
        maxToShowItems={5}
        onItemAdd={addItem}
        onItemRemove={props => removeItem(props, store)}
        onItemEdit={props => editItem(props, store)}
        onItemSelect={action('onItemSelect')}
        items={store.state.items}
        loading={false}
        placeholder={'Folder name'}
        texts={getTexts()}
      />
    );
  }),
  emptyList: {
    maxToShowItems: 5,
    onItemAdd: action('onItemAdd'),
    onItemRemove: action('onItemRemove'),
    onItemEdit: action('onItemEdit'),
    onItemSelect: action('onItemSelect'),
    items: [],
    loading: false,
    texts: {},
  },
  contentList: withState({
    items: CONTENT_ITEMS,
  })(({ store }) => {
    const handleChangeOrder = newOrder => {
      store.set({ items: newOrder });
    };

    const addItem = (): void => {
      store.set({
        items: [
          ...store.state.items,
          {
            ...EMPTY_CONTENT_ITEM,
            id: Date.now(),
          },
        ],
      });
    };

    const duplicateItem = (props): void => {
      const itemForDuplication = store.state.items.find(item => item.id === props.id);
      store.set({
        items: [
          ...store.state.items,
          {
            ...itemForDuplication,
            id: Date.now(),
          },
        ],
      });
    };

    return (
      <ManageableList
        maxToShowItems={5}
        onItemAdd={addItem}
        onItemRemove={props => removeItem(props, store)}
        onItemEdit={props => editItem(props, store)}
        onItemSelect={action('onItemSelect')}
        onItemDuplicate={duplicateItem}
        onChangeOrder={boolean('Change order available', false) ? handleChangeOrder : null}
        type="content"
        items={store.state.items}
        loading={false}
        addButtonDisabled={boolean('Disable add item button', false)}
        changeOrderDisabled={boolean('Disable change order', false)}
        greyBackground={boolean('Grey background', false)}
        texts={getTexts()}
      />
    );
  }),
  filterItemsList: withState({
    items: FILTER_LIST_ITEMS,
    selectedItemId: '00000000-0000-0000-0000-000000000000',
  })(({ store }) => {
    const duplicateItem = (props): void => {
      const itemForDuplication = store.state.items.find(item => item.id === props.id);
      store.set({
        items: [
          ...store.state.items,
          {
            ...itemForDuplication,
            id: Date.now(),
          },
        ],
      });
    };

    return (
      <ManageableList
        maxToShowItems={5}
        onItemRemove={props => removeItem(props, store)}
        onItemEdit={props => editItem(props, store)}
        onItemSelect={props => setSelectedItem(props, store)}
        onItemDuplicate={duplicateItem}
        onChangeOrder={null}
        type="filter"
        items={store.state.items}
        loading={false}
        addButtonDisabled={boolean('Disable add item button', false)}
        changeOrderDisabled={boolean('Disable change order', false)}
        greyBackground={boolean('Grey background', false)}
        selectedItemId={store.state.selectedItemId}
        texts={getTexts()}
      />
    );
  }),
};

export default {
  name: 'Components|Manageable List',
  decorator,
  stories,
  Component: ManageableList,
};
