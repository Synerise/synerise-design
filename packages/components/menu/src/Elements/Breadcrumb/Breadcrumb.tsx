import * as React from 'react';
import Icon from '@synerise/ds-icon';
import AngleRightS from '@synerise/ds-icon/dist/icons/AngleRightS';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { escapeRegEx } from '@synerise/ds-utils';
import * as S from './Breadcrumb.styles';
import { MenuItemProps } from '../Item/MenuItem.types';

export interface BreadcrumbRoute {
  id: number | string;
  path: string[];
  [key: string]: BreadcrumbRoute | number | string | string[];
}

export interface BreadcrumbProps {
  prefixel?: React.ReactNode;
  disabled?: boolean;
  path: string[];
  highlight?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps & MenuItemProps> = ({ path, disabled, highlight, ...rest }) => {

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

  const isArrowVisible = (breadCrumbPath: string[], index: number): boolean => {
    if (!breadCrumbPath || !breadCrumbPath.length) {
      return false;
    }
    const nextBreadcrumb = breadCrumbPath[index + 1];
    if (!nextBreadcrumb) {
      return false;
    }
    return true;
  };
  return (
    <S.Breadcrumb className="ds-breadcrumb" disabled={disabled} {...rest}>
      <S.BreadcrumbContent className="breadcrumb-content">
        {path.map((item, index) => (
          <S.BreadcrumbRoute className="route" key={item}>
            <S.BreadcrumbName className="ds-breadcrumb-name">{renderNameWithHighlight(item)}</S.BreadcrumbName>
            <S.ArrowRight visible={isArrowVisible(path,index)}>
              <Icon component={<AngleRightS />} color={theme.palette['grey-600']} />
            </S.ArrowRight>
          </S.BreadcrumbRoute>
        ))}
      </S.BreadcrumbContent>
    </S.Breadcrumb>
  );
};

export default Breadcrumb;
