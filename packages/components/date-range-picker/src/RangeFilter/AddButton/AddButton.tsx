import * as React from 'react';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { Add3M } from '@synerise/ds-icon/dist/icons';
import { AddButtonProps } from './AddButton.types';

const AddButton: React.FC<AddButtonProps> = ({ label, ...rest }: AddButtonProps) => {
  return (
    <Button mode="icon-label" type="ghost" {...rest}>
      <Icon component={<Add3M />} />
      {label}
    </Button>
  );
};

export default AddButton;
