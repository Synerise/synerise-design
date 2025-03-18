import React, { useState, useMemo, MouseEvent, FocusEvent } from 'react';
import copy from 'copy-to-clipboard';
import { renderWithHighlight } from '@synerise/ds-utils';
import Tooltip from '@synerise/ds-tooltip';
import Icon, { AngleRightS, CheckS } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';

import { BasicItemProps, itemSizes } from '../../ListItem.types';
import * as S from './Text.styles';
import { HoverTooltip } from '../index';
import { renderAddon, removeHandlerProps } from './utils';

const Text = (props: BasicItemProps) => {
  const {
    checked,
    className,
    children,
    itemKey,
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

    onClick,
    onMouseOver,
    onMouseDown,
    onMouseLeave,
    onFocus,
    onItemHover,

    prefixVisibilityTrigger,
    suffixVisibilityTrigger,
    highlight,

    style,

    hoverTooltipProps,
    renderHoverTooltip,
    ...rest
  } = props;

  const [hovered, setHovered] = useState(false);

  const canCopyToClipboard = copyable && copyValue && !disabled;

  const showSuffixOnHover = suffixVisibilityTrigger === 'hover';
  const showPrefixOnHover = prefixVisibilityTrigger === 'hover';

  const suffixElement = useMemo(() => renderAddon(suffixel, hovered), [suffixel, hovered]);
  const prefixElement = useMemo(() => renderAddon(prefixel, hovered), [prefixel, hovered]);

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
      return renderWithHighlight(children, highlight, 'ds-list-item-highlight', 'ds-list-item-highlight');
    }
    return children;
  }, [children, highlight]);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      onClick && onClick({ ...itemData, domEvent: event });
    }
  };

  const itemData = {
    key: itemKey,
    item: removeHandlerProps(props),
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

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    setHovered(true);
    canCopyToClipboard && copyValue && copy(copyValue);
    onMouseDown && onMouseDown(event);
  };

  const TextNode = (
    <S.Wrapper
      role="menuitem"
      data-testid="ds-list-item"
      className={`ds-list-item ${className} ${checked ? 'ds-list-item-selected' : ''}`}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onMouseDown={handleMouseDown}
      ordered={ordered}
      disabled={disabled}
      noHover={noHover}
      highlight={!!highlight}
      size={size}
      style={renderHoverTooltip ? undefined : style}
      inTooltip={!!renderHoverTooltip}
      {...rest}
    >
      <Tooltip
        type="default"
        trigger="click"
        title={copyTooltip}
        timeToHideAfterClick={timeToHideTooltip}
        {...tooltipProps}
      >
        <S.Inner>
          {prefixElement && (
            <S.PrefixWrapper data-testid="list-item-prefix" visible={shouldRenderPrefix} disabled={disabled}>
              {prefixElement}
            </S.PrefixWrapper>
          )}
          <S.Content className="ds-list-item-content" highlight={!!highlight}>
            {canCopyToClipboard && hovered && copyHint ? copyHint : childrenWithHighlight}
            {description && size === itemSizes.LARGE && <S.Description>{description}</S.Description>}
          </S.Content>
          {parent && (
            <S.ArrowRight>
              <Icon component={<AngleRightS />} color={theme.palette['grey-600']} />
            </S.ArrowRight>
          )}
          {(!!suffixElement || !!checked) && (
            <S.SuffixWrapper data-testid="list-item-suffix" visible={shouldRenderSuffix} disabled={disabled}>
              {!!checked && <Icon component={<CheckS />} color={theme.palette[`green-600`]} />}
              {suffixElement}
            </S.SuffixWrapper>
          )}
        </S.Inner>
      </Tooltip>
    </S.Wrapper>
  );
  if (renderHoverTooltip) {
    return (
      <HoverTooltip hoverTooltipProps={hoverTooltipProps} renderHoverTooltip={renderHoverTooltip} style={style}>
        {TextNode}
      </HoverTooltip>
    );
  }
  return TextNode;
};

export default Text;
