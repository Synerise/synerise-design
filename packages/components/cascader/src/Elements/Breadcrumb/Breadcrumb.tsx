import React, { useEffect, useState, useRef, useMemo } from 'react';
import Icon, { AngleRightS } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import { renderWithHighlight } from '@synerise/ds-utils';

import { BreadcrumbProps } from './Breadcrumb.types';
import * as S from './Breadcrumb.styles';
import { shouldHaveArrowPlaceholder, shouldRenderArrow, isOverflown, attachActiveClassName } from './utils';

export const Breadcrumb = ({
  path,
  disabled,
  highlight,
  description,
  onPathClick,
  compact,
  startWithArrow,
  gradientOverlap,
  highlightActivePath,
  className,
  prefixel,
  isNavigation,
  ...rest
}: BreadcrumbProps) => {
  const pathToDisplay: typeof path = useMemo(() => {
    const breadcrumbsArray = [...path];
    return compact ? breadcrumbsArray.reverse() : breadcrumbsArray;
  }, [compact, path]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [gradient, setGradient] = useState<boolean>(false);

  useEffect(() => {
    const shouldRenderGradientOverlap = gradientOverlap && isOverflown(contentRef);
    setGradient(!!shouldRenderGradientOverlap);
  }, [path, contentRef, gradientOverlap]);

  const descriptionWithHighlight = useMemo(() => {
    if (description && typeof description === 'string' && highlight) {
      return renderWithHighlight(description, highlight, 'search-highlight', 'search-highlight');
    }
    return description;
  }, [description, highlight]);

  return (
    <S.Breadcrumb
      tabIndex={0}
      role="menuitem"
      data-testid="ds-cascader-breadrumb"
      className={`${className} ds-breadcrumb`}
      prefixel={!!prefixel}
      disabled={disabled}
      compact={compact}
      clickable={!!onPathClick}
      isNavigation={isNavigation}
      {...rest}
    >
      <S.OuterWrapper>
        {prefixel && (
          <S.PrefixWrapper data-testid="list-item-prefix" disabled={disabled}>
            {prefixel}
          </S.PrefixWrapper>
        )}
        <S.InnerWrapper>
          {!!description && (
            <S.Description data-testid="ds-cascader-breadcrumb-description">{descriptionWithHighlight}</S.Description>
          )}

          <S.ContentWrapper data-testid="ds-cascader-breadcrumb-content" gradientOverlap={gradient}>
            <S.BreadcrumbContent className="breadcrumb-content" ref={contentRef}>
              {pathToDisplay.map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <S.BreadcrumbRoute className="route" key={`${item}-${index}`}>
                  <S.BreadcrumbName
                    className={`ds-breadcrumb-name ${attachActiveClassName(
                      index,
                      !!highlightActivePath,
                      path,
                      !!compact
                    )}`}
                    onClick={(): void => {
                      // eslint-disable-next-line no-unused-expressions
                      onPathClick?.(item);
                    }}
                  >
                    {renderWithHighlight(item, highlight)}
                  </S.BreadcrumbName>
                  {shouldHaveArrowPlaceholder(index, path, !!compact, !!startWithArrow) && (
                    <S.ArrowRight className="ds-arrow" visible={shouldRenderArrow(path, index, !!startWithArrow)}>
                      <Icon component={<AngleRightS />} color={theme.palette['grey-600']} />
                    </S.ArrowRight>
                  )}
                </S.BreadcrumbRoute>
              ))}
            </S.BreadcrumbContent>
          </S.ContentWrapper>
        </S.InnerWrapper>
      </S.OuterWrapper>
    </S.Breadcrumb>
  );
};

export default Breadcrumb;
