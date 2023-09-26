import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Button from '@synerise/ds-button';
import Example1 from './examples/Example1';
import withTabs from './withTabs/withTabs';
import WithSearch from './examples/withSearch';
import WithTextTrigger from './examples/withTextTrigger';
import skeletonDropdown from './examples/skeletonDropdown';
import { theme } from '@synerise/ds-core';
import Icon, { Add3M, KeyboardDownM, KeyboardEnterM, KeyboardUpM } from '@synerise/ds-icon';
import Default from './examples/Default';
import WithCopyID from './examples/withCopyId';
import { BottomAction } from '@synerise/ds-dropdown/dist/elements/BottomAction/BottomAction.styles';
import Advanced from './examples/advanced';
import Placement from './examples/placement';

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
        <Dropdown.BottomAction onClickAction={() => {}} style={{ marginTop: '0px', padding: '0 8px', cursor: 'auto' }}>
          <Button type="ghost" style={{ paddingLeft: '8px', marginBottom: '1px' }}>
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
            justifyContent: 'space-between',
            marginTop: '0px',
            padding: '0 8px',
            cursor: 'auto',
          }}
        >
          <Button type="ghost" style={{ paddingLeft: '8px', marginBottom: '1px' }}>
            {<Icon component={<Add3M />} size={24} color={theme.palette['grey-500']} />}
            <div style={{ paddingLeft: '4px' }}>Button</div>
          </Button>
          <Button type="ghost" style={{ marginBottom: '1px' }}>
            Button
          </Button>
        </BottomAction>
      );
    case typesFooter.empty:
      return (
        <Dropdown.BottomAction
          onClickAction={() => {}}
          
          // @ts-ignore
          style={{ marginTop: '0px', cursor: 'auto' }}
        />
      );
    case typesFooter.navigation:
      return (
        <BottomAction
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '0px',
            padding: '0 16px 0 20px',
            cursor: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 500,
              fontSize: '10px',
              color: theme.palette['grey-400'],
              marginLeft: '-4px',
            }}
          >
            {<Icon component={<KeyboardUpM />} size={24} color={theme.palette['grey-400']} />}
            {<Icon component={<KeyboardDownM />} size={24} color={theme.palette['grey-400']} />}
            to navigate
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 500,
              fontSize: '10px',
              color: theme.palette['grey-400'],
              marginLeft: '18px',
            }}
          >
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
    overlay: <div>Dropdown overlay content</div>,
    children: <Button>Click</Button>,
  },
  default: Default,
  placement: Placement,
  withCopyID: WithCopyID,
  example1: Example1,
  withSearch: WithSearch,
  withTabs: withTabs,
  withTextTrigger: WithTextTrigger,
  skeletonDropdown: skeletonDropdown,
  advanced: Advanced,
};

export default {
  name: 'Components/Dropdown',
  stories,
  Component: Dropdown,
  decorator,
};
