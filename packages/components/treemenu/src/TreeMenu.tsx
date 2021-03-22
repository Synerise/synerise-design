import React, { useState, useEffect } from 'react';

import { FolderAddM } from '@synerise/ds-icon/dist/icons';
import { NOOP } from '@synerise/ds-utils';
import AddModal from './AddModal';
import Tree from './Tree';

import TreeMenuContext, { defaultValue } from './TreeMenuContext';
import Header from './Header';
import Folder from './Elements/Item/Items/Folder';
import Toolbar from './Toolbar';
import useTexts from './useTexts';

import { TreeMenuTexts, TreeMenuProps } from './TreeMenu.types';
import * as S from './TreeMenu.styles';

// Remove this itshould be deeper
export const defaultItemTypes = {
  folder: {
    name: 'Folder',
    component: Folder,
    icon: FolderAddM,
  },
};

const TreeMenu: React.FC<TreeMenuProps> = ({
  dataSource = [],
  showToolbar = true,
  showHeader = true,
  draggable = true,
  texts: propTexts,
  addItemList = defaultItemTypes,
  ...restProps
}) => {
  const texts: TreeMenuTexts = useTexts(propTexts);
  const items = dataSource;

  const [loaded, setLoaded] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [searchOpen, setSearchOpen] = React.useState<boolean>(false);

  // This needs to be done because scrollbar
  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  const contextValue = {
    ...defaultValue,
    ...restProps,
    texts,
    searchQuery,
    setSearchQuery,
    searchOpen,
    setSearchOpen,
  };

  const handleItemAdd = (): void => {
    NOOP();
  };

  return (
    <S.TreeMenuContainer>
      <TreeMenuContext.Provider value={contextValue}>
        {showToolbar && (
          <Toolbar>
            <AddModal texts={texts} itemTypes={addItemList} onItemAdd={handleItemAdd} />
          </Toolbar>
        )}
        {showHeader && <Header texts={texts} />}
        <Tree
          items={items}
          addItemList={addItemList}
          searchQuery={searchQuery}
          draggable={draggable}
          texts={texts}
          {...restProps}
        />
      </TreeMenuContext.Provider>
    </S.TreeMenuContainer>
  );
};

export default TreeMenu;
