import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean, number, select, object } from '@storybook/addon-knobs';
import { defaultColorsOrder } from '@synerise/ds-core';


import Slider from '@synerise/ds-slider';
import type { SliderProps } from '@synerise/ds-slider/dist/Slider.types';
import { AllocationVariant } from '@synerise/ds-slider/dist/Allocation/Allocation.types';

const decorator = storyFn => <div style={{ padding: '48px' }}>{storyFn()}</div>;
const renderDescription = (text: string) => {
  return <div style={{ maxWidth: '120px', textOverflow: 'ellipsis', overflow: 'hidden',whiteSpace: 'nowrap' }}>{text}</div>;
};

const sliderValues = [0, 25, 75, 100];

const sizeTypes = {
  '3px': '3',
  '6px': '6',
};
const allocationVariants: AllocationVariant[] = [
  { name: 'Variant A', percentage: 35, tabId: 1, tabLetter: 'A' },
  { name: 'Variant B', percentage: 25, tabId: 2, tabLetter: 'B' },
  { name: 'Variant C', percentage: 30, tabId: 3, tabLetter: 'C' },
  { name: 'Variant D', percentage: 10, tabId: 3, tabLetter: 'D' },
];
const customColorOptions = {
  'default': undefined,
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
  const color = select('Set custom color', customColorOptions, customColorOptions.default);
  const getDescription = (hasDescription: boolean): string | React.ReactNode => {
    if (hasDescription) {
      return descriptionMessage;
    } else {
      return '';
    }
  };
  
  const mark = {
    [minMark]: minMark,
    [maxMark]: maxMark,
  };
  return (
    <Slider
      {...props}
      marks={hasMarks && mark}
      max={maxMark}
      description={descriptionMessage && getDescription(hasDescription)}
      value={props.range ? rangeValue : value}
      onChange={props.range ? setRangeValue : setValue}
      hideMinAndMaxMarks={true}
      tracksColorMap={color ? { "0": color } : undefined}
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
      useColorPalette
      tooltipVisible={boolean('Value visible', false)}
      thickness={select('Set bar thickness', sizeTypes,sizeTypes['3px'])}
    />
  ),
  multipleRange: () => {
    const customColours = boolean('Use other colors than default', false);
    return (
    <WrapperMultiMode
      label={text('Label', 'Label')}
      disabled={boolean('Disabled', false)}
      dots={false}
      included={boolean('Set area active', true)}
      max={number('Max', 100)}
      min={number('Min', 0)}
      range
      step={number('Step', 1)}
      tipFormatter={tipFormatter}
      onAfterChange={action('onAfterChange')}
      getTooltipPopupContainer={container => container}
      tooltipPlacement='bottom'
      useColorPalette
      thickness={select('Set bar thickness', sizeTypes, sizeTypes['3px'])}
      tooltipVisible={boolean('Value visible', false)}
      tracksColorMap={customColours ? getColors() : undefined}
    />
  )},
  allocationSlider: () => {
    const blockedHandlers = boolean('Block handlers', false);
    
    return (
    <WrapperMultiValuesMode
      label={text('Label', 'Label')}
      disabled={boolean('Disabled', false)}
      tipFormatter={tipFormatter as any}
      tracksColorMap={boolean('Other colors than default', false) ? getColors() : undefined}
      handlers={blockedHandlers ? object('Handlers config', {
        1:{
          blocked:true,
          blockedTooltipProps:{
            title:"Blocked handler"
          }
        }
      }):undefined}
    />)
  }
};

export default {
  name: 'Components/Slider',
  withoutCenter: true,
  decorator,
  stories,
};
