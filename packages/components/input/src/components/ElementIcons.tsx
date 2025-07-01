import React, { type MouseEvent, cloneElement } from 'react';

import Icon, { ResizeArrowM } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';

import * as S from '../Input.styles';
import { type BaseProps } from '../Input.types';

type IconProps = Pick<
  BaseProps,
  | 'icon1'
  | 'icon1Tooltip'
  | 'icon2'
  | 'icon2Tooltip'
  | 'className'
  | 'expandable'
  | 'expandableTooltip'
> & {
  disabled?: boolean;
  handleIconsClick: () => void;
  type: string;
  overflown?: boolean;
  handleExpandIconClick?: (event: MouseEvent<HTMLDivElement>) => void;
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
  expandable,
  overflown,
  expandableTooltip,
  handleExpandIconClick,
}: IconProps) => {
  return icon1 || icon2 || expandable ? (
    <S.IconsWrapper onClick={handleIconsClick} disabled={disabled}>
      <S.IconsFlexContainer type={type}>
        {expandable && (
          <Tooltip title={expandableTooltip}>
            <S.IconWrapper
              onClick={handleExpandIconClick}
              className={className}
            >
              {expandable && overflown && (
                <Icon
                  className="icon icon3"
                  component={
                    <ResizeArrowM data-testid="ds-input-icon-expand" />
                  }
                />
              )}
            </S.IconWrapper>
          </Tooltip>
        )}
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
            {icon2 &&
              cloneElement(icon2, {
                className: 'icon icon2',
              })}
          </S.IconWrapper>
        </Tooltip>
      </S.IconsFlexContainer>
    </S.IconsWrapper>
  ) : (
    <></>
  );
};
