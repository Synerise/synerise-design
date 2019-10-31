import * as React from 'react';
import { Field, Form as FinalForm } from 'react-final-form';

import InputNumber from "@synerise/ds-input-number";
import { Input, TextArea } from "@synerise/ds-input";
import Button from "@synerise/ds-button";
import Checkbox from "@synerise/ds-checkbox";
import Radio from "@synerise/ds-radio";
import Select from "@synerise/ds-select";
import Form from '@synerise/ds-form';
import { boolean, text } from "@storybook/addon-knobs";

const decorator = (storyFn) => (
  <div style={{ width: '400px', padding: '16px', background: '#fff' }}>
    {storyFn()}
  </div>
);

interface FormValues {
  age: number;
  firstName: string;
  description: string;
  agreement: boolean;
  sex: "male" | "female" | "other";
}

const validate = (values: FormValues) => {
  const errors: { [key: string]: string } = {};

  if (values.age < 3) {
    errors.age = "Must be greater than 2";
  }

  if (!values.firstName) {
    errors.firstName = "Must not be empty";
  }

  if (!values.description) {
    errors.description = "Must not be empty";
  }

  if (values.description && (values.description.length < 3)) {
    errors.description = "Must be at least 3 characters long";
  }

  if (!values.agreement) {
    errors.agreement = "Mandatory field";
  }

  if (!values.sex) {
    errors.sex = "Choose something";
  }

  return errors;
};

const onSubmit = (values: any) => {
  console.log({ values });
};

const FormExample = () => (
  <FinalForm
    onSubmit={onSubmit}
    validate={validate}
    initialValues={{ age: 1, firstName: '', description: '' }}
    render={({ handleSubmit, values }) => {
      return (
        <form onSubmit={handleSubmit}>
          <Field
            name="age"
            render={({ input, meta }) => (
              <InputNumber
                {...input}
                label="Age"
                description="Your age"
                errorText={meta.touched && meta.error}
              />
            )}
          />

          <Field
            name="firstName"
            render={({ input, meta }) => (
              <Input
                {...input}
                label="First Name"
                description="Your first name"
                counterLimit={15}
                errorText={meta.touched && meta.error}
              />
            )}
          />

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

          <Field
            name="agreement"
            render={({ input, meta }) => (
              <Checkbox
                {...input}
                errorText={meta.touched && meta.error}
              >
                Agreement
              </Checkbox>
            )}
          />

          <Field
            name="sex"
            render={({ input, meta }) => (
              <div>
                <Radio.Group buttonStyle="solid" onChange={input.onChange}>
                  <Radio.Button value="male">Male</Radio.Button>
                  <Radio.Button value="female">Female</Radio.Button>
                  <Radio.Button value="other">Other</Radio.Button>
                </Radio.Group>
                {meta.touched && meta.error && <div style={{ color: 'red' }}>Mandatory field</div>}
              </div>
            )}
          />

          <Field
            name="country"
            render={({ input, meta }) => (
              <Select
                onChange={input.onChange}
                label="Country"
                errorText={meta.touched && meta.error}
                defaultValue="poland"
                style={{ width: '100%' }}
              >
                <Select.Option value="poland">Poland</Select.Option>
                <Select.Option value="not-poland">Not Poland</Select.Option>
              </Select>
            )}
          />

          <Button type="primary" onClick={() => handleSubmit()}>Submit</Button>
        </form>
      )
    }}
  />
);

const FieldSetExample = () => (
  <Form.FieldSet
    heading={text('heading', "Heading")}
    description={text('description', "Description")}
    withLine={boolean('withLine', false)}
  >
    Content
  </Form.FieldSet>
);

const stories = {
  default: FormExample,
  'Field Set': FieldSetExample,
};

export default {
  name: 'Form|Example',
  decorator,
  stories,
  Component: FinalForm,
};
