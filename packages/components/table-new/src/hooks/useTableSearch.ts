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

  return {
    displayData,
    searchQuery,
    setSearchQuery,
    handleClear,
    hasBuiltInSearch,
  };
};
