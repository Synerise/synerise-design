import React from 'react';

import Button from '@synerise/ds-button';
import Icon, { CloseM } from '@synerise/ds-icon';

import * as S from './Tray.styles';
import type { TrayProps } from './Tray.types';
import { useTrayContext } from './hooks/useTrayContext';

const Tray = ({ id, ...htmlAttributes }: TrayProps) => {
  const { getTrayState, closeTray } = useTrayContext();
  const { isOpen, data } = getTrayState(id);

  if (!isOpen) {
    return null;
  }

  const { content, title, footer, headerRightSide, onClose } = data;

  return (
    <S.TrayWrapper {...htmlAttributes}>
      <S.TrayHeader>
        <S.TrayHeaderLeft>
          <S.TrayTitle level={4}>{title}</S.TrayTitle>
        </S.TrayHeaderLeft>
        <S.TrayHeaderRight>
          {headerRightSide}
          <Button
            type="ghost"
            mode="single-icon"
            onClick={() => {
              closeTray(id);
              onClose?.(id);
            }}
          >
            <Icon component={<CloseM />} />
          </Button>
        </S.TrayHeaderRight>
      </S.TrayHeader>
      <S.TrayContent>
        <S.TrayScrollbar absolute>{content}</S.TrayScrollbar>
      </S.TrayContent>
      {footer && <S.TrayFooter>{footer}</S.TrayFooter>}
    </S.TrayWrapper>
  );
};
export default Tray;
