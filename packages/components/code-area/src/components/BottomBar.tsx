import React, { type ReactNode } from 'react';

import Button from '@synerise/ds-button';
import Icon, { FullScreenM } from '@synerise/ds-icon';

import * as S from '../CodeArea.styles';
import { type CodeAreaTexts } from '../CodeArea.types';

type BottomBarProps = {
  texts: CodeAreaTexts;
  allowFullscreen?: boolean;
  syntaxSelect?: ReactNode;
  customFooterContent?: ReactNode;
  toggleFullscreen?: () => void;
  noBorder?: boolean;
  hasError?: boolean;
};
export const BottomBar = ({
  texts,
  syntaxSelect,
  customFooterContent,
  allowFullscreen,
  toggleFullscreen,
  noBorder,
  hasError,
}: BottomBarProps) => {
  const fullscreenButton = allowFullscreen && (
    <Button
      type="ghost"
      mode="icon-label"
      icon={<Icon component={<FullScreenM />} />}
      onClick={toggleFullscreen}
    >
      {texts.fullscreen}
    </Button>
  );
  return (
    <S.BottomBar
      noBorder={noBorder}
      hasError={hasError}
      data-testid="code-area-bottombar"
    >
      {syntaxSelect && (
        <S.SyntaxSelect data-testid="code-area-syntaxoptions">
          {syntaxSelect}
        </S.SyntaxSelect>
      )}

      {(customFooterContent || fullscreenButton) && (
        <S.RightSide>
          {customFooterContent}
          {fullscreenButton}
        </S.RightSide>
      )}
    </S.BottomBar>
  );
};
