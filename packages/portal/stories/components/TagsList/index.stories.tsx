import * as React from 'react';
import Button from '@synerise/ds-button';
import TagsList, { AddModal, DEFAULT_STEP, DEFAULT_ITEMS_VISIBLE } from '@synerise/ds-tagslist';
import { TagsListActions, TagsListItem } from '@synerise/ds-tagslist/dist/TagsList.types';
import Menu from '@synerise/ds-menu';
import { boolean, number } from '@storybook/addon-knobs';
import { ADD_TAGS, FOLDERS, MIDDLE_MENU_ITEMS, TOP_MENU_ITEMS, TEXTS } from './dataset';
import Scrollbar from '@synerise/ds-scrollbar';
import Icon from '@synerise/ds-icon';
import message from '@synerise/ds-message';
import { StarFillM, StarM, TagM } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from '@synerise/ds-layout/dist/Layout.styles';

const { Divider } = Menu;

const wrapperStyles: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
};

const renderMenuItem = (item: { icon: React.ReactNode; text: string }, onClick: () => void) => (
  <Menu.Item 
    prefixel={<Icon component={item.icon} />} 
    text={item.text} 
    onClick={onClick} 
  />
);

const getFilter = filterName => {
  if (filterName === 'favourite') {
    return (item: TagsListItem) => !!item.favourite;
  }
  return undefined;
};

function onManageTags(event: React.MouseEvent<HTMLElement, MouseEvent>) {
  message.success('Manage tags clicked!');
}

const stories = {
  default: () => {
    const [dataSource, setDataSource] = React.useState(FOLDERS);

    return (
      <div data-popup-container>
        <TagsList 
          defaultItems={FOLDERS}
          addItemsList={ADD_TAGS}
          onManageTags={onManageTags}
        />
      </div>
    )
  },
  controlledInSidebar: () => {
    const showCheckboxes = boolean('Show item checkboxes on hover', true);
    const itemsVisible = number('Set default max items visible', DEFAULT_ITEMS_VISIBLE, { min: 1 });
    const step = number('Set step', DEFAULT_STEP, { min: 1 });

    const [starred, setStarred] = React.useState(false);
    const [dataSource, setDataSource] = React.useState(FOLDERS);
    const [addItems, setAddItems] = React.useState([]);
    const [addItemsLoading, setAddItemsLoading] = React.useState(true);

    const handleOnChange = (action: TagsListActions, newItems: TagsListItem[], newItem: TagsListItem) => {
      setDataSource(newItems);
    };

    const handleOnAddDropdown = (visible: boolean) => {
      if(visible)
        setTimeout(() => {
          setAddItemsLoading(false);
          setAddItems(ADD_TAGS);
        }, 1000);

      if(!visible)
        setTimeout(() => {
          setAddItemsLoading(true);
          setAddItems([]);
        }, 1000);
    }

    const handleOnItemsAdd = (items: TagsListItem[]) => {
      const newItems = items.map((item) => ({...item, checked: false}));
      const newDs = [...dataSource];
      newItems.forEach((item: TagsListItem) => {
        if(newDs.findIndex((row: TagsListItem) => row.id === item.id) === -1)
          newDs.push(item);
      });
      setDataSource(newDs);
    }

    const onItemClick = () => setStarred(!starred);

    return (
      <div style={wrapperStyles}>
        <S.LayoutSidebarWrapper opened>
          <S.LayoutSidebar opened>
            <Scrollbar absolute>
              <Menu asDropdownMenu style={{width: 'auto', padding: '24px'}} data-popup-container>
                {TOP_MENU_ITEMS.map(item =>
                  renderMenuItem(item, (): void => {
                    setStarred(false);
                  })
                )}
                <Menu.Item
                  onClick={onItemClick}
                  prefixel={
                    <div>
                      <Icon
                        component={starred ? <StarFillM /> : <StarM />}
                        color={starred ? theme.palette['yellow-600'] : theme.palette['grey-600']}
                      />
                    </div>
                  }
                >
                  Starred
                </Menu.Item>
                <Divider higher />
                <TagsList
                  items={dataSource}
                  maxItemsVisible={itemsVisible}
                  step={step}
                  texts={TEXTS}
                  onChange={handleOnChange}
                  onAddDropdown={handleOnAddDropdown}
                  onManageTags={onManageTags}
                  onItemsAdd={handleOnItemsAdd}
                  addItemsLoading={addItemsLoading}
                  addItemsList={addItems}
                  addButtonDisabled={false}
                  withCheckbox={showCheckboxes}
                />
              </Menu>
            </Scrollbar>
          </S.LayoutSidebar>
        </S.LayoutSidebarWrapper>
      </div>
    );
  },
  addModal: () => {
    const tristate = boolean('Use tristate checkbox', false);
    const canAddTags = boolean('Can add tags', true);
    const disabled = boolean('Disabled', false);
    
    const tags = ADD_TAGS.map((tag) => ({...tag, checked: false}));

    const onItemsAdd = (items: TagsListItem[]) => {
      console.log('Items to be added: ', items);
    }

    const trigger = boolean('Use custom trigger button', false) ?
      (
        <Button mode="icon-label" disabled={disabled}>
          <Icon component={<TagM />} />
          Tags
        </Button>
      ) : undefined;

    return (
      <div style={{height: '320px'}} data-popup-container>
        <AddModal 
          disabled={disabled}
          items={tags}
          tristate={tristate}
          onItemsAdd={onItemsAdd}
          searchAddTag={canAddTags}
          trigger={trigger}
          onManageTags={onManageTags}
        />
      </div>
    );
  }
};

export default {
  name: 'Components/TagsList',
  config: {},
  stories,
};
