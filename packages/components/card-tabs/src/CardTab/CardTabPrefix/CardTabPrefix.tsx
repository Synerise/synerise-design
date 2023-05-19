import * as React from 'react';
import { FC } from 'react';
import Icon, { DragHandleM } from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from '../CardTab.styles';
import { prefixType } from '../CardTab.types';
import { Props } from './CardTabPrefix.types';

const CardTabPrefix: FC<Props> = ({ prefix, draggable, tag, prefixIcon, colorDot }) => {
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
          <Icon component={prefixIcon} color={theme.palette['grey-600']} />
        </S.CardIconPrefix>
      )}
      {prefix === prefixType.DOT && colorDot && (
        <S.CardDotPrefix data-testid="card-dot-tag">{colorDot}</S.CardDotPrefix>
      )}
      {(prefix === prefixType.HANDLE || draggable) && (
        <S.CardDragPrefix className={className}>
          <Icon className="ds-card-tabs__handle-icon sortable-drag" component={<DragHandleM />} />{' '}
        </S.CardDragPrefix>
      )}
    </S.CardTabPrefix>
  );
};

export default CardTabPrefix;
