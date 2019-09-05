import * as React from 'react';
import { mount } from 'enzyme';
import Button from '../index';

describe('Button', () => {
  const onClick = jest.fn();
  const component = mount(<Button onClick={onClick}>Click ME!</Button>);
  it('should render', function() {
    expect(component.text()).toBe('Click ME!');
  });
  it('should onClick be called', function() {
    component.simulate('click');
    expect(onClick).toBeCalled();
  });
});
