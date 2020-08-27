import * as React from 'react';
import Sidebar from '@synerise/ds-sidebar';
import Folders from '@synerise/ds-folders';
const wrapperStyles = {
  width: '338px',
  background: 'white',
};

const stories = {
  default: () => {
    return (
      <div style={wrapperStyles}>
        <Sidebar defaultActiveKey={['0']}>
          <Sidebar.Panel header={'Folders'} id={'first'}>
            <Folders />
          </Sidebar.Panel>
        </Sidebar>
      </div>
    );
  },
};

export default {
  name: 'Components/Folders',
  config: {},
  stories,
};
