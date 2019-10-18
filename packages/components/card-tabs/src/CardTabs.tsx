import * as React from 'react';
import Sortable from 'react-sortablejs';
import AddButton from './AddButton/AddButton';
import * as S from './CardTabs.styles';

export type CardTabsProps = {
  onChangeOrder?: () => void;
  onAddTab?: () => void;
  maxTabsCount?: number;
  children?: React.ReactChildren;
};

const CardTabs: React.FC<CardTabsProps> = ({ onChangeOrder, onAddTab, maxTabsCount, children }) => {
  return (
    <S.CardTabsContainer data-testid="card-tabs-container">
      {onChangeOrder ? (
        <Sortable className="ds-card-tags-sortable" onChange={onChangeOrder} data-testid="card-tabs-sortable">
          {children}
        </Sortable>
      ) : (
        <div className="ds-card-tags-sortable" data-testid="card-tabs-static">
          {children}
        </div>
      )}
      {onAddTab && (
        <span data-testid="card-tabs-add-button">
          <AddButton disabled={React.Children.toArray(children).length >= maxTabsCount} onClick={onAddTab} />
        </span>
      )}
    </S.CardTabsContainer>
  );
};

export default CardTabs;
