import * as React from 'react';
import Button from '@synerise/ds-button';
import TagsList, { AddModal } from '@synerise/ds-tagslist';
import { TagsListActions, TagsListItem, TagVisibility } from '@synerise/ds-tagslist/dist/TagsList.types';
import Menu from '@synerise/ds-menu';
import { boolean, number } from '@storybook/addon-knobs';
import { ADD_TAGS, FOLDERS, MIDDLE_MENU_ITEMS, TOP_MENU_ITEMS } from './dataset';
import Icon from '@synerise/ds-icon';
import message from '@synerise/ds-message';
import { action } from '@storybook/addon-actions';
import { StarFillM, StarM, TagM } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

const { Divider } = Menu;

const wrapperStyles: React.CSSProperties = {
  width: '338px',
  background: 'white',
  position: 'absolute',
  top: 0,
  left: '50%',
  marginLeft: '-164px',
  bottom: 0,
};

const renderMenuItem = (item: { icon: React.ReactNode; text: string }, onClick: () => void) => (
  <Menu.Item prefixel={<Icon component={item.icon} />} text={item.text} onClick={onClick} />
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
  controlledInMenu: () => {
    const showCheckboxes = boolean('Show item checkboxes on hover', true);
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
      setDataSource([...dataSource, ...items]);
    }

    return (
      <div style={wrapperStyles} data-popup-container>
        <Menu asDropdownMenu style={{width: 'auto', padding: '24px'}}>
          {TOP_MENU_ITEMS.map(item =>
            renderMenuItem(item, (): void => {
              setStarred(false);
            })
          )}
          <Menu.Item
            onClick={() => {
              setStarred(!starred);
            }}
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
          <Divider />
          {MIDDLE_MENU_ITEMS.map(item =>
            renderMenuItem(item, (): void => {
              setStarred(false);
            })
          )}
          <Divider />
          <TagsList
            items={dataSource}
            maxItemsVisible={number('Set default max items visible', 10, { min: 1 })}
            texts={{
              add: 'Add',
              addItemLabel: 'Add tag',
              addToFavourite: 'Favourite',
              applyAdd: 'Apply',
              cancel: 'Cancel',
              chooseDestinationFolder: 'Choose folder',
              delete: 'Delete',
              deleteFolderLabel: 'Remove folder',
              deleteFolderConfirmationMessage: 'Are you sure you want to remove folder',
              deleteFolderDescription: 'What you want to do with content? ',
              deleteFromFavourites: 'Favourite',
              deleteAllContent: 'Remove all items',
              edit: 'Rename',
              enterSettings: 'Manage tags',
              favourite: 'Favourite',
              invalidNameError: 'Invalid folder name',
              folderNamePlaceholder: 'Folder name',
              moveToDefault: 'Move to default folder',
              moveToOtherFolder: 'Move to other folder',
              showLessLabel: 'Hide',
              showMoreLabel: 'Show',
              less: 'less',
              more: 'more',
              visibilityShow: 'Show',
              visibilityShowIfUsed: 'Show if used',
              visibilityHide: 'Hide',
            }}
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
      </div>
    );
  },
  addModal: () => {
    const disabled = boolean('Disabled', false);
    const tristate = boolean('Use tristate checkbox', false);
    const consoleLog = boolean('Console log Apply result', true);
    return (
      <AddModal 
        disabled={disabled}
        trigger={(
          <Button leftIconSize="S" mode="icon-label">
            <Icon component={<TagM />} />
            Tags
          </Button>
        )}
        onManageTags={onManageTags}
      />
    );
  }
};

export default {
  name: 'Components/TagsList',
  config: {},
  stories,
};
