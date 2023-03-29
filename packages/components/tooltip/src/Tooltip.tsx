import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntdTooltip from 'antd/lib/tooltip';
import * as React from 'react';
import { getPopupContainer } from '@synerise/ds-utils';
import Icon, { NotificationsM } from '@synerise/ds-icon';
import { Carousel } from 'antd';
import Button from '@synerise/ds-button';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from './Tooltip.styles';
import { tooltipTypes, descriptionType, TooltipProps } from './Tooltip.types';

const shouldRenderDescription = (description: descriptionType, type: tooltipTypes): descriptionType | null => {
  if (type === 'default' || !description) return null;
  return description;
};
const shouldRenderStatus = (status: React.ReactNode | null, type: tooltipTypes): descriptionType | null => {
  if (type === 'status' || status) return status;
  return null;
};

const Tooltip: React.FC<TooltipProps> = ({
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
  ...props
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const timeoutClickRef = React.useRef<null | number>(null);

  const shouldRenderIcon = (tooltipType: tooltipTypes, tooltipIcon: React.ReactNode): React.ReactNode | undefined => {
    if (tooltipType !== 'icon') return null;
    if (tooltipIcon && icon) return icon;
    return <Icon component={<NotificationsM />} color={theme.palette['orange-500']} />;
  };

  const renderTooltip = (
    <S.TooltipComponent tooltipType={type}>
      <S.TooltipStatus tooltipType={type}>{type && shouldRenderStatus(status, type)}</S.TooltipStatus>
      <S.TooltipTitle tooltipType={type}>
        {type && shouldRenderIcon(type, icon)}
        {type !== 'largeSimple' ? title : null}
      </S.TooltipTitle>
      <S.TooltipDescription>{shouldRenderDescription(description, type)}</S.TooltipDescription>
    </S.TooltipComponent>
  );

  const renderButton = React.useMemo(() => {
    const buttonMode = (): string => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const { buttonIcon, label } = button;
      if (buttonIcon && label) return 'icon-label';
      if (buttonIcon) return 'single-icon';
      return 'label';
    };

    return (
      <S.TooltipComponent tooltipType={type}>
        <S.TooltipContent>
          <S.TooltipStatus tooltipType={type}>{status}</S.TooltipStatus>
          <S.TooltipTitle tooltipType={type}>{title}</S.TooltipTitle>
          <S.TooltipDescription>{description}</S.TooltipDescription>
        </S.TooltipContent>
        {button && (
          <S.TooltipButton>
            {/* eslint-disable-next-line react/jsx-handler-names */}
            <Button type="ghost-white" mode={buttonMode()} onClick={button?.onClick}>
              {button?.buttonIcon}
              {button?.label}
            </Button>
          </S.TooltipButton>
        )}
      </S.TooltipComponent>
    );
  }, [button, type, title, description, status]);

  const renderTutorial = (
    <S.TooltipComponent tooltipType={type}>
      <Carousel autoplay={tutorialAutoplay} autoplaySpeed={tutorialAutoplaySpeed} effect="fade">
        {tutorials &&
          tutorials.map(tutorial => (
            <S.TutorialItem key={`${JSON.stringify(tutorial.title)}`}>
              <S.TooltipTitle tooltipType="tutorial">{tutorial.title}</S.TooltipTitle>
              <S.TooltipDescription>{tutorial.description}</S.TooltipDescription>
            </S.TutorialItem>
          ))}
      </Carousel>
    </S.TooltipComponent>
  );

  const tooltipComponent = React.useMemo(() => {
    if (type === 'tutorial') return renderTutorial;
    if (type === 'button') return renderButton;
    return renderTooltip;
  }, [type, renderTooltip, renderTutorial, renderButton]);

  const offsetClassName = React.useMemo(() => {
    return `ds-tooltip-offset-${offset}`;
  }, [offset]);

  const titleExists = Boolean(description || title || icon || tutorials?.length);

  React.useEffect(() => {
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
        overlayClassName={offsetClassName}
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
      overlayClassName={offsetClassName}
      autoAdjustOverflow={false}
      title={tooltipComponent}
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
