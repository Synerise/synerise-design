import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import syneriseTheme from './theme';
const req = require.context('../stories', true, /.stories.tsx$/);

function loadStories() {
  addDecorator(withInfo);
  addDecorator(withKnobs);
  req.keys().forEach(req);
}

addParameters({
  options: {
    theme: syneriseTheme,
  },
});

configure(loadStories, module);
