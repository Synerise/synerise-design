import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
import Radio from '@synerise/ds-radio';
import { fireEvent } from '@testing-library/react';

import List from '../index';

describe('List', () => {
  const defaultData = [['Option A', 'Option B']];

  it('should render basic list', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <List dataSource={defaultData} renderItem={(item): React.ReactNode => <List.Item>{item}</List.Item>} />
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
      />
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
      />
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
      />
    );

    // ACT
    fireEvent.click(getByText('Action A'));

    // ASSERT
    expect(getByText('Action A')).toBeTruthy();
    expect(onActionClick).toHaveBeenCalled();
  });

  it('should render wrapped radio group', () => {
    // ARRANGE
    const data = [[{ label: 'Country', value: 'country' }, { label: 'Address', value: 'address' }]];

    const { container } = renderWithProvider(
      <List
        dataSource={data}
        radio
        options={{ defaultValue: 'A' }}
        renderItem={(item): React.ReactNode => <Radio value={item.value}>{item.label}</Radio>}
      />
    );

    // ASSERT
    expect(container.querySelectorAll('.ant-radio-group')).toHaveLength(1);
  });
});
