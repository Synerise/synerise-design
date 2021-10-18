import * as React from 'react';
import Icon from '@synerise/ds-icon';
import DragHandleM from '@synerise/ds-icon/dist/icons/DragHandleM';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from '../CardTab.styles';
import { prefixType } from '../CardTab.types';
import { Props } from './CardTabPrefix.types';

const CardTabPrefix: React.FC<Props> = ({ prefix, draggable, tag, prefixIcon, colorDot }) => {
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
      {draggable && (
        <S.CardDragPrefix>
          <Icon className="ds-card-tabs__handle-icon" component={<DragHandleM />} />{' '}
        </S.CardDragPrefix>
      )}
    </S.CardTabPrefix>
  );
};

export default CardTabPrefix;
