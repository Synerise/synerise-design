import classNames from 'classnames';
import copy from 'copy-to-clipboard';
import { type MenuInfo } from 'rc-menu/lib/interface';
import 'rc-trigger/assets/index.less';
import React, {
  type CSSProperties,
  type PropsWithChildren,
  type ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { useDropdown, useTheme } from '@synerise/ds-core';
import Icon, { AngleRightS, CheckS } from '@synerise/ds-icon';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  getPlacement,
} from '@synerise/ds-popover';
import { escapeRegEx } from '@synerise/ds-utils';

import { VisibilityTrigger } from '../../../Menu.types';
import { useTemporaryLabel } from '../../../hooks/useTemporaryLabel';
import { getCopyConfig } from '../../../utils/getCopyConfig';
import { DynamicLabel } from './DynamicLabel';
import {
  FLIP_CONFIG,
  HOVER_CONFIG,
  OFFSET_CONFIG,
  SHIFT_CONFIG,
  TRANSITION_DURATION,
} from './Text.const';
import * as S from './Text.styles';
import { type AddonRenderer, type BasicItemProps } from './Text.types';

const renderAddon = (
  addon: ReactNode | AddonRenderer,
  ...params: Parameters<AddonRenderer>
): ReactNode => {
  return addon instanceof Function ? addon(...params) : addon;
};

export type HoverTooltipProps = PropsWithChildren<{
  popoverProps?: BasicItemProps['popoverProps'];
  renderHoverTooltip?: () => JSX.Element;
  style?: CSSProperties;
}>;

function WithHoverTooltip({
  popoverProps,
  renderHoverTooltip,
  children,
  style,
}: HoverTooltipProps): JSX.Element {
  const theme = useTheme();
  const zIndex = parseInt(theme.variables['zindex-tooltip'], 10);

  const cancelBubblingEvent = useCallback(
    () =>
      (ev: Event): void => {
        ev.stopPropagation();
      },
    [],
  );
  const popoverPlacement = getPlacement(popoverProps?.placement || 'right');
  return (
    // onKeyDown is used to disallow propagating key events to tooltip's container element
    <S.PropagationStopper
      onKeyDown={cancelBubblingEvent}
      onClick={cancelBubblingEvent}
    >
      <Popover
        trigger="hover"
        modal={false}
        componentId="information-card"
        testId="information-card"
        shiftConfig={SHIFT_CONFIG}
        offsetConfig={OFFSET_CONFIG}
        flipConfig={FLIP_CONFIG}
        hoverConfig={HOVER_CONFIG}
        autoUpdate={{
          layoutShift: true,
        }}
        transitionDuration={TRANSITION_DURATION}
        zIndex={zIndex}
        {...popoverProps}
        placement={popoverPlacement}
      >
        <PopoverContent>
          {renderHoverTooltip && renderHoverTooltip()}
        </PopoverContent>
        <PopoverTrigger asChild>
          <div style={style}>{children}</div>
        </PopoverTrigger>
      </Popover>
    </S.PropagationStopper>
  );
}

const Text = ({
  parent,
  disabled,
  prefixel,
  suffixel,
  danger,
  children,
  description,
  copyable,
  copyValue,
  copyHint,
  copyTooltip,
  timeToHideTooltip,
  tooltipProps,
  highlight,
  style,
  prefixVisibilityTrigger,
  suffixVisibilityTrigger,
  indentLevel,
  ordered,
  onClick,
  checked,
  popoverProps,
  renderHoverTooltip,
  size = 'default',
  ...rest
}: BasicItemProps) => {
  const theme = useTheme();
  const dropdownContext = useDropdown();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const showSuffixOnHover = suffixVisibilityTrigger === VisibilityTrigger.HOVER;
  const showPrefixOnHover = prefixVisibilityTrigger === VisibilityTrigger.HOVER;

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

  const suffixElement = useMemo(
    () => renderAddon(suffixel, hovered),
    [suffixel, hovered],
  );
  const prefixElement = useMemo(
    () => renderAddon(prefixel, hovered),
    [prefixel, hovered],
  );

  const childrenWithHighlight = useMemo(() => {
    if (highlight && typeof children === 'string') {
      const index = children
        .toLocaleLowerCase()
        .indexOf(highlight.toLocaleLowerCase());
      if (index === -1) {
        return children;
      }
      const escapedHighlight = escapeRegEx(highlight);
      const startOfQuery = children
        .toLowerCase()
        .search(escapedHighlight.toLowerCase());
      const endOfQuery = startOfQuery + highlight.length;
      const resultArray = [
        children.substring(0, startOfQuery),
        <span key={children} className="search-highlight">
          {children.substring(startOfQuery, endOfQuery)}
        </span>,
        children.substring(endOfQuery, children.length),
      ];
      return resultArray;
    }
    return children;
  }, [children, highlight]);
  const shouldRenderSuffix = useMemo((): boolean => {
    if (showSuffixOnHover) {
      return (!!suffixElement || !!checked) && hovered;
    }
    return !!suffixElement || !!checked;
  }, [showSuffixOnHover, suffixElement, checked, hovered]);

  const shouldRenderPrefix = useMemo((): boolean => {
    if (showPrefixOnHover) {
      return !!prefixElement && hovered;
    }
    return !!prefixElement;
  }, [showPrefixOnHover, prefixElement, hovered]);
  const renderPrefixElement = (isHover: boolean): ReactNode =>
    prefixel instanceof Function ? prefixel(isHover) : prefixel;

  const className = useMemo<string>(() => {
    return classNames('ds-menu-item', rest.className, size);
  }, [rest.className, size]);

  const mergedStyle = { ...style, paddingLeft: 'revert-layer' };

  const handleClick = (itemData: MenuInfo) => {
    const handler = () => {
      onClick?.(itemData);
      if (dropdownContext?.hideOnItemClick === true) {
        dropdownContext?.setIsOpen(false);
      }
    };
    if (delayClickEvent) {
      setTimeout(handler, delayClickEvent);
      return;
    }
    handler();
  };

  const element = (
    <S.Wrapper
      onMouseOver={(): void => {
        setHovered(true);
      }}
      onMouseLeave={(): void => {
        setHovered(false);
      }}
      onMouseDown={(): void => {
        setClicked(!clicked);
        if (canCopyToClipboard && valueToCopy) {
          copy(valueToCopy);
          setTemporaryLabel(true);
        }
      }}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      description={description}
      style={renderHoverTooltip ? undefined : mergedStyle}
      ordered={ordered}
      size={size}
      onClick={handleClick}
      {...rest}
      data-name={typeof children === 'string' ? children : undefined}
      className={className}
    >
      <S.Inner indentLevel={Number(indentLevel)}>
        <S.ContentWrapper className="ds-menu-content-wrapper">
          {shouldRenderPrefix && (
            <S.PrefixelWrapper
              className="ds-menu-prefix"
              visible={shouldRenderPrefix}
              disabled={disabled}
            >
              {renderPrefixElement(hovered)}
            </S.PrefixelWrapper>
          )}
          <S.Content className="ds-menu-content" highlight={!!highlight}>
            <DynamicLabel
              content={childrenWithHighlight}
              alternativeContent={canCopyToClipboard ? copiedLabel : undefined}
              showAlternative={temporaryLabel}
            />
            {!!description && <S.Description>{description}</S.Description>}
          </S.Content>
          {parent && (
            <S.ArrowRight disabled={disabled}>
              <Icon
                component={<AngleRightS />}
                color={theme.palette['grey-600']}
              />
            </S.ArrowRight>
          )}
          <S.ContentDivider />
          {(!!suffixElement || !!checked) && (
            <S.SuffixWraper visible={shouldRenderSuffix} disabled={disabled}>
              {!!checked && (
                <Icon
                  component={<CheckS />}
                  color={theme.palette[`green-600`]}
                />
              )}
              {suffixElement}
            </S.SuffixWraper>
          )}
        </S.ContentWrapper>
      </S.Inner>
    </S.Wrapper>
  );
  if (renderHoverTooltip) {
    return (
      <WithHoverTooltip
        popoverProps={popoverProps}
        renderHoverTooltip={renderHoverTooltip}
        style={mergedStyle}
      >
        {element}
      </WithHoverTooltip>
    );
  }
  return element;
};

export default Text;
