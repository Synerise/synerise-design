import * as React from 'react';
import { useState } from 'react';

import { Input } from 'antd';
import Button from '@synerise/ds-button/dist/Button';
import Icon from '@synerise/ds-icon/dist/Icon';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import Close3M from '@synerise/ds-icon/dist/icons/Close3M';
import { useOnClickOutside } from '@synerise/ds-utils';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import List from '@synerise/ds-list';
import * as S from './Search.styles';
import { FilterElement, SearchProps } from './Search.types';

const Search: React.FC<SearchProps> = ({
  placeholder,
  clearTooltip,
  filterTitle,
  recentTitle,
  filterData,
  recent,
  results,
  onValueChange,
  value,
  filterValue,
  onFilterValueChange,
  resultTitle,
}) => {
  const [inputOpen, setInputOpen] = useState(false);
  const [label, setLabel] = useState<FilterElement | null>();
  const [filteredData, setFilterData] = useState<FilterElement[][]>();
  const [filteredRecent, setFilterRecent] = useState<FilterElement[][]>();
  const [filteredResult, setFilterResult] = useState<FilterElement[][]>();
  const [inputOffset, setInputOffset] = useState(0);
  const [focus, setFocus] = useState(false);
  const [resultChoosed, setResultChoosed] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const toggleOpen = (): void => {
    setInputOpen(prevState => {
      return !prevState;
    });
  };

  useOnClickOutside(ref, () => {
    setFocus(false);
    if (filterData) {
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
    type === 'filter' && setFilterData(final);
    type === 'results' && setFilterResult(final);
  };

  const clearValue = React.useCallback((): void => {
    setLabel(null);
    onValueChange('');
    setInputOffset(0);
    setFilterData(filterData);
    setFilterRecent(recent);
    onFilterValueChange('');
    setResultChoosed(false);
  }, [filterData, onFilterValueChange, onValueChange, recent]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.keyCode === 8 && value === '') {
      setLabel(null);
      setInputOffset(0);
      setFilterRecent(recent);
      onFilterValueChange('');
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
        findIncludes(filterData, currentValue, 'filter');
      }
    },
    [filterData, filterValue, onValueChange, recent, results]
  );

  return (
    <S.SearchWrapper ref={ref}>
      <S.SearchInputWrapper className={inputOpen ? 'is-open' : ''} offset={inputOffset}>
        <S.LeftSide isOpen={inputOpen}>
          {label && (
            <S.Filter
              ref={(reference): void => {
                reference && setInputOffset(reference.getBoundingClientRect().width);
              }}
            >
              <Icon component={label.icon} />
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
      <S.SearchButton isOpen={inputOpen} inputFocused={focus} hidden={!!value || !!filterValue}>
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
      <S.List>
        {recent && inputOpen && !label && (
          <List
            header={recentTitle}
            dataSource={filteredRecent || recent}
            renderItem={(item: FilterElement): React.ReactNode => (
              <List.Item size="small" onSelect={(): void => selectFilter(item)}>
                {item.text}
              </List.Item>
            )}
          />
        )}
        {filterData && inputOpen && !label && (
          <List
            header={filterTitle}
            dataSource={filteredData || filterData}
            renderItem={(item: FilterElement): React.ReactNode => (
              <List.Item icon={<Icon component={item.icon} />} size="small" onSelect={(): void => selectFilter(item)}>
                <span data-testid="filter">{item.text}</span>
              </List.Item>
            )}
          />
        )}
        {results && inputOpen && filterValue && !resultChoosed && (
          <List
            header={resultTitle}
            dataSource={filteredResult || results}
            renderItem={(item: FilterElement): React.ReactNode => (
              <List.Item size="small" onSelect={(): void => selectResult(item)}>
                {item.text}
              </List.Item>
            )}
          />
        )}
      </S.List>
    </S.SearchWrapper>
  );
};
export default Search;
