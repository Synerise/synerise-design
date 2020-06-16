import ColumnManagerGroupSettings from '../ColumnManagerGroupSettings/ColumnManagerGroupSettings';
import * as React from 'react';
import renderWithProvider from '@synerise/ds-utils/dist/testing/renderWithProvider/renderWithProvider';
import { GroupSettingsProps, GROUP_BY } from '../ColumnManagerGroupSettings/ColumnManagerGroupSettings.types';
import { fireEvent } from '@testing-library/react';

const COLUMN = {
  id: '0',
  name: 'User name',
  visible: true,
  type: 'text',
  fixed: 'left',
  key: 'user_name',
};

const TEXTS = {
  groupByValue: "Group by value",
  groupByRanges: "Group by ranges",
  groupByIntervals: "Group by intervals",
  groupDisabled: "Group disabled",
  groupTitle: "Table content group",
  selectPlaceholder: "Select",
  intervalPlaceholder: "Set interval",
  groupingType: "Set grouping type",
  groupingTypeTooltip: "More details about grouping",
  from: "From",
  to: "To",
  remove: "Remove",
  addRange: "Add more",
  noResults: "No results",
  errorEmptyRange: "You should fill one of these fields",
  errorEmptyFromField: "Only the \"From\" field in the first range can be left blank",
  errorEmptyToField: "Only the \"To\" field in the last range can be left blank",
  errorChooseGrouping: "Error - Choose type of grouping",
  errorInterval: "Error - Provide correct interval value",
  errorRange: "Error - Provide correct value"
};

const COLUMN_MANAGER_GROUP_SETTINGS = (props: Omit<GroupSettingsProps, 'texts' | 'visible'>) => (
  <ColumnManagerGroupSettings
    texts={TEXTS}
    visible={true}
    column={COLUMN}
    {...props}
  />
);

describe('ColumnManagerGroupSettings component', () => {
  it('should render model' , () => {
    // ARRANGE
    const hide = jest.fn();
    const onOk = jest.fn();
    const { getByText } = renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} />);

    // ASSERT
    expect(getByText(TEXTS.groupTitle)).toBeTruthy();
    expect(getByText(TEXTS.groupingType)).toBeTruthy();
    expect(getByText(TEXTS.selectPlaceholder)).toBeTruthy();
  });
});

describe('ColumnManagerGroupSettings component', () => {
  it('should render with selected Grouping by values' , async () => {
    // ARRANGE
    const hide = jest.fn();
    const onOk = jest.fn();
    const { getByText } = renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} settings={{
      column: COLUMN,
      settings: {
        type: GROUP_BY.value,
        ranges: false,
        interval: false,
      }
    }} />);

    // ASSERT
    expect(getByText(TEXTS.groupByValue)).toBeTruthy();
  });
});

describe('ColumnManagerGroupSettings component', () => {
  it('should render with selected Grouping by interval' , async () => {
    // ARRANGE
    const hide = jest.fn();
    const onOk = jest.fn();
    const { getByText } = renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} settings={{
      column: COLUMN,
      settings: {
        type: GROUP_BY.interval,
        ranges: false,
        interval: false,
      }
    }} />);

    // ASSERT
    expect(getByText(TEXTS.groupByIntervals)).toBeTruthy();
  });
});

describe('ColumnManagerGroupSettings component', () => {
  it('should render with selected Grouping by ranges' , async () => {
    // ARRANGE
    const hide = jest.fn();
    const onOk = jest.fn();
    const { getByText } = renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} settings={{
      column: COLUMN,
      settings: {
        type: GROUP_BY.ranges,
        ranges: false,
        interval: false,
      }
    }} />);

    // ASSERT
    expect(getByText(TEXTS.groupByRanges)).toBeTruthy();
  });
});

describe('ColumnManagerGroupSettings component', () => {
  it('should render with selected Grouping disabled' , async () => {
    // ARRANGE
    const hide = jest.fn();
    const onOk = jest.fn();
    const { getByText } = renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} settings={{
      column: COLUMN,
      settings: {
        type: GROUP_BY.disabled,
        ranges: false,
        interval: false,
      }
    }} />);

    // ASSERT
    expect(getByText(TEXTS.groupDisabled)).toBeTruthy();
  });
});

describe('ColumnManagerGroupSettings component', () => {
  it('should show errorChooseGrouping' , async () => {
    // ARRANGE
    const hide = jest.fn();
    const onOk = jest.fn();
    const { getByText, findByText } = renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} />);

    // ACT
    fireEvent.click(getByText('Apply'));

    // ASSERT
    const errorMsg = await findByText(TEXTS.errorChooseGrouping);
    expect(errorMsg).toBeTruthy();
    expect(onOk).not.toBeCalled();
  });
});

describe('ColumnManagerGroupSettings component', () => {
  it('should show errorInterval' , async () => {
    // ARRANGE
    const hide = jest.fn();
    const onOk = jest.fn();
    const { getByText, findByText } = renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} settings={{
      column: COLUMN,
      settings: {
        type: GROUP_BY.interval,
        ranges: false,
        interval: false,
      }
    }} />);

    // ACT
    fireEvent.click(getByText('Apply'));

    // ASSERT
    const errorMsg = await findByText(TEXTS.errorInterval);
    expect(errorMsg).toBeTruthy();
    expect(onOk).not.toBeCalled();
  });
});

describe('ColumnManagerGroupSettings component', () => {
  it('should set group by interval' , async () => {
    // ARRANGE
    const INTERVAL_VALUE = 2;
    const hide = jest.fn();
    const onOk = jest.fn();
    const { getByText, getByTestId } = renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} settings={{
      column: COLUMN,
      settings: {
        type: GROUP_BY.interval,
        ranges: false,
        interval: false,
      }
    }} />);

    // ACT
    const intervalInput = getByTestId('group-by-interval');
    fireEvent.change(intervalInput, {target: {value: INTERVAL_VALUE}});
    fireEvent.click(getByText('Apply'));

    // ASSERT
    expect(onOk).toBeCalledWith({column: COLUMN, settings: {type: GROUP_BY.interval, ranges: false, interval: INTERVAL_VALUE}});
  });
});

describe('ColumnManagerGroupSettings component', () => {
  it('should show errorRange' , async () => {
    // ARRANGE
    const hide = jest.fn();
    const onOk = jest.fn();
    const { getByText, findByText } = renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} settings={{
      column: COLUMN,
      settings: {
        type: GROUP_BY.ranges,
        ranges: false,
        interval: false,
      }
    }} />);
    // ACT
    fireEvent.click(getByText('Apply'));

    // ASSERT
    const errorMsg = await findByText(TEXTS.errorRange);
    expect(errorMsg).toBeTruthy();
    expect(onOk).not.toBeCalled();
  });
});

describe('ColumnManagerGroupSettings component', () => {
  it('should render with 1 range row' , async () => {
    // ARRANGE
    const hide = jest.fn();
    const onOk = jest.fn();
    const { getAllByTestId } = renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} settings={{
      column: COLUMN ,
      settings: {
        type: GROUP_BY.ranges,
        ranges: false,
        interval: false,
      }
    }} />);
    // ACT
    const rows = getAllByTestId('group-range-row');

    // ASSERT
    expect(rows.length).toBe(1);
  });
});

describe('ColumnManagerGroupSettings component', () => {
  it('should add second range row' , async () => {
    // ARRANGE
    const hide = jest.fn();
    const onOk = jest.fn();
    const { findAllByTestId, getByText } = renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} settings={{
      column: COLUMN,
      settings: {
        type: GROUP_BY.ranges,
        ranges: false,
        interval: false,
      }
    }} />);
    // ACT

    fireEvent.click(getByText(TEXTS.addRange));
    const rows = await findAllByTestId('group-range-row');

    // ASSERT
    expect(rows.length).toBe(2);
  });
});

describe('ColumnManagerGroupSettings component', () => {
  it('should render with filled range row inputs' , async () => {
    // ARRANGE
    const hide = jest.fn();
    const onOk = jest.fn();
    const { getByDisplayValue } = renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} settings={{
      column: COLUMN,
      settings: {
        type: GROUP_BY.ranges,
        ranges: [{ from: { value: 'A', error: undefined}, to: {value: 'B', error: undefined}}],
        interval: false,
      }
    }} />);

    // ASSERT
    expect(getByDisplayValue('A')).toBeTruthy();
    expect(getByDisplayValue('B')).toBeTruthy();
  });
});


describe('ColumnManagerGroupSettings component', () => {
  it('should set group with ranges' , async () => {
    // ARRANGE
    const hide = jest.fn();
    const onOk = jest.fn();
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const { getAllByTestId, getByText } = renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} settings={{
      column: COLUMN,
      settings: {
        type: GROUP_BY.ranges,
        ranges: false,
        interval: false,
      }
    }} />);

    // ACT
    const rows = getAllByTestId('group-range-row');
    let allInputs: HTMLInputElement[] = [];
    rows.forEach(row => {
      const inputs = row.querySelectorAll('input');
      allInputs = [...allInputs, ...inputs];
    });

    [...allInputs].forEach((input, index) => {
      fireEvent.change(input, {target: {value: alphabet[index]}});
      fireEvent.blur(input);
    });

    fireEvent.click(getByText('Apply'));
    // ASSERT
    expect(onOk).toBeCalledWith({column: COLUMN, settings: { type: GROUP_BY.ranges, interval: false, ranges:[{ from: {value: 'A', error: undefined}, to: {value: 'B', error: undefined}}]}})
  });
});

