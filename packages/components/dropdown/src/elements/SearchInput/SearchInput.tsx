import * as React from 'react';
import * as S from './SearchInput.styles';

export interface SearchInputProps {
  onSearchChange: (value: string) => void;
  placeholder: string;
  className?: string;
  value: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, className, onSearchChange, placeholder }) => (
  <>
    <S.DropdownSearchInput
      onChange={(e: React.FormEvent<HTMLInputElement>): void => onSearchChange(e.currentTarget.value)}
      placeholder={placeholder}
      value={value}
      className={className}
      resetMargin
    />
  </>
);

export default SearchInput;
