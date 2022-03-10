/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import * as React from 'react';
import classNames from 'classnames';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as copy from 'copy-to-clipboard';
import { Popover } from 'antd';
import Tooltip from '@synerise/ds-tooltip';
import Icon, { CheckS, AngleRightS } from '@synerise/ds-icon';
import { escapeRegEx } from '@synerise/ds-utils';
import { MenuItemProps as RcMenuItemProps } from 'rc-menu';

import * as S from './Text.styles';
import { VisibilityTrigger } from '../../../Menu.types';
import { AddonRenderer, BasicItemProps } from './Text.types';

const renderAddon = (addon: React.ReactNode | AddonRenderer, ...params: Parameters<AddonRenderer>): React.ReactNode => {
  return addon instanceof Function ? addon(...params) : addon;
};

export type MaybePopoverProps = React.PropsWithChildren<{
  // popoverProps: BasicItemProps['popoverProps'] & React.RefAttributes<React.ReactNode>;
  // popoverProps: BasicItemProps['popoverProps'] & React.Ref<React.ReactNode>;
  // popoverProps: BasicItemProps['popoverProps'] & {ref?: React.RefObject<HTMLDivElement>}; // undefined is not assignable to Omit...TooltipPropsWithout title
  // popoverProps?: BasicItemProps['popoverProps'] & {ref?: React.RefObject<HTMLDivElement>};
  popoverProps?: BasicItemProps['popoverProps']; // .ignore-click-outside
  // popoverProps: Required<BasicItemProps['popoverProps']> & {ref?: React.RefObject<HTMLDivElement>}; // nope, required's too strong
  // renderPopover: BasicItemProps['renderInformationCard'];
  // renderPopover: (ref?: any) => JSX.Element;
  // renderPopover: (ref?: any) => ReturnType<typeof React.forwardRef>;
  // React.forwardRef<HTMLDivElement, InformationCardProps>
  // renderPopover: typeof React.forwardRef;
  // renderPopover: (typeof React.forwardRef<HTMLDivElement, InformationCardProps>);
  // renderPopover: (ref?: any) => JSX.Element;
  // renderPopover: () => JSX.Element; // has to be optional - notice if below
  renderPopover?: () => JSX.Element;
}>;

// function MaybePopover({ popoverProps, renderPopover, children }: MaybePopoverProps): JSX.Element {
// function MaybePopover({ popoverProps, renderPopover: {ref, ...renderPopover}, children }: MaybePopoverProps): JSX.Element {
function MaybePopover({ popoverProps = {}, renderPopover, children }: MaybePopoverProps): JSX.Element {
  const zIndexGreaterThanDropdown = 991050 + 1;
  const cancelBubblingEvent = React.useCallback(
    () => (ev: Event): void => {
      ev.stopPropagation();
    },
    []
  );
  if (renderPopover) {
    // div's onKeyDown is used to counteract to ContextSelectorDropdown's onKeyDown
    return (
      <div onKeyDown={cancelBubblingEvent}>
        <Popover
          defaultVisible={false}
          placement="right"
          // content={renderPopover()}
          // content={<React.Fragment ref={ref}>{renderPopover()}</React.Fragment>}
          // content={renderPopover(ref)}
          // content={<div className='MaybePopoverWrapper' ref={ref}>{renderPopover(ref)}</div>}
          content={renderPopover()}
          overlayClassName='ignore-click-outside'
          // content={renderPopover(ref)} // after adding forwardRef should work
          mouseEnterDelay={0.2}
          overlayStyle={{ zIndex: zIndexGreaterThanDropdown }}
          {...popoverProps}
          overlayInnerStyle={{ paddingBottom: '10px' }}
        >
          {children}
        </Popover>
      </div>
    );
  }
  return <>{children}</>;
}

const Text: React.FC<BasicItemProps> = ({
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
  popoverProps,
  renderInformationCard,// = (ref?: any): JSX.Element => <div ref={ref}>{tooltipProps?.description}</div>, // cannot be given as will always render an empty popover
  size = 'default',
  onItemHover,
  ...rest
}) => {
  const [hovered, setHovered] = React.useState(false);
  const canCopyToClipboard = copyable && copyHint && copyValue && !disabled;
  const showSuffixOnHover = suffixVisibilityTrigger === VisibilityTrigger.HOVER;
  const showPrefixOnHover = prefixVisibilityTrigger === VisibilityTrigger.HOVER;

  const suffixElement = React.useMemo(() => renderAddon(suffixel, hovered), [suffixel, hovered]);
  const prefixElement = React.useMemo(() => renderAddon(prefixel, hovered), [prefixel, hovered]);

  const renderChildren = (): React.ReactNode => {
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
  const shouldRenderSuffix = React.useMemo((): boolean => {
    if (showSuffixOnHover) {
      return (!!suffixElement || !!checked) && hovered;
    }
    return !!suffixElement || !!checked;
  }, [showSuffixOnHover, suffixElement, checked, hovered]);

  const shouldRenderPrefix = React.useMemo((): boolean => {
    if (showPrefixOnHover) {
      return !!prefixElement && hovered;
    }
    return !!prefixElement;
  }, [showPrefixOnHover, prefixElement, hovered]);
  const renderPrefixElement = (isHover: boolean): React.ReactNode =>
    prefixel instanceof Function ? prefixel(isHover) : prefixel;

  const className = React.useMemo<string>(() => {
    return classNames('ds-menu-item', rest.className, size);
  }, [rest.className, size]);

  return (
    <MaybePopover popoverProps={popoverProps} renderPopover={renderInformationCard}>
      <S.Wrapper
        {...(tooltipProps
          ? {}
          : ({
              onMouseOver: (): void => {
                setHovered(true);
              },
              onMouseLeave: (): void => {
                setHovered(false);
              },
              onMouseDown: (): void => {
                canCopyToClipboard && copyValue && copy(copyValue);
              },
              onItemHover,
            } as Partial<RcMenuItemProps>))}
        disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        description={description}
        style={style}
        indentLevel={Number(indentLevel)}
        ordered={ordered}
        size={size}
        onClick={onClick}
        {...rest}
        className={className}
      >
        <Tooltip
          type="default"
          trigger="click"
          title={copyTooltip}
          timeToHideAfterClick={timeToHideTooltip}
          {...tooltipProps}
        >
          <S.Inner>
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
    </MaybePopover>
  );
};

export default Text;
