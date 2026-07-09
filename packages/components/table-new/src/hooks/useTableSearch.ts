import { useCallback, useMemo, useState } from 'react';

import { type SharedTableProps } from '../Table.types';

type UseTableSearchProps<TData> = Pick<
  SharedTableProps<TData, unknown>,
  'matchesSearchQuery' | 'filterData' | 'onSearchQueryChange'
> & {
  data: TData[];
};

type UseTableSearchResult<TData> = {
  displayData: TData[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleClear: () => void;
  hasBuiltInSearch: boolean;
  hasNoSearchResults: boolean;
};

export const useTableSearch = <TData>({
  data,
  matchesSearchQuery,
  filterData,
  onSearchQueryChange,
}: UseTableSearchProps<TData>): UseTableSearchResult<TData> => {
  const [searchQuery, setSearchQueryState] = useState('');

  const hasBuiltInSearch = !!matchesSearchQuery;

  const setSearchQuery = useCallback(
    (query: string) => {
      setSearchQueryState(query);
      onSearchQueryChange?.(query);
    },
    [onSearchQueryChange],
  );

  const handleClear = useCallback(() => {
    setSearchQuery('');
  }, [setSearchQuery]);

  const displayData = useMemo(() => {
    if (matchesSearchQuery && searchQuery) {
      return data.filter((row) => matchesSearchQuery(searchQuery, row));
    }
    if (filterData) {
      return data.filter(filterData);
    }
    return data;
  }, [data, matchesSearchQuery, searchQuery, filterData]);

  // True only when an internal search/filter narrowed a non-empty dataSource down to nothing —
  // i.e. "no results", as opposed to a genuinely empty dataSource (both lengths 0 → "no data").
  // Since displayData is always a filtered subset of data, data.length > 0 && displayData.length
  // === 0 can only happen when matchesSearchQuery/filterData removed every row. External search
  // (pre-filtered data, no predicate) leaves displayData === data, so it reads as "no data".
  const hasNoSearchResults = data.length > 0 && displayData.length === 0;

  return {
    displayData,
    searchQuery,
    setSearchQuery,
    handleClear,
    hasBuiltInSearch,
    hasNoSearchResults,
  };
};
