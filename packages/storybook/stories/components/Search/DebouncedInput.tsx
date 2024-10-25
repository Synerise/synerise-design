import React, { useState } from 'react';
import { SearchInput } from '@synerise/ds-search';

type DebouncedInputProps = { debouncedOnChange: (text: string) => void };

const DebouncedInput = ({ debouncedOnChange }: DebouncedInputProps) => {
  const [value, setValue] = useState('');
  return (
    <SearchInput
      clearTooltip="Clear"
      placeholder="Search"
      onChange={value => {
        setValue(value);
        debouncedOnChange(value);
      }}
      value={value}
      onClear={() => {
        setValue('');
        debouncedOnChange('');
      }}
      closeOnClickOutside={false}
      alwaysExpanded
    />
  );
};

export default DebouncedInput;
