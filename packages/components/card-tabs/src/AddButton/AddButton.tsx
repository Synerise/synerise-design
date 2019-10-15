import * as React from 'react';
import Button from '@synerise/ds-button/src';
import Icon from '@synerise/ds-icon';
import AddIcon from '@synerise/ds-icon/dist/icons/add-1-m.svg';
import * as S from './AddButton.styles';

interface Props {
  onClick: () => void;
}

export default class AddButton extends React.PureComponent<Props> {
  render(): React.ReactNode {
    const { onClick } = this.props;
    return (
      <S.AddButton onClick={onClick}>
        <Icon component={<AddIcon />} />
      </S.AddButton>
    );
  }
}
