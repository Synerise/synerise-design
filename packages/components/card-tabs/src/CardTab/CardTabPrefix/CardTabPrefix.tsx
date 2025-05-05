import React, { useMemo } from 'react';
import Icon, { DragHandleM } from '@synerise/ds-icon';

import * as S from '../CardTab.styles';
import { prefixType } from '../CardTab.types';
import { CardTabPrefixProps } from './CardTabPrefix.types';
import { isTagPrefix, isDotPrefix, isIconPrefix, isHandlePrefix } from './CardTabPrefix.utils';

const CardTabPrefix = ({ draggable, dragHandleProps, ...rest }: CardTabPrefixProps) => {
  const prefixElement = useMemo(() => {
    if (isTagPrefix(rest)) {
      const { tag } = rest;
      return <S.CardTabTag data-testid="card-tab-tag">{tag}</S.CardTabTag>;
    }
    if (isDotPrefix(rest)) {
      const { colorDot } = rest;
      return <S.CardDotPrefix data-testid="card-tab-dot">{colorDot || <S.CardDot />}</S.CardDotPrefix>;
    }
    if (isIconPrefix(rest)) {
      const { prefixIcon } = rest;
      return (
        <S.CardIconPrefix data-testid="card-tab-icon">
          <Icon component={prefixIcon} />
        </S.CardIconPrefix>
      );
    }
    return <></>;
  }, [rest]);

  const handleElement = useMemo(() => {
    if (isHandlePrefix(rest) || draggable) {
      return (
        <S.CardDragPrefix
          data-testid="card-tab-handle"
          persistent={rest.prefix === prefixType.HANDLE}
          {...dragHandleProps}
        >
          <Icon className="ds-card-tabs__handle-icon sortable-drag" component={<DragHandleM />} />{' '}
        </S.CardDragPrefix>
      );
    }
    return <></>;
  }, [dragHandleProps, draggable, rest]);

  return (
    <S.CardTabPrefix data-testid="card-tab-prefix">
      {prefixElement}
      {handleElement}
    </S.CardTabPrefix>
  );
};

export default CardTabPrefix;
