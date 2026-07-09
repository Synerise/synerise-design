import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import Autocomplete from '@synerise/ds-autocomplete';
import ColorPicker from '@synerise/ds-color-picker';
import DatePicker from '@synerise/ds-date-picker';
import DateRangePicker, {
  type DateRange,
} from '@synerise/ds-date-range-picker';
import FormField from '@synerise/ds-form-field';
import Icon, { FileM, SearchM } from '@synerise/ds-icon';
import { Input, PasswordInput, TextArea } from '@synerise/ds-input';
import InputNumber from '@synerise/ds-input-number';
import ItemPicker from '@synerise/ds-item-picker';
import { SearchInput } from '@synerise/ds-search';
import Select from '@synerise/ds-select';
import TimePicker from '@synerise/ds-time-picker';

import { ABSOLUTE_RANGE, TEXTS } from '../DateRangePicker/constants';

const { Option } = Select;

// Shared state applied to every field so the stories differ only by state.
// `populated` fills each field with a value; otherwise every field is empty.
type FieldState = {
  error?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  populated?: boolean;
};

const SAMPLE_DATE = new Date(2026, 0, 15);
const ITEMS = [
  { text: 'Item one' },
  { text: 'Item two' },
  { text: 'Item three' },
];
// DateRangePicker requires a value; an absolute range with no dates is the empty trigger.
const EMPTY_RANGE: DateRange = { type: 'ABSOLUTE' };

const noop = (): void => {};

/**
 * Every input/form-related field stacked vertically with a fixed 16px gap so
 * their idle/error/readOnly/disabled/focus/hover chrome can be compared side by
 * side. Each field carries a label — via the component's own `label` prop where
 * supported, or an outer <FormField label> for the four that lack it:
 * ColorPicker, TimePicker, DatePicker and DateRangePicker (none accept a
 * `label` prop). The FormField wrapper also matches their layout/margins to the
 * label-prop components so the 16px rhythm stays consistent. State props are
 * only passed to components that support them — the omissions (ItemPicker/
 * TimePicker have no readOnly, TimePicker has no error boolean, DateRangePicker
 * has no error state) are themselves discrepancies worth seeing.
 */
const FieldStack = ({ error, readOnly, disabled, populated }: FieldState) => {
  // Autocomplete is controlled, so it needs real state to be typeable.
  const [autocompleteValue, setAutocompleteValue] = useState(
    populated ? 'Selected value' : '',
  );
  // SearchInput is controlled, so it needs real state to be typeable/clearable.
  const [searchValue, setSearchValue] = useState(
    populated ? 'Sample text' : '',
  );
  const errorText = error ? 'Error message' : undefined;
  const icon1 = <Icon component={<FileM />} />;
  const icon2 = <Icon component={<SearchM />} />;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        width: 320,
      }}
    >
      <Select
        label="Select"
        placeholder="Placeholder"
        defaultValue={populated ? 'a' : undefined}
        error={error}
        errorText={errorText}
        readOnly={readOnly}
        disabled={disabled}
      >
        <Option value="a">Option A</Option>
        <Option value="b">Option B</Option>
      </Select>

      {/* ColorPicker has no `label` prop — wrap in FormField for the label. */}
      <FormField label="Color picker">
        <ColorPicker
          placeholder="Placeholder"
          value={populated ? '#3417d1' : undefined}
          onChange={noop}
          error={error}
          errorText={errorText}
          readOnly={readOnly}
          disabled={disabled}
        />
      </FormField>

      <Autocomplete
        label="Autocomplete"
        placeholder="Placeholder"
        value={autocompleteValue}
        onChange={setAutocompleteValue}
        icon1={icon1}
        icon1Tooltip="File"
        icon2={icon2}
        icon2Tooltip="Search"
        error={error}
        errorText={errorText}
        readOnly={readOnly}
        disabled={disabled}
      >
        <Autocomplete.Option value="a">Option A</Autocomplete.Option>
        <Autocomplete.Option value="b">Option B</Autocomplete.Option>
      </Autocomplete>

      {/* SearchInput (ds-search) has no `label` prop — wrap in FormField.
          `alwaysExpanded` keeps the field open so its chrome is comparable; it
          has no error/readOnly state (a discrepancy worth seeing). */}
      <FormField label="Search input">
        <SearchInput
          alwaysExpanded
          placeholder="Placeholder"
          value={searchValue}
          onChange={setSearchValue}
          onClear={() => setSearchValue('')}
          clearTooltip="Clear"
          disabled={disabled}
        />
      </FormField>

      <Input
        label="Input"
        placeholder="Placeholder"
        defaultValue={populated ? 'Sample text' : undefined}
        icon1={icon1}
        icon2={icon2}
        error={error}
        errorText={errorText}
        readOnly={readOnly}
        disabled={disabled}
      />

      <InputNumber
        label="Input number"
        placeholder="Placeholder"
        defaultValue={populated ? 42 : undefined}
        min={0}
        max={100}
        error={error}
        errorText={errorText}
        readOnly={readOnly}
        disabled={disabled}
      />

      <ItemPicker
        isNewVersion
        label="Item picker"
        items={ITEMS}
        selectedItem={populated ? ITEMS[0] : undefined}
        placeholder="Placeholder"
        error={error}
        errorMessage={errorText}
        disabled={disabled}
      />

      {/* TimePicker has no `label` prop — wrap in FormField for the label. */}
      <FormField label="Time picker">
        <TimePicker
          placeholder="Placeholder"
          value={populated ? SAMPLE_DATE : undefined}
          onChange={noop}
          errorText={errorText}
          disabled={disabled}
        />
      </FormField>

      {/* DatePicker has no `label` prop — wrap in FormField for the label. */}
      <FormField label="Date picker">
        <DatePicker
          value={populated ? SAMPLE_DATE : undefined}
          onApply={noop}
          error={error}
          errorText={errorText}
          readOnly={readOnly}
          disabled={disabled}
        />
      </FormField>

      {/* DateRangePicker has no `label` prop — wrap in FormField for the label. */}
      <FormField label="Date range picker">
        <DateRangePicker
          value={populated ? ABSOLUTE_RANGE : EMPTY_RANGE}
          texts={TEXTS}
          onApply={noop}
          readOnly={readOnly}
          disabled={disabled}
        />
      </FormField>

      <PasswordInput
        label="Password"
        placeholder="Placeholder"
        defaultValue={populated ? 'password123' : undefined}
        error={error}
        errorText={errorText}
        readOnly={readOnly}
        disabled={disabled}
      />

      <TextArea
        label="Textarea"
        placeholder="Placeholder"
        defaultValue={populated ? 'Sample multi-line text' : undefined}
        icon1={icon1}
        icon2={icon2}
        error={error}
        errorText={errorText}
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
};

const meta: Meta<typeof FieldStack> = {
  title: 'Components/InputElements/Form Elements Comparison',
  component: FieldStack,
  // Hidden from the sidebar for standard users (main.ts excludes 'visualtests').
  tags: ['visualtests'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof FieldStack>;

export const Default: Story = {
  render: () => <FieldStack />,
};

export const Populated: Story = {
  render: () => <FieldStack populated />,
};

export const Error: Story = {
  render: () => <FieldStack error />,
};

export const ReadOnly: Story = {
  render: () => <FieldStack readOnly />,
};

export const Disabled: Story = {
  render: () => <FieldStack disabled />,
};

// storybook-addon-pseudo-states forces the pseudo-class on every field at once
// so the focus / hover chrome can be compared across all components together.
export const Focus: Story = {
  render: () => <FieldStack />,
  parameters: {
    pseudo: { focus: true },
  },
};

export const Hover: Story = {
  render: () => <FieldStack />,
  parameters: {
    pseudo: { hover: true },
  },
};
