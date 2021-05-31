import * as React from 'react';
import image from './sb_colloid.png';


const stories = {
  default: () => {
    return (
        <img src={image} width='100%' height='100%' alt="Synerise Dashboard" />
    )
  },
};

export default {
name: 'Welcome/Welcome',
  config: {},
  stories,
}
