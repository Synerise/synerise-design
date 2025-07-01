import { type DSColumnType } from '../../Table.types';
import { type SortStateAPI } from '../useSortState';
import { type GroupType } from '../../GroupTable/GroupTable.types';
import { getColumnsWithActiveSorting, sortRows, sortDataSourceRows } from '../groupedColumnsSort';

// For tests column data can be any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FakeColumnsType = Array<DSColumnType<GroupType<any>>>;

const fakeColumns: FakeColumnsType = [
  {
    key: 'columnAsc',
    sorter: jest.fn(),
  },
  {
    key: 'columnDsc',
    sorter: jest.fn(),
  },
  {
    key: 'columnNull',
    sorter: undefined,
  },
];

const fakeSortStateActive: SortStateAPI['columnsSortState'] = {
  columnAsc: {
    sortOrder: 'ascend',
    multiple: false,
  },
  columnDsc: {
    sortOrder: 'descend',
    multiple: false,
  },
  columnNull: {
    sortOrder: null,
    multiple: false,
  },
};

const fakeSortStateInactive: SortStateAPI['columnsSortState'] = {
  columnAsc: {
    sortOrder: null,
    multiple: false,
  },
  columnDsc: {
    sortOrder: null,
    multiple: false,
  },
  columnNull: {
    sortOrder: null,
    multiple: false,
  },
};

const setupStateApi = (sortState: SortStateAPI['columnsSortState']): SortStateAPI => ({
  columnsSortState: sortState,
  getColumnSortOrder: jest.fn().mockImplementation((key: string) => sortState[key].sortOrder),
  setColumnSortOrder: jest.fn(),
  updateColumnsData: jest.fn(),
});

describe('getColumnsWithActiveSorting', () => {
  it('should return empty array if there are no columns provided', () => {
    const fakeSortStateApi = setupStateApi(fakeSortStateActive);
    expect(getColumnsWithActiveSorting(fakeSortStateApi, [])).toEqual([]);
  });

  it('shuld return empty array if there is no column with active sorting', () => {
    const fakeSortStateApi = setupStateApi(fakeSortStateInactive);

    const actual = getColumnsWithActiveSorting(fakeSortStateApi, fakeColumns);
    const expected: FakeColumnsType = [];

    expect(actual).toEqual(expected);
  });

  it('should return columns which has active sorting in state', () => {
    const fakeSortStateApi = setupStateApi(fakeSortStateActive);

    const actual = getColumnsWithActiveSorting(fakeSortStateApi, fakeColumns);
    const expected = [fakeColumns[0], fakeColumns[1]];

    expect(actual).toEqual(expected);
  });
});

describe('sortRows', () => {
  it('should exec sorting using provided compare function when sort order is ascend', () => {
    const fakeCompareFn = jest.fn().mockImplementation(() => 0);
    const inputRows = [1, 2, 3, 4];

    const actual = sortRows('ascend', fakeCompareFn, inputRows);
    const expected = [1, 2, 3, 4];

    expect(actual).toEqual(expected);
    expect(fakeCompareFn).toHaveBeenCalled();
  });

  it('should not exec sorting using provided compare function when sort order is null', () => {
    const fakeCompareFn = jest.fn().mockImplementation(() => 0);
    const inputRows = [1, 2, 3, 4];

    const actual = sortRows(null, fakeCompareFn, inputRows);

    expect(actual).toEqual(inputRows);
    expect(fakeCompareFn).not.toHaveBeenCalled();
  });

  it('should exec sorting using provided compare function when sort order is descend', () => {
    const fakeCompareFn = jest.fn().mockImplementation(() => 0);
    const inputRows = [1, 2, 3, 4];

    const actual = sortRows('descend', fakeCompareFn, inputRows);
    const expected = [4, 3, 2, 1];

    expect(actual).toEqual(expected);
    expect(fakeCompareFn).toHaveBeenCalled();
  });
});

describe('sortDataSourceRows', () => {
  it('should return empty array if provided dataSource is empty', () => {
    const fakeSortStateApi = setupStateApi(fakeSortStateActive);

    expect(sortDataSourceRows(fakeSortStateApi, fakeColumns, [])).toEqual([]);
  });

  it('should sort rows using compareFn from column with active sorting', () => {
    const fakeSortingColumns: FakeColumnsType = [
      {
        key: 'columnAsc',
        sorter: jest.fn().mockImplementation((a, b) => a - b), // sort ascending
      },
      {
        key: 'columnNull',
        sorter: undefined,
      },
    ];
    const fakeDataSource: GroupType<number>[] = [
      { column: 'c1', groupType: 'groupType', value: 'value', key: 'k1', rows: [4, 1, 2, 3] },
      { column: 'c1', groupType: 'groupType', value: 'value', key: 'k1', rows: [4, 1, 2, 3] },
      { column: 'c1', groupType: 'groupType', value: 'value', key: 'k1', rows: [4, 1, 2, 3] },
      { column: 'c1', groupType: 'groupType', value: 'value', key: 'k1', rows: [4, 1, 2, 3] },
    ];
    const fakeSortStateApi = setupStateApi(fakeSortStateActive);

    const actual = sortDataSourceRows(fakeSortStateApi, fakeSortingColumns, fakeDataSource);
    const expected: GroupType<number>[] = [
      { column: 'c1', groupType: 'groupType', value: 'value', key: 'k1', rows: [1, 2, 3, 4] },
      { column: 'c1', groupType: 'groupType', value: 'value', key: 'k1', rows: [1, 2, 3, 4] },
      { column: 'c1', groupType: 'groupType', value: 'value', key: 'k1', rows: [1, 2, 3, 4] },
      { column: 'c1', groupType: 'groupType', value: 'value', key: 'k1', rows: [1, 2, 3, 4] },
    ];

    expect(actual).toEqual(expected);
  });
});
