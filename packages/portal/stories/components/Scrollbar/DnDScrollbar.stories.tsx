import * as React from 'react';
import Scrollbar from '@synerise/ds-scrollbar';
import { boolean } from '@storybook/addon-knobs';
import faker from 'faker';
import { ReactSortable } from 'react-sortablejs';
import { withState } from '@dump247/storybook-state';

const decorator = storyFn => <div style={{ width: 400, background: '#fff' }}>{storyFn()}</div>;

const INITIAL_DATA = [...new Array(20)].map((item, index) => {
  return {
    id: index,
    name: faker.name.findName(),
  };
});

const SORTABLE_CONFIG = {
  animation: 200,
  forceFallback: true,
};

const stories = {
  dndScrollbar: withState({
    data: INITIAL_DATA,
  })(({ store }) => {
    const handleChangeOrder = newOrder => {
      store.set({ data: newOrder });
    };

    const renderItem = item => {
      return (
        <div
          style={{
            width: '100%',
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #ececec',
            cursor: 'grab',
            margin: '2px 0',
          }}
          key={`${item.id}-${item.name}`}
        >
          {item.id}.{item.name}
        </div>
      );
    };

    return (
      <Scrollbar maxHeight={250} absolute={boolean('Scrollbar over text', true)} withDnd={true}>
        <ReactSortable {...SORTABLE_CONFIG} list={store.state.data} setList={handleChangeOrder}>
          {store.state.data.map(renderItem)}
        </ReactSortable>
      </Scrollbar>
    );
  }),
};

export default {
  name: 'Components/Scrollbar',
  config: {},
  stories,
  decorator,
  Component: Scrollbar,
};
