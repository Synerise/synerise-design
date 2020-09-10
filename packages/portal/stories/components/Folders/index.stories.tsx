import * as React from 'react';
import Sidebar from '@synerise/ds-sidebar';
import Folders from '@synerise/ds-folders';
import Menu from '@synerise/ds-menu';
import { boolean, number } from '@storybook/addon-knobs';
import { FOLDERS, MIDDLE_MENU_ITEMS, TOP_MENU_ITEMS } from './dataset';
import Icon from '@synerise/ds-icon';
import Divider from '@synerise/ds-divider';
import { action } from '@storybook/addon-actions';
import { StarFillM, StarM } from '@synerise/ds-icon/dist/icons';
import { FolderItem } from '@synerise/ds-folders/dist/Folders.types';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
const wrapperStyles: React.CSSProperties = {
  width: '338px',
  background: 'white',
  padding: '24px 0',
};

const renderMenuItem = (item: { icon: React.ReactNode; text: string }, onClick: () => void) => (
  <Menu.Item prefixel={<Icon component={item.icon} />} text={item.text} onClick={onClick} />
);

const getFilter = filterName => {
  if (filterName === 'favourite') {
    return (item: FolderItem) => !!item.favourite;
  }
  return undefined;
};

const stories = {
  default: () => {
    const showActionsInRow = boolean('Show actions in a row', false);
    const [starred, setStarred] = React.useState(false);
    const getActionsDisplay = (row: boolean): 'inline' | 'dropdown' => {
      return row ? 'inline' : 'dropdown';
    };

    const DividerWrapper = (
      <div style={{ margin: '16px 20px' }}>
        <Divider dashed />
      </div>
    );
    return (
      <div style={wrapperStyles}>
        <Menu style={{ padding: '0 24px' }}>
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
        </Menu>
        {DividerWrapper}
        <Menu style={{ padding: '0 24px' }}>
          {MIDDLE_MENU_ITEMS.map(item =>
            renderMenuItem(item, (): void => {
              setStarred(false);
            })
          )}
        </Menu>
        {DividerWrapper}
        <div style={{ padding: '0 24px' }}>
          <Folders
            actionsDisplay={getActionsDisplay(showActionsInRow)}
            dataSource={FOLDERS}
            maxItemsVisible={number('Set default max items visible', 5, { min: 1 })}
            texts={{
              add: 'Add',
              addItemLabel: 'Add folder',
              addToFavourite: 'Favourites',
              cancel: 'Cancel',
              chooseDestinationFolder: 'Choose folder',
              delete: 'Remove',
              deleteFolderLabel: 'Remove folder',
              deleteFolderConfirmationMessage: 'Are you sure you want to remove folder',
              deleteFolderDescription: 'What you want to do with content? ',
              deleteFromFavourites: 'Favourites',
              deleteAllContent: 'Remove all items',
              edit: 'Rename',
              enterSettings: 'Settings',
              favourite: 'Favourite',
              invalidNameError: 'Invalid folder name',
              folderNamePlaceholder: 'Folder name',
              moveToDefault: 'Move to default folder',
              moveToOtherFolder: 'Move to other folder',
              showLessLabel: 'Hide',
              showMoreLabel: 'Show',
              less: 'less',
              more: 'more',
            }}
            onFavourite={action('OnFavourite')}
            onEdit={action('OnEdit')}
            onAdd={action('OnAdd')}
            onDelete={action('OnDelete')}
            onSettings={action('OnSettings')}
            onSelect={action('OnSelect')}
            addButtonDisabled={false}
          />
        </div>
      </div>
    );
  },
};

export default {
  name: 'Components/Folders',
  config: {},
  stories,
};
