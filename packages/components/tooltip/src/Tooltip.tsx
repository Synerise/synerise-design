import { Carousel } from 'antd';
import AntdTooltip from 'antd/lib/tooltip';
import React, {
  type MouseEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { theme } from '@synerise/ds-core';
import '@synerise/ds-core/dist/js/style';
import Icon, { NotificationsM } from '@synerise/ds-icon';
import Scrollbar from '@synerise/ds-scrollbar';
import { getPopupContainer } from '@synerise/ds-utils';

import * as S from './Tooltip.styles';
import {
  type TooltipProps,
  type descriptionType,
  type tooltipTypes,
} from './Tooltip.types';
import './style/index.less';

const shouldRenderDescription = (
  description: descriptionType,
  type: tooltipTypes,
): descriptionType | null => {
  if (type === 'default' || !description) {
    return null;
  }
  return description;
};

const shouldRenderIcon = (
  tooltipType: tooltipTypes,
  tooltipIcon: ReactNode,
): ReactNode | undefined => {
  if (tooltipType !== 'icon') {
    return tooltipIcon;
  }
  return (
    <Icon component={<NotificationsM />} color={theme.palette['orange-500']} />
  );
};

const Tooltip = ({
  type = 'default',
  icon,
  title,
  shortCuts,
  status,
  description,
  tutorials,
  tutorialAutoplay = false,
  tutorialAutoplaySpeed = 5000,
  timeToHideAfterClick = 0,
  offset = 'default',
  children,
  button,
  render,
  image,
  disabled,
  ...props
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutClickRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const captureClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const finalDescription = shouldRenderDescription(description, type);

  const tooltipComponent = (
    <S.TooltipComponent onClick={captureClick} tooltipType={type}>
      <S.TooltipContent>
        {status && <S.TooltipStatus>{status}</S.TooltipStatus>}
        {title && (
          <S.TooltipTitle tooltipType={type}>
            {shouldRenderIcon(type, icon)}
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
          <S.TooltipImage extraMargin={!!finalDescription}>
            {image}
          </S.TooltipImage>
        )}
        {finalDescription && (
          <S.TooltipDescription tooltipType={type}>
            {type === 'largeScrollable' ? (
              <Scrollbar absolute maxHeight={90} style={{ paddingRight: 16 }}>
                <>{finalDescription}</>
              </Scrollbar>
            ) : (
              finalDescription
            )}
          </S.TooltipDescription>
        )}
      </S.TooltipContent>
      {button && <S.TooltipButton>{button}</S.TooltipButton>}
    </S.TooltipComponent>
  );

  const tutorialComponent = (
    <S.TooltipComponent onClick={captureClick} tooltipType={type}>
      <Carousel
        autoplay={tutorialAutoplay}
        autoplaySpeed={tutorialAutoplaySpeed}
        effect="fade"
      >
        {tutorials &&
          tutorials.map((tutorial) => (
            <S.TutorialItem key={`${JSON.stringify(tutorial.title)}`}>
              <S.TooltipTitle tooltipType="tutorial">
                {tutorial.title}
              </S.TooltipTitle>
              <S.TooltipDescription tooltipType="tutorial">
                {tutorial.description}
              </S.TooltipDescription>
            </S.TutorialItem>
          ))}
      </Carousel>
    </S.TooltipComponent>
  );

  const tooltipContent =
    type === 'tutorial' ? tutorialComponent : tooltipComponent;

  const overlayClassName = useMemo(() => {
    return `ds-tooltip-offset-${offset} ds-tooltip-type-${type}`;
  }, [offset, type]);

  const titleExists = Boolean(
    description || title || icon || tutorials?.length,
  );

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

  if (render !== undefined) {
    return (
      <AntdTooltip
        overlayClassName={overlayClassName}
        autoAdjustOverflow={false}
        title={render()}
        align={{ offset: [0, 0] }}
        getPopupContainer={getPopupContainer}
        {...handleHideAfterClick}
        {...props}
      >
        {children}
      </AntdTooltip>
    );
  }

  return titleExists && !disabled ? (
    <AntdTooltip
      overlayClassName={overlayClassName}
      title={tooltipContent}
      align={{ offset: [0, 0] }}
      getPopupContainer={getPopupContainer}
      {...handleHideAfterClick}
      {...props}
    >
      {children}
    </AntdTooltip>
  ) : (
    <>{children}</>
  );
};

export default Tooltip;
