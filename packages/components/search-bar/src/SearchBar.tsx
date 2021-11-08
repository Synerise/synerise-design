import * as React from 'react';
import Icon, { Close3M } from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Tooltip from '@synerise/ds-tooltip';
import { FormattedMessage } from 'react-intl';
import * as S from './SearchBar.styles';
import { SearchBarProps } from './SearchBar.types';

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  className,
  onSearchChange,
  onClearInput,
  placeholder,
  iconLeft,
  autofocus,
  clearTooltip = <FormattedMessage id="DS.SEARCH-BAR.CLEAR-TOOLTIP" />,
  disabled,
  borderRadius,
  handleInputRef,
  autofocusDelay,
}) => {
  const [isFocused, setFocus] = React.useState(false);
  const [inputRef, setInputRef] = React.useState<
    React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | undefined>
  >();

  React.useEffect(() => {
    if (inputRef) {
      handleInputRef && handleInputRef(inputRef);
      if (autofocus) {
        if (autofocusDelay) {
          setTimeout(() => {
            inputRef.current && inputRef.current.focus({ preventScroll: true });
          }, 50);
        } else {
          inputRef.current && inputRef.current.focus({ preventScroll: true });
        }
      }
    }
  }, [autofocus, autofocusDelay, handleInputRef, inputRef]);

  return (
    <S.SearchBarWrapper
      iconLeft={iconLeft}
      isEmpty={!value}
      className={isFocused ? 'is-focused' : ''}
      disabled={disabled as boolean}
      borderRadius={borderRadius}
      data-testid="input-wrapper"
    >
      {iconLeft && <S.IconLeftWrapper>{iconLeft}</S.IconLeftWrapper>}
      {onClearInput && Boolean(value) && (
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
        handleInputRef={setInputRef}
        disabled={disabled}
        autoComplete="off"
      />
    </S.SearchBarWrapper>
  );
};

export default SearchBar;
