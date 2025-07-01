import React from 'react';

import * as S from './PageHeader.styles';
import { type PageHeaderProps } from './PageHeader.types';
import { PageHeaderBack } from './PageHeaderBack';
import { PageHeaderClamp } from './PageHeaderClamp';
import { PageHeaderInlineEdit } from './PageHeaderInlineEdit';
import { PageHeaderRightSide } from './PageHeaderRightSide';

const PageHeader = (props: PageHeaderProps) => {
  const {
    goBackIcon,
    className,
    onGoBack,
    onClose,
    children,
    rightSide,
    title,
    description,
    bar,
    tabs,
    isolated,
    inlineEdit,
    more,
    avatar,
    tooltip,
    tooltipIcon,
    handleTooltipClick,
  } = props;

  return (
    <S.MainContainer
      isolated={isolated}
      className={`${className || ''} ds-page-header`}
    >
      <S.PageHeaderContainer>
        {onGoBack && (
          <PageHeaderBack onGoBack={onGoBack} goBackIcon={goBackIcon} />
        )}
        {!!avatar && avatar}
        {inlineEdit && <PageHeaderInlineEdit inlineEdit={inlineEdit} />}
        <PageHeaderClamp
          tooltip={tooltip}
          title={title}
          tooltipIcon={tooltipIcon}
          handleTooltipClick={handleTooltipClick}
        >
          {children}
        </PageHeaderClamp>

        {!!more && <S.PageHeaderMore>{more}</S.PageHeaderMore>}
        {!!description && (
          <S.PageHeaderDescription>{description}</S.PageHeaderDescription>
        )}
        <PageHeaderRightSide onClose={onClose} rightSide={rightSide} />
      </S.PageHeaderContainer>

      {!!tabs && <S.PageHeaderTabsWrapper>{tabs}</S.PageHeaderTabsWrapper>}

      {!!bar && <S.PageHeaderBar>{bar}</S.PageHeaderBar>}
    </S.MainContainer>
  );
};

export default PageHeader;
