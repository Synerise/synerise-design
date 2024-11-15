import React from 'react';

import { boolean, select, text } from '@storybook/addon-knobs';

import ShortCuts from '@synerise/ds-short-cuts';
import { ArrowDownS } from '@synerise/ds-icon';

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
    const renderIcon = boolean('Set icon', true);
    const autoWidth = boolean('Set auto width for more text', false);

    return (
      <div>
        <ShortCuts color={color} size={size} children={shortCutText} autoWidth={autoWidth} icon={renderIcon ? <ArrowDownS /> : undefined} />
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
