import * as React from 'react';
import { mount } from 'enzyme';
import Avatar from '../index';

describe('Avatar', () => {
  const component = mount(
    <Avatar size={99} shape="square">
      U
    </Avatar>
  );
  it('should render', function() {
    const style = component
      .find('span')
      .at(0)
      .props().style;
    expect(component.text()).toBe('U');
    expect(style.width).toBe(99);
    expect(style.height).toBe(99);
  });
});
