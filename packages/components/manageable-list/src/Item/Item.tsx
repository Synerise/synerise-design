import * as React from 'react';
import onClickOutside from 'react-onclickoutside';
import { Input } from '@synerise/ds-input';
import List from '@synerise/ds-list';
import Icon from '@synerise/ds-icon';
import FileM from '@synerise/ds-icon/dist/icons/file-m.svg';
import * as S from './Item.styles';

type Props = {
  item: {
    catalogId: string;
    canUpdateCatalog: boolean;
    canDeleteCatalog: boolean;
    name: string;
  };
  onRemove: (removeParams: { id: string }) => void;
  onSelect: (selectParams: { id: string }) => void;
  onUpdate: (updateParams: { id: string; name: string }) => void;
};

type State = {
  editMode: boolean;
  name: string;
};

class Item extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    const { name } = props.item;

    this.state = {
      editMode: false,
      name,
    };
  }

  private onSelect(): void {
    const { onSelect, item } = this.props;
    const { catalogId } = item;
    onSelect({ id: catalogId });
  }

  private enterEditMode(event: any): void {
    event.stopPropagation();
    this.setState({ editMode: true });
  }

  private handleClickOutside(): void {
    const { item } = this.props;
    const { name } = item;
    this.setState({
      editMode: false,
      name,
    });
  }

  private editName(event: any): void {
    this.setState({ name: event.target.value });
  }

  private updateName(): void {
    const { onUpdate, item } = this.props;
    const { catalogId } = item;
    const { name } = this.state;
    onUpdate({ id: catalogId, name });
  }

  private removeCatalog(event: any): void {
    event.stopPropagation();
    const { onRemove, item } = this.props;
    const { catalogId } = item;
    onRemove({ id: catalogId });
  }

  render(): React.ReactNode {
    const { item } = this.props;
    const { canUpdateCatalog, canDeleteCatalog, name } = item;
    const { name: stateName, editMode } = this.state;
    return (
      <List.Item
        icon={<Icon component={<FileM />} size={24} color="#000" />}
        onSelect={this.onSelect.bind(this)}
        actions={
          <S.ItemActions>
            {canUpdateCatalog && (
              <Icon component={<FileM />} size={24} color="#000" onClick={this.enterEditMode.bind(this)} />
            )}
            {canDeleteCatalog && (
              <Icon component={<FileM />} size={24} color="#000" onClick={this.removeCatalog.bind(this)} />
            )}
          </S.ItemActions>
        }
      >
        <S.ItemContainer>
          {editMode ? (
            <Input
              autoFocus
              onClick={(event): void => event.stopPropagation()}
              onFocus={(event): void => event.stopPropagation()}
              onChange={this.editName.bind(this)}
              value={stateName}
              onPressEnter={this.updateName.bind(this)}
            />
          ) : (
            <S.ItemLabel>{name}</S.ItemLabel>
          )}
        </S.ItemContainer>
      </List.Item>
    );
  }
}

export default onClickOutside(Item);
