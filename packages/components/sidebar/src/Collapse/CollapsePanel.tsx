import classNames from 'classnames';
import React, { type KeyboardEvent } from 'react';

import {
  PanelContent,
  PanelContentBox,
  PanelContentInner,
  PanelExpandIcon,
  PanelHeader,
  PanelItem,
} from './Collapse.styles';
import { type CollapsePanelProps } from './Collapse.types';

/**
 * One accordion item. Each element is a styled-component that owns its styles; the
 * `ant-collapse-*` / `ds-sidebar-*` class names are kept on the elements purely as hooks (ui-tests /
 * interim external CSS) and are not used as styling selectors. Renders its body when active or
 * `forceRender`.
 */
export const CollapsePanel = ({
  header,
  children,
  isActive,
  onItemClick,
  expandIcon,
  // consumed so they do not leak to the DOM (positioning/box-shadow handled via CSS)
  expandIconPosition,
  isDragOverlay,
  forceRender,
  // not rendered as a DOM id — the active-key matching uses it upstream in Collapse
  id,
  className,
  ...rest
}: CollapsePanelProps) => {
  const icon = expandIcon ? expandIcon({ isActive }) : null;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onItemClick?.();
    }
  };

  return (
    <PanelItem
      className={classNames(
        'ant-collapse-item',
        'ds-sidebar-item',
        {
          'ant-collapse-item-active': isActive,
          'ds-sidebar-item-active': isActive,
        },
        className,
      )}
      $isActive={isActive}
      $isDragOverlay={isDragOverlay}
      {...rest}
    >
      <PanelHeader
        className="ant-collapse-header ds-sidebar-header"
        role="button"
        tabIndex={0}
        aria-expanded={Boolean(isActive)}
        onClick={onItemClick}
        onKeyDown={handleKeyDown}
      >
        {header}
        {icon && (
          <PanelExpandIcon
            className="ant-collapse-expand-icon ds-sidebar-expand-icon"
            $iconPosition={expandIconPosition}
          >
            {icon}
          </PanelExpandIcon>
        )}
      </PanelHeader>
      {/* Rendered unconditionally so the grid-rows open/close transition runs both ways
          (forceRender is now moot — content always stays mounted, as antd's default did). */}
      <PanelContent
        className={classNames('ant-collapse-content', 'ds-sidebar-content', {
          'ant-collapse-content-active': isActive,
        })}
        $isActive={isActive}
      >
        <PanelContentBox className="ant-collapse-content-box ds-sidebar-content-box">
          {/* padding lives on the inner wrapper, never on the grid item — see Collapse.styles.ts */}
          <PanelContentInner>{children}</PanelContentInner>
        </PanelContentBox>
      </PanelContent>
    </PanelItem>
  );
};

export default CollapsePanel;
