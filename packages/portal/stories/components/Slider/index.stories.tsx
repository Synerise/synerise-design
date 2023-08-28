import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean, number, select, } from '@storybook/addon-knobs';
import { defaultColorsOrder } from '@synerise/ds-core';


import Slider from '@synerise/ds-slider';
import { Props as SliderProps } from '@synerise/ds-slider/dist/Slider.types';
import { AllocationVariant } from '@synerise/ds-slider/dist/Allocation/Allocation.types';

const decorator = storyFn => <div style={{ padding: '48px' }}>{storyFn()}</div>;
const renderDescription = (text: string) => {
  return <div style={{ maxWidth: '120px', textOverflow: 'ellipsis', overflow: 'hidden',whiteSpace: 'nowrap' }}>{text}</div>;
};

const sliderValues = [0, 25, 75, 100];
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
const sizeTypes = {
  '3px': '3',
  '6px': '6',
};
const allocationVariants: AllocationVariant[] = [
  { name: 'Variant A', percentage: 33, tabId: 1, tabLetter: 'A' },
  { name: 'Variant B', percentage: 33, tabId: 2, tabLetter: 'B' },
  { name: 'Variant C', percentage: 34, tabId: 3, tabLetter: 'C' },
];
const customColorOptions = {
  'undefined': undefined,
  red: 'red-600',
  green: 'green-600',
  yellow: 'yellow-600',
  pink: 'pink-600',
  mars: 'mars-600',
  orange: 'orange-600',
  fern: 'fern-600',
  cyan: 'cyan-600',
  purple: 'purple-600',
  violet: 'violet-600',
};
const tracksColorMap = {
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
};

function decodeQuotes(str) {
  return str.replace(/&quot;/g, '"');
}

/**
 * Handles loading colors from the addon-knobs.
 * Note that addon-knobs escapes quotes, therefore `decodeQuotes`.
 */
function getColors() {
  const str = text('Colors', JSON.stringify(tracksColorMap)) || '{}'
  return JSON.parse(decodeQuotes(str));
}

const tipFormatter = (value: string) => <div className="Tip">{value}%</div>;

const Wrapper = (props: SliderProps) => {
  const [value, setValue] = React.useState(50);
  const [rangeValue, setRangeValue] = React.useState([-50, 50]);
  const hasMarks = boolean('Set scale', false);
  const maxMark = number('Max', 100);
  const minMark = number('Min', 0);
  const descriptionMessage = renderDescription(text('Description', 'Description'));
  const hasDescription = boolean('Set Description', false);
  const isOtherColor = boolean('Use other colors than default', false);
  const [tracksColor, setTracksColor] = React.useState(tracksColorMap);
  const tracksColors = React.useMemo(() => {
    return props.tracksColorMap || tracksColor;
  }, [tracksColor, props.tracksColorMap]);
  const color = isOtherColor ? select('Set color', customColorOptions, customColorOptions.undefined) : undefined;
  const getDescription = (hasDescription: boolean): string | React.ReactNode => {
    if (hasDescription) {
      return descriptionMessage;
    } else {
      return '';
    }
  };
  React.useEffect(() => {
    setTracksColor({ ...tracksColor, ...color !== customColorOptions.undefined ? {'0': color} : {} });
  },[color]);
  const mark = {
    [minMark]: minMark,
    [maxMark]: maxMark,
  };
console.log(tracksColor)
  return (
    <Slider
      {...props}
      marks={hasMarks && mark}
      max={maxMark}
      description={descriptionMessage && getDescription(hasDescription)}
      value={props.range ? rangeValue : value}
      onChange={props.range ? setRangeValue : setValue}
      hideMinAndMaxMarks={true}
      tracksColorMap={isOtherColor ? tracksColors : undefined}
    />
  );
};

const WrapperMultiMode = (props: SliderProps) => {
  const [value, setValue] = React.useState(0);
  const [rangeValue, setRangeValue] = React.useState(sliderValues);
  const numberOfRanges = Math.min(number('Number of ranges', sliderValues.length), defaultColorsOrder.length);
  React.useEffect(() => {
    const ranges = Array.from(Array(numberOfRanges + 1)).map((e, i) => {
      return 100 / numberOfRanges * i;
    })
    setRangeValue(ranges);
  }, [numberOfRanges])
  return (
    <Slider {...props} value={props.range ? rangeValue : value} onChange={props.range ? setRangeValue : setValue} />
  );
};
const WrapperMultiValuesMode = (props: SliderProps) => {
  const [variants, setVariants] = React.useState<AllocationVariant[]>(allocationVariants);
  return (
    <Slider
      {...props}
      type={'allocation'}
      allocationConfig={{
        variants,
        onAllocationChange: setVariants,
        controlGroupEnabled: false,
        controlGroupLabel: 'CG',
        controlGroupTooltip: 'Control group',
      }}
    />
  );
};
const stories = {
  default: () => (
    <Wrapper
      label={text('Label', 'Label')}
      disabled={boolean('Disabled', false)}
      included={boolean('Set area active', true)}
      inverted={boolean('Inverted', false)}
      min={number('Min', 0)}
      range={boolean('Range', false)}
      step={number('Step', 10)}
      dots={boolean('Dots', false)}
      tipFormatter={tipFormatter}
      onAfterChange={action('onAfterChange')}
      tooltipPlacement='bottom'
      getTooltipPopupContainer={container => container}
      useColorPalette={true}
      tooltipVisible={boolean('Value visible', false)}
      thickness={select('Set bar thickness', sizeTypes,sizeTypes['3px'])}
    />
  ),
  /*  withVisibleLabels: () => (
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
      tooltipPlacement={select('Placement', placements, 'bottom')}
      useColorPalette={boolean('useColorPalette', false)}
      getTooltipPopupContainer={() => document.body}
      thick={boolean('Set thick', false)}
    />
  ),*/
  multipleRange: () => (
    <WrapperMultiMode
      label={text('Label', 'Label')}
      disabled={boolean('Disabled', false)}
      dots={false}
      included={boolean('Set area active', true)}
      max={number('Max', 100)}
      min={number('Min', 0)}
      range={true}
      step={number('Step', 1)}
      tipFormatter={tipFormatter}
      onAfterChange={action('onAfterChange')}
      getTooltipPopupContainer={container => container}
      tooltipPlacement='bottom'
      useColorPalette={true}
      thickness={select('Set bar thickness', sizeTypes, sizeTypes['3px'])}
      tooltipVisible={boolean('Value visible', false)}
      tracksColorMap={boolean('Use other colors than default', false) ? getColors() : undefined}
    />
  ),
  allocationSlider: () => (
    <WrapperMultiValuesMode
      label={text('Label', 'Label')}
      disabled={boolean('Disabled', false)}
      tipFormatter={tipFormatter as any}
      tracksColorMap={boolean('Other colors than default', false) ? getColors() : undefined}
    />
  ),
};

export default {
  name: 'Components/Slider',
  withoutCenter: true,
  decorator,
  stories,
};
