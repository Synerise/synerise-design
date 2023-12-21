import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import {
  Props
} from './DatePicker.types';
import RawDatePicker from './RawDatePicker/RawDatePicker';
import PickerInput from './Elements/PickerInput/PickerInput';
import * as S from './DatePicker.styles';
const meta: Meta < Props > = {
  title: " Date Picker",
  component: DatePicker,
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < Props > ;
const StoryTemplate: Story = {
  render: (args) => <DatePicker {...args} />
};
export const Primary = {
  ...StoryTemplate,
  args: {
    autoFocus: false,
    disabled: false,
    texts: [],
    format: "",
    valueFormatOptions: [],
    value: "",
    onApply: "",
    showTime: false,
    onValueChange: "",
    onClear: "",
    errorText: "",
    popoverPlacement: "",
    prefixel: "",
    error: "",
    onDropdownVisibleChange: [],
    dropdownProps: [],
    suffixel = "",
    hideNow = false,
    readOnly = false
  }
}