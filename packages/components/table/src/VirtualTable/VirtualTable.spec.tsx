import React from 'react';

import { Grid2M } from '@synerise/ds-icon';
import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import VirtualTable from './VirtualTable';

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

const sharedProps = {
  cellHeight: 50,
  scroll: { y: 900 },
  initialWidth: 300,
};

describe('VirtualTable', () => {
  it('should render correctly', () => {
    renderWithProvider(
      <VirtualTable
        {...sharedProps}
        dataSource={props.dataSource}
        columns={props.columns}
      />,
    );
    expect(screen.getByText('Name')).toBeTruthy();
  });

  it('should render "no data"', () => {
    renderWithProvider(
      <VirtualTable
        {...sharedProps}
        dataSource={[]}
        columns={props.columns}
        locale={{ emptyText: 'No Data' }}
      />,
    );

    expect(screen.getByText('No Data')).toBeTruthy();
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
      <VirtualTable {...sharedProps} dataSource={[]} columns={columns} />,
    );

    rerender(
      <VirtualTable
        {...sharedProps}
        columns={props.columns}
        dataSource={props.dataSource}
      />,
    );

    expect(screen.getByText('Age')).toBeTruthy();
    expect(screen.getAllByText('10 Downing Street')).toBeTruthy();
  });

  it('should render title with results count', () => {
    const TEXT = 'test title 0 results';
    renderWithProvider(
      <VirtualTable
        {...sharedProps}
        dataSource={[]}
        columns={props.columns}
        title={TEXT}
      />,
    );

    expect(screen.getByText(TEXT)).toBeTruthy();
  });

  it('should show loading state of table', () => {
    const { container } = renderWithProvider(
      <VirtualTable
        {...sharedProps}
        dataSource={props.dataSource}
        columns={props.columns}
        loading
      />,
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
      <VirtualTable
        {...sharedProps}
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

  it('Should render results title', () => {
    renderWithProvider(
      <VirtualTable
        {...sharedProps}
        dataSource={props.dataSource}
        columns={props.columns}
        locale={{ pagination: { items: 'results' } }}
      />,
    );
    expect(screen.getByTestId('ds-table-title').textContent).toEqual(
      '6results',
    );
  });

  it('Should render results title with custom locale', () => {
    renderWithProvider(
      <VirtualTable
        {...sharedProps}
        dataSource={props.dataSource}
        columns={props.columns}
        locale={{ pagination: { items: 'records' } }}
      />,
    );
    expect(screen.getByTestId('ds-table-title').textContent).toEqual(
      '6records',
    );
  });

  describe('row star', () => {
    it('should render with correct initial rows starred', () => {
      renderWithProvider(
        <VirtualTable
          {...sharedProps}
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
        <VirtualTable
          {...sharedProps}
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

  describe('row selection', () => {
    it('should render with correct initial rows selected', () => {
      const handleChangeSelection = jest.fn();
      renderWithProvider(
        <VirtualTable
          {...sharedProps}
          {...props}
          selection={{
            selectedRowKeys: ['2', '4'],
            onChange: handleChangeSelection,
          }}
        />,
      );

      const buttonsPressedValues = screen
        .getAllByTestId('ds-table-selection-button')
        .map((elem) => elem.getAttribute('aria-checked'));

      expect(buttonsPressedValues).toEqual([
        'false',
        'true',
        'false',
        'true',
        'false',
        'false',
      ]);
    });

    it('should render with correct rows with checkbox rendered', () => {
      const handleChangeSelection = jest.fn();
      const allowSelectionForKeys = ['2', '4'];
      renderWithProvider(
        <VirtualTable
          {...sharedProps}
          {...props}
          selection={{
            checkRowSelectionStatus: (record) => ({
              unavailable: !allowSelectionForKeys.includes(record.key),
            }),
            selectedRowKeys: [],
            onChange: handleChangeSelection,
          }}
        />,
      );

      const allButtons = screen.getAllByTestId('ds-table-selection-button');

      expect(allButtons.length).toEqual(allowSelectionForKeys.length);
    });

    it('should render with correct rows with checkbox disabled', () => {
      const handleChangeSelection = jest.fn();
      const disabledSelectionForKeys = ['2', '4'];
      renderWithProvider(
        <VirtualTable
          {...sharedProps}
          {...props}
          selection={{
            checkRowSelectionStatus: (record) => ({
              disabled: disabledSelectionForKeys.includes(record.key),
            }),
            selectedRowKeys: [],
            onChange: handleChangeSelection,
          }}
        />,
      );

      const allButtons = screen.getAllByTestId('ds-table-selection-button');
      const disabledButtons = allButtons.filter((button) =>
        button.hasAttribute('disabled'),
      );

      expect(disabledButtons.length).toEqual(disabledSelectionForKeys.length);
    });

    it('Should render with unchecked and disabled row selection checkbox', () => {
      const handleChangeSelection = jest.fn();
      renderWithProvider(
        <VirtualTable
          {...sharedProps}
          dataSource={[]}
          columns={props.columns}
          title="Title"
          selection={{ selectedRowKeys: [], onChange: handleChangeSelection }}
        />,
      );

      const rowSelectionCheckbox = screen.getByTestId(
        'ds-table-batch-selection-button',
      );

      expect(rowSelectionCheckbox).not.toBeChecked();
      expect(rowSelectionCheckbox).toBeDisabled();
    });

    it('should call onChange selection callback with updated selection keys after click (selectAll)', () => {
      const handleChangeSelection = jest.fn();
      const allKeys = props.dataSource.map((item) => item.key);
      renderWithProvider(
        <VirtualTable
          {...sharedProps}
          {...props}
          selection={{ selectedRowKeys: [], onChange: handleChangeSelection }}
        />,
      );

      const rowSelectionCheckbox = screen.getByTestId(
        'ds-table-batch-selection-button',
      );

      userEvent.click(rowSelectionCheckbox);
      expect(handleChangeSelection).toHaveBeenCalledWith(
        allKeys,
        props.dataSource,
      );
    });

    it('should call onChange selection callback with updated selection keys (unselectAll)', () => {
      const handleChangeSelection = jest.fn();
      const allKeys = props.dataSource.map((item) => item.key);
      renderWithProvider(
        <VirtualTable
          {...sharedProps}
          {...props}
          selection={{
            selectedRowKeys: allKeys,
            onChange: handleChangeSelection,
          }}
        />,
      );

      const rowSelectionCheckbox = screen.getByTestId(
        'ds-table-batch-selection-button',
      );

      userEvent.click(rowSelectionCheckbox);
      expect(handleChangeSelection).toHaveBeenCalledWith([], []);
    });

    it('should call onChange selection callback with updated selection keys when filtered subset is passed', () => {
      const handleChangeSelection = jest.fn();
      const { dataSource, columns } = props;
      const dataSourceSubset = dataSource.slice(0, 2);
      const expectedKeys = ['4', ...dataSourceSubset.map((item) => item.key)];
      const expectedRows = dataSource.filter((item) =>
        expectedKeys.includes(item.key),
      );

      renderWithProvider(
        <VirtualTable
          {...sharedProps}
          columns={columns}
          dataSource={dataSourceSubset}
          dataSourceFull={dataSource}
          selection={{
            selectedRowKeys: ['4'],
            onChange: handleChangeSelection,
          }}
        />,
      );

      const rowSelectionCheckbox = screen.getByTestId(
        'ds-table-batch-selection-button',
      );

      userEvent.click(rowSelectionCheckbox);
      expect(handleChangeSelection).toHaveBeenCalledWith(
        expectedKeys,
        expectedRows,
      );
    });

    it('should call onChange selection callback with updated selection keys when filtered subset is NOT passed', () => {
      const handleChangeSelection = jest.fn();
      const { dataSource, columns } = props;
      const dataSourceSubset = dataSource.slice(0, 2);
      const expectedKeys = dataSourceSubset.map((item) => item.key);

      renderWithProvider(
        <VirtualTable
          {...sharedProps}
          columns={columns}
          dataSource={dataSourceSubset}
          selection={{
            selectedRowKeys: ['4'],
            onChange: handleChangeSelection,
          }}
        />,
      );

      const rowSelectionCheckbox = screen.getByTestId(
        'ds-table-batch-selection-button',
      );

      userEvent.click(rowSelectionCheckbox);
      expect(handleChangeSelection).toHaveBeenCalledWith(
        expectedKeys,
        dataSourceSubset,
      );
    });
  });
});
