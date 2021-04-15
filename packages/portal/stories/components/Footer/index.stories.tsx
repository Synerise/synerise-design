import * as React from 'react';
import Footer from '@synerise/ds-footer';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { AcademyM, ChatM, LifebuoyM } from '@synerise/ds-icon/dist/icons';

const decorator = storyFn => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      padding: '0 16px',
      background: '#fff'
    }}
  >
    {storyFn()}
  </div>
);

const stories = {
  default: () => (
    <Footer>
      <Button type="ghost" mode="icon-label">
        <Icon component={<AcademyM />} /> Help
      </Button>
      <Button type="ghost" mode="icon-label">
        <Icon component={<ChatM />} /> Leave feedback
      </Button>
      <Button type="ghost" mode="icon-label">
        <Icon component={<LifebuoyM />} /> Contact support
      </Button>
    </Footer>
  )
};

export default {
  name: 'Layout/Footer',
  decorator,
  config: {},
  stories,
  Component: Footer,
}
