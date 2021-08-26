import React from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import _ from 'lodash';

// Components
import InputText from '../../presentationals/InputText';

const BookForm = ({initialValues,
  onSubmit,
  onValidate}) => (
  <Formik
    initialValues={initialValues}
    validate={onValidate}
    onSubmit={onSubmit}
  >
    {
      ({
        handleSubmit,
        errors,
        submitForm
      }) => (
        <Form
          onSubmit={handleSubmit}
        >
          <div className="row">
            <div>
              <Field
                title="Name"
                type="text"
                name="name"
                errors={errors}
                component={InputText}
              />
              <ErrorMessage
                component="span"
                name="name"
              />
            </div>
            <div>
              <Field
                title="Email"
                type="text"
                name="email"
                errors={errors}
                component={InputText}
              />
              <ErrorMessage
                component="span"
                name="email"
              />
            </div>
          </div>
          <div
            className="center padding-space"
          >
            <button
              className="boton"
              type="button"
              onClick={() => {
                setTimeout(submitForm, 100);
              }}
            >
              SAVE
            </button>
          </div>
        </Form>   
      )
    }
  </Formik>
);

export default BookForm;