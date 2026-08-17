import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent } from '@testing-library/react';

import Radio from '../index';

describe('Radio', () => {
  it('should render', () => {
    // ARRANGE
    const RADIO_LABEL = 'Radio label';
    const { getByText } = renderWithProvider(<Radio>{RADIO_LABEL}</Radio>);

    // ASSERT
    expect(getByText(RADIO_LABEL)).toBeTruthy();
  });

  it('should render description', () => {
    // ARRANGE
    const RADIO_LABEL = 'Radio label';
    const RADIO_DESCRIPTION = 'Radio description';
    const { getByText } = renderWithProvider(
      <Radio description={RADIO_DESCRIPTION}>{RADIO_LABEL}</Radio>,
    );

    // ASSERT
    expect(getByText(RADIO_DESCRIPTION)).toBeTruthy();
  });

  describe('Radio.Group', () => {
    it('should trigger onChange', () => {
      // ARRANGE
      const onChange = vi.fn();
      const RADIO_LABEL_A = 'Radio label A';
      const RADIO_VALUE_A = 'Radio value A';
      const RADIO_LABEL_B = 'Radio label B';
      const RADIO_VALUE_B = 'Radio value B';

      const { getByLabelText } = renderWithProvider(
        <Radio.Group onChange={(e) => onChange(e.target.value)}>
          <Radio value={RADIO_VALUE_A}>{RADIO_LABEL_A}</Radio>
          <Radio value={RADIO_VALUE_B}>{RADIO_LABEL_B}</Radio>
        </Radio.Group>,
      );

      // ACT
      fireEvent.click(getByLabelText(RADIO_LABEL_A));

      // ASSERT
      expect(onChange).toHaveBeenCalledWith(RADIO_VALUE_A);

      // ACT
      fireEvent.click(getByLabelText(RADIO_LABEL_B));

      // ASSERT
      expect(onChange).toHaveBeenCalledWith(RADIO_VALUE_B);
    });

    it('fires group onChange for a Radio.Button with a consumer-managed `checked` prop', () => {
      // Regression: consumers (schemas Relation Data) render a Radio.Button with a consumer-managed
      // `checked` prop inside a group. The group's value must drive the native radio (antd parity) —
      // if the explicit `checked` froze the input as checked, the native `change` would stop firing
      // and the group onChange (the form value) would never update on click.
      const onChange = vi.fn();
      const { getByRole } = renderWithProvider(
        <Radio.Group onChange={(e) => onChange(e.target.value)}>
          <Radio.Button value="x" checked>
            X
          </Radio.Button>
        </Radio.Group>,
      );

      // ACT
      fireEvent.click(getByRole('radio'));

      // ASSERT
      expect(onChange).toHaveBeenCalledWith('x');
    });

    it('fires a child Radio`s own onChange in addition to the group`s', () => {
      // antd calls both handlers; a child inside a group must not have its onChange swallowed.
      const groupChange = vi.fn();
      const childChange = vi.fn();
      const RADIO_LABEL = 'Radio label';

      const { getByLabelText } = renderWithProvider(
        <Radio.Group onChange={(e) => groupChange(e.target.value)}>
          <Radio value="a" onChange={(e) => childChange(e.target.value)}>
            {RADIO_LABEL}
          </Radio>
        </Radio.Group>,
      );

      // ACT
      fireEvent.click(getByLabelText(RADIO_LABEL));

      // ASSERT
      expect(childChange).toHaveBeenCalledWith('a');
      expect(groupChange).toHaveBeenCalledWith('a');
    });

    it.each([
      ['Radio', Radio],
      ['Radio.Button', Radio.Button],
    ])(
      'calls a %s`s own onChange before the group`s (antd order)',
      (_name, Child) => {
        // Consumers relying on last-writer-wins between the two handlers break if this flips:
        // the group's write must land last.
        const calls: string[] = [];
        const { getByRole } = renderWithProvider(
          <Radio.Group onChange={() => calls.push('group')}>
            <Child value="a" onChange={() => calls.push('child')}>
              Label
            </Child>
          </Radio.Group>,
        );

        // ACT
        fireEvent.click(getByRole('radio'));

        // ASSERT
        expect(calls).toEqual(['child', 'group']);
      },
    );

    it('forwards id, focus/mouse handlers and data-*/aria-* to the wrapper', () => {
      // antd wired these onto the group wrapper; consumers spread a form field bag onto the group
      // and rely on onBlur to mark the field touched.
      const onBlur = vi.fn();
      const onFocus = vi.fn();

      const { container } = renderWithProvider(
        <Radio.Group
          id="mode-group"
          role="radiogroup"
          aria-label="Mode"
          data-attr="modeGroup"
          onBlur={onBlur}
          onFocus={onFocus}
        >
          <Radio value="a">A</Radio>
        </Radio.Group>,
      );
      const wrapper = container.querySelector('.ds-radio-group') as HTMLElement;

      // ASSERT
      expect(wrapper.id).toBe('mode-group');
      expect(wrapper.getAttribute('role')).toBe('radiogroup');
      expect(wrapper.getAttribute('aria-label')).toBe('Mode');
      expect(wrapper.getAttribute('data-attr')).toBe('modeGroup');

      // ACT
      fireEvent.focus(wrapper);
      fireEvent.blur(wrapper);

      // ASSERT
      expect(onFocus).toHaveBeenCalled();
      expect(onBlur).toHaveBeenCalled();
    });

    it('does not forward a spread form-field bag`s type/checked to the wrapper', () => {
      // Form libraries hand over {name, value, onChange, onBlur, onFocus, type, checked}; putting
      // `type`/`checked` on a div triggers React DOM warnings.
      const input = {
        name: 'mode',
        value: 'a',
        onChange: vi.fn(),
        onBlur: vi.fn(),
        onFocus: vi.fn(),
        type: 'radio',
        checked: false,
      };

      const { container } = renderWithProvider(
        <Radio.Group {...input}>
          <Radio value="a">A</Radio>
        </Radio.Group>,
      );
      const wrapper = container.querySelector('.ds-radio-group') as HTMLElement;

      // ASSERT
      expect(wrapper.hasAttribute('type')).toBe(false);
      expect(wrapper.hasAttribute('checked')).toBe(false);

      // ACT
      fireEvent.blur(wrapper);

      // ASSERT
      expect(input.onBlur).toHaveBeenCalled();
    });

    it('does not fire group onChange when the already-selected option is clicked', () => {
      // Characterisation, not a regression guard: `checked` is derived from the group value, so the
      // browser never fires `change` here. RadioGroup's `newValue === lastValue` check mirrors antd
      // but is unreachable while that binding holds.
      const onChange = vi.fn();
      const { getAllByRole } = renderWithProvider(
        <Radio.Group value="a" onChange={onChange}>
          <Radio value="a">A</Radio>
          <Radio value="b">B</Radio>
        </Radio.Group>,
      );
      const [a, b] = getAllByRole('radio');

      // ACT — pick the already-selected option
      fireEvent.click(a);

      // ASSERT
      expect(onChange).not.toHaveBeenCalled();

      // ACT — a genuine change still notifies
      fireEvent.click(b);

      // ASSERT
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it.each([
      ['Radio', Radio],
      ['Radio.Button', Radio.Button],
    ])('exposes the %s`s own props on event.target', (_name, Child) => {
      // antd's rc-checkbox spread the radio's props onto `target`; consumers read more than `value`.
      const onChange = vi.fn();
      const { getByRole } = renderWithProvider(
        <Radio.Group name="mode" onChange={onChange}>
          <Child value="a" data-attr="modeA">
            A
          </Child>
        </Radio.Group>,
      );

      // ACT
      fireEvent.click(getByRole('radio'));

      // ASSERT
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0].target).toMatchObject({
        value: 'a',
        checked: true,
        name: 'mode',
        disabled: false,
        type: 'radio',
        'data-attr': 'modeA',
      });
    });
  });
});
