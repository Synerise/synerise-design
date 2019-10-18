import * as React from 'react';
import Icon from '@synerise/ds-icon';
import * as S from '../CardTab.styles';
import HandleIcon from '../../../../icon/dist/icons/drag-handle-m.svg';
import { prefixType } from '../CardTab';

interface Props {
  prefix: prefixType;
  draggable?: boolean;
  tag?: string;
  prefixIcon?: React.ReactNode;
}

const CardTabPrefix: React.FC<Props> = ({ prefix, draggable, tag, prefixIcon }) => {
  return (
    <S.CardTabPrefix data-testid="card-tab-prefix">
      {!draggable && prefix === prefixType.TAG && tag && <S.CardTabTag data-testid="card-tab-tag">{tag}</S.CardTabTag>}
      {!draggable && prefix === prefixType.ICON && prefixIcon && <Icon component={prefixIcon} />}
      {draggable && <Icon className="ds-card-tabs__handle-icon" component={<HandleIcon />} />}
    </S.CardTabPrefix>
  );
};

export default CardTabPrefix;
