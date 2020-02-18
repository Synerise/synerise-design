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
  autofocus?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  className,
  onSearchChange,
  onClearInput,
  placeholder,
  iconLeft,
  autofocus,
}) => {
  const focus = (inputRef: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | undefined>): void => {
    autofocus && inputRef.current && inputRef.current.focus();
  };

  return (
    <S.DropdownSearchInputWrapper iconLeft={iconLeft} isEmpty={value.length === 0}>
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
        handleInputRef={focus}
      />
    </S.DropdownSearchInputWrapper>
  );
};

export default SearchInput;
