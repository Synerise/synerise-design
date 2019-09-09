import * as React from 'react';
import { mount } from 'enzyme';
import Typography from '../index';

describe('Typography', () => {
  it('title should render', function() {
    const component = mount(<Typography.Title level={3}>HEADER</Typography.Title>);
    expect(component.find('h3').text()).toBe('HEADER');
  });
});
