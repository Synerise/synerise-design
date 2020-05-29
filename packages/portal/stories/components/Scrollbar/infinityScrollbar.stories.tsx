import * as React from 'react';
import Scrollbar from '@synerise/ds-scrollbar';
import { boolean, number } from '@storybook/addon-knobs';
import faker from 'faker';
import List from '@synerise/ds-list';
import { withState } from '@dump247/storybook-state';

const decorator = (storyFn) => (
  <div style={{width: 400, background: '#fff'}}>
    {storyFn()}
  </div>
);

const INITIAL_DATA = [...new Array(20)].map(item => {
  return {
    name: faker.name.findName()
  }
});

const stories = {
  inifiniteScrollbar: withState({
    data: INITIAL_DATA,
    loading: false,
  })(({ store }) => {
    const {loading} = store.state;

    const fetchData = () => {
      store.set({loading: true});
      setTimeout(() => {
        const nextData = [...new Array(10)].map(item => {
          return {
            name: faker.name.findName()
          }
        });
        store.set({data: [...store.state.data, ...nextData], loading: false});
      }, 2000)
    };

    const getItem = (item) => {
      return <List.Item>{item.name}</List.Item>
    };

    return (
      <Scrollbar
        maxHeight={250}
        absolute={boolean('Scrollbar over text', false)}
        loading={loading}
        hasMore={100 > store.state.data.length}
        fetchData={fetchData}

      >
        <List renderItem={getItem} dataSource={[store.state.data]}></List>
      </Scrollbar>
    )
  })
};

export default {
  name: 'Components|Scrollbar',
  config: {},
  stories,
  decorator,
  Component: Scrollbar,
}
