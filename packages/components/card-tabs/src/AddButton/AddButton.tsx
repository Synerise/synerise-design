import * as React from 'react';
import Button from '@synerise/ds-button/src';
import Icon from '@synerise/ds-icon';
import AddIcon from '@synerise/ds-icon/dist/icons/add-1-m.svg';
import * as S from './AddButton.styles';

interface Props {
  onClick: () => void;
  disabled: boolean;
}

interface State {
  pressed: boolean;
}

export default class AddButton extends React.PureComponent<Props, State> {
  state = {
    pressed: false,
  };

  handleMouseDown = (): void => {
    this.setState({ pressed: true });
  };

  handleMouseUp = (): void => {
    this.setState({ pressed: false });
  };

  render(): React.ReactNode {
    const { pressed } = this.state;
    const { onClick, disabled } = this.props;
    return (
      <S.AddButton
        className={`${pressed ? 'pressed' : ''}`}
        disabled={disabled}
        onClick={onClick}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseUp}
      >
        <Icon component={<AddIcon />} />
      </S.AddButton>
    );
  }
}
