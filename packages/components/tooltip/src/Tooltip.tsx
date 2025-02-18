import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntdTooltip from 'antd/lib/tooltip';
import React, { ReactNode, useRef, useState, useMemo, useEffect, MouseEvent } from 'react';
import { Carousel } from 'antd';
import { getPopupContainer } from '@synerise/ds-utils';
import Icon, { NotificationsM } from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import { theme } from '@synerise/ds-core';
import Scrollbar from '@synerise/ds-scrollbar';
import * as S from './Tooltip.styles';
import { tooltipTypes, descriptionType, TooltipProps } from './Tooltip.types';

const shouldRenderDescription = (description: descriptionType, type: tooltipTypes): descriptionType | null => {
  if (type === 'default' || !description) return null;
  return description;
};
const shouldRenderTitle = (type: tooltipTypes, title: ReactNode): ReactNode | null => {
  return type !== 'largeSimple' ? title : null;
};
const shouldRenderStatus = (status: ReactNode | null, type: tooltipTypes): descriptionType | null => {
  if (type === 'status' || status) return status;
  return null;
};

const Tooltip = ({
  type = 'default',
  icon,
  title,
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
  ...props
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutClickRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const shouldRenderIcon = (tooltipType: tooltipTypes, tooltipIcon: ReactNode): ReactNode | undefined => {
    if (tooltipType !== 'icon') return null;
    if (tooltipIcon && icon) return icon;
    return <Icon component={<NotificationsM />} color={theme.palette['orange-500']} />;
  };

  const renderButton = useMemo(() => {
    const buttonMode = (): string => {
      // @ts-ignore
      const { buttonIcon, label } = button;
      if (buttonIcon && label) return 'icon-label';
      if (buttonIcon) return 'single-icon';
      return 'label';
    };

    return button ? (
      <S.TooltipButton>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Button type="ghost-white" mode={buttonMode()} onClick={button?.onClick}>
          {button?.buttonIcon}
          {button?.label}
        </Button>
      </S.TooltipButton>
    ) : (
      <></>
    );
  }, [button]);

  const captureClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const tooltipComponent = (
    <S.TooltipComponent onClick={captureClick} tooltipType={type}>
      <S.TooltipContent>
        <S.TooltipStatus tooltipType={type}>{type && shouldRenderStatus(status, type)}</S.TooltipStatus>
        <S.TooltipTitle tooltipType={type}>
          {type && shouldRenderIcon(type, icon)}
          <S.TooltipTitleWrapper>{type && shouldRenderTitle(type, title)}</S.TooltipTitleWrapper>
        </S.TooltipTitle>
        <S.TooltipDescription tooltipType={type}>
          {image && <S.TooltipImage>{image}</S.TooltipImage>}
          {type === 'largeScrollable' ? (
            <Scrollbar absolute maxHeight={90} style={{ paddingRight: 16 }}>
              <>{shouldRenderDescription(description, type)}</>
            </Scrollbar>
          ) : (
            shouldRenderDescription(description, type)
          )}
        </S.TooltipDescription>
      </S.TooltipContent>
      {renderButton}
    </S.TooltipComponent>
  );

  const buttonComponent = (
    <S.TooltipComponent onClick={captureClick} tooltipType={type}>
      <S.TooltipContent>
        <S.TooltipStatus tooltipType={type}>{status}</S.TooltipStatus>
        <S.TooltipTitle tooltipType={type}>
          <S.TooltipTitleWrapper>{title}</S.TooltipTitleWrapper>
        </S.TooltipTitle>
        <S.TooltipDescription tooltipType={type}>{description}</S.TooltipDescription>
      </S.TooltipContent>
      {renderButton}
    </S.TooltipComponent>
  );

  const tutorialComponent = (
    <S.TooltipComponent onClick={captureClick} tooltipType={type}>
      <Carousel autoplay={tutorialAutoplay} autoplaySpeed={tutorialAutoplaySpeed} effect="fade">
        {tutorials &&
          tutorials.map(tutorial => (
            <S.TutorialItem key={`${JSON.stringify(tutorial.title)}`}>
              <S.TooltipTitle tooltipType="tutorial">{tutorial.title}</S.TooltipTitle>
              <S.TooltipDescription tooltipType="tutorial">{tutorial.description}</S.TooltipDescription>
            </S.TutorialItem>
          ))}
      </Carousel>
    </S.TooltipComponent>
  );

  let component: JSX.Element;
  switch (type) {
    case 'tutorial':
      component = tutorialComponent;
      break;
    case 'button':
      component = buttonComponent;
      break;
    default:
      component = tooltipComponent;
  }

  const overlayClassName = useMemo(() => {
    return `ds-tooltip-offset-${offset} ds-tooltip-type-${type}`;
  }, [offset, type]);

  const titleExists = Boolean(description || title || icon || tutorials?.length);

  useEffect(() => {
    return (): void => {
      timeoutClickRef.current && clearTimeout(timeoutClickRef.current);
    };
  }, []);

  const handleOnClickHideDelay = (visible: boolean): void => {
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

  /* eslint-disable-next-line react/destructuring-assignment */
  const handleHideAfterClick = props.trigger === 'click' &&
    timeToHideAfterClick && {
      visible: isVisible,
      onVisibleChange: (visible: boolean): void => {
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

  return titleExists ? (
    <AntdTooltip
      overlayClassName={overlayClassName}
      autoAdjustOverflow={false}
      title={component}
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
