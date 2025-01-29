import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent, waitFor, screen } from '@testing-library/react';
import Select from '../Select';

const { Option } = Select;

describe('Select', () => {
  it('should render', () => {
    renderWithProvider(
      <Select defaultValue="lucy" disabled>
        <Option value="lucy">Lucy</Option>
      </Select>
    );

    expect(screen.getByText('Lucy')).toBeTruthy();
  });

  it('change selected item when unselected is clicked', async () => {
    const options = [
      { value: 'red', label: 'Red' },
      { value: 'green', label: 'Green' },
    ];
    renderWithProvider(
      <Select open data-testid="select" defaultValue="red">
        {options.map(o => (
          <Option key={o.value} value={o.value}>
            {o.label}
          </Option>
        ))}
      </Select>
    );

    const select = await waitFor(() => screen.getByTestId('select') as HTMLSelectElement);
    const selectedOption = select.querySelector('.ant-select-selection-item');
    expect(selectedOption && selectedOption.textContent).toBe('Red');
    fireEvent.click(select);
    const unselectedOption = await waitFor(() => screen.getByText('Green'));
    fireEvent.click(unselectedOption);
    expect(selectedOption && selectedOption.textContent).toBe('Green');
  });

  it('handle clicking multiple mode', async () => {
    const onChange = jest.fn();
    const children: JSX.Element[] = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    renderWithProvider(
      <Select
        open
        data-testid="select-multiple"
        mode="multiple"
        placeholder="Please select"
        defaultValue="a10"
        onChange={onChange}
      >
        {children}
      </Select>
    );

    const select = screen.getByTestId('select-multiple') as HTMLSelectElement;
    const selectedOption = await waitFor(() => screen.getAllByText('a10'));
    expect(selectedOption[0].textContent).toBe('a10');
    fireEvent.click(select);
    const unselectedOption = await waitFor(() => screen.getAllByText('b11'));
    fireEvent.click(unselectedOption[0]);
    const selectedOptions = document.querySelectorAll('div[aria-selected="true"]');
    expect(selectedOptions.length).toBe(2);
  });

  it('should show label', () => {
    const LABEL = 'label';
    renderWithProvider(<Select label={LABEL} />);

    expect(screen.getByText(LABEL)).toBeTruthy();
  });

  it('should show errorText', () => {
    const ERROR = 'error';
    renderWithProvider(<Select errorText={ERROR} />);

    expect(screen.getByText(ERROR)).toBeTruthy();
  });

  it('should show description', () => {
    const DESC = 'label';
    renderWithProvider(<Select description={DESC} />);

    expect(screen.getByText(DESC)).toBeTruthy();
  });

  it.only('should be empty', async () => {
    renderWithProvider(<Select open />);

    const noDataElem = await screen.findByText('No data');
    expect(noDataElem).toBeTruthy();
  });

  it('should render label with tooltip icon', () => {
    const TOOLTIP = 'Tooltip title';
    const LABEL = 'Label';
    renderWithProvider(<Select label={LABEL} tooltip={TOOLTIP} />);

    expect(screen.getByText(LABEL)).toBeTruthy();
    expect(document.querySelector('.ds-icon > .info-fill-s')).toBeTruthy();
  });
});
