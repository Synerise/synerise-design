import React, { type ReactNode } from 'react';

import Button from '@synerise/ds-button';
import Icon, { CloseM, CodeTerminalM } from '@synerise/ds-icon';

import * as S from '../CodeArea.styles';
import { type CodeAreaTexts } from '../CodeArea.types';

type FullscreenHeaderProps = {
  label?: ReactNode;
  texts: CodeAreaTexts;
  onClick: () => void;
};
export const FullscreenHeader = ({
  label,
  texts,
  onClick,
}: FullscreenHeaderProps) => {
  return (
    <S.FullscreenHeader>
      <S.LeftSide>
        <S.FullscreenHeaderTitle level={3}>
          <Icon component={<CodeTerminalM />} />
          {label || texts.fullscreenTitle}
        </S.FullscreenHeaderTitle>
      </S.LeftSide>

      <S.RightSide>
        <Button
          type="primary"
          mode="icon-label"
          onClick={onClick}
          icon={<Icon component={<CloseM />} />}
        >
          {texts.closeFullscreen}
        </Button>
      </S.RightSide>
    </S.FullscreenHeader>
  );
};
