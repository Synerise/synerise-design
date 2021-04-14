import * as React from 'react';

import EmptyStates from '@synerise/ds-empty-states';
import { boolean, select, text} from '@storybook/addon-knobs';
import Button from '@synerise/ds-button';
import { action } from '@storybook/addon-actions';



const getDefaultProps = () => ({
  type: select('Select type', types, 'Add'),
});
const iconSizes = {
  Large: 'L',
  ExtraLarge: 'XL',
};
const fontSizes = {
  Small: 'small',
  Medium: 'medium',
};
const types = {
  Add: 'Add',
  NoResults: 'NoResults',
  SearchNoResults: 'SearchNoResults',
};
const buttonGhostPrimary = (
  <>
    <Button mode="label" type="ghost-primary" onClick={action('onClick: Apply')}>
      New segmentation
    </Button>
  </>
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
    <Button type="ghost" onClick={action('onClick: Cancel')}>
      Cancel
    </Button>
    <Button type="primary" onClick={action('onClick: Unpublish')}>
      New segmentation
    </Button>
  </>
);
const additionalButtons = [
  'singleButtonPrimary',
  'singleButtonGhostPrimary',
  'twoButtons',
];


const stories = {
  default: () => {
    const props = getDefaultProps();
    const Description = text(
      'Description',
      'Currently you have no Segmentations saved. Get started with a new one to analyze your database.'
    );
    const buttonPick = {
      singleButtonPrimary: buttonPrimary,
      singleButtonGhostPrimary: buttonGhostPrimary,
      twoButtons: buttonsSetExample,
    };
    const Header = text('Title', 'Create new segmentation');
    const iconSize = select('Size of icon', iconSizes,iconSizes.Large);
    const fontSize = select('Set size of text',fontSizes, fontSizes.Small);
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
          {...props}
          fontSize={fontSize}
          text={Header}
          size={iconSize}
          label={Description}
          button={ showButton ? buttonPick[buttonSelect] : null}
          labelPosition="bottom"
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
