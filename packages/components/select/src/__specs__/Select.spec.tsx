import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent } from '@testing-library/react';
import Select from '../index';

const { Option } = Select;

describe('Select', () => {
  it('should render', () => {
    const { getByText } = renderWithProvider(
      <Select defaultValue="lucy" disabled>
        <Option value="lucy">Lucy</Option>
      </Select>
    );

    expect(getByText('Lucy')).toBeTruthy();
  });

  it('change selected item when unselected is clicked', () => {
    const options = [{ value: 'red', label: 'Red' }, { value: 'green', label: 'Green' }];
    const { getByTestId, getByText } = renderWithProvider(
      <Select data-testid="select" defaultValue="red">
        {options.map(o => (
          <Option key={o.value} value={o.value}>
            {o.label}
          </Option>
        ))}
      </Select>
    );

    const select = getByTestId('select') as HTMLSelectElement;
    const selectedOption = select.querySelector('.ant-select-selection-selected-value');
    expect(selectedOption.textContent).toBe('Red');
    fireEvent.click(select);
    const unselectedOption = getByText('Green');
    fireEvent.click(unselectedOption);
    expect(selectedOption.textContent).toBe('Green');
  });

  it('handle clicking multiple mode', () => {
    const onChange = jest.fn();
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    const { getByTestId, getByText } = renderWithProvider(
      <Select
        data-testid="select-multiple"
        mode="multiple"
        placeholder="Please select"
        defaultValue="a10"
        onChange={onChange}
      >
        {children}
      </Select>
    );

    const select = getByTestId('select-multiple') as HTMLSelectElement;
    const selectedOption = getByText('a10');
    expect(selectedOption.textContent).toBe('a10');
    fireEvent.click(select);
    const unselectedOption = getByText('b11');
    fireEvent.click(unselectedOption);
    const selectedOptions = select.querySelectorAll('.ant-select-selection__choice');
    expect(selectedOptions.length).toBe(2);
  });

  it('should show label', () => {
    const LABEL = 'label';
    const { getByText } = renderWithProvider(<Select label={LABEL} />);

    expect(getByText(LABEL)).toBeTruthy();
  });

  it('should show errorText', () => {
    const ERROR = 'error';
    const { getByText } = renderWithProvider(<Select errorText={ERROR} />);

    expect(getByText(ERROR)).toBeTruthy();
  });

  it('should show description', () => {
    const DESC = 'label';
    const { getByText } = renderWithProvider(<Select description={DESC} />);

    expect(getByText(DESC)).toBeTruthy();
  });
});
