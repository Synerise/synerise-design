import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntdTooltip, { TooltipProps } from 'antd/lib/tooltip';
import * as React from 'react';
import Icon from '@synerise/ds-icon';
import NotificationsM from '@synerise/ds-icon/dist/icons/NotificationsM';
import { withTheme } from 'styled-components';
import * as S from './Tooltip.styles';
import TooltipExtendedProps, { tooltipTypes, typesOverlayClasses } from './Tooltip.types';

const Tooltip: React.FC<TooltipExtendedProps & TooltipProps> = ({
  type,
  icon,
  title,
  description,
  theme,
  ...props
}) => {
  const shouldRenderIcon = (tooltipType: tooltipTypes, tooltipIcon: React.ReactNode): React.ReactNode | undefined => {
    if (tooltipType !== 'icon') return null;
    if (tooltipIcon && icon) return icon;
    return <Icon component={<NotificationsM />} color={theme.palette['orange-500']} />;
  };

  const tooltipComponent = (
    <S.TooltipComponent type={type}>
      <S.TooltipTitle type={type}>
        {type && shouldRenderIcon(type, icon)}
        {type !== 'largeSimple' ? title : null}
      </S.TooltipTitle>
      <S.TooltipDescription type={type}>{type !== 'default' && description ? description : null}</S.TooltipDescription>
    </S.TooltipComponent>
  );
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <AntdTooltip {...props} title={tooltipComponent} overlayClassName={type && typesOverlayClasses[type]} />;
};

export default withTheme(Tooltip);
