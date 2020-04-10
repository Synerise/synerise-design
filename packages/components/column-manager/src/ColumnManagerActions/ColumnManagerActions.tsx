import * as React from 'react';
import Button from '@synerise/ds-button';
import Modal from '@synerise/ds-modal/dist/Modal';
import { Input, TextArea } from '@synerise/ds-input';
import * as S from './ColumnManagerActions.styles';
import { Props, State } from './ColumnManagerActions.types';

const DEFAULT_STATE: State = {
  name: {
    value: '',
    error: '',
  },
  description: {
    value: '',
    error: '',
  },
  modalVisible: false,
};

class ColumnManagerActions extends React.Component<Props, State> {
  state = DEFAULT_STATE;

  handleCancel = (): void => {
    this.setState(DEFAULT_STATE);
  };

  handleShowModal = (): void => {
    this.setState({ modalVisible: true });
  };

  handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: {
        value,
        error: '',
      },
    } as State);
  };

  handleSubmit = (): void => {
    const { name, description } = this.state;
    const { onSave, texts } = this.props;
    if (name.value !== '') {
      this.setState(DEFAULT_STATE);
      onSave({ name: name.value, description: description.value });
    } else {
      this.setState({
        name: {
          ...name,
          error: texts.mustNotBeEmpty,
        },
      });
    }
  };

  render(): React.ReactElement {
    const { texts, onCancel, onApply } = this.props;
    const { modalVisible, name, description } = this.state;

    return (
      <>
        <S.ColumnManagerActions>
          <Button type="secondary" mode="simple" onClick={this.handleShowModal}>
            {texts.saveView}
          </Button>
          <S.RightButtons>
            <Button data-testid="ds-column-manager-cancel" type="ghost" mode="simple" onClick={onCancel}>
              {texts.cancel}
            </Button>
            <Button data-testid="ds-column-manager-apply" type="primary" mode="simple" onClick={onApply}>
              {texts.apply}
            </Button>
          </S.RightButtons>
        </S.ColumnManagerActions>
        <Modal
          visible={modalVisible}
          closable
          onCancel={this.handleCancel}
          title={texts.saveView}
          footer={
            <S.ModalFooter>
              <div>
                <Button data-testid="ds-modal-cancel" type="ghost" onClick={this.handleCancel}>
                  {texts.cancel}
                </Button>
                <Button data-testid="ds-modal-apply" type="primary" onClick={this.handleSubmit}>
                  {texts.apply}
                </Button>
              </div>
            </S.ModalFooter>
          }
        >
          <S.Form>
            <Input
              name="name"
              onChange={this.handleChange}
              value={name.value}
              label={texts.viewName}
              placeholder={texts.viewNamePlaceholder as string}
              errorText={name.error}
            />
            <TextArea
              name="description"
              value={description.value}
              onChange={this.handleChange}
              label={texts.viewDescription}
              placeholder={texts.viewDescriptionPlaceholder as string}
              rows={2}
            />
          </S.Form>
        </Modal>
      </>
    );
  }
}

export default ColumnManagerActions;
