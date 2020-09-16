import * as React from 'react';
import { SearchInput } from '@synerise/ds-search/dist/Elements';
type DebouncedInputProps = { debouncedOnChange: (text: string) => void };
const DebouncedInput: React.FC<DebouncedInputProps> = ({ debouncedOnChange }: DebouncedInputProps) => {
  const [value, setValue] = React.useState<string>('');
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
