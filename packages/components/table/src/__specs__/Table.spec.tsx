import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import Table from '../index';
import { fireEvent } from '@testing-library/react';
import { Grid2M } from '@synerise/ds-icon/dist/icons';

const props = {
  dataSource: [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
    {
      key: '3',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
    {
      key: '4',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
    {
      key: '5',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
    {
      key: '6',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ],
  columns: [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ],
};

describe('Table', () => {
  it('should render correctly', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Table dataSource={props.dataSource} columns={props.columns} />);

    // ASSERT
    expect(getByText('Name')).toBeTruthy();
  });

  it('should render "no data"', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Table columns={props.columns} locale={{emptyText: 'No Data'}} />);

    // ASSERT
    expect(getByText('No Data')).toBeTruthy();
  });

  it('should updates columns when receiving props', () => {
    // ARRANGE
    const columns = [
      {
        title: 'Col1',
        key: 'name',
        dataIndex: 'name',
      },
    ];
    const { rerender, getByText, getAllByText } = renderWithProvider(<Table columns={columns} />);

    // ACT
    rerender(<Table columns={props.columns} dataSource={props.dataSource} />);

    // ASSERT
    expect(getByText('Age')).toBeTruthy();
    expect(getAllByText('10 Downing Street')).toBeTruthy();
  });

  it('should render title', () => {
    // ARRANGE
    const TITLE = 'test title';
    const { getByText } = renderWithProvider(<Table columns={props.columns} title={TITLE} />);

    // ASSERT
    expect(getByText(TITLE)).toBeTruthy();
  });

  it('should not render pagination', () => {
    // ARRANGE
    const{ container } = renderWithProvider(<Table dataSource={props.dataSource} columns={props.columns} />);

    // ASSERT
    expect(container.querySelector('.ant-table-pagination')).toBeNull();
  });

  it('should render pagination with size changer and quick jumper', () => {
    // ARRANGE
    const handleChange = jest.fn();
    const{ container } = renderWithProvider(<Table dataSource={props.dataSource} columns={props.columns} pagination={{
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: handleChange,
      pageSize: 3
    }} />);

    // ASSERT
    expect(container.querySelector('.ant-table-pagination')).toBeTruthy();
    expect(container.querySelector('.ant-pagination-options-size-changer')).toBeTruthy();
    expect(container.querySelector('.ant-pagination-options-quick-jumper')).toBeTruthy();
  });

  it('should render call handleChange', () => {
    // ARRANGE
    const handleChange = jest.fn();
    const{ container } = renderWithProvider(<Table dataSource={props.dataSource} columns={props.columns} pagination={{
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: handleChange,
      pageSize: 3
    }} />);

    // ACT
    const paginationItem = container.querySelector('.ant-pagination-item-2');
    paginationItem && fireEvent.click(paginationItem);

    // ARRANGE
    expect(handleChange).toBeCalled();
  });

  it('should show loading state of table', () => {
    // ARRANGE
    const {container} = renderWithProvider(<Table dataSource={props.dataSource} columns={props.columns} loading /> );
    // ASSERT
    expect(container.querySelector('.spinner')).toBeTruthy();
  });

  it('should render filters', () => {
    const handleShowList = jest.fn();
    const handleShowFilter = jest.fn();
    const handleClear = jest.fn();
    // ARRANGE
    const { getByTestId } = renderWithProvider(<Table dataSource={props.dataSource} columns={props.columns}  filters={
      [
        {
          key: 'view',
          icon: <Grid2M />,
          tooltips: { default: 'Table view', clear: 'Clear view', define: 'Define view', list: 'Saved views' },
          openedLabel: 'Define',
          showList: handleShowList,
          show: handleShowFilter,
          handleClear: handleClear,
          selected: undefined,
        }
      ]
    } /> );
    // ASSERT
    expect(getByTestId('filter-trigger-view')).toBeTruthy();
  });

  it('should render filter with selected item', () => {
    const handleShowList = jest.fn();
    const handleShowFilter = jest.fn();
    const handleClear = jest.fn();
    // ARRANGE
    const { getByTestId, getByText } = renderWithProvider(<Table dataSource={props.dataSource} columns={props.columns}  filters={
      [
        {
          key: 'view',
          icon: <Grid2M />,
          tooltips: { default: 'Table view', clear: 'Clear view', define: 'Define view', list: 'Saved views' },
          openedLabel: 'Define',
          showList: handleShowList,
          show: handleShowFilter,
          handleClear: handleClear,
          selected: {name: 'Selected filter'},
        }
      ]
    } /> );
    const clearBtn = getByTestId('clear-button');
    const showListBtn = getByTestId('show-list-button');
    const showFilterBtn = getByTestId('show-filter-button');

    // ACT
    fireEvent.click(clearBtn);
    fireEvent.click(showFilterBtn);
    fireEvent.click(showListBtn);

    // ASSERT
    expect(getByText('Selected filter')).toBeTruthy();
    expect(handleClear).toBeCalled();
    expect(handleShowFilter).toBeCalled();
    expect(handleShowList).toBeCalled();
  });

});
