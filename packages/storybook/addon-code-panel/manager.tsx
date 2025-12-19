import React from 'react';
import { addons, types } from 'storybook/manager-api';

import { CodePanel } from './CodePanel';

addons.register('addon/code-panel', (api) => {
  addons.add('code-panel/panel', {
    type: types.PANEL,
    title: 'Code',
    match: ({ viewMode }) => viewMode === 'story',
    render: (props) =>
      React.createElement(CodePanel, { isActive: props.active ?? false }),
  });
});
