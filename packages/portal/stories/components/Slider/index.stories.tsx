import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { DSProvider } from '@synerise/ds-core';
import { action } from '@storybook/addon-actions';
import { text, boolean, number, select } from '@storybook/addon-knobs';
import Tooltip from '@synerise/ds-tooltip';

import Slider from '@synerise/ds-slider';

const sliderValues = [-100, -95, -90, -75, -50, -40, -30, -25, -10, 0, 10, 25, 30, 40, 50, 75, 90, 95, 100];
const wrapperStyles = {
  padding: '48px',
};
const placements = [
  'top',
  'left',
  'right',
  'bottom',
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
  'leftTop',
  'leftBottom',
  'rightTop',
  'rightBottom',
];

const marks = {
  '-100': '-100°',
  '-75': '-75°',
  '-50': '-50°',
  '-25': '-25°',
  0: {
    style: {
      color: 'cornflowerblue',
    },
    label: <strong>0°C</strong>,
  },
  25: '25°',
  26: {
    style: {
      lineHeight: 1.2,
      textAlign: 'center',
      top: '-14px',
    },
    label: (
      <Tooltip
        placement="top"
        title="To jest tylko dla przykladu zeby pokazac jak mozna rozwiazac nachodzace na siebie tooltipy"
      >
        <span>26°</span>
      </Tooltip>
    ),
  },
  27: {
    style: {
      lineHeight: 1.2,
      textAlign: 'center',
      top: '14px',
    },
    label: (
      <Tooltip
        placement="top"
        title="To jest tylko dla przykladu zeby pokazac jak mozna rozwiazac nachodzace na siebie tooltipy"
      >
        <span>27°</span>
      </Tooltip>
    ),
  },
  28: '28°',
  50: '50°',
  75: '75°',
  100: '100°',
};

const Wrapper = (props: any) => {
  const [value, setValue] = React.useState(0);
  const [rangeValue, setRangeValue] = React.useState([-50, 50]);

  return (
    <>
      <Slider {...props} value={props.range ? rangeValue : value} onChange={props.range ? setRangeValue : setValue} />
    </>
  );
};

const WrapperMultiMode = (props: any) => {
  const [value, setValue] = React.useState(0);
  const [rangeValue, setRangeValue] = React.useState(sliderValues);
  return (
    <>
      <Slider {...props} value={props.range ? rangeValue : value} onChange={props.range ? setRangeValue : setValue} />
    </>
  );
};

storiesOf('Components|Slider', module).add('default', () => {
  const tipFormatter = (value: string) => <div>{value} °C</div>;

  return (
    <div style={wrapperStyles}>
      <DSProvider code="en_GB">
        <Wrapper
          label={text('label', 'Label')}
          disabled={boolean('disabled', false)}
          marks={marks}
          dots={boolean('dots', false)}
          included={boolean('included', true)}
          inverted={boolean('inverted', false)}
          max={number('max', 100)}
          min={number('min', -100)}
          range={boolean('range', true)}
          step={number('step', 1)}
          tipFormatter={tipFormatter}
          vertical={boolean('vertical', false)}
          onAfterChange={action('onAfterChange')}
          OnChange={action('OnChange')}
          tooltipPlacement={select('Placement', placements, 'top')}
          useColorPalette={boolean('useColorPalette', true)}
          getTooltipPopupContainer={() => document.body}
        />
      </DSProvider>
    </div>
  );
});

storiesOf('Components|Slider', module).add('multiple range', () => {
  const tipFormatter = (value: string) => <span>{value}°C</span>;

  return (
    <div style={wrapperStyles}>
      <DSProvider code="en_GB">
        <WrapperMultiMode
          label={text('label', 'Label')}
          disabled={boolean('disabled', false)}
          dots={boolean('dots', false)}
          included={boolean('included', true)}
          inverted={boolean('inverted', false)}
          marks={marks}
          max={number('max', 100)}
          min={number('min', -100)}
          range={boolean('range', true)}
          step={number('step', 1)}
          tipFormatter={tipFormatter}
          vertical={boolean('vertical', false)}
          onAfterChange={action('onAfterChange')}
          OnChange={action('OnChange')}
          tooltipPlacement={select('Placement', placements, 'top')}
          useColorPalette={boolean('useColorPalette', true)}
        />
      </DSProvider>
    </div>
  );
});
