import copy from 'copy-to-clipboard';
import React from 'react';

import { DuplicateS } from '@synerise/ds-icon';

import { FontSize } from '../../CodeSnippet.types';
import CopyAction from '../../CopyAction/CopyAction';
import * as S from './SingleCode.styles';

export interface SingleCodeProps {
  children?: string;
  className?: string;
  style?: React.CSSProperties;
  tooltipTitleHover?: string;
  tooltipTitleClick?: string;
  fontSize?: FontSize;
  onCopy?: () => void;
  customTriggerComponent?: React.ReactNode;
}

const SingleCode: React.FC<SingleCodeProps> = ({
  children = '',
  fontSize = FontSize.SMALL,
  tooltipTitleHover,
  tooltipTitleClick,
  className,
  onCopy,
  customTriggerComponent,
}) => {
  const iconElement = React.useMemo(
    () => (
      <CopyAction
        tooltipTitleHover={tooltipTitleHover}
        tooltipTitleClick={tooltipTitleClick}
        className={S.ICON_CLASSNAME}
        onClick={(): void => {
          copy(children);
          onCopy && onCopy();
        }}
        icon={<DuplicateS />}
        customTriggerComponent={customTriggerComponent}
        data-testid="ds-copy-code-snippet"
      />
    ),
    [
      children,
      tooltipTitleHover,
      tooltipTitleClick,
      onCopy,
      customTriggerComponent,
    ],
  );

  return (
    <S.CodeSnippetWrapperSingle fontSize={fontSize} className={className}>
      <S.ContentIconWrapper>
        <S.BlockCodeWrapperSingle fontSize={fontSize}>
          {children}
        </S.BlockCodeWrapperSingle>
        {iconElement}
      </S.ContentIconWrapper>
    </S.CodeSnippetWrapperSingle>
  );
};

export default SingleCode;
