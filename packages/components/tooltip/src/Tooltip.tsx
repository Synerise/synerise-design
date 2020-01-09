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
  // if(isDescriptionArray) return description[tutorialPart]
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
  // state to change tutorial description array
  // const [tutorialPart, setTutorialPart] = useState<number>(0);

  const shouldRenderIcon = (tooltipType: tooltipTypes, tooltipIcon: React.ReactNode): React.ReactNode | undefined => {
    if (tooltipType !== 'icon') return null;
    if (tooltipIcon && icon) return icon;
    return <Icon component={<NotificationsM />} color={theme.palette['orange-500']} />;
  };
  // const isDescriptionArray = !(typeof description === 'string' || React.isValidElement(description));

  // const children = (description: descriptionType) => {return description.map((element:string, index:number)=>{
  //   return <Icon  component={<svg><circle onClick={()=>{setTutorialPart(index)}} cx='10' cy='10' r="4px" fill="blue" /></svg>} color={'blue'} />
  // })}
  // TODO: map tutorial dots, need Icons, uncomment code responsible for array validation, tutorial (and types,styles)
  // Add delay swap tabs action and default change action that might be define by developer

  const tooltipComponent = (
    <div>
      <S.TooltipComponent type={type}>
        <S.TooltipTitle type={type}>
          {type && shouldRenderIcon(type, icon)}
          {type !== 'largeSimple' ? title : null}
        </S.TooltipTitle>
        <S.TooltipDescription>{shouldRenderDescription(description, type)}</S.TooltipDescription>
      </S.TooltipComponent>
      {/* {description && <S.TooltipTutorial>{type === 'tutorial' && isDescriptionArray ? children(description) : null}</S.TooltipTutorial>} */}
    </div>
  );
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <AntdTooltip {...props} title={tooltipComponent} />;
};

export default withTheme(Tooltip);
