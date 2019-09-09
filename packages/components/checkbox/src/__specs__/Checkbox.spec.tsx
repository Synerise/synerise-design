import * as React from 'react';
import { mount } from 'enzyme';
import Checkbox from '../index';

describe('Checkbox', () => {
  const CHECKBOX_LABEL = 'Checkbox Label';
  const onChange = jest.fn();

  it('should render', () => {
    // ARRANGE
    const component = mount(<Checkbox onChange={onChange}>{CHECKBOX_LABEL}</Checkbox>);

    // ASSERT
    expect(component.text()).toBe(CHECKBOX_LABEL);
  });

  it('should trigger onChange event', () => {
    // ARRANGE
    const component = mount(<Checkbox onChange={onChange}>{CHECKBOX_LABEL}</Checkbox>);

    // ACT
    component.find('input').simulate('change');

    // ASSERT
    expect(onChange).toBeCalled();
  });
});
