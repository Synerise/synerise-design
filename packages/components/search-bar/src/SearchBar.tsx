import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Close3M from '@synerise/ds-icon/dist/icons/Close3M';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { useState } from 'react';
import Tooltip from '@synerise/ds-tooltip';
import * as S from './SearchBar.styles';

export interface SearchBarProps {
  onSearchChange: (value: string) => void;
  onClearInput?: () => void;
  placeholder: string;
  className?: string;
  clearTooltip?: string | React.ReactNode;
  value: string;
  iconLeft?: React.ReactNode;
  autofocus?: boolean;
  disabled?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  className,
  onSearchChange,
  onClearInput,
  placeholder,
  iconLeft,
  autofocus,
  clearTooltip,
  disabled,
}) => {
  const [isFocused, setFocus] = useState(false);
  const focus = (inputRef: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | undefined>): void => {
    autofocus && inputRef.current && inputRef.current.focus();
  };

  return (
    <S.SearchBarWrapper
      iconLeft={iconLeft}
      isEmpty={value.length === 0}
      className={isFocused ? 'is-focused' : ''}
      disabled={disabled as boolean}
      data-testid="input-wrapper"
    >
      {iconLeft && <S.IconLeftWrapper>{iconLeft}</S.IconLeftWrapper>}
      {onClearInput && !!value.length && (
        <S.ClearInputWrapper onClick={onClearInput} data-testid="clear-btn">
          <Icon
            component={
              <Tooltip title={clearTooltip}>
                <Close3M />
              </Tooltip>
            }
            color={theme.palette['grey-500']}
            size={18}
          />
        </S.ClearInputWrapper>
      )}
      <S.SearchBar
        onChange={(e: React.FormEvent<HTMLInputElement>): void => onSearchChange(e.currentTarget.value)}
        onFocus={(): void => setFocus(true)}
        onBlur={(): void => setFocus(false)}
        placeholder={placeholder}
        value={value}
        className={className}
        resetMargin
        handleInputRef={focus}
        disabled={disabled}
      />
    </S.SearchBarWrapper>
  );
};

export default SearchBar;
