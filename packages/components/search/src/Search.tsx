import * as React from 'react';
import { useEffect, useState } from 'react';
import { useOnClickOutside } from '@synerise/ds-utils';
import { hasSomeElement, getAllElementsFiltered, hasSomeElementFiltered } from './Elements/utils/searchUtils';
import * as S from './Search.styles';
import { FilterElement, SearchProps } from './Search.types';
import { SearchInput, SearchHeader, SearchItemList } from './Elements';

const Search: React.FC<SearchProps> = ({
  placeholder,
  parameters,
  recent,
  suggestions,
  onValueChange,
  value,
  parameterValue,
  onParameterValueChange,
  divider,
  clearTooltip,
  width,
  parametersDisplayProps,
  recentDisplayProps,
  suggestionsDisplayProps,
}) => {
  const [inputOpen, setInputOpen] = useState(false);
  const [label, setLabel] = useState<FilterElement | null>();
  const [filteredParameters, setFilteredParameters] = useState<FilterElement[]>();
  const [filteredRecent, setFilteredRecent] = useState<FilterElement[]>();
  const [filteredSuggestions, setFilteredSuggestions] = useState<FilterElement[]>();
  const [listVisible, setListVisible] = useState(true);
  const [focusTrigger, focusInputComponent] = useState(false);
  const [toggleTrigger, setToggleTrigger] = useState(true);
  const [resultChoosed, setResultChoosed] = useState(false);

  const ref = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const MENU_WIDTH_OFFSET = 16;
  const DEFAULT_VISIBLE_ROWS = 5;
  useEffect(() => {
    suggestions && setFilteredSuggestions(suggestions);
  }, [suggestions]);
  useEffect(() => {
    parameters && setFilteredParameters(parameters);
  }, [parameters]);
  useEffect(() => {
    recent && setFilteredRecent(recent);
  }, [recent]);

  useOnClickOutside(ref, () => {
    if (inputOpen && !value && !label) {
      setToggleTrigger(!toggleTrigger);
    }
    setListVisible(false);
  });

  const selectFilter = React.useCallback(
    (item: FilterElement): void => {
      onValueChange('');
      setLabel(item);
      if (item.filter) {
        onValueChange(item.text);
        onParameterValueChange(item.filter);
        setResultChoosed(true);
      } else {
        onParameterValueChange(item.text);
      }
    },
    [onParameterValueChange, onValueChange]
  );

  const selectResult = React.useCallback(
    (item: FilterElement): void => {
      setResultChoosed(true);
      onValueChange(item.text);
    },
    [onValueChange]
  );

  const clearValue = React.useCallback((): void => {
    setLabel(null);
    onValueChange('');
    setFilteredParameters(parameters);
    setFilteredRecent(recent);
    setFilteredSuggestions(suggestions);
    onParameterValueChange('');
    setResultChoosed(false);
    inputRef && inputRef.current && inputRef.current.focus();
  }, [parameters, onParameterValueChange, onValueChange, suggestions, recent]);

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Backspace' && value === '' && inputOpen) {
        setLabel(null);
        setFilteredRecent(recent);
        onParameterValueChange('');
        return;
      }
      if (e.key === 'Enter' && inputOpen) {
        const narrowedParameters = filteredParameters && filteredParameters.length;
        const narrowedSuggestions = filteredSuggestions && filteredSuggestions.length;
        const narrowedRecent = filteredRecent && filteredRecent.length;

        if (narrowedParameters === 1 && narrowedRecent === 0) {
          filteredParameters && selectFilter(filteredParameters[0]);
          setFilteredParameters(parameters);
          return;
        }
        if (narrowedSuggestions === 1) {
          filteredSuggestions && selectResult(filteredSuggestions[0]);
          setFilteredSuggestions(suggestions);
          return;
        }
        if (narrowedRecent === 1 && narrowedParameters === 0) {
          filteredRecent && selectFilter(filteredRecent[0]);
          setFilteredParameters(parameters);
        }
      }
    },
    [
      parameters,
      recent,
      selectFilter,
      selectResult,
      suggestions,
      value,
      filteredParameters,
      filteredRecent,
      filteredSuggestions,
      inputOpen,
      onParameterValueChange,
    ]
  );

  const change = React.useCallback(
    (inputValue): void => {
      const currentValue = inputValue;
      onValueChange(currentValue);
      setResultChoosed(false);
      let isAnythingToShow;
      if (parameterValue) {
        const matchingValues = getAllElementsFiltered(suggestions, currentValue);
        setFilteredSuggestions(matchingValues);
        isAnythingToShow = matchingValues.length > 0;
      } else {
        const matchingRecent = getAllElementsFiltered(recent, currentValue);
        setFilteredRecent(matchingRecent);
        const matchingFilters = getAllElementsFiltered(parameters, currentValue);
        setFilteredParameters(matchingFilters);
        isAnythingToShow = matchingRecent.length > 0 || matchingFilters.length > 0;
      }
      setListVisible(isAnythingToShow);
    },
    [parameters, parameterValue, onValueChange, recent, suggestions]
  );
  const isListItemRendered = (): boolean => {
    let isAnythingToShow;
    if (parameterValue) {
      isAnythingToShow = hasSomeElementFiltered(suggestions, value);
    } else {
      const anyRecentItem = hasSomeElementFiltered(recent, value);
      const anyFilter = hasSomeElementFiltered(parameters, value);
      isAnythingToShow = anyFilter || anyRecentItem;
    }
    return isAnythingToShow;
  };
  const getMenuListWidth = React.useCallback((): number => {
    if (width) {
      return width - MENU_WIDTH_OFFSET;
    }
    if (ref && ref !== null && ref.current && ref.current.clientWidth > MENU_WIDTH_OFFSET) {
      return ref.current.clientWidth - MENU_WIDTH_OFFSET;
    }
    return 0;
  }, [width, ref]);

  const renderInputWrapper = React.useCallback(() => {
    return (
      <SearchInput
        onClick={(): void => setListVisible(true)}
        onButtonClick={(): void => {
          focusInputComponent(true);
        }}
        placeholder={placeholder}
        clearTooltip={clearTooltip}
        onValueChange={change}
        value={value}
        onClear={clearValue}
        onKeyDown={onKeyDown}
        closeOnClickOutside={false}
        filterLabel={label}
        focusTrigger={focusTrigger}
        onToggle={(toggle): void => {
          setInputOpen(toggle);
        }}
        toggleTrigger={toggleTrigger}
        withDropdown
      />
    );
  }, [change, clearTooltip, clearValue, value, focusTrigger, toggleTrigger, label, onKeyDown, placeholder]);
  const renderRecentItems = React.useCallback(() => {
    return (
      recent &&
      recentDisplayProps &&
      !label &&
      hasSomeElement(filteredRecent) && (
        <>
          {!!recentDisplayProps.title && (
            <SearchHeader headerText={recentDisplayProps.title} tooltip={recentDisplayProps.tooltip} />
          )}
          <SearchItemList
            data={filteredRecent}
            width={getMenuListWidth()}
            visibleRows={recentDisplayProps.visibleRows || DEFAULT_VISIBLE_ROWS}
            rowHeight={recentDisplayProps.rowHeight}
            highlight={value}
            onItemClick={selectFilter}
            divider={divider}
            itemRender={recentDisplayProps.itemRender}
          />
        </>
      )
    );
  }, [
    divider,
    filteredRecent,
    getMenuListWidth,
    label,
    recent,
    selectFilter,
    value,
    recentDisplayProps,
  ]);
  const renderParameters = React.useCallback(() => {
    return (
      parameters &&
      parametersDisplayProps &&
      !label &&
      hasSomeElement(filteredParameters) && (
        <>
          {!!parametersDisplayProps.title && (
            <SearchHeader headerText={parametersDisplayProps.title} tooltip={parametersDisplayProps.tooltip} />
          )}
          <SearchItemList
            data={filteredParameters}
            width={getMenuListWidth()}
            visibleRows={parametersDisplayProps.visibleRows || DEFAULT_VISIBLE_ROWS}
            rowHeight={parametersDisplayProps.rowHeight}
            highlight={value}
            onItemClick={(item): void => selectFilter(item)}
            itemRender={parametersDisplayProps.itemRender}
          />
        </>
      )
    );
  }, [
    filteredParameters,
    parameters,
    label,
    value,
    getMenuListWidth,
    selectFilter,
    parametersDisplayProps,
  ]);
  const renderSuggestions = React.useCallback(() => {
    return (
      suggestions &&
        suggestionsDisplayProps &&
      parameterValue &&
      !resultChoosed &&
      hasSomeElement(filteredSuggestions) && (
        <>
          {!!suggestionsDisplayProps.title && (
            <SearchHeader headerText={suggestionsDisplayProps.title} tooltip={suggestionsDisplayProps.tooltip} />
          )}
          <SearchItemList
            data={filteredSuggestions}
            width={getMenuListWidth()}
            visibleRows={suggestionsDisplayProps.visibleRows || DEFAULT_VISIBLE_ROWS}
            rowHeight={suggestionsDisplayProps.rowHeight}
            highlight={value}
            onItemClick={selectResult}
            itemRender={suggestionsDisplayProps.itemRender}
          />
        </>
      )
    );
  }, [
    suggestions,
    filteredSuggestions,
    getMenuListWidth,
    parameterValue,
    resultChoosed,
    selectResult,
    value,
    suggestionsDisplayProps,
  ]);
  return (
    <S.SearchWrapper ref={ref} className="SearchWrapper" width={width}>
      {renderInputWrapper()}
      <S.ListWrapper
        onClick={(): void => {
          focusInputComponent(!focusTrigger);
        }}
      >
        <S.List
          className={inputOpen && !resultChoosed && listVisible && isListItemRendered() ? 'search-list-open' : ''}
        >
          {renderRecentItems()}
          {renderParameters()}
          {renderSuggestions()}
        </S.List>
      </S.ListWrapper>
    </S.SearchWrapper>
  );
};
export default Search;
