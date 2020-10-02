import * as React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';
import Loader from '@synerise/ds-loader';


const iconSizes = {
  Small: 'S',
  Medium: 'M',
  Large: 'L'
};

const stories = {
  default: () => {
    const size = select('Size', iconSizes,'S')
    const elementsPosition = select('Position of elements', ['right','bottom'],'right');
    const showText = boolean ('Show Loading text',true, );
    const loadingText = text('Loading', 'Loading...');
    const getLoading = (showText: boolean): string | null => {
      if (showText) {
        return loadingText;
      } else {
        return null;
      }
    };
    return(
      <div>
        <Loader size={size} textLoader={loadingText && getLoading(showText)} elementsPosition={elementsPosition}></Loader>
      </div>
    )
  },
};

export default {
name: 'Components/Loader',
  config: {},
  stories,
  Component: Loader,
}
