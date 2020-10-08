import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntdTooltip, { TooltipProps } from 'antd/lib/tooltip';
import * as React from 'react';
import Icon from '@synerise/ds-icon';
import NotificationsM from '@synerise/ds-icon/dist/icons/NotificationsM';
import { withTheme } from 'styled-components';
import { Carousel } from 'antd';
import Button from '@synerise/ds-button';
import * as S from './Tooltip.styles';
import TooltipExtendedProps, { tooltipTypes, descriptionType } from './Tooltip.types';

const shouldRenderDescription = (description: descriptionType, type: tooltipTypes): descriptionType | null => {
  if (type === 'default' || !description) return null;
  return description;
};

const Tooltip: React.FC<TooltipExtendedProps & TooltipProps> = ({
  type = 'default',
  icon,
  title,
  description,
  tutorials,
  tutorialAutoplay = false,
  tutorialAutoplaySpeed = 5000,
  theme,
  offset = 'default',
  children,
  button,
  ...props
}) => {
  const shouldRenderIcon = (tooltipType: tooltipTypes, tooltipIcon: React.ReactNode): React.ReactNode | undefined => {
    if (tooltipType !== 'icon') return null;
    if (tooltipIcon && icon) return icon;
    return <Icon component={<NotificationsM />} color={theme.palette['orange-500']} />;
  };

  const renderTooltip = (
    <S.TooltipComponent type={type}>
      <S.TooltipTitle type={type}>
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
      <S.TooltipComponent type={type}>
        <S.TooltipContent>
          <S.TooltipTitle type={type}>{title}</S.TooltipTitle>
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
  }, [button, type, title, description]);

  const renderTutorial = (
    <S.TooltipComponent type={type}>
      <Carousel autoplay={tutorialAutoplay} autoplaySpeed={tutorialAutoplaySpeed} effect="fade">
        {tutorials &&
          tutorials.map(tutorial => (
            <S.TutorialItem key={`${JSON.stringify(tutorial.title)}`}>
              <S.TooltipTitle type="tutorial">{tutorial.title}</S.TooltipTitle>
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

  return titleExists ? (
    <AntdTooltip
      overlayClassName={offsetClassName}
      autoAdjustOverflow={false}
      title={tooltipComponent}
      align={{ offset: [0, 0] }}
      {...props}
    >
      {children}
    </AntdTooltip>
  ) : (
    <>{children}</>
  );
};

const TooltipWithTheme = withTheme(Tooltip);
TooltipWithTheme.displayName = 'Tooltip';
export default TooltipWithTheme;
