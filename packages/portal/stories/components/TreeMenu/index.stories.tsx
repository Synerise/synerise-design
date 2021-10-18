import * as React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import TreeMenu from '@synerise/ds-treemenu';
import Scrollbar from '@synerise/ds-scrollbar';
import * as S from '@synerise/ds-layout/dist/Layout.styles';
import { boolean } from '@storybook/addon-knobs';

import { dataSource } from './data';
import itemTypes from './itemTypes';
import { TreeData, TreeNode } from '@synerise/ds-treemenu/dist/TreeMenu.types';

const wrapperStyles: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
};

const getContainer = (): HTMLElement => {
  return document.querySelector('.scroll-wrapper') || document.body;
};

const stories = {
  customItems: () => {
    const [data, setData] = React.useState<TreeData[]>(JSON.parse(JSON.stringify(dataSource)));
    const [expandedKeys, setExpandedKeys] = React.useState<React.Key[]>([]);

    const handleExpandToggle = (expandedKeys: React.Key[]) => {
      setExpandedKeys(expandedKeys);
    };

    const handleChange = items => {
      setData(items);
    };

    return (
      <div style={wrapperStyles}>
        <S.LayoutSidebarWrapper opened>
          <S.LayoutSidebar opened className="scroll-wrapper">
            <SimpleBar autohide={true} style={{ height: '100vh' }}>
              <div style={{ padding: '24px' }}>
                <TreeMenu
                  getContainer={getContainer}
                  draggable={boolean('Drag & Drop', true)}
                  showHeader={boolean('Show header', true)}
                  showToolbar={boolean('Show toolbar', true)}
                  dataSource={data}
                  expandedKeys={expandedKeys}
                  addItemList={itemTypes}
                  onItemExpandToggle={handleExpandToggle}
                  onChange={handleChange}
                />
              </div>
            </SimpleBar>
          </S.LayoutSidebar>
        </S.LayoutSidebarWrapper>
      </div>
    );
  },
};

export default {
  name: 'Components/TreeMenu',
  config: {},
  stories,
  Component: TreeMenu,
};
