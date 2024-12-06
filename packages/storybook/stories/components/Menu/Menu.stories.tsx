import React from 'react';
import { v4 as uuid } from 'uuid';
import type { StoryObj, Meta } from '@storybook/react';


import Menu, { MenuItemProps } from '@synerise/ds-menu';
import { focusWithArrowKeys } from '@synerise/ds-utils';

import { multipleItems, suffixType, prefixType, deleteState, ordered, simpleText, renderPrefix, renderSuffix } from './Menu.data';

import {
  fixedWrapper200,
  CLASSNAME_ARG_CONTROL,
  REACT_NODE_AS_STRING,
  controlFromOptionsArray,
  BOOLEAN_CONTROL,
} from '../../utils';


export default {
  title: 'Components/Menu/Menu',
  tags: ['autodocs'],
  component: Menu,
  decorators: [fixedWrapper200],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    ordered: BOOLEAN_CONTROL,
    selectedKeys: REACT_NODE_AS_STRING,
    selectable: BOOLEAN_CONTROL,
    checkboxVisibilityTrigger: BOOLEAN_CONTROL,
    suffixVisibilityTrigger: BOOLEAN_CONTROL,
    setDivider: BOOLEAN_CONTROL,
    disabled: BOOLEAN_CONTROL,
    suffixel: { ...controlFromOptionsArray('select', Object.keys(suffixType)), mapping: suffixType },
    prefixel: {
      ...controlFromOptionsArray('select', Object.keys(prefixType)),
      mapping: prefixType,
    },
    size: {
      ...controlFromOptionsArray('select', ['default', 'large']),
    },
    dataSource: { control: false },
  },
} as Meta<typeof Menu & MenuItemProps>;

type Story = StoryObj<typeof Menu & MenuItemProps>;

export const Default: Story = {
  render: ({ prefixel, suffixel, dataSource, children, ...rest }) => {
    const renderedPrefixel = prefixel && renderPrefix(prefixel);
    const renderedSuffixel = suffixel && renderSuffix(suffixel);
    const dataSourceEnriched = dataSource?.map(item => ({
      ...item,
      ...rest,
      suffixel: renderedSuffixel,
      prefixel: renderedPrefixel,
      key: !!item.key ? item.key : uuid(),
      className: 'ds-menu-item',
    }));
    
    return (
      <div
        style={{ width: '200px', borderRadius: '3px', overflow: 'hidden' }}
        onKeyDown={e => focusWithArrowKeys(e, 'ds-menu-item', () => {})}
      >
        <div style={{ background: 'rgba(0,0,0,0)', width: '200px' }}>
          <Menu ordered={rest.ordered} dataSource={dataSourceEnriched} />
        </div>
      </div>
    );
  },
  args: {
    dataSource: simpleText,
    suffixVisibilityTrigger: false,
    selectable: false,
    suffixel: 'none',
  },
};

export const withParent: Story = {
  ...Default,
  args: {
    ...Default.args,
    parent: true,
  },
};
export const withPrefixel: Story = {
  ...Default,
  args: {
    ...Default.args,
    prefixel: 'singleIcon',
  },
};

export const withSuffixel: Story = {
  ...Default,
  args: {
    ...Default.args,
    suffixel: 'switch',
  },
};

export const withOrderedList: Story = {
  ...Default,
  args: {
    ...Default.args,
    dataSource: ordered,
    ordered: true,
    selectable: true,
  },
};

export const withDeleteState: Story = {
  ...Default,
  args: {
    ...Default.args,
    dataSource: deleteState,
    prefixel: 'singleIcon',

  },
};


export const withSubMenu: Story = {
  render: ({ prefixel, suffixel, dataSource, children, ...rest }) => {
    const renderedPrefixel = prefixel && renderPrefix(prefixel);
    const renderedSuffixel = suffixel && renderSuffix(suffixel);
    const props = {
      dataSource: [
        {
          text: 'Parent 1',
          key: 'Parent 1',
          suffixel: renderedSuffixel,
          prefixel: renderedPrefixel,
          ordered: true,
          subMenu: [
            {
              text: 'Child 1',
              key: 'p1-Child 1',
              suffixel: renderedSuffixel,
              prefixel: renderedPrefixel,
              ordered: true,
            },
            {
              text: 'Child 2',
              key: 'p1-Child 2',
              suffixel: renderedSuffixel,
              prefixel: renderedPrefixel,
              ordered: true,
            },
            {
              text: 'Child 3',
              key: 'p1-Child 3',
              suffixel: renderedSuffixel,
              prefixel: renderedPrefixel,
              ordered: true,
            },
          ],
        },
        {
          text: 'Parent 2',
          key: 'Parent 2',
          suffixel: renderedSuffixel,
          prefixel: renderedPrefixel,
          ordered: true,
          subMenu: [
            {
              text: 'Child 1',
              key: 'p2-Child 1',
              suffixel: renderedSuffixel,
              prefixel: renderedPrefixel,
              ordered: true,
            },
            {
              text: 'Child 2',
              key: 'p2-Child 2',
              suffixel: renderedSuffixel,
              prefixel: renderedPrefixel,
              ordered: true,
            },
            {
              text: 'Child 3',
              key: 'p2-Child 3',
              suffixel: renderedSuffixel,
              prefixel: renderedPrefixel,
              ordered: true,
            },
          ],
        },
      ],
    } as object;
    const [selectedKeys, setSelectedKeys] = React.useState([]);

    const onClickCallback = (clickedKey: string) => {
      if (selectedKeys.indexOf(clickedKey) !== -1) {
        setSelectedKeys([]);
        return;
      }
      setSelectedKeys([clickedKey]);
    };
    const itemsWithOnClick = props.dataSource.map(item =>
      {
        let newItem = item;
        newItem.onTitleClick = ()=>{onClickCallback(item.key)}
        newItem.subMenu = item.subMenu.map(submenuItem => ({ ...submenuItem, onClick: () => {onClickCallback(submenuItem.key)} }))
        return newItem;
      }
    );

    return (
      <div
        style={{ width: '200px', borderRadius: '3px', overflow: 'hidden' }}
        onKeyDown={e => focusWithArrowKeys(e, 'ds-menu-item', () => {})}
      >
        <div style={{ background: 'rgba(0,0,0,0)', width: '200px' }}>
          <Menu dataSource={itemsWithOnClick} selectable selectedKeys={selectedKeys} ordered />
        </div>
      </div>
    );
  },
  args: {
    suffixVisibilityTrigger: false,
    selectable: false,
    suffixel: 'none',
  },
};

export const withHighlight: Story = {
  ...Default,
  args: {
    ...Default.args,
    highlight: 'Opt',
  },
};

export const withBreadcrumb: Story = {
  render: () => {
    return (
      <div style={{ background: 'rgba(0,0,0,0)', width: '200px', borderRadius: '3px', overflow: 'hidden' }}>
        <Menu>
          <Menu.Breadcrumb
            onPathClick={item => {
              console.log('Clicked', item);
            }}
            description={'Description'}
            path={['Home', 'Electronics', 'Smartphones']}
            highlight={'Desc'}
            compact
            gradientOverlap
            highlightActivePath
          />
        </Menu>
      </div>
    );
  },
  args: {},
};

export const withMaxItemsChildren: Story = {
  ...Default,
  args: {
    ...Default.args,
    dataSource: multipleItems,
  },
};