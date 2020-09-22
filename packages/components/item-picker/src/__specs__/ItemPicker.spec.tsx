import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { LaptopM, MobileM, UserM } from '@synerise/ds-icon/dist/icons';
import Avatar from '@synerise/ds-avatar';
import DSFlag from '@synerise/ds-flag';
import ItemPicker from '../ItemPicker';
import { ItemPickerProps, ItemPickerSize } from '../ItemPicker.types';
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

const ITEM_PICKER = (
  props: Omit<
    ItemPickerProps,
    'dataSource' | 'placeholder' | 'clear' | 'searchPlaceholder' | 'clearConfirmTitle' | 'yesText' | 'noText' | 'intl'
  > & { size?: ItemPickerSize }
) => {
  return (
    <ItemPicker
      dataSource={DATA_SOURCE}
      size={'small'}
      placeholder={PLACEHOLDER}
      clear={REMOVE}
      searchPlaceholder={SEARCH_PLACEHOLDER}
      clearConfirmTitle={'Are you sure to remove this selection?'}
      yesText={'Yes'}
      noText={'No'}
      {...props}
    />
  );
};

describe('ItemPicker component', () => {
  it('should render with placeholder', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    const { getByText } = renderWithProvider(<ITEM_PICKER onClear={handleClear} onChange={handleChange} />);

    expect(getByText(PLACEHOLDER)).toBeTruthy();
  });

  it('should render with placeholderIcon', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    const { getByTestId } = renderWithProvider(
      <ITEM_PICKER
        onClear={handleClear}
        onChange={handleChange}
        description={DESCRIPTION}
        placeholderIcon={<Icon component={<UserM />} />}
      />
    );

    expect(getByTestId(PLACEHOLDER_ICON_TEST_ID)).toBeTruthy();
  });

  it('should render with label', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    const { getByText } = renderWithProvider(
      <ITEM_PICKER onClear={handleClear} onChange={handleChange} label={LABEL} />
    );

    expect(getByText(LABEL)).toBeTruthy();
  });

  it('should render with description', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    const { getByText } = renderWithProvider(
      <ITEM_PICKER onClear={handleClear} onChange={handleChange} description={DESCRIPTION} />
    );

    expect(getByText(DESCRIPTION)).toBeTruthy();
  });

  it('should render with AngleDown icon', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    const { getByTestId } = renderWithProvider(
      <ITEM_PICKER onClear={handleClear} onChange={handleChange} description={DESCRIPTION} />
    );

    expect(getByTestId(ANGLE_DOWN_TEST_ID)).toBeTruthy();
  });

  it('should render without AngleDown icon', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    const { queryByTestId } = renderWithProvider(
      <ITEM_PICKER onClear={handleClear} onChange={handleChange} description={DESCRIPTION} size="large" />
    );

    expect(queryByTestId(ANGLE_DOWN_TEST_ID)).toBeFalsy();
  });

  it('should render with error', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    const { getByText } = renderWithProvider(
      <ITEM_PICKER
        onClear={handleClear}
        onChange={handleChange}
        description={DESCRIPTION}
        error
        errorMessage={ERROR_MESSAGE}
      />
    );

    expect(getByText(ERROR_MESSAGE)).toBeTruthy();
  });

  it('should render as disabled', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    const { container } = renderWithProvider(
      <ITEM_PICKER onClear={handleClear} onChange={handleChange} description={DESCRIPTION} disabled />
    );

    expect(container.querySelectorAll('[disabled]').length).toBe(2);
  });

  it('should render with selected item', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    const { getByText } = renderWithProvider(
      <ITEM_PICKER
        onClear={handleClear}
        onChange={handleChange}
        description={DESCRIPTION}
        selectedItem={DATA_SOURCE[0]}
      />
    );

    expect(getByText(DATA_SOURCE[0].text)).toBeTruthy();
  });

  it('should render selected item with prefixel', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    const { queryByTestId } = renderWithProvider(
      <ITEM_PICKER
        onClear={handleClear}
        onChange={handleChange}
        description={DESCRIPTION}
        selectedItem={DATA_SOURCE[0]}
      />
    );

    expect(queryByTestId(PREFIXEL_TEST_ID)).toBeTruthy();
  });

  it('should render selected item without prefixel', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    const { queryByTestId } = renderWithProvider(
      <ITEM_PICKER
        onClear={handleClear}
        onChange={handleChange}
        description={DESCRIPTION}
        selectedItem={DATA_SOURCE[5]}
      />
    );

    expect(queryByTestId(PREFIXEL_TEST_ID)).toBeFalsy;
  });

  it('should render with clear icon', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    const { getByTestId } = renderWithProvider(
      <ITEM_PICKER
        onClear={handleClear}
        onChange={handleChange}
        description={DESCRIPTION}
        selectedItem={DATA_SOURCE[0]}
      />
    );

    expect(getByTestId(CLEAR_TEST_ID)).toBeTruthy();
  });

  it('should render without custom change button', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    const { queryByTestId } = renderWithProvider(
      <ITEM_PICKER
        onClear={handleClear}
        onChange={handleChange}
        description={DESCRIPTION}
        selectedItem={DATA_SOURCE[0]}
        size="large"
        changeButtonLabel={CHANGE_BUTTON_LABEL}
        withClearConfirmation
      />
    );

    expect(queryByTestId(CHANGE_BUTTON_LABEL)).toBeFalsy();
  });

  it('should render with custom change button', () => {
    const handleClear = jest.fn();
    const handleChange = jest.fn();

    const { getByText } = renderWithProvider(
      <ITEM_PICKER
        onClear={handleClear}
        onChange={handleChange}
        description={DESCRIPTION}
        selectedItem={DATA_SOURCE[0]}
        size="large"
        changeButtonLabel={CHANGE_BUTTON_LABEL}
      />
    );

    expect(getByText(CHANGE_BUTTON_LABEL)).toBeTruthy();
  });
});
