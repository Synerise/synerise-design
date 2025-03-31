import React from 'react';
import Icon, { DragHandleM } from '@synerise/ds-icon';
import * as S from '../CardTab.styles';
import { prefixType } from '../CardTab.types';
import { Props } from './CardTabPrefix.types';

const CardTabPrefix = ({ prefix, draggable, tag, prefixIcon, colorDot, dragHandleProps }: Props) => {
  const className = prefix === prefixType.HANDLE ? 'persistent' : '';
  return (
    <S.CardTabPrefix data-testid="card-tab-prefix">
      {prefix === prefixType.TAG && tag && (
        <S.CardTabTag draggable={draggable} data-testid="card-tab-tag">
          {tag}
        </S.CardTabTag>
      )}
      {prefix === prefixType.ICON && prefixIcon && (
        <S.CardIconPrefix>
          <Icon component={prefixIcon} />
        </S.CardIconPrefix>
      )}
      {prefix === prefixType.DOT && colorDot && (
        <S.CardDotPrefix data-testid="card-dot-tag">{colorDot}</S.CardDotPrefix>
      )}
      {(prefix === prefixType.HANDLE || draggable) && (
        <S.CardDragPrefix className={className} {...dragHandleProps}>
          <Icon className="ds-card-tabs__handle-icon sortable-drag" component={<DragHandleM />} />{' '}
        </S.CardDragPrefix>
      )}
    </S.CardTabPrefix>
  );
};

export default CardTabPrefix;
