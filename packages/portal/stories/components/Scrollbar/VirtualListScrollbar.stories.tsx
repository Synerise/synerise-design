import React from 'react';
import Scrollbar from '@synerise/ds-scrollbar';
import { boolean } from '@storybook/addon-knobs';
import faker from 'faker';
import { FixedSizeList, FixedSizeList as List } from 'react-window';

const decorator = storyFn => <div style={{ width: 400, background: '#fff' }}>{storyFn()}</div>;

const INITIAL_DATA = [...new Array(2000)].map(item => {
  return {
    name: faker.name.findName(),
  };
});

const stories = {
  virtualListScrollbar: () => {
    const listRef = React.createRef<FixedSizeList>();

    const handleScroll = ({ currentTarget }: React.UIEvent): void => {
      const { scrollTop } = currentTarget;
      if (listRef.current !== null) {
        listRef.current.scrollTo(scrollTop);
      }
    };

    return (
      <Scrollbar
        maxHeight={250}
        absolute={boolean('Scrollbar over text', true)}
        loading={false}
        withDnd={false}
        largeSize={boolean('Scrollbar large size', false)}
        onScroll={handleScroll}
      >
        <List
          key={'virtual-list'}
          width="100%"
          height={250}
          itemCount={INITIAL_DATA.length}
          itemSize={40}
          ref={listRef}
          style={{ overflowX: 'unset', overflowY: 'unset' }}
        >
          {({ index, style }) => {
            const item = INITIAL_DATA[index];
            return (
              <span key={`${item.name}-${index}`} style={style}>
                {index}.{item.name}
              </span>
            );
          }}
        </List>
      </Scrollbar>
    );
  },
};

export default {
  name: 'Components/Scrollbar',
  config: {},
  stories,
  decorator,
  Component: Scrollbar,
};
