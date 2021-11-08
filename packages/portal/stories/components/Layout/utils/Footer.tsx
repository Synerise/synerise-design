import * as React from 'react';
import Footer from '@synerise/ds-footer';
import Button from '@synerise/ds-button';
import Icon, { AcademyM, ChatM, LifebuoyM } from '@synerise/ds-icon';

export default () => (
  <Footer style={{marginTop: '16px'}}>
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
);
