import { addons } from "@storybook/addons";
// import { themes } from '@storybook/theming';
import theme from './theme';

import '@storybook/addon-knobs/dist/register';

addons.setConfig({
  theme,
  showPanel: true,
  panelPosition: "bottom",
});

// import { addons } from '@storybook/addons';
import { STORY_CHANGED } from '@storybook/core-events';
// import { RESET } from '@storybook/addon-knobs';

// FIXME: A monkeypatch to work around the broken @storybook/knobs addon.
// We emit the reset event to the addon if a story is loaded initially.
// We tinker with the browser url that gets polluted by the addon and clean the storybook api from the polluted data.
// This should be removed once we migrated to the storybooks controls.
/*
if (0) addons.register('workaround-for-accumulating-knobs-state-in-url', (api) => {
  // There is no other way to access the storybook api except by registering an addon 💩
  api.on(STORY_CHANGED, () => {
    const { queryParams, path } = api.getUrlState();
    const urlParamsToPurge = {};
    const purifiedUrlSeachParams = { path };

    // Prepare search url params
    Object.entries(queryParams).forEach(([key, value]) => {
      // We assign bad url params to be purged from the storybook api
      if (key.startsWith('knob-')) {
        Object.assign(urlParamsToPurge, { [key]: undefined });
      } else {
        // We keep the good ones to set them to the browser
        Object.assign(purifiedUrlSeachParams, { [key]: value });
      }
    });

    // Build search query string and push them to the browser history
    const queryParamsAsString = Object.entries(purifiedUrlSeachParams)
      .filter(([_, value]) => value)
      .map(([key, value], index) => (index === 0 ? `?${key}=${value}` : `${key}=${value}`))
      .join('&');
    history.pushState(undefined, undefined, queryParamsAsString);

    // Clear the storybook api from any polluted state
    // We do this by setting bad keys to 'undefined', not to 'null' like the docs suggest
    api.setQueryParams(urlParamsToPurge);

    // We call the reset event emitter channel of the knobs addon to reload the component knobs
    api.emit(RESET);
  });
});
*/
