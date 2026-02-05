import Input, { type InputRef } from 'antd/lib/input';
import React, {
  type ChangeEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { theme } from '@synerise/ds-core';
import Icon, { Close3M } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { useOnClickOutside, usePrevious } from '@synerise/ds-utils';

import * as S from '../../Search.styles';
import SearchButton from '../SearchButton/SearchButton';
import { type SearchInputProps } from './SearchInput.types';

const SearchInput = ({
  alwaysExpanded,
  alwaysHighlight,
  clearTooltip,
  filterLabel,
  filterLookupKey,
  onKeyDown,
  onClick,
  onChange,
  onClear,
  onToggle,
  onButtonClick,
  moveCursorToEnd,
  placeholder,
  textLookupKey,
  value,
  closeOnClickOutside,
  disableInput,
  disabled,
  focusTrigger,
  toggleTrigger,
  inputProps = {},
  searchTooltipProps = {},
}: SearchInputProps) => {
  const inputRef = useRef<InputRef>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isInputOpen, setIsInputOpen] = useState(
    alwaysExpanded || !!value || !!filterLabel,
  );
  const [inputOffset, setInputOffset] = useState(0);
  const [isResultChosen, setIsResultChosen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(true);

  const renderInputOpened = isInputOpen || !!value || !!filterLabel;

  const prevFocusTrigger = usePrevious(focusTrigger);
  const prevToggleTrigger = usePrevious(toggleTrigger);

  useLayoutEffect(() => {
    if (prevFocusTrigger !== undefined && prevFocusTrigger !== focusTrigger) {
      focusInput();
    }
    if (
      prevToggleTrigger !== undefined &&
      prevToggleTrigger !== toggleTrigger
    ) {
      toggleOpen();
    }
  });

  useOnClickOutside(wrapperRef, () => {
    if (closeOnClickOutside && !alwaysExpanded) {
      setIsInputOpen(false);
      onToggle && onToggle(false);
    }
  });

  const focusInput = () => {
    inputRef.current && inputRef.current.focus();
  };

  const handleSearchInputContentClick = () => {
    onClick && onClick();
    focusInput();
  };

  const handleOffsetWithFilter = (ref: HTMLDivElement | null) => {
    ref && setInputOffset(ref.getBoundingClientRect().width);
  };

  const handleChangeValue = ({
    target: { value: changedValue },
  }: ChangeEvent<HTMLInputElement>) => {
    onChange(changedValue);
    setIsResultChosen(false);
  };

  const toggleOpen = () => {
    setIsInputOpen((open) => {
      onToggle && onToggle(!open);
      return !open;
    });
  };

  const handleSearchButtonClick = () => {
    if (!alwaysExpanded) {
      toggleOpen();
      focusInput();
      onButtonClick && onButtonClick();
    }
  };

  const handleClearValue = () => {
    setInputOffset(0);
    setIsResultChosen(false);
    onClear();
    setIsInputOpen(true);
    focusInput();
  };

  useEffect(() => {
    if (moveCursorToEnd && inputRef.current?.input) {
      inputRef.current.input.selectionStart = value.length || 0;
      inputRef.current.input.selectionEnd = value.length || 0;
    }
  }, [moveCursorToEnd, value.length]);

  return (
    <S.SearchInputWrapper ref={wrapperRef}>
      {!disabled && (
        <S.SearchInputContent
          className={
            renderInputOpened
              ? 'is-open search-input-wrapper'
              : 'search-input-wrapper'
          }
          offset={inputOffset}
          filterLabel={filterLabel}
          onClick={handleSearchInputContentClick}
        >
          <S.LeftSide isOpen={isInputOpen}>
            {filterLabel && (
              <S.Filter ref={handleOffsetWithFilter}>
                {filterLabel.icon && !isResultChosen && (
                  <Icon component={filterLabel.icon} />
                )}
                <span>
                  {filterLabel[filterLookupKey || ''] ||
                    filterLabel[textLookupKey || '']}
                </span>
              </S.Filter>
            )}
          </S.LeftSide>
          <Tooltip {...searchTooltipProps}>
            <S.SearchInner hasValue={!!value} alwaysHighlight={alwaysHighlight}>
              <Input
                placeholder={placeholder}
                ref={inputRef}
                value={value}
                onChange={handleChangeValue}
                onKeyDown={onKeyDown}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                autoComplete="off"
                autoFocus
                disabled={disableInput}
                {...inputProps}
              />
            </S.SearchInner>
          </Tooltip>
        </S.SearchInputContent>
      )}
      <SearchButton
        disabled={disabled}
        inputOpen={isInputOpen}
        hidden={!!value || !!filterLabel}
        inputFocused={isInputFocused}
        clickable={!disabled && !alwaysExpanded}
        onClick={handleSearchButtonClick}
      />
      {!disabled && (
        <S.ClearButton hidden={!value && !filterLabel}>
          <Icon
            data-testid="clear"
            onClick={handleClearValue}
            component={
              <Tooltip title={clearTooltip}>
                <Close3M />
              </Tooltip>
            }
            color={theme.palette['red-600']}
            size={18}
          />
        </S.ClearButton>
      )}
    </S.SearchInputWrapper>
  );
};

export default SearchInput;
