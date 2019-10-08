import * as React from 'react';
import List from '@synerise/ds-list';
import ManageableListContainer from './Manageable-list.styles';
import Item from './Item/Item';
import AddItem from './AddItem/AddItem';

interface Props {
  addItemLabel: string;
  showMoreLabel: string;
  maxToShowItems: number;
  onItemAdd: (createCatalogRequest: object) => void;
  onItemRemove: Function;
  onItemEdit: Function;
  onItemSelect: Function;
  items: [];
  loading: boolean;
}

export default class ManageableList extends React.PureComponent<Props> {
  render(): React.ReactNode {
    const { onItemAdd, onItemSelect, onItemRemove, onItemEdit, addItemLabel, items } = this.props;
    return (
      <ManageableListContainer>
        <AddItem addItemLabel={addItemLabel} onItemAdd={onItemAdd} />
        <List
          dataSource={[items]}
          renderItem={(item): React.ReactNode => (
            <Item onSelect={onItemSelect} onUpdate={onItemEdit} onRemove={onItemRemove} item={item} />
          )}
        />
      </ManageableListContainer>
    );
  }
}
