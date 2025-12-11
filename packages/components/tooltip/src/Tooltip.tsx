import AntdTooltip from 'antd/lib/tooltip';
import React, {
  type MouseEvent,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useMergeRefs } from '@floating-ui/react';
import '@synerise/ds-core/dist/js/style';
import Scrollbar from '@synerise/ds-scrollbar';
import { getPopupContainer } from '@synerise/ds-utils';

import * as S from './Tooltip.styles';
import type { TooltipProps } from './Tooltip.types';
import './style/index.less';

const Tooltip = forwardRef<HTMLElement, TooltipProps>(
  (
    {
      type = 'default',
      icon,
      title,
      shortCuts,
      status,
      description,
      timeToHideAfterClick = 0,
      offset = 'default',
      children,
      button,
      render,
      image,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutClickRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const captureClick = (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
    };
    const shouldRenderDescription = type !== 'default' && description;

    const tooltipComponent = (
      <S.TooltipComponent onClick={captureClick} tooltipType={type}>
        <S.TooltipContent>
          {status && <S.TooltipStatus>{status}</S.TooltipStatus>}
          {title && (
            <S.TooltipTitle tooltipType={type}>
              {icon}
              <S.TooltipTitleWrapper>{title}</S.TooltipTitleWrapper>
              {shortCuts && (
                <S.TooltipHint>
                  {Array.isArray(shortCuts) ? (
                    shortCuts.map((hint, index) => (
                      <S.TooltipKey key={`key-${index}`}>{hint}</S.TooltipKey>
                    ))
                  ) : (
                    <S.TooltipKey>{shortCuts}</S.TooltipKey>
                  )}
                </S.TooltipHint>
              )}
            </S.TooltipTitle>
          )}
          {image && (
            <S.TooltipImage extraMargin={!!shouldRenderDescription}>
              {image}
            </S.TooltipImage>
          )}
          {shouldRenderDescription && (
            <S.TooltipDescription tooltipType={type}>
              {type === 'largeScrollable' ? (
                <Scrollbar absolute maxHeight={90} style={{ paddingRight: 16 }}>
                  <>{shouldRenderDescription}</>
                </Scrollbar>
              ) : (
                shouldRenderDescription
              )}
            </S.TooltipDescription>
          )}
        </S.TooltipContent>
        {button && <S.TooltipButton>{button}</S.TooltipButton>}
      </S.TooltipComponent>
    );

    const overlayClassName = useMemo(() => {
      return `ds-tooltip-offset-${offset} ds-tooltip-type-${type}`;
    }, [offset, type]);

    const tooltipContentExists = Boolean(description || title || icon);

    useEffect(() => {
      return () => {
        timeoutClickRef.current && clearTimeout(timeoutClickRef.current);
      };
    }, []);

    const handleOnClickHideDelay = (visible: boolean) => {
      if (!visible) {
        timeoutClickRef.current && clearTimeout(timeoutClickRef.current);
        setIsVisible(false);
      } else {
        setIsVisible(true);
        timeoutClickRef.current = setTimeout(() => {
          setIsVisible(false);
        }, timeToHideAfterClick);
      }
    };

    const handleHideAfterClick = props.trigger === 'click' &&
      timeToHideAfterClick && {
        visible: isVisible,
        onVisibleChange: (visible: boolean) => {
          handleOnClickHideDelay(visible);
        },
      };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const childrenRef = (children as any)?.ref;
    const mergedRef = useMergeRefs([ref, childrenRef]);

    const tooltipTrigger =
      ref && isValidElement(children)
        ? cloneElement(children, {
            // @ts-expect-error unknown literal property
            mergedRef,
          })
        : children;

    if (render !== undefined) {
      return (
        <AntdTooltip
          overlayClassName={overlayClassName}
          autoAdjustOverflow={false}
          title={render()}
          align={{ offset: [0, 0] }}
          overlayStyle={{ maxWidth: 'unset' }}
          getPopupContainer={getPopupContainer}
          {...handleHideAfterClick}
          {...props}
        >
          {tooltipTrigger}
        </AntdTooltip>
      );
    }
    return tooltipContentExists && !disabled ? (
      <AntdTooltip
        overlayClassName={overlayClassName}
        title={tooltipComponent}
        align={{ offset: [0, 0] }}
        getPopupContainer={getPopupContainer}
        {...handleHideAfterClick}
        {...props}
      >
        {tooltipTrigger}
      </AntdTooltip>
    ) : (
      <>{tooltipTrigger}</>
    );
  },
);

export default Tooltip;
