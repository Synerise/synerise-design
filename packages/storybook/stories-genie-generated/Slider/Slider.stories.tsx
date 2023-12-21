{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import React from 'react';
  import Slider, {
    SliderProps
  } from './Slider';
  const meta: Meta < SliderProps > = {
    title: 'Slider',
    component: Slider,
  };
  export default meta;
  const excludedProps = ['value', 'min', 'max', 'reachedEnd', 'range', 'reachedStart', 'description', 'tipFormatter', 'tracksColorMap', 'getTooltipPopupContainer'];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < SliderProps > ;
  const StoryTemplate: Story = {
    render: (args) => <Slider {...args} />,
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      label: 'Slider',
      useColorPalette: false,
      inverted: false,
      getTooltipPopupContainer: null,
      type: '',
      thickness: 0,
      allocationConfig: null,
      hideMinAndMaxMarks: false,
      disabled: false,
      value: 0,
      min: 0,
      max: 100,
      range: false,
      antdProps: {},
    },
  };
}