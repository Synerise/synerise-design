import * as React from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Radio from '@synerise/ds-radio';
import markdown from '@/radio/README.md';

const stories = {

  default: () => {
    const tooltipTitle = text('tooltip label', 'Label');
    const setTooltip = boolean('show tooltip', false)
    const setDescription = text('description', 'Description');
    const setDisabled = boolean('disabled', false)
    return (
    <Radio.Group onChange={action('onChange')} defaultValue="A">
      <Radio
        disabled={setDisabled}
        description={setDescription}
        title={tooltipTitle}
        tooltip={setTooltip}
        value="A"
      />
      <Radio
        disabled={setDisabled}
        description={setDescription}
        title={tooltipTitle}
        tooltip={setTooltip}
        value="B"
      />
    </Radio.Group>
  )},
  radioButtons: () => {
    const setFullWidth = boolean('disabled', false);
    const setDisabled = boolean('disabled B', false);
    const setBig = boolean('disabled', false)

    return (
    <Radio.Group defaultValue="a" buttonStyle="solid" onChange={action('onChange')}
                 fullWidth={setFullWidth} big={setBig}>
      <Radio.Button value="a">A</Radio.Button>
      <Radio.Button value="b" disabled={setDisabled}>B</Radio.Button>
      <Radio.Button value="c">C</Radio.Button>
      <Radio.Button value="d">D</Radio.Button>
    </Radio.Group>
    )
  },
};

export default {
name: 'Components/Radio',
  config: {
    notes: {
      markdown,
    },
  },
  stories,
  Component: Radio,
};
