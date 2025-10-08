import copy from 'copy-to-clipboard';
import React, {
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  forwardRef,
  useMemo,
  useState,
} from 'react';

import { renderWithHighlight, useStableId } from '@synerise/ds-utils';

import { type BasicItemProps } from '../../ListItem.types';
import HoverTooltip from '../HoverTooltip/HoverTooltip';
import { SubMenu } from '../SubMenu/SubMenu';
import { ItemLabel } from './ItemLabel';
import { removeHandlerProps, renderAddon } from './utils';

const Text = forwardRef<HTMLDivElement, BasicItemProps>((props, ref) => {
  const {
    checked,
    className,
    children,
    itemKey: menuItemKey,
    noHover,
    size,
    prefixel,
    suffixel,
    copyable,
    copyHint,
    copyValue,
    copyTooltip,
    timeToHideTooltip,
    tooltipProps,
    disabled,
    description,
    parent,
    ordered,
    indentLevel,

    onClick,
    onItemSelect,
    onMouseOver,
    onMouseDown,
    onMouseLeave,
    onBlur,
    onFocus,
    onItemHover,
    onKeyDown,

    prefixVisibilityTrigger,
    suffixVisibilityTrigger,
    highlight,

    style,

    hoverTooltipProps,
    renderHoverTooltip,
    subMenu,
    ItemComponent,

    ...rest
  } = props;

  const stableId = useStableId();
  const itemKey = menuItemKey ?? stableId;

  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const [hovered, setHovered] = useState(false);

  const canCopyToClipboard = copyable && copyValue && !disabled;

  const showSuffixOnHover = suffixVisibilityTrigger === 'hover';
  const showPrefixOnHover = prefixVisibilityTrigger === 'hover';

  const suffixElement = useMemo(
    () => renderAddon(suffixel, hovered),
    [suffixel, hovered],
  );
  const prefixElement = useMemo(
    () => renderAddon(prefixel, hovered),
    [prefixel, hovered],
  );

  const shouldRenderSuffix = useMemo(() => {
    if (showSuffixOnHover) {
      return (!!suffixElement || !!checked) && hovered;
    }
    return !!suffixElement || !!checked;
  }, [showSuffixOnHover, suffixElement, checked, hovered]);

  const shouldRenderPrefix = useMemo(() => {
    if (showPrefixOnHover) {
      return !!prefixElement && hovered;
    }
    return !!prefixElement;
  }, [showPrefixOnHover, prefixElement, hovered]);

  const childrenWithHighlight = useMemo(() => {
    if (highlight && typeof children === 'string') {
      return renderWithHighlight(
        children,
        highlight,
        'ds-list-item-highlight',
        'ds-list-item-highlight',
      );
    }
    return children;
  }, [children, highlight]);

  const itemData = {
    key: itemKey,
    item: removeHandlerProps(props),
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      if (subMenu) {
        setSubMenuOpen(!subMenuOpen);
      } else {
        onItemSelect && onItemSelect({ ...itemData, domEvent: event });
        onClick && onClick({ ...itemData, domEvent: event });
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!disabled && event.key === 'Enter') {
      if (subMenu) {
        setSubMenuOpen(!subMenuOpen);
      } else {
        canCopyToClipboard && copyValue && copy(copyValue);
        onItemSelect && onItemSelect({ ...itemData, domEvent: event });
      }
    }
    onKeyDown && onKeyDown(event);
  };

  const handleMouseOver = (event: MouseEvent<HTMLDivElement>) => {
    setHovered(true);
    onItemHover && onItemHover({ ...itemData, domEvent: event });
    onMouseOver && onMouseOver(event);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    setHovered(false);
    onMouseLeave && onMouseLeave(event);
  };

  const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
    setHovered(true);
    onFocus && onFocus(event);
  };
  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    setHovered(false);
    onBlur && onBlur(event);
  };

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    setHovered(true);
    canCopyToClipboard && copyValue && copy(copyValue);
    onMouseDown && onMouseDown(event);
  };

  const TextNode = (
    <ItemLabel
      role="menuitem"
      data-testid="ds-list-item"
      className={className}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseDown={handleMouseDown}
      ordered={ordered}
      disabled={disabled}
      noHover={noHover}
      hasHighlight={!!highlight}
      size={size}
      style={renderHoverTooltip ? undefined : style}
      inTooltip={!!renderHoverTooltip}
      ref={ref}
      parent={parent}
      hasSubMenu={!!(subMenu && subMenu.length)}
      subMenuOpen={subMenuOpen}
      timeToHideTooltip={timeToHideTooltip}
      tooltipProps={tooltipProps}
      copyTooltip={copyTooltip}
      prefixElement={prefixElement}
      prefixVisible={shouldRenderPrefix}
      description={description}
      checked={checked}
      suffixElement={suffixElement}
      suffixVisible={shouldRenderSuffix}
      indentLevel={indentLevel}
      content={
        canCopyToClipboard && hovered && copyHint
          ? copyHint
          : childrenWithHighlight
      }
      {...rest}
    />
  );
  if (renderHoverTooltip) {
    return (
      <HoverTooltip
        hoverTooltipProps={hoverTooltipProps}
        renderHoverTooltip={renderHoverTooltip}
        style={style}
      >
        {TextNode}
      </HoverTooltip>
    );
  }

  if (subMenu && subMenu.length) {
    const nextIndentLevel = indentLevel ? indentLevel + 1 : 1;
    return (
      <>
        {TextNode}
        <SubMenu
          onClick={onClick}
          onItemSelect={onItemSelect}
          indentLevel={nextIndentLevel}
          dataSource={subMenu}
          isOpen={subMenuOpen}
          ItemComponent={ItemComponent}
        />
      </>
    );
  }
  return TextNode;
});

export default Text;
