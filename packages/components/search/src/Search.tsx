import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import Menu from '@synerise/ds-menu';
import { useOnClickOutside } from '@synerise/ds-utils';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import { InfoFillS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon/dist/Icon';
import { List, ListRowProps } from 'react-virtualized';
import * as S from './Search.styles';
import { FilterElement, SearchProps } from './Search.types';
import { HeaderIconWrapper } from './Search.styles';
import { SearchInput } from './Elements';

const Search: React.FC<SearchProps> = ({
  placeholder,
  parametersTitle,
  recentTitle,
  parameters,
  recent,
  suggestions,
  onValueChange,
  value,
  parameterValue,
  onParameterValueChange,
  suggestionsTitle,
  divider,
  suggestionsTooltip,
  recentTooltip,
  parametersTooltip,
  clearTooltip,
  width,
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
  const menuItemWidthOffset = 12;
  const rowHeight = 32;
  const canRenderVirtualizedList =
    (!!width && width > menuItemWidthOffset) ||
    (!!ref && !!ref.current && ref.current.clientWidth > menuItemWidthOffset);
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

  const filterByInputValue = (data: FilterElement[] | undefined, currentValue: string): FilterElement[] => {
    const filtered: FilterElement[] =
      (data && data.filter(el => el.text.toLowerCase().includes(currentValue.toLocaleLowerCase()))) || [];
    return filtered;
  };
  const hasAnyElementToShow = (data: FilterElement[] | undefined, currentValue: string): boolean => {
    const anything: boolean =
      (!!data && data.some(el => el.text.toLowerCase().includes(currentValue.toLocaleLowerCase()))) || false;
    return anything;
  };
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

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
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
  };

  const change = React.useCallback(
    (inputValue): void => {
      const currentValue = inputValue;
      onValueChange(currentValue);
      setResultChoosed(false);
      let isAnythingToShow;
      if (parameterValue) {
        const matchingValues = filterByInputValue(suggestions, currentValue);
        setFilteredSuggestions(matchingValues);
        isAnythingToShow = matchingValues.length > 0;
      } else {
        const matchingRecent = filterByInputValue(recent, currentValue);
        setFilteredRecent(matchingRecent);
        const matchingFilters = filterByInputValue(parameters, currentValue);
        setFilteredParameters(matchingFilters);
        isAnythingToShow = matchingRecent.length > 0 || matchingFilters.length > 0;
      }
      setListVisible(isAnythingToShow);
    },
    [parameters, parameterValue, onValueChange, recent, suggestions]
  );
  const isThereAnythingToShow = (): boolean => {
    let isAnythingToShow;
    if (parameterValue) {
      isAnythingToShow = hasAnyElementToShow(suggestions, value);
    } else {
      const anyRecentItem = hasAnyElementToShow(recent, value);
      const anyFilter = hasAnyElementToShow(parameters, value);
      isAnythingToShow = anyFilter || anyRecentItem;
    }
    return isAnythingToShow;
  };
  const renderHeader = (headerText: string, tooltip?: string): ReactElement => (
    <S.MenuHeader>
      {headerText}
      {tooltip && tooltip.length > 0 && (
        <Tooltip type="default" trigger="hover" title={tooltip || headerText}>
          <HeaderIconWrapper>
            <Icon component={<InfoFillS />} />
          </HeaderIconWrapper>
        </Tooltip>
      )}
    </S.MenuHeader>
  );
  const getMenuListWidth = (): number =>{
    if(width){
      return width - menuItemWidthOffset;
    }
    if(ref && ref!==null && ref.current && ref.current.clientWidth > menuItemWidthOffset){
      return ref.current.clientWidth - menuItemWidthOffset;
    }
    return 0;
  }
  const renderInputWrapper = (): ReactElement => {
    return (
      <SearchInput
        onClick={(): void => setListVisible(true)}
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
      />
    );
  };
  function suggestionRenderer({ key, index, style }: ListRowProps): ReactElement {
    const item = filteredSuggestions && filteredSuggestions[index];
    return (
      <Menu.Item
        key={key}
        style={style}
        onClick={(): void => item && selectResult(item)}
        highlight={value || ''}
        /* eslint-disable-next-line @typescript-eslint/no-empty-function */
        onItemHover={(): void => {}}
      >
        {item && item.text}
      </Menu.Item>
    );
  }
  function parameterRenderer({ key, index, style }: ListRowProps): ReactElement {
    const item = filteredParameters && filteredParameters[index];
    return (
      <Menu.Item
        key={key}
        style={style}
        prefixel={<Icon component={item && item.icon} />}
        onClick={(): void => item && selectFilter(item)}
        highlight={value || ''}
        /* eslint-disable-next-line @typescript-eslint/no-empty-function */
        onItemHover={(): void => {}}
      >
        {item && item.text}
      </Menu.Item>
    );
  }
  function recentRenderer({ key, index, style }: ListRowProps): ReactElement {
    const item = filteredRecent && filteredRecent[index];
    return (
      <Menu.Item
        key={key}
        style={style}
        onClick={(): void => item && selectFilter(item)}
        highlight={value || ''}
        /* eslint-disable-next-line @typescript-eslint/no-empty-function */
        onItemHover={(): void => {}}
      >
        {item && item.text}
      </Menu.Item>
    );
  }

  return (
    <S.SearchWrapper ref={ref} className="SearchWrapper" width={width}>
      {renderInputWrapper()}
      <S.ListWrapper
        onClick={(): void => {
          focusInputComponent(!focusTrigger);
        }}
      >
        <S.List
          className={inputOpen && !resultChoosed && listVisible && isThereAnythingToShow() ? 'search-list-open' : ''}
        >
          {listVisible && recent && inputOpen && !label && filteredRecent && filteredRecent.length > 0 && (
            <>
              {!!recentTitle && renderHeader(recentTitle, recentTooltip)}
              <Menu>
                {canRenderVirtualizedList && (
                  <List
                    width={getMenuListWidth()}
                    height={filteredRecent.length > 3 ? 3 * rowHeight : filteredRecent.length * rowHeight}
                    rowCount={(filteredRecent && filteredRecent.length) || 0}
                    rowHeight={rowHeight}
                    rowRenderer={recentRenderer}
                  />
                )}
                {!!divider && divider}
              </Menu>
            </>
          )}
          {listVisible && parameters && inputOpen && !label && filteredParameters && filteredParameters.length > 0 && (
            <>
              {!!parametersTitle && renderHeader(parametersTitle, parametersTooltip)}
              <Menu>
                {canRenderVirtualizedList && (
                  <List
                    width={getMenuListWidth()}
                    height={filteredParameters.length > 6 ? 6 * rowHeight : filteredParameters.length * rowHeight}
                    rowCount={filteredParameters.length}
                    rowHeight={rowHeight}
                    rowRenderer={parameterRenderer}
                  />
                )}
              </Menu>
            </>
          )}
          {listVisible &&
            suggestions &&
            inputOpen &&
            parameterValue &&
            !resultChoosed &&
            filteredSuggestions &&
            filteredSuggestions.length > 0 && (
              <>
                {!!suggestionsTitle && renderHeader(suggestionsTitle, suggestionsTooltip)}
                <Menu>
                  {canRenderVirtualizedList && (
                    <List
                      width={getMenuListWidth()}
                      height={filteredSuggestions.length > 6 ? 6 * rowHeight : filteredSuggestions.length * rowHeight}
                      rowCount={filteredSuggestions.length}
                      rowHeight={rowHeight}
                      rowRenderer={suggestionRenderer}
                    />
                  )}
                </Menu>
              </>
            )}
        </S.List>
      </S.ListWrapper>
    </S.SearchWrapper>
  );
};
export default Search;
