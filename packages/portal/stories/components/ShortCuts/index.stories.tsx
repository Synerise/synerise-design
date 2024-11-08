import React from 'react';

import { boolean, select, text } from '@storybook/addon-knobs';

import ShortCuts from '@synerise/ds-short-cuts';
import { ArrowDownM } from '@synerise/ds-icon';

const ShortCutsSizes = {
  Small: 'S',
  Large: 'L',
};

const ShortCutsColor = {
  Dark: 'dark',
  Light: 'light',
};

const stories = {
  default: () => {
    const size = select('Size', ShortCutsSizes, 'S');
    const color = select('Color', ShortCutsColor, 'light');
    const shortCutText = text('Text', 'S');
    const renderIcon = boolean('set icon', true);

    return (
      <div>
        <ShortCuts color={color} size={size} children={shortCutText} icon={renderIcon ? <ArrowDownM/> : undefined} />
      </div>
    )
  },
};

export default {
name: 'Components/ShortCuts',
  config: {},
  stories,
  Component: ShortCuts,
}
