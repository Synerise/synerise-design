import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean, number, select, object, array } from '@storybook/addon-knobs';

import Slider from '@synerise/ds-slider';

const decorator = storyFn => <div style={{ padding: '48px' }}>{storyFn()}</div>;

const sliderValues = [0, 25, 75, 100];
const slidersValues = [0,33, 66, 100];
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

const mark = {
  0: '0',
  100: '100',
};

const tipFormatter = (value: string) => <div className="Tip">{value}%</div>;

const Wrapper = (props: any) => {
  const [value, setValue] = React.useState(50);
  const [rangeValue, setRangeValue] = React.useState([-50, 50]);
  const hasMarks = boolean('Set Marks', false);
  const descriptionMessage = text('Description', 'Description');
  const hasDescription = boolean('Set Description', false);
  const getDescription = (hasDescription: boolean): string => {
    if (hasDescription) {
      return descriptionMessage;
    } else {
      return '';
    }
  };

  return (
    <Slider
      {...props}
      marks={hasMarks && mark}
      description={descriptionMessage && getDescription(hasDescription)}
      value={props.range ? rangeValue : value}
      onChange={props.range ? setRangeValue : setValue}
    />
  );
};

const WrapperMultiMode = (props: any) => {
  const [value, setValue] = React.useState(0);
  const [rangeValue, setRangeValue] = React.useState(sliderValues);
  return (
    <Slider {...props} value={props.range ? rangeValue : value} onChange={props.range ? setRangeValue : setValue} />
  );
};
const WrapperMultiValuesMode = (props: any) => {
  const [value, setValue] = React.useState(0);
  const [rangeValue, setRangeValue] = React.useState(slidersValues);
  return (
    <Slider {...props} value={props.range ? rangeValue : value} onChange={props.range ? setRangeValue : setValue} />
  );
};
const stories = {
  default: () => (
    <Wrapper
      label={text('label', 'Label')}
      disabled={boolean('disabled', false)}
      reverse={boolean('reverse', false)}
      included={boolean('included', true)}
      inverted={boolean('inverted', false)}
      max={number('max', 100)}
      min={number('min', 0)}
      range={boolean('range', false)}
      step={number('step', 0.1)}
      tipFormatter={tipFormatter}
      onAfterChange={action('onAfterChange')}
      OnChange={action('OnChange')}
      tooltipPlacement={select('Placement', placements, 'bottom')}
      useColorPalette={boolean('useColorPalette', false)}
      getTooltipPopupContainer={() => document.querySelector('.ant-slider-handle')}
      tooltipVisible={boolean('Value visible', false)}
      bolderLine={boolean('Set bolder Line', false)}
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
      onAfterChange={action('onAfterChange')}
      OnChange={action('OnChange')}
      tooltipPlacement={select('Placement', placements, 'bottom')}
      useColorPalette={boolean('useColorPalette', false)}
      getTooltipPopupContainer={() => document.body}
      bolderLine={boolean('Set bolder Line', false)}
    />
  ),
  multipleRange: () => (
    <WrapperMultiMode
      label={text('label', 'Label')}
      disabled={boolean('disabled', false)}
      dots={boolean('dots', false)}
      included={boolean('included', true)}
      inverted={boolean('inverted', false)}
      max={number('max', 100)}
      min={number('min', 0)}
      range={boolean('range', true)}
      step={number('step', 1)}
      tipFormatter={tipFormatter}
      onAfterChange={action('onAfterChange')}
      OnChange={action('OnChange')}
      tooltipPlacement={select('Placement', placements, 'bottom')}
      useColorPalette={boolean('useColorPalette', true)}
      bolderLine={boolean('Set bolder Line', false)}
      tooltipVisible={boolean('Value visible', false)}
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
  multiValuesRanges: () => (
    <WrapperMultiValuesMode
      label={text('label', 'Label')}
      disabled={boolean('disabled', false)}
      dots={boolean('dots', false)}
      included={boolean('included', true)}
      inverted={boolean('inverted', false)}
      max={number('max', 100)}
      min={number('min', 0)}
      range={boolean('range', true)}
      step={number('step', 1)}
      tipFormatter={tipFormatter}
      onAfterChange={action('onAfterChange')}
      OnChange={action('OnChange')}
      tooltipPlacement={select('Placement', placements, 'bottom')}
      useColorPalette={boolean('useColorPalette', true)}
      bolderLine={boolean('Set bolder Line', false)}
      tooltipVisible={boolean('Value visible', false)}
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
  name: 'Components/Slider',
  withoutCenter: true,
  decorator,
  stories,
  Component: Slider,
};
