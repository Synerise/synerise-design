import React, { forwardRef, useMemo } from 'react';

import Button from '@synerise/ds-button';
import Icon, { AngleDownS } from '@synerise/ds-icon';

import { type SubjectTriggerProps } from '../Subject.types';

const SubjectTrigger = forwardRef<HTMLButtonElement, SubjectTriggerProps>(
  ({ iconPlaceholder, placeholder, selectedItem, color, onClick }, ref) => {
    const icon = useMemo(() => {
      return selectedItem !== undefined ? selectedItem.icon : iconPlaceholder;
    }, [selectedItem, iconPlaceholder]);

    const label = useMemo(() => {
      return selectedItem !== undefined ? selectedItem.name : placeholder;
    }, [selectedItem, placeholder]);

    return (
      <Button
        ref={ref}
        data-testid="subject-trigger"
        type="custom-color"
        mode="two-icons"
        color={color}
        onClick={onClick}
      >
        <Icon component={icon} />
        {label}
        <Icon component={<AngleDownS />} />
      </Button>
    );
  },
);

export default SubjectTrigger;
