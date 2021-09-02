import * as React from 'react';
import * as copy from 'copy-to-clipboard';
import { DuplicateS } from '@synerise/ds-icon/dist/icons';

import CopyAction from '../../CopyAction/CopyAction';
import * as S from '../../CodeSnippet.styles';
import { CodeSnippetType, FontSize } from '../../CodeSnippet.types';

export interface SingleCodeProps {
  type?: CodeSnippetType;
  className?: string;
  children?: string;
  style?: React.CSSProperties;
  tooltipTitleHover?: string;
  tooltipTitleClick?: string;
  fontSize?: FontSize;
}

const SingleCode: React.FC<SingleCodeProps> = ({
  type = CodeSnippetType.INLINE,
  children = '',
  fontSize = FontSize.SMALL,
  tooltipTitleHover,
  tooltipTitleClick,
}) => {
  const iconElement: React.ReactNode = (
    <CopyAction
      tooltipTitleHover={tooltipTitleHover}
      tooltipTitleClick={tooltipTitleClick}
      className={S.ICON_CLASSNAME}
      onClick={(): void => {
        copy(children);
      }}
      icon={<DuplicateS />}
    />
  );

  return (
    <S.CodeSnippetWrapper type={type} fontSize={fontSize}>
      <S.ContentIconWrapper type={type}>
        <S.BlockCodeWrapper fontSize={fontSize} type={type}>
          {children}
        </S.BlockCodeWrapper>
        {iconElement}
      </S.ContentIconWrapper>
    </S.CodeSnippetWrapper>
  );
};

export default SingleCode;
