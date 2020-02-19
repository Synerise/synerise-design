import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean, number, select, object, array } from '@storybook/addon-knobs';
import Tooltip from '@synerise/ds-tooltip';

import Slider from '@synerise/ds-slider';

const decorator = storyFn => <div style={{ padding: '48px' }}>{storyFn()}</div>;

const sliderValues = [-100, -95, -90, -75, -50, -40, -30, -25, -10, 0, 10, 25, 30, 40, 50, 75, 90, 95, 100];
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
      color: '#384350',
      fontWeight: 500,
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

const tipFormatter = (value: string) => <div>{value} °C</div>;

const Wrapper = (props: any) => {
  const [value, setValue] = React.useState(0);
  const [rangeValue, setRangeValue] = React.useState([-50, 50]);

  return (
    <Slider {...props} value={props.range ? rangeValue : value} onChange={props.range ? setRangeValue : setValue} />
  );
};

const WrapperMultiMode = (props: any) => {
  const [value, setValue] = React.useState(0);
  const [rangeValue, setRangeValue] = React.useState(sliderValues);
  return (
    <Slider {...props} value={props.range ? rangeValue : value} onChange={props.range ? setRangeValue : setValue} />
  );
};

const stories = {
  default: () => (
    <Wrapper
      label={text('label', 'Label')}
      disabled={boolean('disabled', false)}
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
      useColorPalette={boolean('useColorPalette', false)}
      getTooltipPopupContainer={() => document.body}
    />
  ),
  withVisibleLabels: () => (
    <Wrapper
      tooltipVisible={true}
      disabled={boolean('disabled', false)}
      dots={boolean('dots', false)}
      included={boolean('included', true)}
      inverted={boolean('inverted', false)}
      max={number('max', 24)}
      min={number('min', 0)}
      range={boolean('range', true)}
      step={number('step', 1)}
      vertical={boolean('vertical', false)}
      onAfterChange={action('onAfterChange')}
      OnChange={action('OnChange')}
      tooltipPlacement={select('Placement', placements, 'top')}
      useColorPalette={boolean('useColorPalette', false)}
      getTooltipPopupContainer={() => document.body}
    />
  ),
  multipleRange: () => (
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
      tracksColorMap={{
        '0': 'cyan-600',
        '1': 'yellow-600',
        '2': 'pink-600',
        '3': 'green-600',
        '4': 'mars-600',
        '5': 'orange-600',
        '6': 'purple-600',
        '7': 'violet-600',
        '8': 'red-600',
        '9': 'fern-600',
      }}
    />
  ),
};

export default {
  name: 'Components|Slider',
  withoutCenter: true,
  decorator,
  stories,
  Component: Slider,
};
