import { boolean, select } from '@storybook/addon-knobs';
import { prefixType, renderPrefixIcon, renderSuffix, submenu, suffixType } from '../dataset';
import { getDefaultProps } from '../index.stories';

import * as React from 'react';
import Menu from '@synerise/ds-menu';

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
        suffixel: renderSuffix(suffixKnob),
        prefixel: renderPrefixIcon(prefixKnob),
        key: 'Parent 1',
        ordered: orderedParents,

        subMenu: [
          {
            text: 'Child 1',
            key: 'Child 1',
            suffixel: renderSuffix(suffixKnob),
            prefixel: renderPrefixIcon(prefixKnob),
            ordered: orderedChildren,
          },
          {
            text: 'Child 2',
            suffixel: renderSuffix(suffixKnob),
            prefixel: renderPrefixIcon(prefixKnob),
            ordered: orderedChildren,
          },
          {
            text: 'Child 3',
            suffixel: renderSuffix(suffixKnob),
            prefixel: renderPrefixIcon(prefixKnob),
            ordered: orderedChildren,
          },
        ],
      },
      {
        text: 'Parent 2',
        suffixel: renderSuffix(suffixKnob),
        prefixel: renderPrefixIcon(prefixKnob),
        ordered: orderedParents,
        subMenu: [
          {
            text: 'Child 1',
            suffixel: renderSuffix(suffixKnob),
            prefixel: renderPrefixIcon(prefixKnob),
            ordered: orderedChildren,
          },
          {
            text: 'Child 2',
            suffixel: renderSuffix(suffixKnob),
            prefixel: renderPrefixIcon(prefixKnob),
            ordered: orderedChildren,
          },
          {
            text: 'Child 3',
            suffixel: renderSuffix(suffixKnob),
            prefixel: renderPrefixIcon(prefixKnob),
            ordered: orderedChildren,
          },
        ],
      },
    ],
  } as object;
  return (
    <div style={{ width: '200px' }}>
      <Menu {...defaultProps} dataSource={props.dataSource} ordered />
    </div>
  );
};
export default withSubmenu;
