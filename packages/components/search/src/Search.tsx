import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import Menu from '@synerise/ds-menu';
import { useOnClickOutside } from '@synerise/ds-utils';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import { InfoFillS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon/dist/Icon';
import { List } from 'react-virtualized';
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
  const [filteredParameters, setFilteredParameters] = useState<FilterElement[][]>();
  const [filteredRecent, setFilterRecent] = useState<FilterElement[][]>();
  const [filteredSuggestions, setFilteredSuggestions] = useState<FilterElement[][]>();
  const [listVisible, setListVisible] = useState(true);
  const [focusTrigger, focusInputComponent] = useState(false);
  const [toggleTrigger, setToggleTrigger] = useState(true);
  const [resultChoosed, setResultChoosed] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFilteredSuggestions(results.flat());
  }, [results]);
  useEffect(() => {
    parameters && setFilteredParameters(parameters.flat());
  }, [parameters]);
  useEffect(() => {
    setFilterRecent(recent);
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

  const findIncludes = (data: FilterElement[][] | undefined, currentValue: string, type: string): boolean => {
    const final: FilterElement[][] = [];
    let temp: FilterElement[] = [];

    data &&
      data.map((arr: FilterElement[]) => {
        const x = arr.find((el: FilterElement) => {
          if (el.text.toLowerCase().includes(currentValue.toLocaleLowerCase())) {
            temp.push(el);
          }
          return null;
        });
        final.push(temp);
        temp = [];
        return x;
      });
    type === 'recent' && setFilterRecent(final);
    type === 'filter' && setFilteredParameters(final);
    type === 'results' && setFilteredSuggestions(final);
    return final.flat().length > 0;
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
    if (e.keyCode === 8 && value === '') {
      setLabel(null);
      setFilterRecent(recent);
      onFilterValueChange('');
      return;
    }
    if (e.keyCode === 13) {
      const narrowedParameters = filteredParameters && filteredParameters.flat().length;
      const narrowedSuggestions = filteredSuggestions && filteredSuggestions.flat().length;
      const narrowedRecent = filteredRecent && filteredRecent.flat().length;

      if (narrowedParameters === 1 && narrowedRecent === 0) {
        filteredParameters && selectFilter(filteredParameters.flat()[0]);
        setFilteredParameters(parameters);
        return;
      }
      if (narrowedSuggestions === 1) {
        filteredSuggestions && selectResult(filteredSuggestions.flat()[0]);
        setFilteredSuggestions(results);
        return;
      }
      if (narrowedRecent === 1 && narrowedParameters === 0) {
        filteredRecent && selectFilter(filteredRecent.flat()[0]);
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
        isAnythingToShow = findIncludes(results, currentValue, 'results');
      } else {
        const anyRecentItem = findIncludes(recent, currentValue, 'recent');
        const anyFilter = findIncludes(parameters, currentValue, 'filter');
        isAnythingToShow = anyFilter || anyRecentItem;
      }
      setListVisible(isAnythingToShow);
    },
    [parameters, filterValue, onValueChange, recent, results]
  );
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
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
  function suggestionRenderer({ key, index, style }: { key: string; index: number; style: any }): ReactElement {
    const item = filteredSuggestions && filteredSuggestions.flat()[index];
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
  function parameterRenderer({ key, index, style }: { key: string; index: number; style: object }): ReactElement {
    const item = filteredParameters && filteredParameters.flat()[index];
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
  function recentRenderer({ key, index, style }: { key: string; index: number; style: object }): ReactElement {
    const item = filteredRecent && filteredRecent.flat()[index];
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
        <S.List className={inputOpen && !resultChoosed && listVisible ? 'listVisible' : ''}>
          {recent && inputOpen && !label && (
            <>
              {!!recentTitle && renderHeader(recentTitle)}
              <Menu>
                <List
                  width={284}
                  height={
                    filteredRecent && filteredRecent.flat().length > 3
                      ? 3 * 32
                      : filteredRecent && filteredRecent.flat().length * 32
                  }
                  rowCount={filteredRecent && filteredRecent.flat().length}
                  rowHeight={32}
                  rowRenderer={recentRenderer}
                />
                {!!divider && divider}
              </Menu>
            </>
          )}
          {parameters && inputOpen && !label && filteredParameters && (
            <>
              {!!filterTitle && renderHeader(filterTitle)}
              <Menu>
                <List
                  width={284}
                  height={filteredParameters.flat().length > 6 ? 6 * 32 : filteredParameters.flat().length * 32}
                  rowCount={filteredParameters.flat().length}
                  rowHeight={32}
                  rowRenderer={parameterRenderer}
                />
              </Menu>
            </>
          )}
          {results && inputOpen && filterValue && !resultChoosed && filteredSuggestions && (
            <>
              {!!resultTitle && renderHeader(resultTitle)}
              <Menu>
                <List
                  width={284}
                  height={filteredSuggestions.flat().length > 6 ? 6 * 32 : filteredSuggestions.flat().length * 32}
                  rowCount={filteredSuggestions.flat().length}
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
