import React from 'react';

import Radio from '@synerise/ds-radio';
import { renderWithProvider } from '@synerise/ds-utils';
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
    const onActionClick = jest.fn();
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
