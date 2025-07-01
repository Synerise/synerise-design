import React from 'react';

import Button from '@synerise/ds-button';
import Icon, { Add3M } from '@synerise/ds-icon';

import { type AddButtonProps } from './AddButton.types';

const AddButton: React.FC<AddButtonProps> = ({
  label,
  ...rest
}: AddButtonProps) => {
  const icon = React.useMemo(() => <Icon component={<Add3M />} />, []);
  return (
    <Button mode="icon-label" type="ghost" {...rest}>
      {icon}
      {label}
    </Button>
  );
};

export default React.memo(AddButton);
