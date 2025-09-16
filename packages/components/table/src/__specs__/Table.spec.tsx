import React from 'react';
import userEvent from '@testing-library/user-event';

import { Grid2M } from '@synerise/ds-icon';
import { renderWithProvider } from '@synerise/ds-core';
import {
  fireEvent,
  getByRole,
  screen,
  waitFor,
  within,
} from '@testing-library/react';

import Table from '../index';

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
    renderWithProvider(
      <Table dataSource={props.dataSource} columns={props.columns} />,
    );

    expect(screen.getByText('Name')).toBeTruthy();
  });

  it.skip('should render "no data"', async () => {
    // FIXME
    renderWithProvider(
      <Table
        dataSource={[]}
        columns={props.columns}
        locale={{ emptyText: 'No Data' }}
      />,
    );

    await waitFor(
      async () => expect(await screen.findByText('No Data')).toBeTruthy(),
      { timeout: 2000 },
    );
  });

  it('should updates columns when receiving props', () => {
    const columns = [
      {
        title: 'Col1',
        key: 'name',
        dataIndex: 'name',
      },
    ];
    const { rerender } = renderWithProvider(
      <Table dataSource={[]} columns={columns} />,
    );

    rerender(<Table columns={props.columns} dataSource={props.dataSource} />);

    expect(screen.getByText('Age')).toBeTruthy();
    expect(screen.getAllByText('10 Downing Street')).toBeTruthy();
  });

  it('should render title with results count', () => {
    const TEXT = 'test title 0 results';
    renderWithProvider(
      <Table dataSource={[]} columns={props.columns} title={TEXT} />,
    );

    expect(screen.getByText(TEXT)).toBeTruthy();
  });

  it('should not render pagination', () => {
    const { container } = renderWithProvider(
      <Table dataSource={props.dataSource} columns={props.columns} />,
    );

    expect(container.querySelector('.ant-table-pagination')).toBeNull();
  });

  it('should render pagination with size changer and quick jumper', () => {
    const handleChange = jest.fn();
    const { container } = renderWithProvider(
      <Table
        dataSource={props.dataSource}
        columns={props.columns}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: handleChange,
          pageSize: 3,
        }}
      />,
    );

    expect(container.querySelector('.ant-table-pagination')).toBeTruthy();
    expect(
      container.querySelector('.ant-pagination-options-size-changer'),
    ).toBeTruthy();
    expect(
      container.querySelector('.ant-pagination-options-quick-jumper'),
    ).toBeTruthy();
  });

  it('should call handleChange', () => {
    const handleChange = jest.fn();
    const { container } = renderWithProvider(
      <Table
        dataSource={props.dataSource}
        columns={props.columns}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: handleChange,
          pageSize: 3,
        }}
      />,
    );

    const paginationItem = container.querySelector('.ant-pagination-item-2');
    paginationItem && fireEvent.click(paginationItem);

    expect(handleChange).toBeCalled();
  });

  it('should call onRow handlers', () => {
    const onClick = jest.fn();
    const onDoubleClick = jest.fn();
    const onContextMenu = jest.fn();
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const { container } = renderWithProvider(
      <Table
        dataSource={props.dataSource}
        columns={props.columns}
        onRow={() => ({
          onClick,
          onDoubleClick,
          onContextMenu,
          onMouseEnter,
          onMouseLeave,
        })}
      />,
    );

    const row = container.querySelector('.ds-table-row');
    row && fireEvent.click(row);
    row && fireEvent.doubleClick(row);
    row && fireEvent.contextMenu(row);
    row && fireEvent.mouseLeave(row);
    row && fireEvent.mouseEnter(row);

    expect(onClick).toBeCalled();
    expect(onDoubleClick).toBeCalled();
    expect(onContextMenu).toBeCalled();
    expect(onMouseEnter).toBeCalled();
    expect(onMouseLeave).toBeCalled();
  });

  it('should show loading state of table', () => {
    const { container } = renderWithProvider(
      <Table dataSource={props.dataSource} columns={props.columns} loading />,
    );
    expect(
      container.querySelector('.ds-table-skeleton-cell'),
    ).toBeInTheDocument();
  });

  it('should render filters', () => {
    const handleShowList = jest.fn();
    const handleShowFilter = jest.fn();
    const handleClear = jest.fn();
    renderWithProvider(
      <Table
        dataSource={props.dataSource}
        columns={props.columns}
        filters={[
          {
            key: 'view',
            icon: <Grid2M />,
            tooltips: {
              default: 'Table view',
              clear: 'Clear view',
              define: 'Define view',
              list: 'Saved views',
            },
            openedLabel: 'Define',
            showList: handleShowList,
            show: handleShowFilter,
            handleClear,
            selected: undefined,
          },
        ]}
      />,
    );
    expect(screen.getByTestId('filter-trigger-view')).toBeTruthy();
  });

  it('should render filter with selected item', () => {
    const handleShowList = jest.fn();
    const handleShowFilter = jest.fn();
    const handleClear = jest.fn();
    renderWithProvider(
      <Table
        dataSource={props.dataSource}
        columns={props.columns}
        filters={[
          {
            key: 'view',
            icon: <Grid2M />,
            tooltips: {
              default: 'Table view',
              clear: 'Clear view',
              define: 'Define view',
              list: 'Saved views',
            },
            openedLabel: 'Define',
            showList: handleShowList,
            show: handleShowFilter,
            handleClear,
            selected: { name: 'Selected filter' },
          },
        ]}
      />,
    );
    const clearBtn = screen.getByTestId('clear-button');
    const showListBtn = screen.getByTestId('show-list-button');
    const showFilterBtn = screen.getByTestId('filter-trigger-view');

    fireEvent.click(clearBtn);
    fireEvent.click(showFilterBtn);
    fireEvent.click(showListBtn);

    expect(screen.getByText('Selected filter')).toBeTruthy();
    expect(handleClear).toBeCalled();
    expect(handleShowFilter).toBeCalled();
    expect(handleShowList).toBeCalled();
  });

  it('Should render results title', () => {
    renderWithProvider(
      <Table
        dataSource={props.dataSource}
        columns={props.columns}
        locale={{ pagination: { items: 'results' } }}
      />,
    );
    expect(screen.getByTestId('ds-table-title').textContent).toEqual(
      '6results',
    );
  });

  it.skip('Should render custom empty component', async () => {
    // FIXME
    const EMPTY_STATE = 'empty state';
    renderWithProvider(
      <Table
        dataSource={[]}
        columns={props.columns}
        emptyDataComponent={EMPTY_STATE}
      />,
    );
    expect(await screen.findByText(EMPTY_STATE)).toBeInTheDocument();
  });

  it('Should render results title with custom locale', () => {
    renderWithProvider(
      <Table
        dataSource={props.dataSource}
        columns={props.columns}
        locale={{ pagination: { items: 'records' } }}
      />,
    );
    expect(screen.getByTestId('ds-table-title').textContent).toEqual(
      '6records',
    );
  });

  it('Should render with unchecked and disabled row selection checkbox', () => {
    const handleChangeSelection = jest.fn();
    renderWithProvider(
      <Table
        dataSource={[]}
        columns={props.columns}
        title="Title"
        selection={{ selectedRowKeys: [], onChange: handleChangeSelection }}
      />,
    );

    const rowSelectionCheckbox = getByRole(
      screen.getByTestId('ds-table-title'),
      'checkbox',
    );

    expect(rowSelectionCheckbox).not.toBeChecked();
    expect(rowSelectionCheckbox).toBeDisabled();
  });

  it('Should render with "select all" selection item', async () => {
    const handleChangeSelection = jest.fn();
    const handleChangeGlobalSelection = jest.fn();
    const SELECT_GLOBAL_ALL = 'SELECT_GLOBAL_ALL'
    const UNSELECT_GLOBAL_ALL = 'UNSELECT_GLOBAL_ALL'
    renderWithProvider(
      <Table
        dataSource={props.dataSource}
        columns={props.columns}
        title="Title"
        locale={{
          selectGlobalAll: SELECT_GLOBAL_ALL,
          unselectGlobalAll: UNSELECT_GLOBAL_ALL
        }}
        selection={{ selectedRowKeys: [], onChange: handleChangeSelection, globalSelection: { isSelected: true, onChange: handleChangeGlobalSelection} }}
      />
    );

    screen.getAllByTestId('ds-table-selection-button').forEach(checkbox => {
      expect(checkbox).toBeChecked();
      expect(checkbox).toBeDisabled();
    })
    
    userEvent.click(screen.getByTestId('ds-table-batch-selection-options'));
    await waitFor(async () => expect(await screen.findByText(UNSELECT_GLOBAL_ALL)).toBeInTheDocument());

    userEvent.click(screen.getByText(UNSELECT_GLOBAL_ALL));
    await waitFor(() => expect(handleChangeGlobalSelection).toHaveBeenCalledWith(false));

  });


  it('Should render with selection checkboxes only for specific items', () => {
    const handleChangeSelection = jest.fn();
    const allowSelectionForKeys = ['2', '4'];
    renderWithProvider(
      <Table
        dataSource={props.dataSource}
        columns={props.columns}
        title="Title"
        selection={{
          selectedRowKeys: [],
          checkRowSelectionStatus: (record) => ({
            unavailable: !allowSelectionForKeys.includes(record.key),
          }),
          onChange: handleChangeSelection,
        }}
      />,
    );
    const allButtons = screen.getAllByTestId('ds-table-selection-button');
    expect(allButtons.length).toEqual(allowSelectionForKeys.length);
  });

  describe('row star', () => {
    it('should render with correct initial rows starred', () => {
      renderWithProvider(
        <Table
          {...props}
          rowStar={{
            starredRowKeys: ['3', '4', '6'],
          }}
        />,
      );

      const buttonsPressedValues = screen
        .getAllByTestId('ds-table-star-button')
        .map((elem) => elem.getAttribute('aria-pressed'));

      expect(buttonsPressedValues).toEqual([
        'false',
        'false',
        'true',
        'true',
        'false',
        'true',
      ]);
    });

    it('should call onChange callback with updated starred keys after click', () => {
      const onChangeSpy = jest.fn();
      renderWithProvider(
        <Table
          {...props}
          rowStar={{
            starredRowKeys: ['4'],
            onChange: onChangeSpy,
          }}
        />,
      );

      const starButtons = screen.getAllByTestId('ds-table-star-button');

      fireEvent.click(starButtons[1]);
      expect(onChangeSpy).toHaveBeenCalledWith(['4', '2'], '2', true);

      fireEvent.click(starButtons[3]);
      expect(onChangeSpy).toHaveBeenCalledWith(['2'], '4', false);

      fireEvent.click(starButtons[1]);
      expect(onChangeSpy).toHaveBeenCalledWith([], '2', false);
    });
  });

  describe('skeleton', () => {
    it.skip('Should render skeleton when loading initial data', () => {
      renderWithProvider(<Table {...props} dataSource={undefined} loading />);
      expect(screen.getByTestId('ds-table-skeleton')).toBeInTheDocument();
    });

    it('Should render skeleton in place of total count', () => {
      renderWithProvider(<Table {...props} isCounterLoading />);

      expect(
        within(screen.getByTestId('ds-table-title')).getByTestId('ds-skeleton'),
      ).toBeInTheDocument();
    });
  });
});
