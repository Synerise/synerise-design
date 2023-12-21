{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import React from 'react';
  import DateRangePicker, {
    RawDateRangePicker
  } from './DateRangePicker';
  const meta: Meta = {
    title: 'DateRangePicker',
    component: DateRangePicker,
  };
  export default meta;
  const excludedProps = [];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < typeof DateRangePicker > ;
  const StoryTemplate: Story = {
    render: (args) => (<DateRangePicker
      value={args.value}
      defaultValue={args.defaultValue}
      onApply={args.onApply}
      showTime={args.showTime}
      texts={args.texts}
      popoverTrigger={args.popoverTrigger}
      forceAdjacentMonths={args.forceAdjacentMonths}
      disableDefaultTexts={args.disableDefaultTexts}
      arrowColor={args.arrowColor}
      valueFormatOptions={args.valueFormatOptions}
      onVisibleChange={args.onVisibleChange}
      popoverProps={args.popoverProps}
      rangePickerInputProps={args.rangePickerInputProps}
      renderPopoverTrigger={args.renderPopoverTrigger}
      readOnly={args.readOnly}
    />),
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      value: undefined,
      defaultValue: undefined,
      onApply: undefined,
      showTime: undefined,
      texts: undefined,
      popoverTrigger: undefined,
      forceAdjacentMonths: undefined,
      disableDefaultTexts: undefined,
      arrowColor: undefined,
      valueFormatOptions: undefined,
      onVisibleChange: undefined,
      popoverProps: undefined,
      rangePickerInputProps: undefined,
      renderPopoverTrigger: undefined,
      readOnly: false,
    },
  };
}