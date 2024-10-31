import React, {
  CSSProperties,
  FC,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import 'rc-trigger/assets/index.less';
import classNames from 'classnames';
import { useTheme } from 'styled-components';
import copy from 'copy-to-clipboard';
import Trigger from 'rc-trigger';

import Tooltip from '@synerise/ds-tooltip';
import { escapeRegEx } from '@synerise/ds-utils';
import Icon, { CheckS, AngleRightS } from '@synerise/ds-icon';
import { theme, ThemePropsVars } from '@synerise/ds-core';

import * as S from './Text.styles';
import { triggerPlacements } from '../../../utils';
import { VisibilityTrigger } from '../../../Menu.types';
import { AddonRenderer, BasicItemProps } from './Text.types';

const renderAddon = (addon: ReactNode | AddonRenderer, ...params: Parameters<AddonRenderer>): ReactNode => {
  return addon instanceof Function ? addon(...params) : addon;
};

export type HoverTooltipProps = PropsWithChildren<{
  hoverTooltipProps?: BasicItemProps['hoverTooltipProps'];
  renderHoverTooltip?: () => JSX.Element;
  style?: CSSProperties;
}>;

function WithHoverTooltip({ hoverTooltipProps, renderHoverTooltip, children, style }: HoverTooltipProps): JSX.Element {
  const dsTheme = useTheme() as ThemePropsVars;
  const zIndex = parseInt(dsTheme.variables['zindex-tooltip'], 10);

  const cancelBubblingEvent = useCallback(
    () =>
      (ev: Event): void => {
        ev.stopPropagation();
      },
    []
  );
  // onKeyDown is used to disallow propagating key events to tooltip's container element
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onKeyDown={cancelBubblingEvent} onClick={cancelBubblingEvent}>
      <Trigger
        builtinPlacements={triggerPlacements}
        defaultPopupVisible={hoverTooltipProps?.defaultPopupVisible ?? false}
        action={hoverTooltipProps?.action || ['click', 'hover']}
        popupPlacement={hoverTooltipProps?.popupPlacement || 'right'}
        popup={renderHoverTooltip && renderHoverTooltip()}
        popupClassName="ignore-click-outside ds-hide-arrow"
        mouseEnterDelay={0.2}
        popupStyle={{ zIndex }}
        zIndex={zIndex}
        {...hoverTooltipProps}
      >
        <div style={style}>{children as ReactElement}</div>
      </Trigger>
    </div>
  );
}

const Text: FC<BasicItemProps> = ({
  parent,
  disabled,
  prefixel,
  suffixel,
  danger,
  children,
  description,
  copyable,
  copyHint,
  copyValue,
  copyTooltip,
  timeToHideTooltip,
  highlight,
  style,
  prefixVisibilityTrigger,
  suffixVisibilityTrigger,
  indentLevel,
  ordered,
  onClick,
  checked,
  tooltipProps,
  hoverTooltipProps,
  renderHoverTooltip,
  size = 'default',
  ...rest
}) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const canCopyToClipboard = copyable && copyHint && copyValue && !disabled;
  const showSuffixOnHover = suffixVisibilityTrigger === VisibilityTrigger.HOVER;
  const showPrefixOnHover = prefixVisibilityTrigger === VisibilityTrigger.HOVER;

  const suffixElement = useMemo(() => renderAddon(suffixel, hovered), [suffixel, hovered]);
  const prefixElement = useMemo(() => renderAddon(prefixel, hovered), [prefixel, hovered]);

  const renderChildren = (): ReactNode => {
    if (highlight && typeof children === 'string') {
      const index = children.toLocaleLowerCase().indexOf(highlight.toLocaleLowerCase());
      if (index === -1) {
        return children;
      }
      const escapedHighlight = escapeRegEx(highlight);
      const startOfQuery = children.toLowerCase().search(escapedHighlight.toLowerCase());
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
  };
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

  const element = (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <S.Wrapper
      onMouseOver={(): void => {
        setHovered(true);
      }}
      onMouseLeave={(): void => {
        setHovered(false);
      }}
      onMouseDown={(): void => {
        setClicked(!clicked);
        canCopyToClipboard && copyValue && copy(copyValue);
      }}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      description={description}
      style={renderHoverTooltip ? undefined : style}
      ordered={ordered}
      size={size}
      onClick={onClick}
      {...rest}
      data-name={typeof children === 'string' ? children : undefined}
      className={className}
    >
      <Tooltip
        type="default"
        trigger="click"
        title={copyTooltip}
        timeToHideAfterClick={timeToHideTooltip}
        {...tooltipProps}
      >
        <S.Inner indentLevel={Number(indentLevel)}>
          <S.ContentWrapper className="ds-menu-content-wrapper">
            {shouldRenderPrefix && (
              <S.PrefixelWrapper className="ds-menu-prefix" visible={shouldRenderPrefix} disabled={disabled}>
                {renderPrefixElement(hovered)}
              </S.PrefixelWrapper>
            )}
            <S.Content className="ds-menu-content" highlight={!!highlight}>
              {canCopyToClipboard && hovered ? copyHint : renderChildren()}
              {!!description && <S.Description>{description}</S.Description>}
            </S.Content>
            {parent && (
              <S.ArrowRight disabled={disabled}>
                <Icon component={<AngleRightS />} color={theme.palette['grey-600']} />
              </S.ArrowRight>
            )}
            <S.ContentDivider />
            {(!!suffixElement || !!checked) && (
              <S.SuffixWraper visible={shouldRenderSuffix} disabled={disabled}>
                {!!checked && <Icon component={<CheckS />} color={theme.palette[`green-600`]} />}
                {suffixElement}
              </S.SuffixWraper>
            )}
          </S.ContentWrapper>
        </S.Inner>
      </Tooltip>
    </S.Wrapper>
  );
  if (renderHoverTooltip) {
    return (
      <WithHoverTooltip hoverTooltipProps={hoverTooltipProps} renderHoverTooltip={renderHoverTooltip} style={style}>
        {element}
      </WithHoverTooltip>
    );
  }
  return element;
};

export default Text;
