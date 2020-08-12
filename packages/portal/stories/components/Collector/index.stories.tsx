import * as React from 'react';

import Collector from '@synerise/ds-collector';
import { boolean, text } from '@storybook/addon-knobs';

const decorator = storyFn => <div style={{ width: '588px' }}>{storyFn()}</div>;
const getSuggestions = () => {
  const result = [];
  for (let i = 10; i < 36; i++) {
    for (let j = 0; j < 3; j++) {
      result.push(`Options ${i.toString(36).toUpperCase()} - ${j}`);
    }
  }
  return result;
};
const stories = {
  default: () => {
    return (
      <Collector
        values={[]}
        label={text('Set label', 'Label')}
        disabled={boolean('Set disabled', false)}
        description={text('Set description', 'Description')}
        errorText={text('Set error text', '')}
        suggestions={getSuggestions()}
        fixedHeight={boolean('Set fixed height', false)}
        texts={{
          add: 'Add',
          cancel: 'Cancel',
          placeholder: 'Type value',
          toSelect: "to select",
          toNavigate: 'to navigate',
        }}
      />
    );
  },
};

export default {
  name: 'Components|Collector',
  config: {},
  stories,
  decorator,
};
