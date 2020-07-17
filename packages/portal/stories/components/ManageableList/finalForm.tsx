import { boolean, text } from '@storybook/addon-knobs';
import { Field, Form as FinalForm } from 'react-final-form';
import InputNumber from '@synerise/ds-input-number';
import { Input, TextArea } from '@synerise/ds-input';
import Radio from '@synerise/ds-radio';
import Select from '@synerise/ds-select';
import Button from '@synerise/ds-button';
import Form from '@synerise/ds-form';
import * as React from 'react';
import Checkbox from '@synerise/ds-checkbox/dist';
import ManageableList from '@synerise/ds-manageable-list';
import { action } from '@storybook/addon-actions';

const decorator = (storyFn) => <div style={{ width: '400px', padding: '16px', background: '#fff' }}>{storyFn()}</div>;

const getTexts = () => ({
  addItemLabel: text('Add item label', 'Add position'),
  showMoreLabel: text('Show more label', 'show all'),
  showLessLabel: text('Show less label', 'show less'),
  more: text('More', 'more'),
  less: text('Less', 'less'),
  activateItemTitle: text('Activate item', 'By activating this filter, you will cancel your unsaved filter settings'),
  activate: text('Activate', 'Activate'),
  cancel: text('Cancel', 'Cancel'),
  deleteConfirmationTitle: text('Delete confirmation title', 'Delete filter'),
  deleteConfirmationDescription: text(
    'Delete confirmation description',
    'Deleting this filter will permanently remove it from templates library. All tables using this filter will be reset.'
  ),
  deleteLabel: text('Delete', 'Delete'),
});
interface FormValues {
  age: number;
  firstName: string;
  description: string;
  agreement: boolean;
  sex: 'male' | 'female' | 'other';
}

const validate = (values: FormValues) => {
  const errors: { [key: string]: string } = {};

  if (values.age < 3) {
    errors.age = 'Must be greater than 2';
  }

  if (!values.firstName) {
    errors.firstName = 'Must not be empty';
  }

  if (!values.description) {
    errors.description = 'Must not be empty';
  }

  if (values.description && values.description.length < 3) {
    errors.description = 'Must be at least 3 characters long';
  }

  if (!values.agreement) {
    errors.agreement = 'Mandatory field';
  }

  if (!values.sex) {
    errors.sex = 'Choose something';
  }

  return errors;
};

const onSubmit = (values: any) => {
  console.log({ values });
};

const item = {
  id: '00000000-0000-0000-0000-000000000002',
  name: 'Name',
  canUpdate: true,
  canDelete: true,
  expanded: true,
  content: (
    <Field
      name="age"
      render={({ input, meta }) => (
        <InputNumber {...input} label="Age" description="Your age" errorText={meta.touched && meta.error} />
      )}
    />
  ),
};

const nextItems = {
  id: '00000000-0000-0000-0000-000000000001',
  name: 'Description',
  canUpdate: true,
  canDelete: true,
  expanded: false,
  content: (
    <Field
      name="description"
      render={({ input, meta }) => (
        <TextArea
          {...input}
          label="Description"
          description="Describe your issue"
          counterLimit={100}
          rows={5}
          errorText={meta.touched && meta.error}
        />
      )}
    />
  ),
};
const FormExample = () => {
  const [items, setItems] = React.useState([item, nextItems]);
  const texts = getTexts();
  const onAdd = action('onItemAdd');
  return (
    <FinalForm
      onSubmit={onSubmit}
      validate={validate}
      initialValues={{ age: 1, firstName: '', description: '' }}
      render={({ handleSubmit, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <ManageableList
              type="content"
              maxToShowItems={5}
              onItemEdit={onAdd}
              items={items}
              loading={false}
              texts={texts}
            />
          </form>
        );
      }}
    />
  );
};

const FieldSetExample = () => (
  <Form.FieldSet
    heading={text('heading', 'Heading')}
    description={text('description', 'Description')}
    withLine={boolean('withLine', false)}
  >
    Content
  </Form.FieldSet>
);

export default FormExample;
