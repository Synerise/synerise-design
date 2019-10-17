import * as React from 'react';
import Sortable from 'react-sortablejs';
import CardTab, { CardTabProps } from './CardTab/CardTab';
import AddButton from './AddButton/AddButton';
import * as S from './CardTabs.styles';

export type CardTabsProps = {
  onChangeOrder?: () => void;
  onAddTab?: () => void;
  maxTabsCount?: number;
  children: React.ReactChildren;
};

function CardTabs(props: CardTabsProps): React.ReactNode {
  const { onChangeOrder, onAddTab, maxTabsCount, children } = props;

  return (
    <S.CardTabsContainer>
      {onChangeOrder ? (
        <Sortable className="ds-card-tags-sortable" onChange={onChangeOrder}>
          {children}
        </Sortable>
      ) : (
        <div className="ds-card-tags-sortable">{children}</div>
      )}
      {onAddTab && <AddButton disabled={React.Children.toArray(children).length >= maxTabsCount} onClick={onAddTab} />}
    </S.CardTabsContainer>
  );
}

export default CardTabs;
