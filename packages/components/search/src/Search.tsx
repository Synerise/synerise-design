import React, { type ReactNode, useEffect, useRef, useState } from 'react';

import Scrollbar from '@synerise/ds-scrollbar';
import { focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';

import { SearchInput } from './Elements';
import SearchRenderer from './Elements/SearchRenderer/SearchRenderer';
import {
  getAllElementsFiltered,
  getParametersScrollTop,
  hasSomeElement,
  hasSomeElementFiltered,
} from './Elements/utils/searchUtils';
import * as S from './Search.styles';
import {
  type AnyObject,
  type SearchProps,
  SelectResultDataKeys,
} from './Search.types';
import {
  INPUT_EXPAND_ANIMATION_DURATION,
  MENU_WIDTH_OFFSET,
  SCROLLBAR_HEIGHT_OFFSET,
} from './const';
import './style/index.less';

export function Search<
  T extends AnyObject,
  U extends AnyObject,
  S extends AnyObject,
>({
  divider,
  dropdownMaxHeight,
  width,
  searchWidth,
  style,
  dropdownWidth,
  recent,
  suggestions = null,
  parameters,
  value,
  textLookupConfig,
  hideLabel,
  parameterValue,
  onParameterValueChange,
  alwaysExpanded,
  onClear,
  onValueChange,
  filterLookupKey,
  recentDisplayProps,
  parametersDisplayProps,
  suggestionsDisplayProps,
  placeholder,
  clearTooltip,
  disableInput,
  inputProps,
  searchTooltipProps,
}: SearchProps<T, U, S>) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [label, setLabel] = useState<T | null>(() => {
    if (parameterValue) {
      const found = parameters.find(
        (param) =>
          param[textLookupConfig.parameters as keyof U] === parameterValue,
      );
      return (found as T) ?? null;
    }
    return null;
  });

  const [filteredParameters, setFilteredParameters] =
    useState<(T | U)[]>(parameters);
  const [filteredRecent, setFilteredRecent] = useState<T[]>(recent);
  const [filteredSuggestions, setFilteredSuggestions] = useState<S[] | null>(
    suggestions ?? null,
  );

  const [isListVisible, setIsListVisible] = useState(false);
  const [isResultChosen, setIsResultChosen] = useState(false);
  const [toggleInputTrigger, setToggleInputTrigger] = useState(false);
  const [focusInputTrigger, setFocusInputTrigger] = useState(false);
  const [scrollbarScrollTop, setScrollbarScrollTop] = useState(0);
  const [moveCursorToEnd, setMoveCursorToEnd] = useState(true);

  const [itemsListWidth, setItemsListWidth] = useState<number>(
    width || searchWidth ? (width || searchWidth)! - MENU_WIDTH_OFFSET : 0,
  );

  useEffect(() => {
    if (parameterValue) {
      const found = parameters.find(
        (param) =>
          param[textLookupConfig.parameters as keyof U] === parameterValue,
      );
      setLabel((found as T) ?? null);
    } else {
      setLabel(null);
    }
  }, [parameterValue, parameters, textLookupConfig.parameters]);

  useEffect(() => {
    setFilteredRecent(
      getAllElementsFiltered(recent, value, textLookupConfig.recent),
    );
  }, [recent, value, textLookupConfig.recent]);

  useEffect(() => {
    setFilteredParameters(
      parameterValue
        ? parameters
        : getAllElementsFiltered(
            parameters,
            value,
            textLookupConfig.parameters,
          ),
    );
  }, [parameters, value, parameterValue, textLookupConfig.parameters]);

  useEffect(() => {
    if (suggestions) {
      setFilteredSuggestions(
        getAllElementsFiltered(
          suggestions,
          value,
          textLookupConfig.suggestions,
        ),
      );
    } else {
      setFilteredSuggestions(null);
    }
  }, [suggestions, value, textLookupConfig.suggestions]);

  useEffect(() => {
    const newWidth = (width || searchWidth || 0) - MENU_WIDTH_OFFSET;
    setItemsListWidth(Math.max(0, newWidth));
  }, [width, searchWidth]);

  useEffect(() => {
    if (hideLabel) {
      setLabel(null);
      setIsResultChosen(false);
    }
  }, [hideLabel]);

  useEffect(() => {
    if (!value) {
      setIsResultChosen(false);
    }
  }, [value]);

  const handleScroll = (event: React.SyntheticEvent): void => {
    const scrollTop = (event.currentTarget as HTMLElement).scrollTop;
    setScrollbarScrollTop(scrollTop);
  };

  const handleKeyDownWrapper = (event: React.KeyboardEvent): void => {
    focusWithArrowKeys(event, 'ds-search-item', () => {
      setFocusInputTrigger((prev) => !prev);
    });
  };

  const handleDropdownClick = (): void => {
    setFocusInputTrigger((prev) => !prev);
  };

  const mergedWidth = searchWidth !== undefined ? searchWidth : width;

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && value === '' && isOpen) {
      setLabel(null);
      setFilteredRecent(recent);
      onParameterValueChange?.('', null);
      return;
    }

    if (event.key === 'Enter' && isOpen) {
      setIsResultChosen(!!value);
    }

    setMoveCursorToEnd(false);
  };

  const getSearchWrapperWidth = (): number => {
    if (width) {
      return width - MENU_WIDTH_OFFSET;
    }
    if (
      wrapperRef.current &&
      wrapperRef.current.clientWidth > MENU_WIDTH_OFFSET
    ) {
      return wrapperRef.current.clientWidth - MENU_WIDTH_OFFSET;
    }
    return 0;
  };

  const [isOpen, setIsOpen] = useState(false);

  useOnClickOutside(wrapperRef, () => {
    if (isOpen && !value && !label && !alwaysExpanded) {
      setToggleInputTrigger((prev) => !prev);
    }
    setIsOpen(false);
    setIsListVisible(false);
    setScrollbarScrollTop(0);
  });

  const handleClearValue = () => {
    onClear?.();

    setLabel(null);
    setFilteredRecent(recent);
    setFilteredParameters(parameters);
    setFilteredSuggestions(suggestions ?? null);
    setIsResultChosen(false);
  };

  const handleChange = (currentValue: string) => {
    onValueChange?.(currentValue);

    if (parameterValue) {
      const matchingSuggestions = getAllElementsFiltered(
        suggestions ?? [],
        currentValue,
        textLookupConfig.suggestions,
      );

      setFilteredSuggestions(matchingSuggestions);
      setIsResultChosen(false);
      setIsListVisible(matchingSuggestions.length > 0);
    } else {
      const matchingRecent = getAllElementsFiltered(
        recent,
        currentValue,
        textLookupConfig.recent,
      );

      const matchingParameters = getAllElementsFiltered(
        parameters,
        currentValue,
        textLookupConfig.parameters,
      );

      setFilteredParameters(matchingParameters);
      setFilteredRecent(matchingRecent);
      setIsResultChosen(false);
      setIsListVisible(
        matchingRecent.length > 0 || matchingParameters.length > 0,
      );
    }
  };

  const isListItemRendered = (): boolean => {
    if (parameterValue) {
      return hasSomeElementFiltered(
        suggestions,
        value,
        textLookupConfig.suggestions,
      );
    } else {
      const anyRecentItem = hasSomeElementFiltered(
        recent,
        value,
        textLookupConfig.recent,
      );
      const anyFilter = hasSomeElementFiltered(
        parameters,
        value,
        textLookupConfig.parameters,
      );
      return anyRecentItem || anyFilter;
    }
  };

  const selectResult = (
    item: AnyObject,
    dataKey: SelectResultDataKeys,
  ): void => {
    const newValue = item[textLookupConfig[dataKey] as keyof typeof item];
    onValueChange?.(newValue);

    setIsResultChosen(true);
    setMoveCursorToEnd(true);
  };

  const selectFilter = (item: AnyObject): void => {
    const paramKey = textLookupConfig.parameters as keyof typeof item;
    const paramValue = item[paramKey];

    onValueChange?.('');

    setLabel(item as T);
    setFocusInputTrigger((prev) => !prev);
    setMoveCursorToEnd(true);

    if (filterLookupKey && item[filterLookupKey as keyof typeof item]) {
      const inputValue = item[paramKey];
      const filterValue = item[filterLookupKey as keyof typeof item];

      onValueChange?.(inputValue);
      onParameterValueChange?.(filterValue, item as U);

      setIsResultChosen(true);
    } else {
      onParameterValueChange?.(paramValue, item as U);
    }
  };
  const widthDropdownSearch = dropdownWidth
    ? dropdownWidth - MENU_WIDTH_OFFSET
    : itemsListWidth;
  const shouldRenderRecent = Boolean(
    recent && !label && hasSomeElement(filteredRecent),
  );
  const shouldRenderParameters = Boolean(
    parameters && !label && hasSomeElement(filteredParameters),
  );
  const shouldRenderSuggestions = Boolean(
    suggestions &&
    suggestionsDisplayProps &&
    parameterValue &&
    !isResultChosen &&
    filteredSuggestions &&
    hasSomeElement(filteredSuggestions),
  );

  const renderInputWrapper = (): ReactNode => {
    const handleInputClick = () => {
      setIsOpen(true);
      setIsListVisible(true);
      setItemsListWidth(getSearchWrapperWidth());
    };

    const handleToggle = (toggle: boolean) => {
      setIsOpen(toggle);
      setIsListVisible(toggle);

      setTimeout(() => {
        setItemsListWidth(getSearchWrapperWidth());
      }, INPUT_EXPAND_ANIMATION_DURATION);
    };

    const handleButtonClick = () => {
      setFocusInputTrigger((prev) => !prev);
    };

    return (
      <SearchInput
        alwaysHighlight
        clearTooltip={clearTooltip}
        searchTooltipProps={searchTooltipProps}
        filterLookupKey={filterLookupKey}
        textLookupKey={String(textLookupConfig.parameters)}
        filterLabel={label}
        focusTrigger={focusInputTrigger}
        onButtonClick={handleButtonClick}
        onChange={handleChange}
        onClear={handleClearValue}
        onClick={handleInputClick}
        onKeyDown={onKeyDown}
        onToggle={handleToggle}
        placeholder={placeholder}
        toggleTrigger={toggleInputTrigger}
        value={value}
        moveCursorToEnd={moveCursorToEnd}
        disableInput={disableInput}
        inputProps={inputProps}
        alwaysExpanded={alwaysExpanded}
        closeOnClickOutside={
          !alwaysExpanded && !isListVisible && !value && !label
        }
      />
    );
  };

  return (
    <S.SearchWrapper
      ref={wrapperRef}
      className="SearchWrapper"
      inputOpen={isOpen}
      $width={mergedWidth}
      onKeyDown={handleKeyDownWrapper}
      style={style}
    >
      {renderInputWrapper()}
      {isListVisible && (
        <S.SearchDropdownWrapper
          dropdownWidth={dropdownWidth}
          onClick={handleDropdownClick}
        >
          <S.SearchDropdownContent
            maxHeight={dropdownMaxHeight}
            className={
              isOpen && !isResultChosen && isListItemRendered()
                ? 'search-list-open'
                : ''
            }
          >
            <Scrollbar
              absolute
              maxHeight={dropdownMaxHeight - SCROLLBAR_HEIGHT_OFFSET}
              onScroll={handleScroll}
            >
              {shouldRenderRecent && (
                <SearchRenderer
                  data={filteredRecent}
                  highlight={value}
                  width={widthDropdownSearch}
                  onItemClick={(item) =>
                    selectResult(item, SelectResultDataKeys.RECENT)
                  }
                  {...recentDisplayProps}
                />
              )}
              {!!filteredParameters?.length &&
                !!filteredRecent?.length &&
                !label &&
                divider}
              {shouldRenderParameters && (
                <SearchRenderer
                  data={filteredParameters}
                  highlight={value}
                  width={widthDropdownSearch}
                  height={dropdownMaxHeight}
                  listProps={{
                    scrollTop: getParametersScrollTop({
                      scrollTop: scrollbarScrollTop,
                      recent: filteredRecent,
                      rowHeight: recentDisplayProps.rowHeight,
                    }),
                    ...(parametersDisplayProps.listProps || {}),
                  }}
                  onItemClick={(item) => selectFilter(item)}
                  {...parametersDisplayProps}
                />
              )}
              {shouldRenderSuggestions && (
                <SearchRenderer
                  data={filteredSuggestions || []}
                  highlight={value}
                  width={widthDropdownSearch}
                  height={dropdownMaxHeight}
                  listProps={{
                    scrollTop: scrollbarScrollTop,
                    ...(suggestionsDisplayProps?.listProps || {}),
                  }}
                  onItemClick={(item) =>
                    selectResult(item, SelectResultDataKeys.SUGGESTIONS)
                  }
                  {...suggestionsDisplayProps}
                />
              )}
            </Scrollbar>
          </S.SearchDropdownContent>
        </S.SearchDropdownWrapper>
      )}
    </S.SearchWrapper>
  );
}

export default Search;
