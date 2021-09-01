import * as React from 'react';

import ToolbarButtons from '@synerise/ds-toolbar-buttons';

const stories = {
  default: () => {
    return (
      <ToolbarButtons textPercent='100%'/>
    )
  },
};

export default {
  name: 'Components/Toolbar',
  config: {},
  stories,
  Component: ToolbarButtons,
}

