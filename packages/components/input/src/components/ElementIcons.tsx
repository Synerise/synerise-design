import React, { cloneElement } from 'react';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import { BaseProps } from '../Input.types';
import * as S from '../Input.styles';

type IconProps = Pick<BaseProps, 'icon1' | 'icon1Tooltip' | 'icon2' | 'icon2Tooltip' | 'className'> & {
  disabled?: boolean;
  handleIconsClick: () => void;
  type: string;
};

export const ElementIcons = ({
  handleIconsClick,
  disabled,
  icon1Tooltip,
  icon1,
  icon2,
  icon2Tooltip,
  className,
  type,
}: IconProps) => {
  if (!icon1 && !icon2) {
    return null;
  }
  return (
    <S.IconsWrapper onClick={handleIconsClick} disabled={disabled}>
      <S.IconsFlexContainer type={type}>
        <Tooltip title={icon1Tooltip}>
          <S.IconWrapper className={className}>
            {icon1 &&
              cloneElement(icon1, {
                className: 'icon icon1',
                ...(icon2 && { style: { marginRight: '4px' } }),
              })}
          </S.IconWrapper>
        </Tooltip>
        <Tooltip title={icon2Tooltip}>
          <S.IconWrapper className={className}>
            {icon2 && cloneElement(icon2, { className: 'icon icon2' })}
          </S.IconWrapper>
        </Tooltip>
      </S.IconsFlexContainer>
    </S.IconsWrapper>
  );
};
