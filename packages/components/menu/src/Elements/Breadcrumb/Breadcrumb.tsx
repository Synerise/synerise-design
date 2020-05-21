import * as React from 'react';
import Icon from '@synerise/ds-icon';
import AngleRightS from '@synerise/ds-icon/dist/icons/AngleRightS';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { escapeRegEx } from '@synerise/ds-utils';
import * as S from './Breadcrumb.styles';
import { MenuItemProps } from '../Item/MenuItem.types';

export interface BreadcrumbProps {
  prefixel?: React.ReactNode;
  disabled?: boolean;
  path: string[];
  highlight?: string;
  description?: string | React.ReactNode;
  onPathClick?: (path: string | { id: number | string }) => void;
  compact?: boolean;
  startWithArrow?: boolean;
  gradientOverlap?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps & MenuItemProps> = ({
  path,
  disabled,
  highlight,
  description,
  onPathClick,
  compact,
  startWithArrow,
  gradientOverlap,
  ...rest
}) => {
  const { prefixel } = rest;
  const breadcrumbsArray = [...path];
  const pathToDisplay: typeof path = compact ? breadcrumbsArray.reverse() : breadcrumbsArray;

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
  return (
    <S.Breadcrumb className="ds-breadcrumb" disabled={disabled} compact={compact} onPathClick={onPathClick} {...rest}>
      {!!description && <S.Description>{renderWithHighlighting(description)}</S.Description>}
      <S.ContentWrapper gradientOverlap={gradientOverlap}>
        <S.BreadcrumbContent className="breadcrumb-content" prefixel={!!prefixel}>
          {pathToDisplay.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <S.BreadcrumbRoute className="route" key={`${item}-${index}`}>
              <S.BreadcrumbName
                className="ds-breadcrumb-name"
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
