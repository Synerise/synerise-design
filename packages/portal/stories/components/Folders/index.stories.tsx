import * as React from 'react';
import Sidebar from '@synerise/ds-sidebar';
import Folders from '@synerise/ds-folders';
import { boolean } from '@storybook/addon-knobs';
import { FOLDERS } from './dataset';
const wrapperStyles = {
  width: '338px',
  background: 'white',
};

const stories = {
  default: () => {
    const showActionsInRow = boolean('Show actions in a row', false);
    const getActionsDisplay = (row: boolean): string => {
      return row ? 'inline' : 'dropdown';
    };
    return (
      <div style={wrapperStyles}>
        <Sidebar defaultActiveKey={['0']}>
          <Sidebar.Panel header={'Folders'} id={'first'}>
            <Folders actionsDisplay={getActionsDisplay(showActionsInRow)} dataSource={FOLDERS} />
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
