import React from 'react';

import Radio from '@synerise/ds-radio';
import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent } from '@testing-library/react';

import { isNestedArray } from '../List';
import List from '../index';

describe('List', () => {
  const defaultData = [['Option A', 'Option B']];

  it('should render basic list', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <List
        dataSource={defaultData}
        renderItem={(item): React.ReactNode => (
          <List.Item size="small">{item}</List.Item>
        )}
      />,
    );

    // ASSERT
    expect(getByText('Option A')).toBeTruthy();
    expect(getByText('Option B')).toBeTruthy();
  });

  it('should render header', () => {
    // ARRANGE
    const HEADER_TEXT = 'header text';
    const { getByText } = renderWithProvider(
      <List
        dataSource={defaultData}
        header={HEADER_TEXT}
        renderItem={(item): React.ReactNode => <List.Item>{item}</List.Item>}
      />,
    );

    // ASSERT
    expect(getByText(HEADER_TEXT)).toBeTruthy();
  });

  it('should render multilevel list', () => {
    // ARRANGE
    const HEADER_TEXT = 'header text';
    const data = [['Option A'], ['Option B']];

    const { getByText, getAllByText, getAllByRole } = renderWithProvider(
      <List
        dataSource={data}
        header={HEADER_TEXT}
        renderItem={(item): React.ReactNode => <List.Item>{item}</List.Item>}
      />,
    );

    // ASSERT
    expect(getAllByText(HEADER_TEXT)).toHaveLength(1);
    expect(getByText('Option A')).toBeTruthy();
    expect(getByText('Option B')).toBeTruthy();
    expect(getAllByRole('separator')).toHaveLength(1);
  });

  it('should render and handle actions', () => {
    // ARRANGE
    const onActionClick = vi.fn();
    const data = [['Option A']];

    const { getByText } = renderWithProvider(
      <List
        dataSource={data}
        renderItem={(item): React.ReactNode => (
          <List.Item
            actions={
              <div>
                <button onClick={onActionClick} type="button">
                  Action A
                </button>
              </div>
            }
          >
            {item}
          </List.Item>
        )}
      />,
    );

    // ACT
    fireEvent.click(getByText('Action A'));

    // ASSERT
    expect(getByText('Action A')).toBeTruthy();
    expect(onActionClick).toHaveBeenCalled();
  });

  it('should render wrapped radio group', () => {
    // ARRANGE
    const data = [
      [
        { label: 'Country', value: 'country' },
        { label: 'Address', value: 'address' },
      ],
    ];

    const { container } = renderWithProvider(
      <List
        dataSource={data}
        radio
        options={{ defaultValue: 'A' }}
        renderItem={(item: {
          value: string;
          label: string | React.ReactNode;
        }): React.ReactNode => <Radio value={item.value}>{item.label}</Radio>}
      />,
    );

    // ASSERT
    expect(container.querySelectorAll('.ant-radio-group')).toHaveLength(1);
  });

  it('should render basic medium size list', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <List
        dataSource={defaultData}
        renderItem={(item): React.ReactNode => (
          <List.Item size="medium">{item}</List.Item>
        )}
      />,
    );

    // ASSERT
    expect(container.querySelector('.ant-list-items > li')).toHaveStyle(
      'padding: 12px 12px 12px 16px',
    );
  });

  it('should render a loader instead of items when loading', () => {
    // ARRANGE
    const { container, queryByText } = renderWithProvider(
      <List
        loading
        dataSource={defaultData}
        renderItem={(item): React.ReactNode => <List.Item>{item}</List.Item>}
      />,
    );

    // ASSERT
    expect(container.querySelector('.ds-list-loading')).toBeTruthy();
    expect(container.querySelector('.ant-list-items')).toBeFalsy();
    expect(queryByText('Option A')).toBeNull();
  });

  it('should key items via a rowKey function', () => {
    // ARRANGE
    const rowKey = vi.fn((item: { id: string }): string => item.id);

    // ACT
    renderWithProvider(
      <List
        dataSource={[[{ id: 'a' }, { id: 'b' }]]}
        rowKey={rowKey}
        renderItem={(item): React.ReactNode => <List.Item>{item.id}</List.Item>}
      />,
    );

    // ASSERT
    expect(rowKey).toHaveBeenCalledWith({ id: 'a' });
    expect(rowKey).toHaveBeenCalledWith({ id: 'b' });
  });

  it('should render the loadMore node after the items', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <List
        dataSource={[['Option A']]}
        loadMore={
          <button type="button">Load more</button>
        }
        renderItem={(item): React.ReactNode => <List.Item>{item}</List.Item>}
      />,
    );

    // ASSERT
    expect(getByText('Load more')).toBeTruthy();
  });

  it('should apply the bordered class hook', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <List
        bordered
        dataSource={[['Option A']]}
        renderItem={(item): React.ReactNode => <List.Item>{item}</List.Item>}
      />,
    );

    // ASSERT
    expect(container.querySelector('.ant-list-bordered')).toBeTruthy();
  });

  it('should emit antd size class hooks', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <List
        size="large"
        dataSource={[['Option A']]}
        renderItem={(item): React.ReactNode => <List.Item>{item}</List.Item>}
      />,
    );

    // ASSERT
    expect(container.querySelector('.ant-list-lg')).toBeTruthy();
    expect(container.querySelector('.ant-list-large')).toBeFalsy();
  });

  it('should render no built-in empty state when there are no items', () => {
    // ARRANGE
    const { container, queryByText } = renderWithProvider(
      <List
        dataSource={[] as string[]}
        renderItem={(item): React.ReactNode => <List.Item>{item}</List.Item>}
      />,
    );

    // ASSERT
    expect(container.querySelector('.ant-list-items')).toBeFalsy();
    expect(queryByText(/no data/i)).toBeNull();
  });

  it('should render children when no renderItem is provided', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <List dataSource={[] as string[]}>
        <div>Custom empty state</div>
      </List>,
    );

    // ASSERT
    expect(getByText('Custom empty state')).toBeTruthy();
  });

  it('should forward data, aria and native attributes to the root', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <List
        data-testid="my-list"
        id="folders"
        aria-label="Folders"
        role="list"
        dataSource={[['Option A']]}
        renderItem={(item): React.ReactNode => <List.Item>{item}</List.Item>}
      />,
    );

    // ASSERT
    const root = container.querySelector('[data-testid="my-list"]');
    expect(root).toBeTruthy();
    expect(root?.id).toBe('folders');
    expect(root?.getAttribute('aria-label')).toBe('Folders');
    expect(root?.getAttribute('role')).toBe('list');
    expect(root?.classList.contains('ant-list')).toBe(true);
  });

  it('should recognize if dataSource is nested or not', () => {
    // ARRANGE
    const nested = [
      [
        { label: 'Country', value: 'country' },
        { label: 'Address', value: 'address' },
      ],
    ];
    const flat = [
      { label: 'Country', value: 'country' },
      { label: 'Address', value: 'address' },
    ];
    const nestedEmpty = [[]];
    const flatEmpty: object[] = [];
    // ACT & ASSERT
    expect(isNestedArray(nested)).toBe(true);
    expect(isNestedArray(flat)).toBe(false);
    expect(isNestedArray(nestedEmpty)).toBe(true);
    expect(isNestedArray(flatEmpty)).toBe(false);
  });
});
