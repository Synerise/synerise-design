import React, { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { screen, fireEvent } from '@testing-library/react';
import Icon, { LaptopM, MobileM, UserM } from '@synerise/ds-icon';
import Avatar from '@synerise/ds-avatar';
import DSFlag from '@synerise/ds-flag';

import ItemPicker from './ItemPickerLegacy';
import renderWithProvider from '@synerise/ds-utils/dist/testing/renderWithProvider/renderWithProvider';

const imgSrc = 'https://www.w3schools.com/howto/img_avatar.png';

const DATA_SOURCE = [
  {
    text: 'iPhone R',
    prefixel: <Icon component={<MobileM />} />,
  },
  {
    text: 'iPhone X',
    prefixel: (
      <Avatar src={imgSrc} size="small">
        M
      </Avatar>
    ),
  },
  {
    text: 'MacBook Pro 15',
    prefixel: <DSFlag country="US" />,
  },
  {
    text: 'MacBook Air 13',
    prefixel: (
      <Avatar size="small" shape="square" backgroundColor="green">
        E
      </Avatar>
    ),
  },
  {
    text: 'Macbook Pro 15',
    prefixel: <Icon component={<LaptopM />} />,
  },
  {
    text: 'iPad Air 3',
  },
];

const SEARCH_PLACEHOLDER = 'Search';
const LABEL = 'Label';
const DESCRIPTION = 'Description';
const PLACEHOLDER = 'Set customer';
const REMOVE = 'Remove';
const ERROR_MESSAGE = 'Error';
const CHANGE_BUTTON_LABEL = 'Change';
const PLACEHOLDER_ICON_TEST_ID = 'placeholder-icon';
const CLEAR_TEST_ID = 'clear-icon';
const ANGLE_DOWN_TEST_ID = 'angle-icon';
const PREFIXEL_TEST_ID = 'value-prefixel';
const BOTTOM_ACTION_LABEL = 'Bottom action label';

const IntlWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <IntlProvider locale="en-US">
      <div>intl2</div>
      {children}
    </IntlProvider>
  );
};

const SHARED_PROPS = {
  dataSource: DATA_SOURCE,
  size: 'small' as const,
  placeholder: PLACEHOLDER,
  clear: REMOVE,
  searchPlaceholder: SEARCH_PLACEHOLDER,
  clearConfirmTitle: 'Are you sure to remove this selection?',
  yesText: 'Yes',
  noText: 'No',
};

describe('ItemPicker component', () => {
  it('should render with placeholder', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    renderWithProvider(
      <IntlWrapper>
        <ItemPicker {...SHARED_PROPS} onClear={handleClear} onChange={handleChange} />
      </IntlWrapper>
    );

    expect(screen.getByText(PLACEHOLDER)).toBeTruthy();
  });

  it('should render with placeholderIcon', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    renderWithProvider(
      <IntlWrapper>
        <ItemPicker
          {...SHARED_PROPS}
          onClear={handleClear}
          onChange={handleChange}
          description={DESCRIPTION}
          placeholderIcon={<Icon component={<UserM />} />}
        />
      </IntlWrapper>
    );

    expect(screen.getByTestId(PLACEHOLDER_ICON_TEST_ID)).toBeTruthy();
  });

  it('should render with label', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    renderWithProvider(
      <IntlWrapper>
        <ItemPicker {...SHARED_PROPS} onClear={handleClear} onChange={handleChange} label={LABEL} />
      </IntlWrapper>
    );

    expect(screen.getByText(LABEL)).toBeTruthy();
  });

  it('should render with description', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    renderWithProvider(
      <IntlWrapper>
        <ItemPicker {...SHARED_PROPS} onClear={handleClear} onChange={handleChange} description={DESCRIPTION} />
      </IntlWrapper>
    );

    expect(screen.getByText(DESCRIPTION)).toBeTruthy();
  });

  it('should render with AngleDown icon', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    renderWithProvider(
      <IntlWrapper>
        <ItemPicker {...SHARED_PROPS} onClear={handleClear} onChange={handleChange} description={DESCRIPTION} />
      </IntlWrapper>
    );

    expect(screen.getByTestId(ANGLE_DOWN_TEST_ID)).toBeTruthy();
  });

  it('should render without AngleDown icon', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    renderWithProvider(
      <IntlWrapper>
        <ItemPicker
          {...SHARED_PROPS}
          onClear={handleClear}
          onChange={handleChange}
          description={DESCRIPTION}
          size="large"
        />
      </IntlWrapper>
    );

    expect(screen.queryByTestId(ANGLE_DOWN_TEST_ID)).toBeFalsy();
  });

  it('should render with error', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    renderWithProvider(
      <IntlWrapper>
        <ItemPicker
          {...SHARED_PROPS}
          onClear={handleClear}
          onChange={handleChange}
          description={DESCRIPTION}
          error
          errorMessage={ERROR_MESSAGE}
        />
      </IntlWrapper>
    );

    expect(screen.getByText(ERROR_MESSAGE)).toBeTruthy();
  });

  it('should render as disabled', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    const { container } = renderWithProvider(
      <IntlWrapper>
        <ItemPicker
          {...SHARED_PROPS}
          onClear={handleClear}
          onChange={handleChange}
          description={DESCRIPTION}
          disabled
        />
      </IntlWrapper>
    );

    expect(container.querySelectorAll('[disabled]').length).toBe(2);
  });

  it('should render with selected item', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    renderWithProvider(
      <IntlWrapper>
        <ItemPicker
          {...SHARED_PROPS}
          onClear={handleClear}
          onChange={handleChange}
          description={DESCRIPTION}
          selectedItem={DATA_SOURCE[0]}
        />
      </IntlWrapper>
    );

    expect(screen.getByText(DATA_SOURCE[0].text)).toBeTruthy();
  });

  it('should render selected item with prefixel', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    renderWithProvider(
      <IntlWrapper>
        <ItemPicker
          {...SHARED_PROPS}
          onClear={handleClear}
          onChange={handleChange}
          description={DESCRIPTION}
          selectedItem={DATA_SOURCE[0]}
        />
      </IntlWrapper>
    );

    expect(screen.queryByTestId(PREFIXEL_TEST_ID)).toBeTruthy();
  });

  it('should render selected item without prefixel', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    renderWithProvider(
      <IntlWrapper>
        <ItemPicker
          {...SHARED_PROPS}
          onClear={handleClear}
          onChange={handleChange}
          description={DESCRIPTION}
          selectedItem={DATA_SOURCE[5]}
        />
      </IntlWrapper>
    );

    expect(screen.queryByTestId(PREFIXEL_TEST_ID)).toBeFalsy;
  });

  it('should render with clear icon', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    renderWithProvider(
      <IntlWrapper>
        <ItemPicker
          {...SHARED_PROPS}
          onClear={handleClear}
          onChange={handleChange}
          description={DESCRIPTION}
          selectedItem={DATA_SOURCE[0]}
        />
      </IntlWrapper>
    );

    expect(screen.getByTestId(CLEAR_TEST_ID)).toBeTruthy();
  });

  it('should render without clear icon', () => {
    const handleChange = jest.fn();

    renderWithProvider(
      <IntlWrapper>
        <ItemPicker {...SHARED_PROPS} onChange={handleChange} description={DESCRIPTION} selectedItem={DATA_SOURCE[0]} />
      </IntlWrapper>
    );

    expect(screen.queryByTestId(CLEAR_TEST_ID)).toBeFalsy();
  });

  it('should render without custom change button', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    renderWithProvider(
      <IntlWrapper>
        <ItemPicker
          {...SHARED_PROPS}
          onClear={handleClear}
          onChange={handleChange}
          description={DESCRIPTION}
          selectedItem={DATA_SOURCE[0]}
          size="large"
          changeButtonLabel={CHANGE_BUTTON_LABEL}
          withClearConfirmation
        />
      </IntlWrapper>
    );

    expect(screen.queryByTestId(CHANGE_BUTTON_LABEL)).toBeFalsy();
  });

  it('should render with custom change button', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    renderWithProvider(
      <IntlWrapper>
        <ItemPicker
          {...SHARED_PROPS}
          onClear={handleClear}
          onChange={handleChange}
          description={DESCRIPTION}
          selectedItem={DATA_SOURCE[0]}
          size="large"
          changeButtonLabel={CHANGE_BUTTON_LABEL}
        />
      </IntlWrapper>
    );

    expect(screen.getByText(CHANGE_BUTTON_LABEL)).toBeTruthy();
  });

  it('should render with bottom action', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    renderWithProvider(
      <IntlWrapper>
        <ItemPicker
          {...SHARED_PROPS}
          onClear={handleClear}
          onChange={handleChange}
          description={DESCRIPTION}
          selectedItem={DATA_SOURCE[0]}
          size="large"
          changeButtonLabel={CHANGE_BUTTON_LABEL}
          dropdownBottomAction={<span>{BOTTOM_ACTION_LABEL}</span>}
        />
      </IntlWrapper>
    );

    fireEvent.click(screen.getByText(CHANGE_BUTTON_LABEL));

    expect(screen.getByText(BOTTOM_ACTION_LABEL)).toBeTruthy();
  });
  it('should render without search bar', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();
    const { getByText } = renderWithProvider(
      <ItemPicker {...SHARED_PROPS} onClear={handleClear} onChange={handleChange} hideSearchBar  />
    );
    fireEvent.click(getByText(PLACEHOLDER));
    expect(screen.queryByPlaceholderText(SEARCH_PLACEHOLDER)).toBeFalsy();
  });

  it('should render with search bar', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();
    const { getByText } = renderWithProvider(<ItemPicker {...SHARED_PROPS} onClear={handleClear} onChange={handleChange} />);
    fireEvent.click(getByText(PLACEHOLDER));
    expect(screen.queryByPlaceholderText(SEARCH_PLACEHOLDER)).toBeTruthy();
  });
  it.todo('should call onYReachEnd function');
  it.todo('should shows loading state');
  it.todo('should highlight labels based on searchBarProps.value');
});
