import React, { type MouseEvent } from 'react';

import Scrollbar from '@synerise/ds-scrollbar';

import * as S from './Tooltip.styles';
import { type TooltipContentProps } from './Tooltip.types';

export const TooltipContent = ({
  type,
  title,
  button,
  description,
  shortCuts,
  icon,
  status,
  image,
  overlayStyle,
}: TooltipContentProps) => {
  const captureClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  const shouldRenderDescription = type !== 'default' && description;
  return (
    <S.TooltipComponent
      onClick={captureClick}
      tooltipType={type}
      style={overlayStyle}
    >
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
};
