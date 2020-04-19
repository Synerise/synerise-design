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
  clearTooltip,
  filterTitle,
  recentTitle,
  parameters,
  recent,
  results,
  onValueChange,
  value,
  filterValue,
  onFilterValueChange,
  resultTitle,
  divider,
}) => {
  const [inputOpen, setInputOpen] = useState(false);
  const [label, setLabel] = useState<FilterElement | null>();
  const [filteredParameters, setFilteredParameters] = useState<FilterElement[]>();
  const [filteredRecent, setFilterRecent] = useState<FilterElement[]>();
  const [filteredSuggestions, setFilteredSuggestions] = useState<FilterElement[]>();
  const [listVisible, setListVisible] = useState(true);
  const [focusTrigger, focusInputComponent] = useState(false);
  const [toggleTrigger, setToggleTrigger] = useState(true);
  const [resultChoosed, setResultChoosed] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    results && setFilteredSuggestions(results);
  }, [results]);
  useEffect(() => {
    parameters && setFilteredParameters(parameters);
  }, [parameters]);
  useEffect(() => {
    recent && setFilterRecent(recent);
  }, [recent]);

  useOnClickOutside(ref, () => {
    if (inputOpen && !value && !label) {
      console.log(value);
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
        onFilterValueChange(item.filter);
        setResultChoosed(true);
      } else {
        onFilterValueChange(item.text);
      }
    },
    [onFilterValueChange, onValueChange]
  );

  const selectResult = React.useCallback(
    (item: FilterElement): void => {
      setResultChoosed(true);
      onValueChange(item.text);
    },
    [onValueChange]
  );

  const filterByInputValue = (data: FilterElement[] | undefined, currentValue: string): FilterElement[] => {
    const filtered: FilterElement[] = data && data.filter(el=>(el.text.toLowerCase().includes(currentValue.toLocaleLowerCase()))) || [];
    return filtered;
  };
  const hasAnyElementToShow = (data: FilterElement[] | undefined, currentValue: string): boolean => {
    const anything: boolean = (!!data && data.some(el=>(el.text.toLowerCase().includes(currentValue.toLocaleLowerCase()))))|| false;
    return anything;
};
  const clearValue = React.useCallback((): void => {
    setLabel(null);
    onValueChange('');
    setFilteredParameters(parameters);
    setFilterRecent(recent);
    setFilteredSuggestions(results);
    onFilterValueChange('');
    setResultChoosed(false);
    inputRef && inputRef.current && inputRef.current.focus();
  }, [parameters, onFilterValueChange, onValueChange, results, recent]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Backspace" && value === '') {
      setLabel(null);
      setFilterRecent(recent);
      onFilterValueChange('');
      return;
    }
    if (e.key === "Enter") {
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
        setFilteredSuggestions(results);
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
      let isAnythingToShow = false;
      if (filterValue) {
        const matchingValues = filterByInputValue(results,currentValue);
        setFilteredSuggestions(matchingValues);
        isAnythingToShow = matchingValues.length > 0;
      } else {
        const matchingRecent = filterByInputValue(recent, currentValue);
        setFilterRecent(matchingRecent);
        const matchingFilters = filterByInputValue(parameters, currentValue);
        setFilteredParameters(matchingFilters)
        isAnythingToShow = matchingRecent.length > 0 || matchingFilters.length > 0;
      }
      setListVisible(isAnythingToShow);
    },
    [parameters, filterValue, onValueChange, recent, results]
  );
  const isThereAnythingToShow = () =>{
    console.log('anything?')
    let isAnythingToShow;
    if (filterValue) {
      isAnythingToShow = hasAnyElementToShow(results, value);
    } else {
      const anyRecentItem = hasAnyElementToShow(recent, value);
      const anyFilter = hasAnyElementToShow(parameters, value);
      isAnythingToShow = anyFilter || anyRecentItem;
    }
    return isAnythingToShow;
  }
  const renderHeader = (headerText: string, tooltip?: string): ReactElement => (
    <S.MenuHeader>
      {headerText}
      <Tooltip type="default" trigger="hover" title={tooltip || headerText}>
        <HeaderIconWrapper>
          <Icon component={<InfoFillS />} />
        </HeaderIconWrapper>
      </Tooltip>
    </S.MenuHeader>
  );

  const renderInputWrapper = (): ReactElement => {
    return (
      <SearchInput
        onClick={(): void =>  setListVisible(true)}
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
  function recentRenderer({ key, index, style}: ListRowProps): ReactElement {
    const item = filteredRecent && filteredRecent[index];
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
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
  console.log('Rendering');
  return (
    <S.SearchWrapper ref={ref} className="SearchWrapper">
      {renderInputWrapper()}
      <S.ListWrapper
        onClick={(): void => {
          focusInputComponent(!focusTrigger);
        }}
      >
        <S.List className={inputOpen && !resultChoosed && listVisible && isThereAnythingToShow()? 'listVisible' : ''}>

          {listVisible && recent && inputOpen && !label && filteredRecent && filteredRecent.length>0 &&  (
            <>
              {!!recentTitle && renderHeader(recentTitle)}
              <Menu>
                <List
                  width={284}
                  height={
                     filteredRecent.length > 3
                      ? 3 * 32
                      : filteredRecent.length * 32
                  }
                  rowCount={filteredRecent && filteredRecent.length || 0}
                  rowHeight={32}
                  rowRenderer={recentRenderer}
                />
                {!!divider && divider}
              </Menu>
            </>
          )}
          {listVisible && parameters && inputOpen && !label && filteredParameters && filteredParameters.length > 0 && (
            <>
              {!!filterTitle && renderHeader(filterTitle)}
              <Menu>
                <List
                  width={284}
                  height={filteredParameters.length > 6 ? 6 * 32 : filteredParameters.length * 32}
                  rowCount={filteredParameters.length}
                  rowHeight={32}
                  rowRenderer={parameterRenderer}
                />
              </Menu>
            </>
          )}
          {listVisible && results && inputOpen && filterValue && !resultChoosed && filteredSuggestions && filteredSuggestions.length > 0 && (
            <>
              {!!resultTitle && renderHeader(resultTitle)}
              <Menu>
                <List
                  width={284}
                  height={filteredSuggestions.length > 6 ? 6 * 32 : filteredSuggestions.length * 32}
                  rowCount={filteredSuggestions.length}
                  rowHeight={32}
                  rowRenderer={suggestionRenderer}
                />
              </Menu>
            </>
          )}
        </S.List>
      </S.ListWrapper>
    </S.SearchWrapper>
  );
};
export default Search;
