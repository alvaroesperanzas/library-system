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
import InputDate from '../../presentationals/InputDate';

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
        setFieldValue,
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
                title="Author"
                type="text"
                name="author"
                errors={errors}
                component={InputText}
              />
              <ErrorMessage
                component="span"
                name="author"
              />
            </div>
          </div>
          <div className="row">
            <div className="ancho50">
              <Field
                title="Publication Date"
                type="text"
                name="publication_date"
                errors={errors}
                component={InputDate}
                onSelect={(date) => {
                  setFieldValue('publication_date', date, true);
                }}
              />
              <ErrorMessage
                component="span"
                name="publication_date"
              />
            </div>
            <div />
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