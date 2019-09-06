import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
const req = require.context('../stories', true, /.stories.tsx$/);

function loadStories() {
  addDecorator(withInfo);
  req.keys().forEach(req);
}

configure(loadStories, module);
