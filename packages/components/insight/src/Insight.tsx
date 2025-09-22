import React, { type ReactNode, useMemo } from 'react';

import InlineAlert, { type InlineAlertProps } from '@synerise/ds-inline-alert';

import * as S from './Insight.styles';
import type { InsightProps } from './Insight.types';

const isInlineAlertPropsArray = (
  value: InlineAlertProps[] | ReactNode,
): value is InlineAlertProps[] => {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        !React.isValidElement(item) &&
        'message' in item &&
        'type' in item,
    )
  );
};

const Insight = ({
  title,
  subTitle,
  avatar,
  headerRightSide,
  content,
  footer,
  onClick,
  className,
  ...htmlAttributes
}: InsightProps) => {
  const renderedContent = useMemo<ReactNode>(() => {
    if (isInlineAlertPropsArray(content)) {
      return content.map((props, index) => (
        <InlineAlert key={index} {...props} />
      ));
    }
    return content ?? null;
  }, [content]);
  return (
    <S.InsightContainer
      className={`ds-insight ${className || ''}`}
      hasHover={!!onClick}
      onClick={onClick}
      {...htmlAttributes}
    >
      <S.InsightHeaderBar>
        <S.InsightAvatarWrapper>
          {avatar}
          <S.InsightTextWrapper avatar={!!avatar}>
            <S.Title>{title}</S.Title>
            <S.SubTitle>{subTitle}</S.SubTitle>
          </S.InsightTextWrapper>
        </S.InsightAvatarWrapper>
        {headerRightSide}
      </S.InsightHeaderBar>
      {renderedContent && (
        <S.InsightContent>{renderedContent}</S.InsightContent>
      )}
      {footer && <S.InsightFooter>{footer}</S.InsightFooter>}
    </S.InsightContainer>
  );
};
export default Insight;
