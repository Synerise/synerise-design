import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Button from '@synerise/ds-button';
import Example1 from './examples/Example1';
import withTabs from './withTabs/withTabs';
import WithSearch from './examples/withSearch';
import Icon from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { Add3M, KeyboardDownM, KeyboardEnterM, KeyboardUpM } from '@synerise/ds-icon/dist/icons';
import Default from './examples/Default';
import { BottomAction } from '@synerise/ds-dropdown/dist/elements/BottomAction/BottomAction.styles';

const decorator = storyFn => (
  <div style={{ width: '100vw', position: 'absolute', left: '0', top: '20vh' }}>
    <div style={{ width: '300px', margin: 'auto', display: 'flex', justifyContent: 'center' }}>{storyFn()}</div>
  </div>
);

export const typesFooter = {
  singleButton: 'singleButton',
  twoButtons: 'twoButtons',
  empty: 'empty',
  navigation: 'navigation',
};

export function renderFooter(suffixElementType: string) {
  switch (suffixElementType) {
    case typesFooter.singleButton:
      return (
        <Dropdown.BottomAction
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          style={{ marginTop: '0px', padding: '0 8px', cursor: 'auto', }}
        >
          <Button type="ghost" style={{ paddingLeft: '8px' }}>
            {<Icon component={<Add3M />} size={24} color={theme.palette['grey-500']} />}
            <div style={{ paddingLeft: '4px' }}>Button</div>
          </Button>
        </Dropdown.BottomAction>
      );
    case typesFooter.twoButtons:
      return (
        <BottomAction
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '0px',
            padding: '0 8px',
            cursor: 'auto',
          }}
        >
          <Button type="ghost" style={{ paddingLeft: '8px' }}>
            {<Icon component={<Add3M />} size={24} color={theme.palette['grey-500']} />}
            <div style={{ paddingLeft: '4px' }}>Button</div>
          </Button>
          <Button type="ghost" style={{ marginLeft: '48px' }}>
            Button
          </Button>
        </BottomAction>
      );
    case typesFooter.empty:
      return (
        <Dropdown.BottomAction
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          style={{ marginTop: '0px',  cursor: 'auto', }}
        />
      );
    case typesFooter.navigation:
      return (
        <BottomAction
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '0px',
            padding: '0 8px',
            cursor: 'auto',
          }}
        >
          <div style={{ display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', fontWeight: 500,fontSize:'10px', color: theme.palette['grey-400'], marginLeft: '-4px' }}>
            {<Icon component={<KeyboardUpM />} size={24} color={theme.palette['grey-400']} />}
            {<Icon component={<KeyboardDownM />} size={24} color={theme.palette['grey-400']} />}
            to navigate
          </div>
          <div style={{ display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', fontWeight: 500,fontSize:'10px', color: theme.palette['grey-400'],marginLeft: '18px'}}>
            {<Icon component={<KeyboardEnterM />} size={24} color={theme.palette['grey-400']} />}
            to select
          </div>
        </BottomAction>
      );
    default:
      return null;
      break;
  }
}

const stories = {
  basic: {
    trigger: ['click'],
    overlay: <div>Dropdown overlay content</div>,
    children: <Button>Click</Button>,
  },
  default: Default,
  withSearch: WithSearch,
  example1: Example1,
  withTabs: withTabs,
};

export default {
  name: 'Dropdown/Dropdown',
  stories,
  Component: Dropdown,
  decorator,
};
