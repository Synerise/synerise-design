import * as React from 'react';
import * as S from './SearchInput.styles';

interface Props {
  onSearchChange: (value: string) => void;
  placeholder: string;
  value: string;
}

const SearchInput: React.FC<Props> = ({ onSearchChange, placeholder, value }) => (
  <S.SearchInput
    onChange={(e: React.FormEvent<HTMLInputElement>): void => onSearchChange(e.currentTarget.value)}
    placeholder={placeholder}
    value={value}
  />
);

export default SearchInput;
