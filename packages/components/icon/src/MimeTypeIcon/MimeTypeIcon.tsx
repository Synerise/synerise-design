import React, { useMemo } from 'react';

import Icon from '../Icon';
import { mapMimeTypeToIcon } from './MimeTypeIcon.utils';
import type { MimeTypeIconsProps } from './MimeTypeIcon.types';

const MimeTypeIcon = ({ type, ...iconProps }: MimeTypeIconsProps) => {
  const component = useMemo(() => {
    return mapMimeTypeToIcon(type);
  }, [type]);

  return <Icon {...iconProps} component={component} />;
};

export default MimeTypeIcon;
