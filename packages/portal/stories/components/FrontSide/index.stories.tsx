import * as React from 'react';
import image from './sb_colloid.png';


export default {
  title: 'Introduction/Welcome',
  // parameters:{
  //   previewTabs: {
  //     docs: { hidden: true },
  //   },
  // }
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
}

export const Start = () => {
  return (
      <img src={image} width='100%' height='100%' alt="Synerise Dashboard" />
  )
};
Start.storyName="default";