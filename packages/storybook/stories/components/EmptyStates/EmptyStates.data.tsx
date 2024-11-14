import React from 'react';

import Button from '@synerise/ds-button';
import * as allIconsL from '@synerise/ds-icon/dist/icons/L';
import * as allIconsXL from '@synerise/ds-icon/dist/icons/XL';

const mapIcons = () => {
  const allIcons = {
    ...allIconsL,
    ...allIconsXL,
  };
  Object.keys(allIcons).forEach(iconName => {
    const Component = allIcons[iconName];
    allIcons[iconName] = <Component />;
  });
  return allIcons;
};

export const ICONS = mapIcons();

export const BUTTON_OPTIONS = {
  singleButtonPrimary: (
    <Button mode="label" type="primary">
      New segmentation
    </Button>
  ),
  singleButtonGhostPrimary: (
    <Button mode="label" type="primary">
      New segmentation
    </Button>
  ),
  twoButtons: (
    <>
      <Button type="secondary">Cancel</Button>
      <Button style={{ marginLeft: '8px' }} type="primary">
        New segmentation
      </Button>
    </>
  ),
};
