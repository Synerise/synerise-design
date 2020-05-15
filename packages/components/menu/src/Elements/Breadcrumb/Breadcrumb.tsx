import * as React from 'react';
import Icon from '@synerise/ds-icon';
import AngleRightS from '@synerise/ds-icon/dist/icons/AngleRightS';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { escapeRegEx } from '@synerise/ds-utils';
import * as S from './Breadcrumb.styles';

export interface BreadcrumbRoutes {
  path: string;
  name: string;
}
export interface BreadcrumbProps {
  prefixel?: React.ReactNode;
  disabled?: boolean;
  routes: BreadcrumbRoutes[];
  highlight?: string;
}
type RouteRefs = BreadcrumbRoutes & {
  ref: React.RefObject<HTMLDivElement>;
  arrowSuffix: boolean;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ routes, disabled, highlight, ...rest }) => {
  const [routesWithRefs, setRoutesWithRefs] = React.useState<RouteRefs[]>([]);

  React.useEffect(() => {
    const newRoutes = routes.map(
      (route: BreadcrumbRoutes): RouteRefs => {
        return {
          ...route,
          ref: React.createRef<HTMLDivElement>(),
          arrowSuffix: true,
        };
      }
    );
    setRoutesWithRefs(newRoutes);
  }, [routes]);

  const renderNameWithHighlight = React.useCallback(
    (name: string): React.ReactNode => {
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

  const isArrowVisible = (breadcrumbs: RouteRefs[], index: number): boolean => {
    if (!breadcrumbs || !breadcrumbs.length) {
      return false;
    }
    const nextBreadcrumb = breadcrumbs[index + 1];
    if (!nextBreadcrumb) {
      return false;
    }
    return breadcrumbs[index].arrowSuffix;
  };
  return (
    <S.Breadcrumb className="ds-breadcrumb" disabled={disabled} {...rest}>
      <S.BreadcrumbContent className="breadcrumb-content">
        {routesWithRefs.map((item, index) => (
          <S.BreadcrumbRoute className="route" key={item.name} ref={item.ref}>
            <S.BreadcrumbName className="ds-breadcrumb-name">{renderNameWithHighlight(item.name)}</S.BreadcrumbName>
            <S.ArrowRight visible={isArrowVisible(routesWithRefs, index)}>
              <Icon component={<AngleRightS />} color={theme.palette['grey-600']} />
            </S.ArrowRight>
          </S.BreadcrumbRoute>
        ))}
      </S.BreadcrumbContent>
    </S.Breadcrumb>
  );
};

export default Breadcrumb;
