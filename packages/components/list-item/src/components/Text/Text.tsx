import copy from 'copy-to-clipboard';
import React, {
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  forwardRef,
  useMemo,
  useState,
} from 'react';

import { useListItem, useMergeRefs } from '@floating-ui/react';
import { renderWithHighlight, useStableId } from '@synerise/ds-utils';

import {
  type BasicItemProps,
  type NestedItemProps,
} from '../../ListItem.types';
import { useTemporaryLabel } from '../../hooks/useTemporaryLabel';
import HoverTooltip from '../HoverTooltip/HoverTooltip';
import { SubMenu } from '../SubMenu/SubMenu';
import { DynamicLabel } from './DynamicLabel';
import { ItemLabel } from './ItemLabel';
import { getCopyConfig, removeHandlerProps, renderAddon } from './utils';

const Text = forwardRef<HTMLDivElement, BasicItemProps & NestedItemProps>(
  (props, forwardedRef) => {
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

    const { ref } = useListItem();
    const mergedRef = useMergeRefs([forwardedRef, ref]);

    const stableId = useStableId();
    const itemKey = menuItemKey ?? stableId;

    const [subMenuOpen, setSubMenuOpen] = useState(false);

    const [hovered, setHovered] = useState(false);

    const {
      enabled: canCopyToClipboard,
      valueToCopy,
      copiedLabel,
      labelTimerReset,
      delayClickEvent,
    } = getCopyConfig({
      copyable,
      copyValue,
      disabled,
    });
    const { temporaryLabel, setTemporaryLabel } =
      useTemporaryLabel(labelTimerReset);

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
          if (delayClickEvent) {
            setTimeout(() => {
              onClick && onClick({ ...itemData, domEvent: event });
            }, delayClickEvent);
            return;
          }
          onClick && onClick({ ...itemData, domEvent: event });
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (!disabled && event.key === 'Enter') {
        if (subMenu) {
          setSubMenuOpen(!subMenuOpen);
        } else {
          event.preventDefault();
          if (canCopyToClipboard && valueToCopy) {
            copy(valueToCopy);
            setTemporaryLabel(true);
            if (delayClickEvent) {
              setTimeout(() => {
                onClick && onClick({ ...itemData, domEvent: event });
              }, delayClickEvent);
              return;
            }
          }
          onClick && onClick({ ...itemData, domEvent: event });
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
      if (canCopyToClipboard && valueToCopy) {
        copy(valueToCopy);
        setTemporaryLabel(true);
      }

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
        ref={mergedRef}
        parent={parent}
        hasSubMenu={!!(subMenu && subMenu.length)}
        subMenuOpen={subMenuOpen}
        prefixElement={prefixElement}
        prefixVisible={shouldRenderPrefix}
        description={description}
        checked={checked}
        suffixElement={suffixElement}
        suffixVisible={shouldRenderSuffix}
        indentLevel={indentLevel}
        content={
          <DynamicLabel
            showAlternative={temporaryLabel}
            content={childrenWithHighlight}
            alternativeContent={canCopyToClipboard ? copiedLabel : undefined}
          />
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
            indentLevel={nextIndentLevel}
            dataSource={subMenu}
            isOpen={subMenuOpen}
            ItemComponent={ItemComponent}
          />
        </>
      );
    }
    return TextNode;
  },
);

export default Text;
