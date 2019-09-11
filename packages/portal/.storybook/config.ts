import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import syneriseTheme from './theme';
const req = require.context('../stories', true, /.stories.tsx$/);

function loadStories() {
  addDecorator(withInfo);
  addDecorator(withKnobs);
  addDecorator(centered);
  req.keys().forEach(req);
}

addParameters({
  options: {
    theme: syneriseTheme,
  },
});

configure(loadStories, module);
