import * as React from 'react';

import TreeMenu, { defaultItemTypes, BaseComponent } from '@synerise/ds-treemenu';
import Scrollbar from '@synerise/ds-scrollbar';
import Button from '@synerise/ds-button';
import * as S from '@synerise/ds-layout/dist/Layout.styles';
import { boolean, number } from '@storybook/addon-knobs';
import { StarFillM, UserM } from '@synerise/ds-icon/dist/icons';
import { action } from '@storybook/addon-actions';

import { dataSource, dataSourceAlter } from './data';
import itemTypes from './itemTypes';
import { TreeData, TreeNode } from '@synerise/ds-treemenu/src/TreeMenu.types';


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
  default: () => (
    <div style={{width: `${number('Container width', 300, { min: 200, max: 1200 })}px`}}>
      <TreeMenu dataSource={[...dataSource]} />
    </div>
  ),
  customItems: () => {
    const [data, setData] = React.useState<TreeData[]>(JSON.parse(JSON.stringify(dataSource)));
    const [expandedKeys, setExpandedKeys] = React.useState<React.Key[]>([]);

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

    const handleEditChange = (item: TreeNode, newTitle: string, treeNode: TreeNode) => {
      console.log(treeNode);
      setData(treeNode);
    };

    const handleExpandToggle = (expandedKeys: React.Key[]) => {
      setExpandedKeys(expandedKeys);
    };

    const handleDragEnd = (newItems: TreeData[], item: TreeNode) => {
      setData(newItems);
    };

    return (
      <div style={wrapperStyles}>
        <S.LayoutSidebarWrapper opened>
          <S.LayoutSidebar opened>
            <Scrollbar absolute>
              <div style={{padding: '24px'}}>
                <TreeMenu 
                  getContainer={getContainer} 
                  draggable={boolean('Drag & Drop', true)}
                  dataSource={data}
                  expandedKeys={expandedKeys}
                  addItemList={itemTypes}
                  onItemEditChange={handleEditChange}
                  onItemExpandToggle={handleExpandToggle}
                  onItemDragEnd={handleDragEnd}
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
