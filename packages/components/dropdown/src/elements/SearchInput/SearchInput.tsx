import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Close3M from '@synerise/ds-icon/dist/icons/Close3M';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from './SearchInput.styles';

export interface SearchInputProps {
  onSearchChange: (value: string) => void;
  onClearInput?: () => void;
  placeholder: string;
  className?: string;
  value: string;
  iconLeft?: React.ReactNode;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  className,
  onSearchChange,
  onClearInput,
  placeholder,
  iconLeft,
}) => {
  return (
    <S.DropdownSearchInputWrapper iconLeft={iconLeft}>
      {iconLeft && <S.IconLeftWrapper>{iconLeft}</S.IconLeftWrapper>}
      {onClearInput && !!value.length && (
        <S.ClearInputWrapper onClick={onClearInput}>
          <Icon component={<Close3M />} color={theme.palette['grey-500']} />
        </S.ClearInputWrapper>
      )}
      <S.DropdownSearchInput
        onChange={(e: React.FormEvent<HTMLInputElement>): void => onSearchChange(e.currentTarget.value)}
        placeholder={placeholder}
        value={value}
        className={className}
        resetMargin
      />
    </S.DropdownSearchInputWrapper>
  );
};

export default SearchInput;
