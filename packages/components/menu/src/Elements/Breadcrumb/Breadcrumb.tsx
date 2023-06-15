import * as React from 'react';
import Icon, { AngleRightS } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import { escapeRegEx } from '@synerise/ds-utils';
import * as S from './Breadcrumb.styles';
import { MenuItemProps } from '../Item/MenuItem.types';
import { BreadcrumbProps } from './Breadcrumb.types';

const Breadcrumb: React.FC<BreadcrumbProps & MenuItemProps> = ({
  path,
  disabled,
  highlight,
  description,
  onPathClick,
  compact,
  startWithArrow,
  gradientOverlap,
  highlightActivePath,
  ...rest
}) => {
  const { prefixel } = rest;
  const breadcrumbsArray = [...path];
  const pathToDisplay: typeof path = compact ? breadcrumbsArray.reverse() : breadcrumbsArray;
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [gradient, setGradient] = React.useState<boolean>(false);

  const renderWithHighlighting = React.useCallback(
    (name: string | React.ReactNode): React.ReactNode => {
      if (highlight && typeof name === 'string') {
        const index = name.toLocaleLowerCase().indexOf(highlight.toLocaleLowerCase());
        if (index === -1) {
          return name;
        }
        const escapedHighlight = escapeRegEx(highlight);
        const startOfQuery = name.toLowerCase().search(escapedHighlight.toLowerCase());
        const endOfQuery = startOfQuery + highlight.length;
        const resultArray = [
          name.substring(0, startOfQuery),
          <span key={name} className="search-highlight">
            {name.substring(startOfQuery, endOfQuery)}
          </span>,
          name.substring(endOfQuery, name.length),
        ];
        return resultArray;
      }
      return name;
    },
    [highlight]
  );

  const attachActiveClassName = React.useCallback(
    (index: number): string => {
      if (compact) {
        return !!highlightActivePath && index === 0 ? 'active' : '';
      }
      return !!highlightActivePath && index === path.length - 1 ? 'active' : '';
    },
    [highlightActivePath, path, compact]
  );
  const shouldRenderArrow = (breadCrumbPath: string[], index: number): boolean => {
    if (!breadCrumbPath || !breadCrumbPath.length) {
      return false;
    }
    const nextBreadcrumb = breadCrumbPath[index + 1];
    if (!nextBreadcrumb) {
      return !!startWithArrow;
    }
    return true;
  };
  const shouldHaveArrowPlaceholder = (index: number): boolean => {
    if (compact) {
      return startWithArrow || (index < path.length - 1 && path.length > 1);
    }
    return startWithArrow || path.length > 1 || index > 0;
  };
  const isOverflown = (elementRef: React.RefObject<HTMLDivElement>): boolean => {
    if (elementRef !== null && elementRef.current !== null) {
      const element = elementRef.current;
      return element.scrollWidth > element.clientWidth;
    }
    return false;
  };

  React.useEffect(() => {
    const shouldRenderGradientOverlap = gradientOverlap && isOverflown(contentRef);
    setGradient(!!shouldRenderGradientOverlap);
  }, [path, contentRef, gradientOverlap]);

  return (
    <S.Breadcrumb className="ds-breadcrumb" disabled={disabled} compact={compact} onPathClick={onPathClick} {...rest}>
      {!!description && <S.Description>{renderWithHighlighting(description)}</S.Description>}
      <S.ContentWrapper gradientOverlap={gradient}>
        <S.BreadcrumbContent className="breadcrumb-content" prefixel={!!prefixel} ref={contentRef}>
          {pathToDisplay.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <S.BreadcrumbRoute className="route" key={`${item}-${index}`}>
              <S.BreadcrumbName
                className={`ds-breadcrumb-name ${attachActiveClassName(index)}`}
                onClick={(): void => {
                  onPathClick && onPathClick(item);
                }}
              >
                {renderWithHighlighting(item)}
              </S.BreadcrumbName>
              {shouldHaveArrowPlaceholder(index) && (
                <S.ArrowRight className="ds-arrow" visible={shouldRenderArrow(path, index)}>
                  <Icon component={<AngleRightS />} color={theme.palette['grey-600']} />
                </S.ArrowRight>
              )}
            </S.BreadcrumbRoute>
          ))}
        </S.BreadcrumbContent>
      </S.ContentWrapper>
    </S.Breadcrumb>
  );
};

export default Breadcrumb;
