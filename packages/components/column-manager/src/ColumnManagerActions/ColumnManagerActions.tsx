import * as React from 'react';
import Button from '@synerise/ds-button';
import Modal from '@synerise/ds-modal/dist/Modal';
import { Input, TextArea } from '@synerise/ds-input';
import { Field, Form as FinalForm } from 'react-final-form';
import * as S from './ColumnManagerActions.styles';
import { ViewMeta } from '../ColumnManager';

type Props = {
  onSave: (viewMeta: ViewMeta) => void;
};

const ColumnManagerActions: React.FC<Props> = ({ onSave }) => {
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
          Save view
        </Button>
        <S.RightButtons>
          <Button type="ghost" mode="simple">
            Cancel
          </Button>
          <Button type="primary" mode="simple">
            Apply
          </Button>
        </S.RightButtons>
      </S.ColumnManagerActions>
      <Modal
        visible={modalVisible}
        closable
        onCancel={handleCancel}
        title="Save view"
        footer={
          <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
            <div style={{ display: 'flex' }}>
              <Button type="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" onClick={(event): void => submit(event)}>
                Apply
              </Button>
            </div>
          </div>
        }
      >
        <FinalForm
          onSubmit={submit}
          validate={validate}
          initialValues={{ name: '', description: '' }}
          render={({ handleSubmit }): React.ReactNode => {
            submit = handleSubmit;
            return (
              <form ref={formRef} onSubmit={handleSubmit}>
                <Field
                  name="name"
                  render={({ input, meta }): React.ReactNode => (
                    <Input
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...input}
                      label="View name"
                      placeholder="Placeholder"
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
                      label="View description"
                      placeholder="Placeholder"
                      rows={2}
                      errorText={meta.touched && meta.error}
                    />
                  )}
                />
              </form>
            );
          }}
        />
      </Modal>
    </>
  );
};

export default ColumnManagerActions;
