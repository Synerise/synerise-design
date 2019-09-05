import * as React from 'react';
import { mount } from 'enzyme';
import Tabs from '../index';

const { TabPane } = Tabs;

describe('Tabs', () => {
  const component = mount(
    <Tabs defaultActiveKey="2">
      <TabPane tab="Tab 1" key="1">
        TestTab1
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        TestTab2
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        TestTab3
      </TabPane>
    </Tabs>
  );
  it('should render active', function() {
    expect(component.find('TabPane[active=true]').text()).toBe('TestTab2');
  });
  it('should active third after click', function() {
    component
      .find('.ant-tabs-tab')
      .at(2)
      .simulate('click');
    expect(component.find('TabPane[active=true]').text()).toBe('TestTab3');
  });
});
