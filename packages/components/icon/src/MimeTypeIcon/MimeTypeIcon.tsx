import React, { useMemo } from 'react';

import Icon from '../Icon';
import type { MimeTypeIconsProps } from './MimeTypeIcon.types';
import { mapMimeTypeToIconName } from './MimeTypeIcon.utils';

const MimeTypeIcon = ({ type, ...iconProps }: MimeTypeIconsProps) => {
  const iconName = useMemo(() => {
    return mapMimeTypeToIconName(type);
  }, [type]);

  return <Icon {...iconProps} iconName={iconName} />;
};

export default MimeTypeIcon;
