import { boolean, select } from '@storybook/addon-knobs';
import { prefixType, renderPrefixIcon, renderSuffix, submenu, suffixType } from '../dataset';

import * as React from 'react';
import Menu from '@synerise/ds-menu';

const withSubmenu = () => {
  const disabled = boolean('Set disabled', false);
  const prefixKnob = select('Set prefix type', [prefixType.singleIcon, prefixType.none], prefixType.none);
  const suffixKnob = select('Set suffix type', [suffixType.none, suffixType.delete, suffixType.check], suffixType.none);
  const orderedChildren = boolean('Set children ordered', true);
  const orderedParents = boolean('Set parents ordered', true);
  const clickableChildren = boolean('Set children clickable', true);
  const props = {
    dataSource: [
      {
        text: 'Parent 1',
        key: 'Parent 1',
        clickable: true,
        suffixel: renderSuffix(suffixKnob),
        prefixel: renderPrefixIcon(prefixKnob),
        ordered: orderedParents,
        subMenu: [
          {
            text: 'Child 1',
            key: 'p1-Child 1',
            suffixel: renderSuffix(suffixKnob),
            prefixel: renderPrefixIcon(prefixKnob),
            ordered: orderedChildren,
            clickable: clickableChildren,
          },
          {
            text: 'Child 2',
            key: 'p1-Child 2',
            suffixel: renderSuffix(suffixKnob),
            prefixel: renderPrefixIcon(prefixKnob),
            ordered: orderedChildren,
            clickable: clickableChildren,
          },
          {
            text: 'Child 3',
            key: 'p1-Child 3',
            suffixel: renderSuffix(suffixKnob),
            prefixel: renderPrefixIcon(prefixKnob),
            ordered: orderedChildren,
            clickable: clickableChildren,
          },
        ],
      },
      {
        text: 'Parent 2',
        key: 'Parent 2',
        clickable: true,
        suffixel: renderSuffix(suffixKnob),
        prefixel: renderPrefixIcon(prefixKnob),
        ordered: orderedParents,
        subMenu: [
          {
            text: 'Child 1',
            key: 'p2-Child 1',
            suffixel: renderSuffix(suffixKnob),
            prefixel: renderPrefixIcon(prefixKnob),
            ordered: orderedChildren,
            clickable: clickableChildren,
          },
          {
            text: 'Child 2',
            key: 'p2-Child 2',
            suffixel: renderSuffix(suffixKnob),
            prefixel: renderPrefixIcon(prefixKnob),
            ordered: orderedChildren,
            clickable: clickableChildren,
          },
          {
            text: 'Child 3',
            key: 'p2-Child 3',
            suffixel: renderSuffix(suffixKnob),
            prefixel: renderPrefixIcon(prefixKnob),
            ordered: orderedChildren,
            clickable: clickableChildren,
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
    <div style={{ width: '200px' }}>
      <Menu disabled={disabled} dataSource={itemsWithOnClick} selectable selectedKeys={selectedKeys} ordered />
    </div>
  );
};
export default withSubmenu;
