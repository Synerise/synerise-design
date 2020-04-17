import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import Menu from '@synerise/ds-menu';
import { Input } from 'antd';
import Button from '@synerise/ds-button/dist/Button';

import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import Close3M from '@synerise/ds-icon/dist/icons/Close3M';
import { useOnClickOutside } from '@synerise/ds-utils';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { InfoFillS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon/dist/Icon';
import { List } from 'react-virtualized';
import * as S from './Search.styles';
import { FilterElement, SearchProps } from './Search.types';
import { HeaderIconWrapper } from './Search.styles';

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
  const [inputOffset, setInputOffset] = useState(0);
  const [listVisible, setListVisible] = useState(true);
  const [focus, setFocus] = useState(false);
  const [resultChoosed, setResultChoosed] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const toggleOpen = (): void => {
    setInputOpen(prevState => {
      return !prevState;
    });
  };
  useEffect(() => {
    setFilteredSuggestions(results);
  }, [results]);
  useEffect(() => {
    setFilteredParameters(parameters);
  }, [parameters]);

  useOnClickOutside(ref, () => {
    setFocus(false);
    setListVisible(false);
    if (parameters) {
      !value && !label && setInputOpen(false);
    } else {
      !value && setInputOpen(false);
    }
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
      console.log('Select result');
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
    setInputOffset(0);
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
      setInputOffset(0);
      setFilterRecent(recent);
      /*
      setFilteredSuggestions(results);
*/
      onFilterValueChange('');
    }
    if (e.keyCode === 13 && filteredParameters && filteredParameters.flat().length === 1) {
      selectFilter(filteredParameters.flat()[0]);
      setFilteredParameters(parameters);
    }
    if (e.keyCode === 13 && filteredSuggestions && filteredSuggestions.flat().length === 1) {
      selectResult(filteredSuggestions.flat()[0]);
      setFilteredSuggestions(results);
    }
  };

  const change = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const currentValue = e.currentTarget.value;
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

  const renderInputWrapper = (): ReactElement => (
    <S.SearchInputWrapper
      className={inputOpen ? 'is-open' : ''}
      offset={inputOffset}
      onClick={(): void => setListVisible(true)}
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
      <div>
        <Input
          placeholder={placeholder}
          ref={inputRef}
          value={value}
          onChange={change}
          onKeyDown={onKeyDown}
          onFocus={(): void => setFocus(true)}
        />
      </div>
    </S.SearchInputWrapper>
  );
  function suggestionRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    style, // Style object to be applied to row (to position it)
  }: {
    key: string;
    index: number;
    style: any;
  }): ReactElement {
    const item = filteredSuggestions && filteredSuggestions.flat()[index];
    return (
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      <Menu.Item key={key} style={style} onClick={(): void => selectResult(item)} onItemHover={(): void => {}}>
        {item && item.text}
      </Menu.Item>
    );
  }
  function parameterRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    style, // Style object to be applied to row (to position it)
  }: {
    key: string;
    index: number;
    style: object;
  }): ReactElement {
    const item = filteredParameters && filteredParameters.flat()[index];
    return (
      <Menu.Item
        key={key}
        style={style}
        prefixel={<Icon component={item && item.icon} />}
        onClick={(): void => item && selectFilter(item)}
        /* eslint-disable-next-line @typescript-eslint/no-empty-function */
        onItemHover={(): void => {}}
      >
        {item && item.text}
      </Menu.Item>
    );
  }

  return (
    <S.SearchWrapper ref={ref} className="SearchWrapper">
      {renderInputWrapper()}
      <S.SearchButton
        isOpen={inputOpen}
        inputFocused={focus}
        hidden={!!value || !!filterValue}
        className="SearchButton"
      >
        <Button
          type="ghost"
          onClick={(): void => {
            toggleOpen();
            setListVisible(true);
            inputRef!.current!.focus();
          }}
          className={inputOpen ? 'btn-search-open' : 'btn-search'}
          data-testid="btn"
        >
          <Icon component={<SearchM />} />
        </Button>
      </S.SearchButton>
      <S.ClearButton hidden={!value && !filterValue}>
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
      <S.ListWrapper
        onClick={(): void => {
          inputRef!.current!.focus();
        }}
      >
        <S.List className={inputOpen && !resultChoosed && listVisible ? 'listVisible' : ''}>
          {recent && inputOpen && !label && (
            <>
              {!!recentTitle && renderHeader(recentTitle)}
              <Menu>
                {(filteredRecent || recent).map(items =>
                  items.map(item => (
                    <Menu.Item key={item.text} onClick={(): void => selectFilter(item)}>
                      {item.text}
                    </Menu.Item>
                  ))
                )}
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
