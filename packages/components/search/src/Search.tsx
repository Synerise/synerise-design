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
  console.log('Results',results);
  const [inputOpen, setInputOpen] = useState(false);
  const [label, setLabel] = useState<FilterElement | null>();
  const [filteredParameters, setFilteredParameters] = useState<FilterElement[][]>();
  const [filteredRecent, setFilterRecent] = useState<FilterElement[][]>();
  const [filteredSuggestions, setFilteredSuggestions] = useState<FilterElement[][]>();
  const [inputOffset, setInputOffset] = useState(0);
  const [focus, setFocus] = useState(false);
  const [resultChoosed, setResultChoosed] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const toggleOpen = (): void => {
    setInputOpen(prevState => {
      return !prevState;
    });
  };
  useEffect(()=>{
    console.log('Results have changed!')
    setFilteredSuggestions(results);
  },[results])
  useOnClickOutside(ref, () => {
    setFocus(false);
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
        console.log('In the if - item.filter clicked')
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

  const findIncludes = (data: FilterElement[][] | undefined, currentValue: string, type: string): void => {
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
  }, [parameters, onFilterValueChange, onValueChange,results, recent]);

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

      if (filterValue) {
        findIncludes(results, currentValue, 'results');
      } else {
        findIncludes(recent, currentValue, 'recent');
        findIncludes(parameters, currentValue, 'filter');
      }
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
    <S.SearchInputWrapper className={inputOpen ? 'is-open' : ''} offset={inputOffset}>
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
          ref={(input): void => {
            inputOpen && input && input.focus();
          }}
          value={value}
          onChange={change}
          onKeyDown={onKeyDown}
          onFocus={(): void => setFocus(true)}
        />
      </div>
    </S.SearchInputWrapper>
  );
  return (
    <S.SearchWrapper ref={ref} className="SearchWrapper">
      {renderInputWrapper()}
      <S.SearchButton
        isOpen={inputOpen}
        inputFocused={focus}
        hidden={!!value || !!filterValue}
        className="SearchButton"
      >
        <Button type="ghost" onClick={toggleOpen} data-testid="btn">
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
      <S.ListWrapper>
        <S.List isOpen={inputOpen && !resultChoosed} className={inputOpen && !resultChoosed ? 'listVisible' : ''}>
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
          {parameters && inputOpen && !label && (
            <>
              {!!filterTitle && renderHeader(filterTitle)}
              <Menu>
                {(filteredParameters || parameters).map(items =>
                  items.map(item => (
                    <Menu.Item
                      key={item.text}
                      prefixel={<Icon component={item.icon} />}
                      onClick={(): void => selectFilter(item)}
                    >
                      {item.text}
                    </Menu.Item>
                  ))
                )}
              </Menu>
            </>
          )}
          {results && inputOpen && filterValue && !resultChoosed && (
            <>
              {!!resultTitle && renderHeader(resultTitle)}
              {(filteredSuggestions && filteredSuggestions.flat().length === 0) || results.flat().length === 0 ? (
                <div>zwijanie dropa, ale wartosc zostaje</div>
              ) : (
                <Menu>
                  {(filteredSuggestions || results).map(items =>
                    items.map(item => (
                      <Menu.Item key={item.text} onClick={(): void => selectResult(item)}>
                        {item.text}
                      </Menu.Item>
                    ))
                  )}
                </Menu>
              )}
            </>
          )}
        </S.List>
      </S.ListWrapper>
    </S.SearchWrapper>
  );
};
export default Search;
