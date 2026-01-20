import type { CSSProperties, ReactNode } from 'react';

import type { BasicItemProps } from '../../ListItem.types';

export type HoverTooltipProps = {
  children: ReactNode;
  style?: CSSProperties;
  popoverProps?: BasicItemProps['popoverProps'];
  renderHoverTooltip?: () => JSX.Element;
};
