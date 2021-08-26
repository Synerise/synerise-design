import * as React from 'react';

import Toolbar from '@synerise/ds-toolbar';

const stories = {
  default: () => {
    return (
    <Toolbar textPercent='100%'/>
    )
  },
};

export default {
name: 'Components/Toolbar',
  config: {},
  stories,
  Component: Toolbar,
}
