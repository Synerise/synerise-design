import * as React from 'react';

import SearchBar from '@synerise/ds-search-bar';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import Icon from '@synerise/ds-icon';
import {boolean, text} from "@storybook/addon-knobs";
import theme from "@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme";

const decorator = (storyFn) => (
  <div style={{ width: '300px' }}>
    {storyFn()}
  </div>
);

const stories = {
  default: () => {
    const [value, setValue] = React.useState<string>('text example');

    return (
      <SearchBar
        disabled={boolean('disabled', false)}
        value={value}
        onSearchChange={targetValue => setValue(targetValue)}
        placeholder={text('placeholder', 'Placeholder')}
        autofocus={boolean('focus', false)}
        onClearInput={()=> setValue('')}
        clearTooltip={'Clear'}
        iconLeft={boolean('icon', true) && <Icon component={<SearchM/>} color={theme.palette['grey-600']} />}
      />
    )
  }
};

export default {
  name: 'Components|SearchBar',
  decorator,
  config: {},
  stories,
  Component: SearchBar,
}
