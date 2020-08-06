import { boolean, select } from '@storybook/addon-knobs';
import { prefixType, renderPrefixIcon, renderSuffix, submenu, suffixType } from '../dataset';
import { getDefaultProps } from '../index.stories';

import * as React from 'react';
import Menu from '@synerise/ds-menu';
import { useOnClickOutside } from '@synerise/ds-utils';

const withSubmenu = () => {
  const defaultProps = getDefaultProps();
  const prefixKnob = select('Set prefix type', [prefixType.singleIcon, prefixType.none], prefixType.none);
  const suffixKnob = select('Set suffix type', [suffixType.none, suffixType.delete, suffixType.check], suffixType.none);
  const orderedChildren = boolean('Set children ordered', true);
  const orderedParents = boolean('Set parents ordered', true);
  const props = {
    dataSource: [
      {
        text: 'Parent 1',
        key: 'Parent 1',
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
          },
          {
            text: 'Child 2',
            key: 'p1-Child 2',
            suffixel: renderSuffix(suffixKnob),
            prefixel: renderPrefixIcon(prefixKnob),
            ordered: orderedChildren,
          },
          {
            text: 'Child 3',
            key: 'p1-Child 3',
            suffixel: renderSuffix(suffixKnob),
            prefixel: renderPrefixIcon(prefixKnob),
            ordered: orderedChildren,
          },
        ],
      },
      {
        text: 'Parent 2',
        key: 'Parent 2',
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
          },
          {
            text: 'Child 2',
            key: 'p2-Child 2',
            suffixel: renderSuffix(suffixKnob),
            prefixel: renderPrefixIcon(prefixKnob),
            ordered: orderedChildren,
          },
          {
            text: 'Child 3',
            key: 'p2-Child 3',
            suffixel: renderSuffix(suffixKnob),
            prefixel: renderPrefixIcon(prefixKnob),
            ordered: orderedChildren,
          },
        ],
      },
    ],
  } as object;
  const [selectedKeys, setSelectedKeys] = React.useState([]);
  const wrapperRef = React.useRef();

  useOnClickOutside(wrapperRef,()=>{
  })
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
      newItem.onTitleClick = ()=>{console.log('Clicked on title!');onClickCallback(item.key)}
      newItem.subMenu = item.subMenu.map(submenuItem => ({ ...submenuItem, onClick: () => {onClickCallback(submenuItem.key)} }))
      return newItem;
    }
  );
  console.log(itemsWithOnClick);
  console.log('Selected',selectedKeys)
  return (
    <div style={{ width: '200px' }} ref={wrapperRef}>
      <Menu {...defaultProps} dataSource={itemsWithOnClick} selectable selectedKeys={selectedKeys} ordered />
    </div>
  );
};
export default withSubmenu;
