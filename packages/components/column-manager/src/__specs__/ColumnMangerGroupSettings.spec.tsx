import React from 'react';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithProvider from '@synerise/ds-utils/dist/testing/renderWithProvider/renderWithProvider';

import ColumnManagerGroupSettings from '../ColumnManagerGroupSettings/ColumnManagerGroupSettings';
import { GroupSettingsProps, GROUP_BY } from '../ColumnManagerGroupSettings/ColumnManagerGroupSettings.types';

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
    const hide = jest.fn();
    const onOk = jest.fn();
    renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} />);

    expect(screen.getByText(TEXTS.groupTitle)).toBeTruthy();
    expect(screen.getByText(TEXTS.groupingType)).toBeTruthy();
    expect(screen.getByText(TEXTS.selectPlaceholder)).toBeTruthy();
  });

  it('should render with selected Grouping by values' , async () => {
    const hide = jest.fn();
    const onOk = jest.fn();
    renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} settings={{
      column: COLUMN,
      settings: {
        type: GROUP_BY.value,
        ranges: false,
        interval: false,
      }
    }} />);

    expect(screen.getByText(TEXTS.groupByValue)).toBeTruthy();
  });

  it('should render with selected Grouping by interval' , async () => {
    const hide = jest.fn();
    const onOk = jest.fn();
    renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} settings={{
      column: COLUMN,
      settings: {
        type: GROUP_BY.interval,
        ranges: false,
        interval: false,
      }
    }} />);

    expect(screen.getByText(TEXTS.groupByIntervals)).toBeTruthy();
  });

  it('should render with selected Grouping by ranges' , async () => {
    const hide = jest.fn();
    const onOk = jest.fn();
    renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} settings={{
      column: COLUMN,
      settings: {
        type: GROUP_BY.ranges,
        ranges: false,
        interval: false,
      }
    }} />);

    expect(screen.getByText(TEXTS.groupByRanges)).toBeTruthy();
  });

  it('should render with selected Grouping disabled' , async () => {
    const hide = jest.fn();
    const onOk = jest.fn();
    renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} settings={{
      column: COLUMN,
      settings: {
        type: GROUP_BY.disabled,
        ranges: false,
        interval: false,
      }
    }} />);

    expect(screen.getByText(TEXTS.groupDisabled)).toBeTruthy();
  });

  it('should show errorChooseGrouping' , async () => {
    const hide = jest.fn();
    const onOk = jest.fn();
    renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} />);

    fireEvent.click(screen.getByText('Apply'));

    const errorMsg = await screen.findByText(TEXTS.errorChooseGrouping);
    expect(errorMsg).toBeTruthy();
    expect(onOk).not.toBeCalled();
  });

  it('should show errorInterval' , async () => {
    const hide = jest.fn();
    const onOk = jest.fn();
    renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} settings={{
      column: COLUMN,
      settings: {
        type: GROUP_BY.interval,
        ranges: false,
        interval: false,
      }
    }} />);

    fireEvent.click(screen.getByText('Apply'));

    const errorMsg = await screen.findByText(TEXTS.errorInterval);
    expect(errorMsg).toBeTruthy();
    expect(onOk).not.toBeCalled();
  });

  it('should set group by interval' , async () => {
    const INTERVAL_VALUE = 2;
    const hide = jest.fn();
    const onOk = jest.fn();
    renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} settings={{
      column: COLUMN,
      settings: {
        type: GROUP_BY.interval,
        ranges: false,
        interval: false,
      }
    }} />);

    const intervalInput = screen.getByTestId('group-by-interval');
    fireEvent.change(intervalInput, {target: {value: INTERVAL_VALUE}});
    fireEvent.blur(intervalInput)
    
    userEvent.click(screen.getByText('Apply'));

    await waitFor(() => expect(onOk).toBeCalledWith({column: COLUMN, settings: {type: GROUP_BY.interval, ranges: false, interval: INTERVAL_VALUE}}));
  });

  it('should show errorRange' , async () => {
    const hide = jest.fn();
    const onOk = jest.fn();
    renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} settings={{
      column: COLUMN,
      settings: {
        type: GROUP_BY.ranges,
        ranges: false,
        interval: false,
      }
    }} />);
    fireEvent.click(screen.getByText('Apply'));

    const errorMsg = await screen.findByText(TEXTS.errorRange);
    expect(errorMsg).toBeTruthy();
    expect(onOk).not.toBeCalled();
  });

  it('should render with 1 range row' , async () => {
    const hide = jest.fn();
    const onOk = jest.fn();
    renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} settings={{
      column: COLUMN ,
      settings: {
        type: GROUP_BY.ranges,
        ranges: false,
        interval: false,
      }
    }} />);
    const rows = screen.getAllByTestId('group-range-row');

    expect(rows.length).toBe(1);
  });

  it('should add second range row' , async () => {
    const hide = jest.fn();
    const onOk = jest.fn();
    renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} settings={{
      column: COLUMN,
      settings: {
        type: GROUP_BY.ranges,
        ranges: false,
        interval: false,
      }
    }} />);
    
    fireEvent.click(screen.getByText(TEXTS.addRange));
    const rows = await screen.findAllByTestId('group-range-row');

    expect(rows.length).toBe(2);
  });

  it('should render with filled range row inputs' , async () => {
    const hide = jest.fn();
    const onOk = jest.fn();
    renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} settings={{
      column: COLUMN,
      settings: {
        type: GROUP_BY.ranges,
        ranges: [{ from: { value: 'A', error: undefined}, to: {value: 'B', error: undefined}}],
        interval: false,
      }
    }} />);
    const range = screen.getByTestId('group-range-row');
    const inputs = within(range).getAllByRole('textbox');
    expect(inputs).toHaveLength(2);
    expect(inputs[0]).toHaveAttribute('value','A')
    expect(inputs[1]).toHaveAttribute('value','B')
  });

  it.skip('should set group with ranges' , async () => {
    // FIXME masked input is not working
    const hide = jest.fn();
    const onOk = jest.fn();
    renderWithProvider(<COLUMN_MANAGER_GROUP_SETTINGS hide={hide} onOk={onOk} settings={{
      column: COLUMN,
      settings: {
        type: GROUP_BY.ranges,
        ranges: false,
        interval: false,
      }
    }} />);

    const rows = screen.getAllByTestId('group-range-row');

    const inputs = within(rows[0]).getAllByRole('textbox');
    expect(inputs).toHaveLength(2);
    
    userEvent.type(inputs[0], 'a');
    userEvent.click(screen.getByText('Apply'));

    await waitFor(() => expect(onOk).toBeCalledWith({column: COLUMN, settings: { type: GROUP_BY.ranges, interval: false, ranges:[{ from: {value: 'A', error: undefined}, to: {value: undefined, error: undefined}}]}}))
  });
});


