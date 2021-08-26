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
import Autocomplete from '../../presentationals/Autocomplete';

const BookForm = ({
  initialValues,
  onSubmit,
  onValidate,
  items
}) => (
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
        submitForm,
        values,
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
                title="Description"
                type="text"
                name="description"
                errors={errors}
                component={InputText}
              />
              <ErrorMessage
                component="span"
                name="description"
              />
            </div>
          </div>
          <div className="row">
            <div className="ancho50">
            <label className="title-form">Start typing to add books</label>
              <Field
                title="Books"
                name="selectedBook"
                errors={errors}
                items={items}
                onSelect={(_, item) => {
                  const newItems = [...values.books];
                  newItems.push({...item});
                  setFieldValue('books', newItems, true);
                  setFieldValue('selectedBook', '', true);
                }}
                onChange={(e) => {
                  setFieldValue('selectedBook', {name: e.target.value}, true);
                }}
                component={Autocomplete}
              />
              <ErrorMessage
                component="span"
                name="books"
              />
            </div>
            <div className="ancho50 contenedor-el">
              <label className="title-form">Books on this category</label>
              <ul className="categories-book-list">
                {
                  values.books.map((book, i) =>
                    !book.remove ?
                      <li key={i}>
                        <span>{book.name} - {book.author}</span>
                        <button
                          className="icon-Eliminar"
                          type="button"
                          onClick={() => {
                            const newItems = [...values.books];
                            newItems[i].remove = true;
                            setFieldValue('books', newItems, true);
                          }}
                        />
                      </li>
                      : undefined
                  ).filter(b => b)
                }
              </ul>
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