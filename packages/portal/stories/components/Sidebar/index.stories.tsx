import * as React from 'react';

import Sidebar from '@synerise/ds-sidebar';
import * as S from "@synerise/ds-sidebar/dist/Sidebar.styles"
import { v1 as uuid } from 'uuid';

const wrapperStyles = {
  width: '340px',
};

const stories = {
  default: () => (
    <div style={wrapperStyles}>
      <Sidebar order={['first', 'second']} onChangeOrder={() => {}}>
        <S.AntdPanel header={'Header name'} key={uuid()}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aut consectetur ex harum in
        </S.AntdPanel>
        <S.AntdPanel header={'Header name'} key={uuid()}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta dolorem dolores eligendi, enim esse iste labore, magnam molestiae mollitia possimus reprehenderit sunt tenetum omnis ratione totam.
        </S.AntdPanel>
      </Sidebar>
    </div>
  )
};

export default {
  name: 'Components|Sidebar',
  withoutCenter: true,
  config: {},
  stories,
  Component: Sidebar,
}
