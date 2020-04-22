import * as React from 'react';
import { ReactElement, useState } from 'react';
import { Input } from 'antd';
import Close3M from '@synerise/ds-icon/dist/icons/Close3M';
import { useOnClickOutside } from '@synerise/ds-utils';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Icon from '@synerise/ds-icon/dist/Icon';
import * as S from '../../Search.styles';
import { FilterElement } from '../../Search.types';
import { SearchInputProps } from './SearchInput.types';
import SearchButton from '../SearchButton/SearchButton';

const SearchInput: React.FC<SearchInputProps> = ({
  onClick,
  onToggle,
  onButtonClick,
  placeholder,
  clearTooltip,
  onValueChange,
  value,
  onClear,
  onKeyDown,
  filterLabel,
  closeOnClickOutside,
  focusTrigger,
  toggleTrigger,
  alwaysHighlight,
  alwaysExpanded,
}) => {
  const [firstRender, setFirstRender] = useState(true);
  const [inputOpen, setInputOpen] = useState(alwaysExpanded || false);
  const [label, setLabel] = useState<FilterElement | null>();
  const [inputOffset, setInputOffset] = useState(0);
  const [focus, setFocus] = useState(false);
  const [resultChoosed, setResultChoosed] = useState(false);
  const inputWrapperRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<Input>(null);

  const toggleOpen = (): void => {
    onToggle && onToggle(!inputOpen);
    setInputOpen(prevState => {
      return !prevState;
    });
  };

  const focusOnInput = React.useCallback((): void => {
    if (!firstRender) {
      inputRef !== null && inputRef.current && inputRef.current.focus();
      setFocus(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRef, firstRender, focus]);

  React.useEffect(() => {
    if (filterLabel === null) {
      setInputOffset(0);
    }
    setLabel(filterLabel);
  }, [filterLabel]);

  React.useEffect(() => {
    focusOnInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, filterLabel, focusTrigger]);

  React.useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    } else {
      toggleOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleTrigger]);

  useOnClickOutside(inputWrapperRef, () => {
    if (closeOnClickOutside && !value) {
      setInputOpen(false);
    }
    setFocus(false);
  });

  const clearValue = React.useCallback((): void => {
    setFocus(false);
    setLabel(null);
    onValueChange('');
    setInputOffset(0);
    onClear('');
    setResultChoosed(false);
    focusOnInput();
  }, [onValueChange, onClear, focusOnInput]);

  const change = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const currentValue = e.currentTarget.value;
      onValueChange(currentValue);
      setResultChoosed(false);
    },
    [onValueChange]
  );

  const renderSearchInputContent = React.useMemo(
    (): ReactElement => (
      <S.SearchInputContent
        className={inputOpen ? 'is-open' : 'search-input-wrapper'}
        offset={inputOffset}
        onClick={(): void => {
          focusOnInput();
          setFocus(true);
          onClick && onClick();
        }}
      >
        <S.LeftSide isOpen={inputOpen}>
          {label && (
            <S.Filter
              ref={(reference): void => {
                reference && setInputOffset(reference.getBoundingClientRect().width);
              }}
            >
              {label.icon && !resultChoosed && <Icon component={label.icon} />}
              <span>{label.filter ? label.filter : label.text}</span>
            </S.Filter>
          )}
        </S.LeftSide>
        <S.SearchInner hasValue={!!value && value.length > 0} alwaysHighlight={!!alwaysHighlight}>
          <Input
            placeholder={placeholder}
            ref={inputRef}
            value={value}
            onChange={change}
            onKeyDown={onKeyDown}
            onFocus={(): void => {
              inputOpen && setFocus(true);
            }}
            onBlur={(): void => {
              inputOpen && !alwaysHighlight && setFocus(false);
            }}
          />
        </S.SearchInner>
      </S.SearchInputContent>
    ),
    [change, inputOffset, inputOpen, label, onClick, onKeyDown, placeholder, resultChoosed, value, alwaysHighlight, focusOnInput]
  );
  return (
    <S.SearchInputWrapper ref={inputWrapperRef}>
      {renderSearchInputContent}
      <SearchButton
        inputOpen={inputOpen}
        hidden={!!value || !!filterLabel}
        inputFocused={focus}
        clickable={!alwaysExpanded}
        onClick={(): void => {
          if (!alwaysExpanded) {
            toggleOpen();
            clearValue();
            onButtonClick && onButtonClick();
            focusOnInput();
          }
        }}
      />
      <S.ClearButton hidden={!value && !filterLabel} data-testid="clear">
        <Icon
          onClick={clearValue}
          component={
            <Tooltip title={clearTooltip}>
              <Close3M />
            </Tooltip>
          }
          color={theme.palette['red-600']}
          size={18}
        />
      </S.ClearButton>
    </S.SearchInputWrapper>
  );
};
export default SearchInput;
