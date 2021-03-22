import * as React from 'react';

import TreeMenu, { defaultItemTypes, BaseComponent } from '@synerise/ds-treemenu';
import Scrollbar from '@synerise/ds-scrollbar';
import * as S from '@synerise/ds-layout/dist/Layout.styles';
import { boolean, number } from '@storybook/addon-knobs';
import { StarFillM, UserM } from '@synerise/ds-icon/dist/icons';

import { defaultItems } from './data';

const wrapperStyles: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
};

const getContainer = () => {
  return document.querySelector('.scrollbar-container') || document.body;
};

const stories = {
  default: () => (
    <div style={{width: `${number('Container width', 300, { min: 200, max: 1200 })}px`}}>
      <TreeMenu dataSource={[...defaultItems]} />
    </div>
  ),
  controlledInSidebar: () => {
    const dataSource = JSON.parse(JSON.stringify(defaultItems));
    return (
      <div style={wrapperStyles}>
        <S.LayoutSidebarWrapper opened>
          <S.LayoutSidebar opened>
            <Scrollbar absolute>
              <div style={{padding: '24px'}}>
                <TreeMenu 
                  getContainer={getContainer} 
                  dataSource={dataSource} 
                />
              </div>
            </Scrollbar>
          </S.LayoutSidebar>
        </S.LayoutSidebarWrapper>
      </div>
    );
  },
  customItemsAndMenuActions: () => {
    const dataSource = JSON.parse(JSON.stringify(defaultItems));

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
          console.log(props);
          return <BaseComponent icon={StarFillM} {...props} />
        },
        icon: StarFillM
      }
    };

    return (
      <div style={wrapperStyles}>
        <S.LayoutSidebarWrapper opened>
          <S.LayoutSidebar opened>
            <Scrollbar absolute>
              <div style={{padding: '24px'}}>
                <TreeMenu 
                  getContainer={getContainer} 
                  dataSource={dataSource}
                  addItemList={addItemsList}
                />
              </div>
            </Scrollbar>
          </S.LayoutSidebar>
        </S.LayoutSidebarWrapper>
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
