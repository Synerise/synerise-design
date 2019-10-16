import * as React from 'react';
import Sortable from 'react-sortablejs';
import CardTab, { CardTabProps } from './CardTab/CardTab';
import AddButton from './AddButton/AddButton';
import * as S from './CardTabs.styles';

export type CardTabsProps = {
  onChangeOrder?: () => void;
  onChangeName?: (id: string, name: string) => void;
  onDuplicateTab?: (id: string) => void;
  onRemoveTab?: (id: string) => void;
  onAddTab?: () => void;
  onSelectTab?: (index: number) => void;
  items: CardTabProps[];
  currentTabIndex?: number;
  addTabDisabled: boolean;
  greyBackground?: boolean;
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
  greyBackground,
  onSelectTab,
}) => (
  <S.CardTabsContainer>
    <Sortable className="ds-card-tags-sortable" onChange={onChangeOrder} options={{ disabled: !onChangeOrder }}>
      {items.map(
        (tab: CardTabProps, index: number): React.ReactNode => (
          <CardTab
            key={`card-tab-${tab.id}`}
            id={tab.id}
            index={index}
            active={index === currentTabIndex}
            name={tab.name}
            onSelectTab={onSelectTab}
            onChangeName={onChangeName}
            onDuplicateTab={onDuplicateTab}
            onRemoveTab={onRemoveTab}
            variant={tab.variant}
            draggable={!!onChangeOrder}
            prefixIcon={tab.prefixIcon}
            suffixIcon={tab.suffixIcon}
            showTag={tab.showTag}
            disabled={tab.disabled}
            invalid={tab.invalid}
            tabIndex={tab.tabIndex}
            greyBackground={greyBackground}
          />
        )
      )}
    </Sortable>
    {onAddTab && <AddButton disabled={addTabDisabled} onClick={onAddTab} />}
  </S.CardTabsContainer>
);
export default CardTabs;
