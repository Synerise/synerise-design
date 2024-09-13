import React from 'react';

import Button from '@synerise/ds-button';
import Icon, { EditS, ListM } from '@synerise/ds-icon';
import ButtonGroup from '@synerise/ds-button-group';

import { ArrayTriggerProps } from '../Array.types';

export const ArrayTrigger = ({ value, onClick, texts }: ArrayTriggerProps) => {
  return (
    <ButtonGroup>
      <Button onClick={onClick} type="secondary" mode="single-icon">
        <Icon component={<ListM />} />
      </Button>
      <Button onClick={onClick} type="secondary" mode="label-icon">
        {value ? `${value.length} ${texts.values}` : texts.buttonPlaceholder}
        <Icon component={<EditS />} />
      </Button>
    </ButtonGroup>
  );
};
