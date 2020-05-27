import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';
import { HomeM } from '@synerise/ds-icon/dist/icons';
import Divider from '@synerise/ds-divider';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from '../../Cascader.styles';
import BackAction from '../BackAction/BackAction';
import { Category } from '../../Cascader.types';

interface Props {
  breadcrumbVisible?: boolean;
  backActionVisible?: boolean;
  activeCategory: Category;
  previousCategory: Category;
  onHomeIconClick: () => void;
  onPathClick: (item: string) => void;
}

const Navigation: React.FC<Props> = ({
  backActionVisible,
  onHomeIconClick,
  onPathClick,
  activeCategory,
  previousCategory,
  breadcrumbVisible,
}) => {
  const renderBreadcrumbs = (): React.ReactNode | null => {
    return breadcrumbVisible && activeCategory ? (
      <>
        <Menu.Breadcrumb
          path={activeCategory.path}
          onPathClick={onPathClick}
          gradientOverlap
          highlightActivePath
          prefixel={
            <S.BreadcrumbPrefix onClick={onHomeIconClick}>
              <Icon component={<HomeM />} color={theme.palette['grey-600']} />
            </S.BreadcrumbPrefix>
          }
          compact
        />
        <S.DividerContainer>
          <Divider dashed />
        </S.DividerContainer>
      </>
    ) : null;
  };

  const renderBackAction = (): React.ReactNode | null => {
    return backActionVisible && previousCategory ? (
      <BackAction
        label={previousCategory.name}
        onClick={(): void => {
          onPathClick(previousCategory.name);
        }}
      />
    ) : null;
  };

  return (
    <>
      {renderBreadcrumbs()}
      {renderBackAction()}
    </>
  );
};
export default Navigation;
