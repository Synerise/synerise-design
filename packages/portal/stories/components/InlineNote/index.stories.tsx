import { boolean, select } from '@storybook/addon-knobs';
import * as React from 'react'
import Alert from '@synerise/ds-alert';
import IconAlert from '@synerise/ds-alert/dist/IconAlert/IconAlert';
import Icon from '@synerise/ds-icon';

import * as icons from '@synerise/ds-icon';

const iconsRaw = icons
const iconsNames = Object.keys(icons)

const stories = {
  InlineNoteDefault: () => {
    const icon = boolean('Set icon', true);
    const showCustomIcon = boolean('Show custom icon', false);
    const customIcon = select('Set custom icon', iconsNames, iconsNames[0]);
    const IconComp = iconsRaw[customIcon];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <IconAlert iconAlert={icon} message="Inline warning." customIcon = {showCustomIcon && <Icon component={<IconComp/>}/>}/>
      </div>
    );
  },
  InlineNoteWithEmphasis: () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <IconAlert
          iconAlert={true}
          message="Sorry!"
          withEmphasis=" There was a problem with your request."
          type="warning"
        />
      </div>
    );
  },
  InlineNoteWithLink: () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <IconAlert
          iconAlert={true}
          message="Sorry! There was a problem with your request. "
          withLink="Reset the screen!"
          type="warning"
        />
      </div>
    );
  },
};

export default {
  name: 'Components/Alert/InlineNote',
  config: {},
  stories,
  Component: Alert,
};
