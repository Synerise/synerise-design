import React, { useMemo } from 'react';

import Icon from '../Icon';
import type { MimeTypeIconsProps } from './MimeTypeIcon.types';
import { mapMimeTypeToIconComponent } from './MimeTypeIcon.utils';

const MimeTypeIcon = ({
  type,
  // `MimeTypeIconsProps` only omits `component`, so `iconName` is still assignable. It used to be
  // overridden by the computed name via spread order; discard it explicitly so switching to
  // `component` does not silently invert that precedence.
  iconName: _iconName,
  ...iconProps
}: MimeTypeIconsProps) => {
  const IconComponent = useMemo(() => mapMimeTypeToIconComponent(type), [type]);

  return <Icon {...iconProps} component={<IconComponent />} />;
};

export default MimeTypeIcon;
