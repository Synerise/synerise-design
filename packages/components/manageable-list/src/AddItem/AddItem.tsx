import * as React from 'react';
import { Input } from '@synerise/ds-input';
import Icon from '@synerise/ds-icon';
import onClickOutside from 'react-onclickoutside';
import FileM from '@synerise/ds-icon/dist/icons/file-m.svg';
import * as S from './AddItem.styles';

type Props = {
  onItemAdd: (addParams: { name: string }) => void;
  addItemLabel: string;
};

type State = {
  active: boolean;
  name: string;
};

class AddItem extends React.PureComponent<Props, State> {
  state = {
    active: false,
    name: '',
  };

  private handleClickOutside(): void {
    this.setState({
      active: false,
      name: '',
    });
  }

  private handleNameChange(event: any): void {
    this.setState({ name: event.target.value });
  }

  private toggleInput(): void {
    const { active } = this.state;
    this.setState({
      active: !active,
      name: '',
    });
  }

  private createCatalog(): void {
    const { name } = this.state;
    const { onItemAdd } = this.props;
    onItemAdd({ name });
    this.toggleInput();
  }

  render(): React.ReactNode {
    const { active, name } = this.state;
    const { addItemLabel } = this.props;
    return (
      <S.AddItemLayout>
        <S.AddItemButton onClick={this.toggleInput.bind(this)}>
          <Icon component={<FileM />} size={24} color="#000" />
          <S.AddItemLabel>{addItemLabel}</S.AddItemLabel>
        </S.AddItemButton>
        {active && (
          <Input
            autoFocus
            value={name}
            onChange={this.handleNameChange.bind(this)}
            onPressEnter={this.createCatalog.bind(this)}
          />
        )}
      </S.AddItemLayout>
    );
  }
}

export default onClickOutside(AddItem);
