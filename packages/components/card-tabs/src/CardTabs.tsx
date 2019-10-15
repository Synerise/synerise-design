import * as React from 'react';
import Sortable from 'react-sortablejs';
import CardTab, { CardTabProps } from './CardTab/CardTab';
import AddButton from './AddButton/AddButton';
import * as S from './CardTabs.styles';

export type CardTabsProps = {
  onChangeOrder?: () => void;
  onChangeName?: () => void;
  onDuplicateTab?: () => void;
  onRemoveTab?: () => void;
  onAddTab?: () => void;
  items: CardTabProps[];
  currentTabIndex?: number;
  addTabDisabled: boolean;
};

const CardTabs: React.FC<CardTabsProps> = ({
  items,
  currentTabIndex,
  onChangeOrder,
  onRemoveTab,
  onDuplicateTab,
  onChangeName,
  onAddTab,
  addTabDisabled,
}) => (
  <S.CardTabsContainer>
    <Sortable className="ds-card-tags-sortable" onChange={onChangeOrder} options={{ disabled: !onChangeOrder }}>
      {items.map(
        (tab: CardTabProps, index: number): React.ReactNode => (
          <CardTab
            key={`card-tab-${tab.id}`}
            id={tab.id}
            active={index === currentTabIndex}
            label={tab.label}
            onChangeName={onChangeName}
            onDuplicateTab={onDuplicateTab}
            onRemoveTab={onRemoveTab}
            variant={tab.variant}
            draggable={!!onChangeOrder}
            prefixIcon={tab.prefixIcon}
            showTag={tab.showTag}
            disabled={tab.disabled}
            invalid={tab.invalid}
            tabIndex={tab.tabIndex}
          />
        )
      )}
    </Sortable>
    {onAddTab && <AddButton disabled={addTabDisabled} onClick={(): void => {}} />}
  </S.CardTabsContainer>
);
export default CardTabs;
