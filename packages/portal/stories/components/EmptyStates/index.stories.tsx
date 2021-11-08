import * as React from 'react';

import EmptyStates from '@synerise/ds-empty-states';
import { boolean, select, text} from '@storybook/addon-knobs';
import Button from '@synerise/ds-button';
import { action } from '@storybook/addon-actions';

const reqL = require.context('@synerise/ds-icon/dist/esm/icons/L', false, /index.js/);
const iconsRawL = reqL(reqL.keys()[0]);
const iconsNamesL = Object.keys(iconsRawL);
const reqXl = require.context('@synerise/ds-icon/dist/esm/icons/XL', false, /index.js/);
const iconsRawXl = reqXl(reqXl.keys()[0]);
const iconsNamesXl = Object.keys(iconsRawXl);
const iconSizes = {
  Large: 'small',
  ExtraLarge: 'medium',
};
const fontSizes = {
  Small: 'small',
  Medium: 'medium',
};
const buttonGhostPrimary = (
  <div style={{marginTop: '-8px'}}>
    <Button mode="label" type="ghost-primary" onClick={action('onClick: Apply')}>
      New segmentation
    </Button>
  </div>
);
const buttonPrimary = (
  <>
    <Button mode="label" type="primary" onClick={action('onClick: Apply')}>
      New segmentation
    </Button>
  </>
);
const buttonsSetExample = (
  <>
    <div>
      <Button type="ghost" onClick={action('onClick: Cancel')}>
        Cancel
      </Button>
    </div>
    <div style={{paddingLeft: '8px'}}>
      <Button type="primary" onClick={action('onClick: Unpublish')}>
        New segmentation
      </Button>
    </div>
  </>
);
const additionalButtons = [
  'singleButtonPrimary',
  'singleButtonGhostPrimary',
  'twoButtons',
];


const stories = {
  default: () => {
    const Header = text('Title', 'Create new segmentation');
    const fontSize = select('Set size of title',fontSizes, fontSizes.Small);
    const Description = text(
      'Description',
      'Currently you have no Segmentations saved. Get started with a new one to analyze your database.'
    );
    const buttonPick = {
      singleButtonPrimary: buttonPrimary,
      singleButtonGhostPrimary: buttonGhostPrimary,
      twoButtons: buttonsSetExample,
    };
    const iconSize = select('Size of icon', iconSizes,iconSizes.Large);
    const customLIcon = select('Set custom L Icon', iconsNamesL, iconsNamesL[0]);
    const customXlIcon = select('Set custom XL Icon', iconsNamesXl, iconsNamesXl[0]);
    const IconCompL = iconsRawL[customLIcon];
    const IconCompXl = iconsRawXl[customXlIcon];
    const showButton = boolean('Set button', true);
    const buttonSelect = select('Set type of button', additionalButtons,'singleButtonPrimary')

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
        <EmptyStates
          fontSize={fontSize}
          text={Header}
          size={iconSize}
          label={Description}
          button={ showButton ? buttonPick[buttonSelect] : null}
          labelPosition="bottom"
          customIcon={iconSize === 'small' ? <IconCompL/> : <IconCompXl/>}
        />
      </div>
    );
  },
};

export default {
name: 'Components/EmptyStates',
  config: {},
  stories,
  Component: EmptyStates,
}
