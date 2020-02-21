import * as React from 'react';
import Button from '@synerise/ds-button';
import Modal from '@synerise/ds-modal/dist/Modal';
import { Input, TextArea } from '@synerise/ds-input';
import { Field, Form as FinalForm } from 'react-final-form';
import * as S from './ColumnManagerActions.styles';
import { ViewMeta } from '../ColumnManager';

type Props = {
  onSave: (viewMeta: ViewMeta) => void;
  texts: {
    [k: string]: string | React.ReactNode;
  };
};

const ColumnManagerActions: React.FC<Props> = ({ onSave, texts }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const formRef = React.useRef<HTMLFormElement>(null);

  const handleCancel = React.useCallback(() => {
    setModalVisible(false);
  }, [setModalVisible]);

  const handleShowModal = React.useCallback(() => {
    setModalVisible(true);
  }, [setModalVisible]);

  let submit = React.useCallback(
    values => {
      const { name, description } = values;

      onSave({ name, description });
    },
    [onSave]
  );

  const validate = React.useCallback((values: ViewMeta) => {
    const errors: {
      [k: string]: string;
    } = {};

    if (!values.name) {
      errors.name = 'Must not be empty';
    }

    return errors;
  }, []);

  return (
    <>
      <S.ColumnManagerActions>
        <Button type="secondary" mode="simple" onClick={handleShowModal}>
          {texts.saveView}
        </Button>
        <S.RightButtons>
          <Button type="ghost" mode="simple">
            {texts.cancel}
          </Button>
          <Button type="primary" mode="simple">
            {texts.apply}
          </Button>
        </S.RightButtons>
      </S.ColumnManagerActions>
      <Modal
        visible={modalVisible}
        closable
        onCancel={handleCancel}
        title={texts.saveView}
        footer={
          <S.ModalFooter style={{ display: 'flex', flexWrap: 'nowrap' }}>
            <div style={{ display: 'flex' }}>
              <Button type="ghost" onClick={handleCancel}>
                {texts.cancel}
              </Button>
              <Button type="primary" onClick={(event): void => submit(event)}>
                {texts.apply}
              </Button>
            </div>
          </S.ModalFooter>
        }
      >
        <FinalForm
          onSubmit={submit}
          validate={validate}
          initialValues={{ name: '', description: '' }}
          render={({ handleSubmit }): React.ReactNode => {
            submit = handleSubmit;
            return (
              <S.Form ref={formRef} onSubmit={handleSubmit}>
                <Field
                  name="name"
                  render={({ input, meta }): React.ReactNode => (
                    <Input
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...input}
                      label={texts.viewName}
                      placeholder={texts.viewNamePlaceholder as string}
                      errorText={meta.touched && meta.error}
                    />
                  )}
                />
                <Field
                  name="description"
                  render={({ input, meta }): React.ReactNode => (
                    <TextArea
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...input}
                      label={texts.viewDescription}
                      placeholder={texts.viewDescriptionPlaceholder as string}
                      rows={2}
                      errorText={meta.touched && meta.error}
                    />
                  )}
                />
              </S.Form>
            );
          }}
        />
      </Modal>
    </>
  );
};

export default ColumnManagerActions;
