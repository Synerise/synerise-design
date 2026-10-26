import React, { type ReactNode } from 'react';
import { useIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import Icon, { CloseM } from '@synerise/ds-icon';

import * as S from '../CodeArea.styles';
import type { CodeAreaTexts } from '../CodeArea.types';

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
  const { formatMessage } = useIntl();
  const closeLabel =
    typeof texts.closeFullscreen === 'string'
      ? texts.closeFullscreen
      : formatMessage({
          id: 'DS.CODE-AREA.CLOSE-FULLSCREEN',
          defaultMessage: 'Close fullscreen',
        });

  return (
    <S.FullscreenHeader>
      <S.LeftSide>
        <S.FullscreenHeaderTitle level={3}>
          {label || texts.fullscreenTitle}
        </S.FullscreenHeaderTitle>
      </S.LeftSide>

      <S.RightSide>
        <Button
          type="ghost"
          mode="single-icon"
          aria-label={closeLabel}
          onClick={onClick}
        >
          <Icon component={<CloseM />} />
        </Button>
      </S.RightSide>
    </S.FullscreenHeader>
  );
};
