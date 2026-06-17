import React from 'react';

import { type BadgeProps } from './Badge.types';
import BadgeCore from './BadgeCore';
import BadgeWithLabel from './BadgeWithLabel';

/**
 * Public Badge.
 *
 * When `text` is provided the badge renders as a status/dot badge aligned next to that label —
 * delegating to `BadgeWithLabel` (this restores the legacy antd `status` + `text` API so consumers
 * don't have to switch to `BadgeWithLabel` by hand). Otherwise it renders the dot/count badge
 * (`BadgeCore`).
 */
const Badge = ({ text, ...props }: BadgeProps) => {
  const hasText =
    text !== undefined && text !== null && text !== false && text !== '';

  if (hasText) {
    return (
      <BadgeWithLabel
        status={props.status}
        customColor={props.customColor}
        flag={props.flag}
        pulsing={props.pulsing}
        dot={props.dot}
        className={props.className}
        style={props.style}
      >
        {text}
      </BadgeWithLabel>
    );
  }

  return <BadgeCore {...props} />;
};

export default Badge;
