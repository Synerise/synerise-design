import React from 'react';
import { InfoFillS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import * as S from './AddModal.styles';

type TagInfoProps = {
  info: string;
};

export const TagInfo = ({ info }: TagInfoProps) => {
  return (
    <Tooltip title={info} mouseLeaveDelay={0}>
      <S.TagInfoIcon component={<InfoFillS />} />
    </Tooltip>
  );
};
