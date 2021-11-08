import * as React from 'react';

import SearchBar from '@synerise/ds-search-bar';
import Icon, { SearchM } from '@synerise/ds-icon';
import { boolean, text } from '@storybook/addon-knobs';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

const decorator = storyFn => <div style={{ width: '300px' }}>{storyFn()}</div>;

const stories = {
  default: () => {
    const [value, setValue] = React.useState<string>('');

    return (
      <SearchBar
        disabled={boolean('disabled', false)}
        borderRadius={boolean('border radius', false)}
        autofocus={boolean('focus', false)}
        iconLeft={boolean('icon', true) && <Icon component={<SearchM />} color={theme.palette['grey-600']} />}
        value={value}
        onSearchChange={targetValue => setValue(targetValue)}
        placeholder={text('placeholder', 'Placeholder')}
        onClearInput={() => setValue('')}
        clearTooltip={'Clear'}
      />
    );
  },
};

export default {
  name: 'Components/Search/SearchBar',
  decorator,
  config: {},
  stories,
  Component: SearchBar,
};
