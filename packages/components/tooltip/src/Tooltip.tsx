import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntdTooltip, { TooltipProps } from 'antd/lib/tooltip';
import * as React from 'react';
import Icon from '@synerise/ds-icon';
import NotificationsM from '@synerise/ds-icon/dist/icons/NotificationsM';
import { withTheme } from 'styled-components';
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
  theme,
  ...props
}) => {
  const shouldRenderIcon = (tooltipType: tooltipTypes, tooltipIcon: React.ReactNode): React.ReactNode | undefined => {
    if (tooltipType !== 'icon') return null;
    if (tooltipIcon && icon) return icon;
    return <Icon component={<NotificationsM />} color={theme.palette['orange-500']} />;
  };

  // TODO: map tutorial dots, need Icons, uncomment code responsible for array validation, tutorial (and types,styles)
  // Add delay swap tabs action and default change action that might be define by developer
  const titleExists = Boolean(description || title || icon);
  const tooltipComponent = (
    <div>
      <S.TooltipComponent type={type}>
        <S.TooltipTitle type={type}>
          {type && shouldRenderIcon(type, icon)}
          {type !== 'largeSimple' ? title : null}
        </S.TooltipTitle>
        <S.TooltipDescription>{shouldRenderDescription(description, type)}</S.TooltipDescription>
      </S.TooltipComponent>
    </div>
  );
  // eslint-disable-next-line react/jsx-props-no-spreading
  return titleExists ? <AntdTooltip {...props} title={tooltipComponent} /> : null;
};

const TooltipWithTheme = withTheme(Tooltip);
TooltipWithTheme.displayName = 'Tooltip';
export default TooltipWithTheme;
