import * as React from 'react';

import TreeMenu, { defaultItemTypes, BaseComponent } from '@synerise/ds-treemenu';
import Scrollbar from '@synerise/ds-scrollbar';
import Button from '@synerise/ds-button';
import * as S from '@synerise/ds-layout/dist/Layout.styles';
import { boolean, number } from '@storybook/addon-knobs';
import { StarFillM, UserM } from '@synerise/ds-icon/dist/icons';
import TreeModel from 'tree-model';

import { dataSource, dataSourceAlter } from './data';
import itemTypes from './itemTypes';
import { TreeData, TreeNode } from '@synerise/ds-treemenu/dist/TreeMenu.types';


const wrapperStyles: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
};

const getContainer = (): HTMLElement => {
  return document.querySelector('.scrollbar-container') || document.body;
};

const stories = {
  customItems: () => {
    const [data, setData] = React.useState<TreeData[]>(JSON.parse(JSON.stringify(dataSource)));
    const [expandedKeys, setExpandedKeys] = React.useState<React.Key[]>([]);
    const [copyCount, setCopyCount] = React.useState<number>(0);

    const addItemsList = {
      folder: defaultItemTypes.folder,
      custom1: {
        name: 'Without custom render',
        placeholder: 'Place name here',
        icon: UserM,
      },
      custom2: {
        name: 'Star',
        placeholder: 'Place name here',
        component: (props) => {
          return <BaseComponent icon={StarFillM} {...props} />
        },
        icon: StarFillM
      }
    };

    const handleEditChange = (item: TreeNode, newTitle: string, newItems: TreeData[]) => {
      setTimeout(() => { setData(newItems); });
    };

    const handleExpandToggle = (expandedKeys: React.Key[]) => {
      setExpandedKeys(expandedKeys);
    };

    const handleDragEnd = (newItems: TreeData[], item: TreeNode) => {
      setData(newItems);
    };

    const handleItemDuplicate = (item: TreeNode) => {
      const { title, key } = item.model;

      const duplicate = new TreeModel().parse({
        ...item.model,
        key: key + ' (' + copyCount + ')',
        title: title.replace(/ \([0-9+]\)$/, '') + ' (' + copyCount + ')',
      });

      console.log(duplicate, item.parent);
      item.parent.addChildAtIndex(duplicate, item.getIndex()+1);

      setCopyCount(copyCount+1);
      setData([...item.getPath().shift().model.children]);
    };

    const handleItemCopy = (item: TreeNode, context?: TreeNode) => {
      console.log('grr', item, context)
    }

    const handleItemPaste = (newItems: TreeData[]) => {
      console.log('grr', newItems);
    }

    const handleItemCut = (newItems: TreeData[]) => {
      
    }

    const handleItemDelete = (newItems: TreeData[]) => {
      setData(newItems);
    }

    return (
      <div style={wrapperStyles}>
        <S.LayoutSidebarWrapper opened>
          <S.LayoutSidebar opened>
            <Scrollbar absolute>
              <div style={{padding: '24px'}}>
                <TreeMenu 
                  getContainer={getContainer} 
                  draggable={boolean('Drag & Drop', true)}
                  showHeader={boolean('Show header', true)}
                  showToolbar={boolean('Show toolbar', true)}
                  dataSource={data}
                  expandedKeys={expandedKeys}
                  addItemList={itemTypes}
                  onItemEditChange={handleEditChange}
                  onItemExpandToggle={handleExpandToggle}
                  onItemDragEnd={handleDragEnd}
                  onItemDuplicate={handleItemDuplicate}
                  onItemCopy={handleItemDuplicate}
                  onItemPaste={handleItemDuplicate}
                  onItemCut={handleItemDuplicate}
                  onItemDelete={handleItemDelete}
                />
              </div>
            </Scrollbar>
          </S.LayoutSidebar>
        </S.LayoutSidebarWrapper>
        <div style={{position: 'absolute', top: 0, left: '320px'}}>
          <Button onClick={() => { 
            setData(JSON.parse(JSON.stringify(dataSource)));
            setExpandedKeys([]);
          }}>Data Source 1</Button>
          <Button onClick={() => { 
            setData(JSON.parse(JSON.stringify(dataSourceAlter)));
            setExpandedKeys([]);
          }}>Data Source 2</Button>
        </div>
      </div>
    );
  }
};

export default {
  name: 'Components/TreeMenu',
  config: {},
  stories,
  Component: TreeMenu,
}
