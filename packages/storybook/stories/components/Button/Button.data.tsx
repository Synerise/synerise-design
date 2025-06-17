import React from 'react';
import Icon, { AngleDownS } from '@synerise/ds-icon';


export const getModeLeft = (mode, icon): string => {
  if(['icon-label', 'two-icons'].includes(mode)){
    return icon;
  }
  return '';
};

export const getModeSplit = (mode, children): string => {
  if (mode === 'single-icon') {
    return '';
  }
  if (mode === 'split') {
    return <>Label <Icon component={<AngleDownS />} />{' '}</>
  }
  return children;
};

export const getModeRight = (mode, icon): string => {
  if(['label-icon', 'two-icons', 'single-icon'].includes(mode)){
    return icon;
  }
  return '';
};