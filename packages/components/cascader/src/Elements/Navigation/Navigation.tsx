import React from 'react';

import { theme } from '@synerise/ds-core';
import Divider from '@synerise/ds-divider';
import Icon, { HomeM } from '@synerise/ds-icon';

import * as S from '../../Cascader.styles';
import { BackAction } from '../BackAction/BackAction';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
import { type NavigationProps } from './Navigation.types';

export const Navigation = ({
  backActionVisible,
  onHomeIconClick,
  onPathClick,
  activeCategory,
  previousCategory,
  breadcrumbVisible,
}: NavigationProps) => {
  const renderBreadcrumbs = () => {
    return breadcrumbVisible && activeCategory ? (
      <>
        <Breadcrumb
          isNavigation
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

  const renderBackAction = () => {
    return backActionVisible && previousCategory ? (
      <BackAction
        label={previousCategory.name}
        onClick={() => {
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
