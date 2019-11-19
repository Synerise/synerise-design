import * as React from 'react';

import Block from '@synerise/ds-block';
import Icon from "@synerise/ds-icon/dist/Icon";
import {EditM} from "@synerise/ds-icon/dist/icons";
import theme from "@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme";
import Sidebar from "@synerise/ds-sidebar/dist/Sidebar";

const wrapperStyles = {
  width: '340px',
};

const stories = {
  default: () => (
    <div style={wrapperStyles}>
      <Sidebar defaultActiveKey={['0']}>
        <Sidebar.Panel header={'Collapse title'} id={'first'}>
          <Block isDragging={0} icon={<Icon component={<EditM />} size={24} color={theme.palette['grey-600']}/>} >
            Block name
          </Block>
          <Block isDragging={0} icon={<Icon component={<EditM />} size={24} color={theme.palette['grey-600']}/>} >
            Block name
          </Block>
          <Block isDragging={0} icon={<Icon component={<EditM />} size={24} color={theme.palette['grey-600']}/>} >
            Block name
          </Block>
          <Block isDragging={0} icon={<Icon component={<EditM />} size={24} color={theme.palette['grey-600']}/>} >
            Block name
          </Block>
        </Sidebar.Panel>
      </Sidebar>
    </div>
  ),
};

export default {
  name: 'Components|Block',
  config: {},
  withoutCenter: true,
  stories,
  Component: Block,
}
