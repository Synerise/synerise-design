import '@storybook/addon-notes/register-panel';
import '@storybook/addon-actions/register';
import '@storybook/addon-links/register';
import '@storybook/addon-knobs/dist/register';
import '@storybook/addon-viewport/register';
import { addons } from '@storybook/addons';
import syneriseTheme from './theme';

addons.setConfig({
    theme: syneriseTheme,
})
