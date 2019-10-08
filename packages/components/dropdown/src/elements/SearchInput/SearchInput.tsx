import * as React from 'react';
import * as S from './SearchInput.styles';

interface Props {
  onSearchChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

const SearchInput: React.FC<Props> = ({ className, onSearchChange, placeholder }) => (
  <S.SearchInput
    onChange={(e: React.FormEvent<HTMLInputElement>): void => onSearchChange(e.currentTarget.value)}
    placeholder={placeholder}
    className={className}
  />
);

export default SearchInput;
