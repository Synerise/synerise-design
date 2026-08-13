import React, { useCallback, useState } from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { act, fireEvent, screen } from '@testing-library/react';

import Autocomplete from '../index';

const { Option } = Autocomplete;
const FIRST_OPTION = 'First option';
const LABEL = 'label';
const DESC = 'desc';
const ERROR = 'error';
const RED = 'red';
const COLORS = ['red', 'green', 'blue'];
const toOption = (value: string) => ({ value });

const originalOffsetHeight = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'offsetHeight',
);
const originalOffsetWidth = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'offsetWidth',
);

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    value: 500,
  });
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    value: 500,
  });
});

afterAll(() => {
  originalOffsetHeight &&
    Object.defineProperty(
      HTMLElement.prototype,
      'offsetHeight',
      originalOffsetHeight,
    );
  originalOffsetWidth &&
    Object.defineProperty(
      HTMLElement.prototype,
      'offsetWidth',
      originalOffsetWidth,
    );
});

describe('Autocomplete', () => {
  it('should render label, description and error', () => {
    renderWithProvider(
      <Autocomplete
        open
        value="first"
        label={LABEL}
        description={DESC}
        errorText={ERROR}
      >
        <Option value="first">{FIRST_OPTION}</Option>
      </Autocomplete>,
    );

    expect(screen.getByText(LABEL)).toBeTruthy();
    expect(screen.getByText(DESC)).toBeTruthy();
    expect(screen.getByText(ERROR)).toBeTruthy();
    expect(screen.getByRole('combobox')).toBeTruthy();
  });

  it('should render options from Option children when open', () => {
    renderWithProvider(
      <Autocomplete open value="">
        {COLORS.map((color) => (
          <Option key={color} value={color}>
            {color}
          </Option>
        ))}
      </Autocomplete>,
    );

    const options = screen.getAllByTestId('autocomplete-option');
    expect(options).toHaveLength(COLORS.length);
  });

  it('should open dropdown on input focus', () => {
    const onDropdownVisibleChange = vi.fn();
    renderWithProvider(
      <Autocomplete
        onDropdownVisibleChange={onDropdownVisibleChange}
        value="first"
        label={LABEL}
      >
        <Option value="first">{FIRST_OPTION}</Option>
      </Autocomplete>,
    );
    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    expect(onDropdownVisibleChange).toHaveBeenCalledWith(true);
  });

  it('should open the dropdown when the input is clicked', () => {
    const onDropdownVisibleChange = vi.fn();
    renderWithProvider(
      <Autocomplete
        onDropdownVisibleChange={onDropdownVisibleChange}
        value="first"
        label={LABEL}
      >
        <Option value="first">{FIRST_OPTION}</Option>
      </Autocomplete>,
    );
    const input = screen.getByRole('combobox');
    fireEvent.click(input);
    expect(onDropdownVisibleChange).toHaveBeenCalledWith(true);
  });

  it('should not toggle the dropdown shut when clicking an already-open input', () => {
    const onDropdownVisibleChange = vi.fn();
    renderWithProvider(
      <Autocomplete
        onDropdownVisibleChange={onDropdownVisibleChange}
        value="first"
        label={LABEL}
      >
        <Option value="first">{FIRST_OPTION}</Option>
      </Autocomplete>,
    );
    const input = screen.getByRole('combobox');
    // Focus opens the dropdown; the click that accompanies it (or a later click
    // on the focused input) must not toggle it closed — this was the open/close
    // flicker on re-click.
    fireEvent.focus(input);
    onDropdownVisibleChange.mockClear();
    fireEvent.click(input);
    expect(onDropdownVisibleChange).not.toHaveBeenCalledWith(false);
  });

  it('should render readonly and not open the dropdown', () => {
    const onDropdownVisibleChange = vi.fn();
    renderWithProvider(
      <Autocomplete
        onDropdownVisibleChange={onDropdownVisibleChange}
        readOnly
        value="first"
        label={LABEL}
      >
        <Option value="first">{FIRST_OPTION}</Option>
      </Autocomplete>,
    );
    const input = screen.getByRole('combobox');
    expect(input).toBeDisabled();
    fireEvent.focus(input);
    expect(onDropdownVisibleChange).not.toHaveBeenCalled();
  });

  it('should call onSearch and onChange on keystroke', () => {
    const onChange = vi.fn();
    const onSearch = vi.fn();

    renderWithProvider(
      <Autocomplete value="red" onChange={onChange} onSearch={onSearch}>
        {COLORS.map((color) => (
          <Option key={color} value={color}>
            {color}
          </Option>
        ))}
      </Autocomplete>,
    );
    const input = screen.getByRole('combobox');

    fireEvent.change(input, { target: { value: 'test' } });
    expect(onSearch).toHaveBeenCalledWith('test');
    expect(onChange).toHaveBeenCalledWith('test');
  });

  it('should call onSelect and onChange when an option is clicked', () => {
    const onChange = vi.fn();
    const onSelect = vi.fn();

    renderWithProvider(
      <Autocomplete open value="" onChange={onChange} onSelect={onSelect}>
        {COLORS.map((color) => (
          <Option key={color} value={color}>
            {color}
          </Option>
        ))}
      </Autocomplete>,
    );

    const lastOption = screen.getAllByTestId('autocomplete-option').pop();
    fireEvent.click(lastOption as HTMLElement);
    expect(onSelect).toHaveBeenCalledWith('blue');
    expect(onChange).toHaveBeenCalledWith('blue');
  });

  it('should clear input value when the clear button is clicked', () => {
    const onChange = vi.fn();

    renderWithProvider(
      <Autocomplete allowClear value={RED} onChange={onChange}>
        {COLORS.map((color) => (
          <Option key={color} value={color}>
            {color}
          </Option>
        ))}
      </Autocomplete>,
    );

    const clearBtn = screen.getByTestId('autocomplete-clear');
    expect(clearBtn).toBeTruthy();
    fireEvent.click(clearBtn);
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('should render the placeholder', () => {
    renderWithProvider(<Autocomplete placeholder="type here" />);
    expect(screen.getByPlaceholderText('type here')).toBeTruthy();
  });

  it('should render notFoundContent when there are no options', () => {
    renderWithProvider(
      <Autocomplete open value="" notFoundContent="No data" options={[]} />,
    );
    expect(screen.getByTestId('autocomplete-not-found')).toHaveTextContent(
      'No data',
    );
  });

  it('should keep the overlay unmounted when open with nothing to show', () => {
    renderWithProvider(<Autocomplete open value="" options={[]} />);
    expect(screen.queryByTestId('autocomplete-option')).toBeNull();
    expect(screen.queryByTestId('autocomplete-not-found')).toBeNull();
  });

  it('should let the options prop win over Option children', () => {
    renderWithProvider(
      <Autocomplete open value="" options={[{ value: RED }]}>
        <Option value="green">green</Option>
        <Option value="blue">blue</Option>
      </Autocomplete>,
    );

    const options = screen.getAllByTestId('autocomplete-option');
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent(RED);
  });
});

describe('Autocomplete — option extraction from children', () => {
  it('should read options wrapped in a fragment', () => {
    renderWithProvider(
      <Autocomplete open value="">
        <>
          {COLORS.map((color) => (
            <Option key={color} value={color}>
              {color}
            </Option>
          ))}
        </>
      </Autocomplete>,
    );

    expect(screen.getAllByTestId('autocomplete-option')).toHaveLength(
      COLORS.length,
    );
  });

  it('should read options coming from a second copy of the package', () => {
    // A duplicate module instance in a consumer bundle yields a different function
    // object, which reference equality alone would silently drop.
    const DuplicateOption = (_props: {
      value: string;
      children?: React.ReactNode;
    }): null => null;
    DuplicateOption.displayName = 'Autocomplete.Option';

    renderWithProvider(
      <Autocomplete open value="">
        {COLORS.map((color) => (
          <DuplicateOption key={color} value={color}>
            {color}
          </DuplicateOption>
        ))}
      </Autocomplete>,
    );

    expect(screen.getAllByTestId('autocomplete-option')).toHaveLength(
      COLORS.length,
    );
  });

  it('should fall back to the key when an option declares no value', () => {
    const onSelect = vi.fn();
    renderWithProvider(
      <Autocomplete open value="" onSelect={onSelect}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Option key={RED} {...({} as any)}>
          {RED}
        </Option>
      </Autocomplete>,
    );

    fireEvent.click(screen.getByTestId('autocomplete-option'));
    expect(onSelect).toHaveBeenCalledWith(RED);
  });

  it('should ignore children that are not options', () => {
    renderWithProvider(
      <Autocomplete open value="">
        <div>not an option</div>
        <Option value={RED}>{RED}</Option>
      </Autocomplete>,
    );

    expect(screen.getAllByTestId('autocomplete-option')).toHaveLength(1);
  });
});

describe('Autocomplete — filterOption', () => {
  it('should narrow options against the input value when enabled', () => {
    renderWithProvider(
      <Autocomplete
        open
        value={RED}
        filterOption
        options={COLORS.map(toOption)}
      />,
    );

    const options = screen.getAllByTestId('autocomplete-option');
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent(RED);
  });

  it('should use a custom predicate when given one', () => {
    renderWithProvider(
      <Autocomplete
        open
        value="anything"
        filterOption={(_input, option) => option.value !== RED}
        options={COLORS.map(toOption)}
      />,
    );

    expect(screen.getAllByTestId('autocomplete-option')).toHaveLength(
      COLORS.length - 1,
    );
  });

  it('should render every option when filtering is off', () => {
    renderWithProvider(
      <Autocomplete open value="zzz" options={COLORS.map(toOption)} />,
    );

    expect(screen.getAllByTestId('autocomplete-option')).toHaveLength(
      COLORS.length,
    );
  });
});

/**
 * The server-side search shape that regressed: visibility is uncontrolled, `value` is
 * controlled by the parent, and the options are fetched per keystroke — the request
 * empties the previous result set and the response refills it. Every other test in this
 * file forces `open`, which hides the interaction between the `hasDropdownContent` gate
 * and ds-dropdown's open-state echo.
 */
type SearchHandle = { respond: () => void };

const AsyncSearch = ({
  handle,
  results,
}: {
  handle: SearchHandle;
  results: string[];
}): JSX.Element => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<string[]>([]);

  const handleChange = useCallback(
    (nextValue: string) => {
      setValue(nextValue);
      setOptions([]);
      handle.respond = () => setOptions(results);
    },
    [handle, results],
  );

  return (
    <Autocomplete value={value} onChange={handleChange}>
      {value !== '' &&
        options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
    </Autocomplete>
  );
};

describe('Autocomplete — asynchronous suggestions', () => {
  // Real round-trips outlast the dropdown's 150ms exit transition, so the panel genuinely
  // unmounts in the gap between request and response. Waiting here reproduces that;
  // responding synchronously would leave it mounted and hide the bug.
  const typeAndRespond = async (
    input: HTMLElement,
    handle: SearchHandle,
    query: string,
  ) => {
    fireEvent.change(input, { target: { value: query } });
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 250);
      });
    });
    act(() => handle.respond());
  };

  it('should show options that arrive after each keystroke', async () => {
    const handle: SearchHandle = { respond: () => undefined };
    renderWithProvider(<AsyncSearch handle={handle} results={COLORS} />);

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);

    await typeAndRespond(input, handle, 'r');
    expect(screen.getAllByTestId('autocomplete-option')).toHaveLength(
      COLORS.length,
    );

    // The second keystroke empties the list before the response refills it. The panel
    // must reopen — this is where the production regression latched it shut for good.
    await typeAndRespond(input, handle, 're');
    expect(screen.getAllByTestId('autocomplete-option')).toHaveLength(
      COLORS.length,
    );

    await typeAndRespond(input, handle, 'red');
    expect(screen.getAllByTestId('autocomplete-option')).toHaveLength(
      COLORS.length,
    );
  });

  it('should stay dismissable while suggestions are showing', async () => {
    const handle: SearchHandle = { respond: () => undefined };
    renderWithProvider(<AsyncSearch handle={handle} results={COLORS} />);

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    await typeAndRespond(input, handle, 'r');
    expect(screen.getAllByTestId('autocomplete-option')).toHaveLength(
      COLORS.length,
    );

    // A real dismissal disagrees with the `open` we passed down, so it must survive the
    // echo filter that the fix above installs. Escape is covered by the
    // `EscapeDismissesThePanel` story — jsdom does not deliver floating-ui's escape
    // handling, so it cannot be asserted here.
    fireEvent.pointerDown(document.body);
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 250);
      });
    });
    expect(screen.queryAllByTestId('autocomplete-option')).toHaveLength(0);
  });
});
